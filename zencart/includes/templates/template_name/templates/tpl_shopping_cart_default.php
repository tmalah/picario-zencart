<?php

/**

 * Page Template

 *

 * Loaded automatically by index.php?main_page=shopping_cart.<br />

 * Displays shopping-cart contents

 *

 * @package templateSystem

 * @copyright Copyright 2003-2010 Zen Cart Development Team

 * @copyright Portions Copyright 2003 osCommerce

 * @license http://www.zen-cart.com/license/2_0.txt GNU Public License V2.0

 * @version $Id: tpl_shopping_cart_default.php 15881 2010-04-11 16:32:39Z wilt $

 */
//echo '<pre>'; print_r($_SESSION); echo '</pre>'; //exit();
?>

<div class="centerColumn" id="shoppingCartDefault">

<?php

  if ($flagHasCartContents) {

?>



<?php

  if ($_SESSION['cart']->count_contents() > 0) {

?>

<div class="forward"><?php echo TEXT_VISITORS_CART; ?></div>

<?php

  }

?>



<h1 id="cartDefaultHeading"><?php echo HEADING_TITLE; ?></h1>



<?php if ($messageStack->size('shopping_cart') > 0) echo $messageStack->output('shopping_cart'); ?>



<?php //echo zen_draw_form('cart_quantity', zen_href_link(FILENAME_SHOPPING_CART, 'action=update_product', $request_type)); 
    echo zen_draw_form('cart_quantity', zen_href_link(FILENAME_SHOPPING_CART, 'action=update_product', 'SSL'));
?>

<div id="cartInstructionsDisplay" class="content"><?php echo TEXT_INFORMATION; ?></div>



<?php if (!empty($totalsDisplay)) { ?>

  <div class="cartTotalsDisplay important"><?php echo $totalsDisplay; ?></div>

  <br class="clearBoth" />

<?php } ?>



<?php  if ($flagAnyOutOfStock) { ?>



<?php    if (STOCK_ALLOW_CHECKOUT == 'true') {  ?>



<div class="messageStackError"><?php echo OUT_OF_STOCK_CAN_CHECKOUT; ?></div>



<?php    } else { ?>

<div class="messageStackError"><?php echo OUT_OF_STOCK_CANT_CHECKOUT; ?></div>



<?php    } //endif STOCK_ALLOW_CHECKOUT ?>

<?php  } //endif flagAnyOutOfStock ?>



<table  border="0" width="100%" cellspacing="0" cellpadding="0" id="cartContentsDisplay">

     <tr class="tableHeading">

        <th scope="col" id="scQuantityHeading"><?php echo TABLE_HEADING_QUANTITY; ?></th>

        <?php /* <th scope="col" id="scUpdateQuantity">&nbsp;</th> */ ?>

        <th scope="col" id="scProductsHeading"><?php echo TABLE_HEADING_PRODUCTS; ?></th>

        <th scope="col" id="scUnitHeading"><?php echo TABLE_HEADING_PRICE; ?></th>

        <th scope="col" id="scTotalHeading"><?php echo TABLE_HEADING_TOTAL; ?></th>

        <th scope="col" id="scRemoveHeading">&nbsp;</th>

     </tr>

         <!-- Loop through all products /-->

<?php
    $jj = 0;

  foreach ($productArray as $product) {
    
        $jj++;
    
        $show_attributes = false;
        if (is_array($product['attributes']) && sizeof($product['attributes']) > 0) {
            foreach ($product['attributes'] as $key => $attribute_array) {
              if($key != 'attributes_updated') {
                $show_attributes = true;
              }
            }
        }
?>

     <tr class="<?php echo $product['rowClass']; ?>">

       <td class="cartQuantity">

<?php

  if ($product['flagShowFixedQuantity']) {

    //echo $product['showFixedQuantityAmount'] . '<br /><span class="alert bold">' . $product['flagStockCheck'] . '</span><br /><br />' . $product['showMinUnits'];
    echo $product['showFixedQuantityAmount'] . '<span class="alert bold">' . $product['flagStockCheck'] . '</span>' . $product['showMinUnits'];

  } else {

    //echo $product['quantityField'] . '<br /><span class="alert bold">' . $product['flagStockCheck'] . '</span><br /><br />' . $product['showMinUnits'];
    echo $product['quantityField'] . '<span class="alert bold">' . $product['flagStockCheck'] . '</span>' . $product['showMinUnits'];

  }

?>
<?php /*
       </td>

       <td class="cartQuantityUpdate">
*/ ?>
<?php
  if ($product['buttonUpdate'] == '') {
    echo '' ;
  } else {
    echo '<div class="cartQuantityUpdate">'.$product['buttonUpdate'].'</div>';
  }
?>
       </td>

       <td class="cartProductDisplay">

<a href="<?php echo $product['linkProductsName']; ?>"><span id="cartImage" class="back"><?php echo $product['productsImage']; ?></span><span id="cartProdTitle"><?php echo $product['productsName'] . '<span class="alert bold">' . $product['flagStockCheck'] . '</span>'; ?><br/>

<?php if(zen_has_product_normal_attributes($product['id'])) { ?>

                    <?php if ((int)$product['id'] == 2624) { ?>
                        <a href="javascript:void(0)" onclick="customForm<?php echo $jj; ?>.submit()" class="cart-edit-link">edit customizations</a><br/>
                    <?php } else { ?>
					   <a href="<?php echo zen_href_link(FILENAME_CUSTOMIZATIONS, 'products_id=' . $product['id'] . '&edit=1');?>" class="cart-edit-link">edit customizations</a><br/>
                    <?php } ?>

				<?php } if(zen_has_product_measurement_attributes($product['id'])) { 

				if(isset($_GET['measurement_test']) && $_GET['measurement_test'] == 1)

					$measure = '&measurement_test=1';

				?>

					<a href="<?php echo zen_href_link(FILENAME_MEASUREMENTS, 'products_id=' . $product['id'] . '&edit=1' . $measure);?>" class="cart-edit-link">edit measurements</a>

				<?php }	?>

				<!--<a href="<?php echo zen_href_link(FILENAME_SHOPPING_CART, 'action=remove_product&product_id=' . $product['id']);?>">remove</a></span></a>-->

<?php
                    $productID_array = explode(':', $product['id']);
                    if (isset($productID_array[1])) {
                        $form_id = $productID_array[1];
                    } else {
                        $form_id = $productID_array[0];
                    }
?>

<?php /****************   show "Add additional pants" link    ***************************/ ?>
<?php
    $show_pants_sql = "SELECT add_pants FROM ".TABLE_PRODUCTS." WHERE products_id = ".(int)$product['id'];
    $show_pants_result = $db->execute($show_pants_sql);
    $show_pants = false;
    if ($show_pants_result->RecordCount() > 0 && $show_pants_result->fields['add_pants'] != '') {
        $show_pants = true;
    }
?>
                    <?php //if ((int)$product['id'] == 1202 && in_array($_SESSION['customer_id'], array(34945, 1))) {
                    if ($show_pants) {
                        ?>
                        <a class="cart-edit-link" href="javascript:void(0);" onclick="javascript:addPant('<?php echo $form_id; ?>', '<?php echo 'measurement_info_ids_' . (int)$product['id'] . $indexProd; ?>');"><div class="editcust editpos">Add additional pants</div></a>
                        <div class="clearBoth"></div>
                    <?php } ?>
<?php /***********************************************************************/ ?>

<br class="clearBoth" />

                <?php  if ($show_attributes) { ?>
                    <a class="collapseAttrib attribLink-<?php echo (int)$product['id'] . $indexProd; ?>" href="javascript:void(0);" onclick="javascript:attribCollapse(<?php echo (int)$product['id'] . $indexProd; ?>);"><span id="viewAttrDetails">View Details</span>&nbsp;<span id="viewAttrSign-<?php echo (int)$product['id'] . $indexProd; ?>">+</span></a>
                    <br /><br />
                <?php } 

            echo $product['attributeHiddenField'];
		  echo '<div class="cartAttribsList attribBox-'.(int)$product['id'] . $indexProd.'">';
		  echo '<ul>';
		  if (isset($product['attributes']) && is_array($product['attributes'])) {
			reset($product['attributes']);
			foreach ($product['attributes'] as $option => $value) {
			 
                $attr_price_text = '';
                       if ($value['options_values_price'] > 0) {
                            //if (floor($value['options_values_price']) == $value['options_values_price']) {
                            //    $attr_price = $currencies->format($value['options_values_price']);
                            //    $attr_price_text = ' (' . $value['price_prefix'] . substr($attr_price, 0, strlen($attr_price) - 3) . ')';
                            //} else {
                                if ($option == 62 && (int)$product['id'] == 2624) {
                                    //  do nothing
                                } else {
                                    $attr_price_text = ' (' . $value['price_prefix'] . $currencies->format($value['options_values_price']) . ')';
                                }
                            //}
                       }
		?>
		<li><?php echo $value['products_options_name'] . TEXT_OPTION_DIVIDER . nl2br($value['products_options_values_name']) . $attr_price_text; ?></li>
		<?php
			}
		  } 


  echo $product['attributeHiddenField'];

  echo '<div class="cartAttribsList">';

  echo '<ul>';

  if (isset($product['attributes']) && is_array($product['attributes']) && false) {

    reset($product['attributes']);

    foreach ($product['attributes'] as $option => $value) {

?>



<li><?php echo $value['products_options_name'] . TEXT_OPTION_DIVIDER . nl2br($value['products_options_values_name']); ?></li>



<?php

    }

}

	if(isset($product['measurement_arributes'])) {

		foreach($product['measurement_arributes'] as $mkey => $mvalue) { ?>

		<li class="red"><?php echo $mvalue; ?></li>

		<?php }

	}

  echo '</ul>';

  echo '</div>';

  

?>

       </td>

       <td class="cartUnitDisplay"><?php echo $product['productsPriceEach']; ?></td>

       <td class="cartTotalDisplay"><?php echo $product['productsPrice']; ?></td>

       <td class="cartRemoveItemDisplay">

<?php

  if ($product['buttonDelete']) {

?>

           <a href="<?php echo zen_href_link(FILENAME_SHOPPING_CART, 'action=remove_product&product_id=' . $product['id']); ?>"><?php echo zen_image($template->get_template_dir(ICON_IMAGE_TRASH, DIR_WS_TEMPLATE, $current_page_base,'images/icons'). '/' . ICON_IMAGE_TRASH, ICON_TRASH_ALT); ?></a>

<?php

  }

  if ($product['checkBoxDelete'] ) {

    echo zen_draw_checkbox_field('cart_delete[]', $product['id']);

  }

?>

</td>

     </tr>

<?php

  } // end foreach ($productArray as $product)

?>

       <!-- Finished loop through all products /-->

      </table>



<div id="cartSubTotal"><?php echo SUB_TITLE_SUB_TOTAL; ?> <?php echo $cartShowTotal; ?></div>

<br class="clearBoth" />



<!--bof shopping cart buttons-->

<div class="buttonRow forward"><?php echo '<a href="' . zen_href_link(FILENAME_CHECKOUT_SHIPPING, '', 'SSL') . '">' . zen_image_button(BUTTON_IMAGE_CHECKOUT, BUTTON_CHECKOUT_ALT) . '</a>'; ?></div>

<div class="buttonRow back"><?php 
$back = zen_back_link();
if (isset($_SESSION['last_category']) && !empty($_SESSION['last_category']))
	$back = "<a href='" . $_SESSION['last_category'] . "'>";
echo $back . zen_image_button(BUTTON_IMAGE_CONTINUE_SHOPPING, BUTTON_CONTINUE_SHOPPING_ALT) . '</a>'; ?></div>

<?php

// show update cart button

  if (SHOW_SHOPPING_CART_UPDATE == 2 or SHOW_SHOPPING_CART_UPDATE == 3) {

?>

<div class="buttonRow back"><?php echo zen_image_submit(ICON_IMAGE_UPDATE, ICON_UPDATE_ALT); ?></div>

<?php

  } else { // don't show update button below cart

?>

<?php

  } // show update button

?>

<!--eof shopping cart buttons-->

</form>


        <?php /************ show add additional pants form  *****************/ ?> 

<?php $jj = 0;
foreach ($productArray as $product) { //echo '<pre>'; print_r($product); echo '</pre>'; //exit(); 
        
        $jj++;
        
        $productID_array = explode(':', $product['id']);
        if (isset($productID_array[1])) {
            $form_id = $productID_array[1];
        } else {
            $form_id = $productID_array[0];
        }

    $show_pants_sql = "SELECT add_pants FROM ".TABLE_PRODUCTS." WHERE products_id = ".(int)$product['id'];
    $show_pants_result = $db->execute($show_pants_sql);
    $show_pants = false;
    if ($show_pants_result->RecordCount() > 0 && $show_pants_result->fields['add_pants'] != '') {
        $show_pants = true;
    }
?>
        
        <?php 
            if ($show_pants) { 
                
                echo zen_draw_form('pant-'.$form_id, zen_href_link(FILENAME_PRODUCT_INFO, 'products_id='.(int)$show_pants_result->fields['add_pants'].'&action=add_product&cart_action=add_pants', 'SSL'), 'post', 'id="pant-'.$form_id.'"');    
?>
                <input type="hidden" name="cart_quantity" value="1" />
                <input type="hidden" name="product_customization" value="1" />
                <input type="hidden" name="is_mobile" value="yes" />
                <input type="hidden" name="products_id" value="<?php echo (int)$show_pants_result->fields['add_pants']; ?>" />
                <input type="hidden" name="products_gen_id" value="<?php echo (int)$show_pants_result->fields['add_pants']; ?>" />
                
                <?php
                    //   add default attribute value
                    if ($show_pants_result->fields['pants_attribute'] > 0) { ?>
                        <input type="hidden" name="id[201]" value="<?php echo $show_pants_result->fields['pants_attribute']; ?>" />
                <?php }  ?>
                
                <?php /* <input type="hidden" name="suit_measurement_id" id="measurID-<?php echo $form_id; ?>" value="" /> */ ?>
                
<?php
                $pants_default_sql = "SELECT options_id, options_values_id
                                        FROM ".TABLE_PRODUCTS_ATTRIBUTES."
                                        WHERE products_id = ".(int)$show_pants_result->fields['add_pants']."
                                        AND attributes_default = 1";
                $pants_default_result = $db->execute($pants_default_sql);
                //echo '<pre>'; print_r($pants_default_result); echo '</pre>'; exit();
                $pants_default = array();
                while (!$pants_default_result->EOF) {
                    $pants_default[$pants_default_result->fields['options_id']] = $pants_default_result->fields['options_values_id'];
                    $pants_default_result->MoveNext();
                }

                $pants_attributes_sql = "SELECT DISTINCT options_id
                                                    FROM ".TABLE_PRODUCTS_ATTRIBUTES." 
                                                    WHERE products_id = ".(int)$show_pants_result->fields['add_pants']."";
                $pants_attributes = $db->execute($pants_attributes_sql);
                
                $pants_attributes_array = array();
                    
                    //echo '<pre>'; print_r($pants_default); echo '</pre>'; exit();
                while (!$pants_attributes->EOF) {
                //foreach ($product['attributes'] as $key => $value) {
                    /*if (isset($product['attributes'][$pants_attributes->fields['options_id']])) {
    ?>
                    <input type="hidden" name="id[<?php echo $pants_attributes->fields['options_id']; ?>]" value="<?php echo $product['attributes'][$pants_attributes->fields['options_id']]['options_values_id']; ?>" />
    <?php
                    } elseif (isset($pants_default[$pants_attributes->fields['options_id']])) {
    ?>
                    <input type="hidden" name="id[<?php echo $pants_attributes->fields['options_id']; ?>]" value="<?php echo $pants_default[$pants_attributes->fields['options_id']]; ?>" />
    <?php
                        
                    }*/
                    
                    $pants_attributes_array[$pants_attributes->fields['options_id']] = 'attribute'; 
                    
                    $pants_attributes->MoveNext();
                }  
//echo '<pre>'; print_r($product['attributes']); echo '</pre>'; //exit();
//echo '<pre>'; print_r($pants_default); echo '</pre>'; //exit();
//echo '<pre>'; print_r($pants_attributes_array); echo '</pre>'; exit();

                foreach ($pants_default as $key => $value) { 
                    if (!isset($product['attributes'][$key])) {
                    ?>
                    <input type="hidden" name="id[<?php echo $key; ?>]" value="<?php echo $value; ?>" />
          <?php     }
                }

                //   check additional customization attributes
                foreach ($product['attributes'] as $key => $value) {
                    $cust_id = substr((string)$key, 0, 2);
                    //echo $cust_id.'<br />';
                    if (isset($pants_attributes_array[$cust_id])) { //echo $cust_id.'here<br />';
    ?>
                        <input type="hidden" name="id[<?php echo $cust_id; ?>]" value="<?php echo $value['options_values_id']; ?>" />
    <?php
                    }
                }                
                
?>
                
                 </form>  
            
        <?php } ?>
        
        <?php
            //   show custom suits form
            if ((int)$product['id'] == 2624) {
                
                echo zen_draw_form('customForm'.$jj, 'custom-suits/index.php', 'post');  
                //echo '<pre>'; print_r($product['attributes']); echo '</pre>'; exit();
                foreach ($product['attributes'] as $key => $value) {
                    $cust_id = substr((string)$key, 0, 2);
                    if ($value['options_values_id'] == 0) {
    ?>
                        <input type="hidden" name="id[<?php echo $cust_id; ?>]" value="<?php echo $value['products_options_values_name']; ?>" />
    <?php
                    } else {
    ?>
                        <input type="hidden" name="id[<?php echo $cust_id; ?>]" value="<?php echo $value['options_values_id']; ?>" />
    <?php  
                    }     
                } 
    ?>
                    <input type="hidden" name="reload" value="1" />
                    <input type="hidden" name="products_id" value="<?php echo $product['id']; ?>" />
                </form>
                
    <?php   } ?>
        
        
<?php } ?>
<script type="text/javascript">
    function addMore(form_id) {
        document.forms[form_id].submit();
    }
</script>

<script type="text/javascript">
    function addPant(form_id, measurID) {
        //if ($('#'+measurID).val() != '') {
        //    $('#measurID-'+form_id).attr('value', $('#'+measurID).val());
        //}
        document.forms['pant-'+form_id].submit();
    }
</script>

<?php /**********************************************************************/ ?>


<br class="clearBoth" />

<?php

    if (SHOW_SHIPPING_ESTIMATOR_BUTTON == '1') {

?>



<div class="buttonRow back"><?php echo '<a href="javascript:popupWindow(\'' . zen_href_link(FILENAME_POPUP_SHIPPING_ESTIMATOR) . '\')">' .

 zen_image_button(BUTTON_IMAGE_SHIPPING_ESTIMATOR, BUTTON_SHIPPING_ESTIMATOR_ALT) . '</a>'; ?></div>

<?php

    }

?>



<!-- ** BEGIN PAYPAL EXPRESS CHECKOUT ** -->

<?php  // the tpl_ec_button template only displays EC option if cart contents >0 and value >0

if (defined('MODULE_PAYMENT_PAYPALWPP_STATUS') && MODULE_PAYMENT_PAYPALWPP_STATUS == 'True') {

  include(DIR_FS_CATALOG . DIR_WS_MODULES . 'payment/paypal/tpl_ec_button.php');

}

?>

<!-- ** END PAYPAL EXPRESS CHECKOUT ** -->



<?php

      if (SHOW_SHIPPING_ESTIMATOR_BUTTON == '2') {

/**

 * load the shipping estimator code if needed

 */

?>

      <?php require(DIR_WS_MODULES . zen_get_module_directory('shipping_estimator.php')); ?>



<?php

      }

?>

<?php

  } else {

?>

<?php if ($messageStack->size('shopping_cart') > 0) echo $messageStack->output('shopping_cart'); ?>

<h2 id="cartEmptyText"><?php //echo TEXT_CART_EMPTY; ?></h2>

<div id="shopping_bag_empty">

    <div class="left-box">

		<img src="<?php echo DIR_WS_TEMPLATE?>images/shopping_bag_empty_header.png" id="shopping_bag_empty_header"><BR/>

    	<a class="primary-btn" href="/collection/Suits">Go Shopping</a>

    </div>

    <div class="right-box">

    	<img src="<?php echo DIR_WS_TEMPLATE?>images/empty_shopping_bag.jpg" id="shopping_bag_empty_image">

    </div>

    <br style="clear: both">

    <div id="shopping_bag_empty_sign_in">If items in your shopping bag are missing, try <a href="?sign-in">signing in</a> to your account to view them.</div>    			

</div>



<?php

$show_display_shopping_cart_empty = $db->Execute(SQL_SHOW_SHOPPING_CART_EMPTY);



while (!$show_display_shopping_cart_empty->EOF) {

?>



<?php

  if ($show_display_shopping_cart_empty->fields['configuration_key'] == 'SHOW_SHOPPING_CART_EMPTY_FEATURED_PRODUCTS') { ?>

<?php

/**

 * display the Featured Products Center Box

 */

?>

<?php require($template->get_template_dir('tpl_modules_featured_products.php',DIR_WS_TEMPLATE, $current_page_base,'templates'). '/tpl_modules_featured_products.php'); ?>

<?php } ?>



<?php

  if ($show_display_shopping_cart_empty->fields['configuration_key'] == 'SHOW_SHOPPING_CART_EMPTY_SPECIALS_PRODUCTS') { ?>

<?php

/**

 * display the Special Products Center Box

 */

?>

<?php require($template->get_template_dir('tpl_modules_specials_default.php',DIR_WS_TEMPLATE, $current_page_base,'templates'). '/tpl_modules_specials_default.php'); ?>

<?php } ?>



<?php

  if ($show_display_shopping_cart_empty->fields['configuration_key'] == 'SHOW_SHOPPING_CART_EMPTY_NEW_PRODUCTS') { ?>

<?php

/**

 * display the New Products Center Box

 */

?>

<?php require($template->get_template_dir('tpl_modules_whats_new.php',DIR_WS_TEMPLATE, $current_page_base,'templates'). '/tpl_modules_whats_new.php'); ?>

<?php } ?>



<?php

  if ($show_display_shopping_cart_empty->fields['configuration_key'] == 'SHOW_SHOPPING_CART_EMPTY_UPCOMING') {

    include(DIR_WS_MODULES . zen_get_module_directory(FILENAME_UPCOMING_PRODUCTS));

  }

?>

<?php

  $show_display_shopping_cart_empty->MoveNext();

} // !EOF

?>

<?php

  }

?>

</div>

