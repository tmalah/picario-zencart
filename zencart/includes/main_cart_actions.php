<?php
/**
 * Main shopping Cart actions supported.
 *
 * The main cart actions supported by the current shoppingCart class.
 * This can be added to externally using the extra_cart_actions directory.
 *
 * @package initSystem
 * @copyright Copyright 2003-2007 Zen Cart Development Team
 * @copyright Portions Copyright 2003 osCommerce
 * @license http://www.zen-cart.com/license/2_0.txt GNU Public License V2.0
 * @version $Id: main_cart_actions.php 6644 2007-07-27 09:12:36Z drbyte $
 */
if (!defined('IS_ADMIN_FLAG')) {
  die('Illegal Access');
}
/**
 * include the list of extra cart action files  (*.php in the extra_cart_actions folder)
 */
if ($za_dir = @dir(DIR_WS_INCLUDES . 'extra_cart_actions')) {
  while ($zv_file = $za_dir->read()) {
    if (preg_match('/\.php$/', $zv_file) > 0) {
      /**
       * get user/contribution defined cart actions
       */
      include(DIR_WS_INCLUDES . 'extra_cart_actions/' . $zv_file);
    }
  }
  $za_dir->close();
}
$processed = false;
$action = $_GET['action'];
if (isset($_POST['is_mobile']) && $_POST['is_mobile'] == 'yes' && $action = 'add_product') {
    
    if (isset($_GET['cart_action'])) {
        $action = $_GET['cart_action'];
        $goto = FILENAME_SHOPPING_CART;
    }

    
  if ($action == 'add_pants') {
    
    //  do nothing because pants attributes should come from shopping cart page
    //echo '<pre>'; print_r($options_values); echo '</pre>'; exit();
		//$_POST['id'] = $options_values; 
		$_POST['gen_products_id'] = $_POST['products_id'];
		$action = 'update_customize_product';
    
  } else {

    	ValidateAddProduct();
    	$processed = true;
    	if (zen_has_product_normal_attributes((int)$_POST['products_id'])) {
    		$options_values = array();
    		$where = 'and popt.products_options_measurement = 0 and products_options_advanced = 0 and patrib.attributes_default = 1';
    		$sql = "select distinct popt.products_options_id, patrib.options_values_id
                  from        " . TABLE_PRODUCTS_OPTIONS . " popt, " . TABLE_PRODUCTS_ATTRIBUTES . " patrib
                  where           patrib.products_id='" . (int)$_POST['products_id'] . "'
                  and             patrib.options_id = popt.products_options_id
                  and             popt.language_id = '" . (int)$_SESSION['languages_id'] . "' " . $where;
            $products_options_names = $db->Execute($sql);
    		while (!$products_options_names->EOF) {
    			$options_values[$products_options_names->fields['products_options_id']] = $products_options_names->fields['options_values_id'];
    			$products_options_names->MoveNext();
    		}
    		$_POST['id'] = $options_values;
    		$_POST['gen_products_id'] = $_POST['products_id'];
    		$action = 'update_customize_product';
    	}
     }
}
switch ($action) {
  /**
   * customer wants to update the product quantity in their shopping cart
   * delete checkbox or 0 quantity removes from cart
   */
  case 'update_product' :
  $_SESSION['cart']->actionUpdateProduct($goto, $parameters);
  break;
  case 'update_customize_product':
  if(zen_has_product_measurement_attributes((int)$_POST['products_id'])) {
	$cmeasurement_check_query = "select count(*) as total from " . TABLE_CUSTOMERS_MEASUREMENTS . " where customers_id = " . (int)$_SESSION['customer_id'];
	$cmeasurement_check = $db->Execute($cmeasurement_check_query);
	if ($cmeasurement_check->fields['total'] < 1) {
		$goto = FILENAME_MEASUREMENTS;
	}
  }
  
  //  check shirt monogram options
$shirt_option_id = 58;
$shirt_child1 = 59;
$shirt_child2 = 61;
//$shirt_child3 = 267;
//echo '<pre>'; print_r($_POST); echo '</pre>'; exit();
if (isset($_POST['id']['TEXT_PREFIX'.$shirt_option_id]) && $_POST['id']['TEXT_PREFIX'.$shirt_option_id] != '') {
    //  lets proceed shirm monogram attributes as usual
} else {
    //  remove shirt monogram attributes
    unset($_POST['id'][$shirt_child1]);
    unset($_POST['id'][$shirt_child2]);
    //unset($_POST['id'][$shirt_child3]);
}
//echo '<pre>'; print_r($_POST); echo '</pre>'; //exit();
  //  check jacket monogram options
$monograms_array = array(38, 47, 53);
foreach ($monograms_array as $monogram_id) {
    if (isset($_POST['id']['TEXT_PREFIX'.$monogram_id]) && $_POST['id']['TEXT_PREFIX'.$monogram_id] == '') {
        //  remove shirt monogram attributes
        unset($_POST['id']['TEXT_PREFIX'.$monogram_id]);
    }
}
//echo '<pre>'; print_r($_POST); echo '</pre>'; exit();  
  $len = strlen($_GET['products_id']);
  if ($len > 10 && $_SESSION['cart']->in_cart($_GET['products_id'])) { 
	$_SESSION['cart']->actionUpdateAttributes($goto, $parameters);
  } else {
	//$parameters = array('products_id');
	$_SESSION['cart']->actionAddProduct($goto, $parameters);
  }
  break;
  case 'update_measurement_product':
  $_SESSION['cart']->saveCustomerAttributes($goto, $parameters);
  break;
  /**
   * customer adds a product from the products page
   */
  case 'add_product' :
  if (!$processed) {
	ValidateAddProduct();
  }
  if(zen_has_product_normal_attributes((int)$_POST['products_id'])) { 
	$goto = FILENAME_CUSTOMIZATIONS;
    
    if ((int)$_POST['products_id'] == 1540) {
        $goto = FILENAME_SHOPPING_CART;
        $_SESSION['cart']->actionAddProduct($goto, $parameters);
    }
    
	zen_redirect(zen_href_link(FILENAME_CUSTOMIZATIONS, 'products_id=' . (int)$_POST['products_id'] . '&cart_quantity=' . (int)$_POST['cart_quantity']));
  } else {
	if(zen_has_product_measurement_attributes((int)$_POST['products_id'])) {
		$cmeasurement_check_query = "select count(*) as total from " . TABLE_CUSTOMERS_MEASUREMENTS . " where customers_id = " . (int)$_SESSION['customer_id'];
		$cmeasurement_check = $db->Execute($cmeasurement_check_query);
		if ($cmeasurement_check->fields['total'] < 1) {
			$goto = FILENAME_MEASUREMENTS;
		}
	}
  }
  $_SESSION['cart']->actionAddProduct($goto, $parameters);
  break;
  case 'buy_now' :
  /**
   * performed by the 'buy now' button in product listings and review page
   */
  $_SESSION['cart']->actionBuyNow($goto, $parameters);
  break;
  case 'multiple_products_add_product' :
  /**
   * performed by the multiple-add-products button
   */
  $_SESSION['cart']->actionMultipleAddProduct($goto, $parameters);
  break;
  case 'notify' :
  $_SESSION['cart']->actionNotify($goto, $parameters);
  break;
  case 'notify_remove' :
  $_SESSION['cart']->actionNotifyRemove($goto, $parameters);
  break;
  case 'cust_order' :
  $_SESSION['cart']->actionCustomerOrder($goto, $parameters);
  break;
  case 'remove_product' :
  $_SESSION['cart']->actionRemoveProduct($goto, $parameters);
  break;
  case 'cart' :
  $_SESSION['cart']->actionCartUserAction($goto, $parameters);
  break;
  case 'empty_cart' :
  $_SESSION['cart']->reset(true);
  break;
}
function ValidateAddProduct() {
  global $db, $messageStack;
  $special_query = $db->Execute('select products_special_reorder, pd.products_name from ' . TABLE_PRODUCTS . ' p join ' . TABLE_PRODUCTS_DESCRIPTION . ' pd on p.products_id = pd.products_id where p.products_id =' . (int)$_POST['products_id'] . ' and pd.language_id = ' . (int)$_SESSION['languages_id']);

  if($special_query->fields['products_special_reorder'] == 1) {
	$reorder_query = $db->Execute('select category_ids from ' . TABLE_PRODUCTS_REORDER . ' where products_id=' .  (int)$_POST['products_id']);
//echo 'select category_ids from ' . TABLE_PRODUCTS_REORDER . ' where products_id=' .  (int)$_POST['products_id']; exit();
	if(!empty($reorder_query->fields['category_ids'])) {	
		$category_query = $db->Execute('select count(o.orders_id) as count from ' . TABLE_ORDERS . ' o join ' . TABLE_ORDERS_PRODUCTS . ' op on o.orders_id = op.orders_id join ' . TABLE_PRODUCTS . ' p on op.products_id = p.products_id where o.customers_id = ' . (int)$_SESSION['customer_id'] . ' and p.master_categories_id in (' . $reorder_query->fields['category_ids'] . ')');
		
		if($category_query->fields['count'] == 0) {
			$messageStack->add_session('shopping_cart', 'NOTE:' . $special_query->fields['products_name'] . ' can only be purchased by our repeat customers as we do not offer Remakes on them, please buy other similar products first, after you get your measurement profile right you will be able to order these.<br>Be sure you are logged in if you are our returning customer.', 'error');
			zen_redirect(zen_href_link(FILENAME_SHOPPING_CART));
		}
	}
  }
}
?>