<?php
/**
 * Common Template - tpl_header.php
 *
 * this file can be copied to /templates/your_template_dir/pagename<br />
 * example: to override the privacy page<br />
 * make a directory /templates/my_template/privacy<br />
 * copy /templates/templates_defaults/common/tpl_footer.php to /templates/my_template/privacy/tpl_header.php<br />
 * to override the global settings and turn off the footer un-comment the following line:<br />
 * <br />
 * $flag_disable_header = true;<br />
 *
 * @package templateSystem
 * @copyright Copyright 2003-2006 Zen Cart Development Team
 * @copyright Portions Copyright 2003 osCommerce
 * @license http://www.zen-cart.com/license/2_0.txt GNU Public License V2.0
 * @version $Id: tpl_header.php 4813 2006-10-23 02:13:53Z drbyte $
 */
?>

<div style="display: none;"><?php echo '<pre>'; print_r($_GET); echo '</pre>'; //exit(); ?></div>

<?php
  // Display all header alerts via messageStack:
  if ($messageStack->size('header') > 0) {
    echo $messageStack->output('header');
  }
  if (isset($_GET['error_message']) && zen_not_null($_GET['error_message'])) {
  echo htmlspecialchars(urldecode($_GET['error_message']));
  }
  if (isset($_GET['info_message']) && zen_not_null($_GET['info_message'])) {
   echo htmlspecialchars($_GET['info_message']);
} else {

}
if($_GET['HDFCError'] != '') { ?>
  <div class="messageStackError larger"><?php echo zen_image($template->get_template_dir(ICON_IMAGE_ERROR, DIR_WS_TEMPLATE, $current_page_base,'images/icons'). '/' . ICON_IMAGE_ERROR, ICON_ERROR_ALT) . ' ' .  htmlspecialchars($_GET['HDFCError']); ?></div>
<?php } ?>
<!--<div id="navMainWrapper2" class="navbar navbar-fixed-top hidden-desktop navbar-left-first">
      <div id="navMain2" class="navbar-inner left-flyout-nav nav-collapse-left">
        <div class="container">
          <div id="navTopBar">
            <ul id="navTopBarLeft" class="nav">
				<li class="left-menu-title"><a>Categories</a></li>
				<li>
				<?php

 // load the UL-generator class and produce the menu list dynamically from there
/* require_once (DIR_WS_CLASSES . 'categories_ul_generator.php');
 $zen_CategoriesUL = new zen_categories_ul_generator;
 $menulist = $zen_CategoriesUL->buildTree(true);
 $menulist = str_replace('<li class="current">','<li class="current">',$menulist);
 $menulist = str_replace("</li>\n</ul>\n</li>\n</ul>\n","</li>\n</ul>\n",$menulist);
 echo $menulist;*/
?>
				</li>
				<li class="left-menu-title"><a>Information</a></li>
				<li>
					<ul>
                <?php  //require(DIR_WS_MODULES . 'sideboxes/' . $template_dir . '/' . 'ezpages_drop_menu.php'); ?>
              </ul>
				</li>
			</ul>
				<?php //} ?>
          </div><!--/.nav-collapse -->
      <!--  </div>
      </div>
    </div>-->
    <div id="navTopBarLeft1" class="nav-slidein u-bb">
				<p class="nav-title">Categories</p>
				<div class="pull-left">
				<?php
				  require_once (DIR_WS_CLASSES . 'categories_ul_generator.php');

			      echo $links_list;
              	?>
                 <?php /***********   ACCOUNT menu box     *******************/ ?>
                <a id="nav-item_account" class="nav-item nav-hover" href="javascript:void(0);">My Account</a>
                <div id="detail_account" class="nav-detail nav-detail-lg new-arrivals is-hover"> 
                    <span class="subnav-item subnav-back"><span class="fa">&lt;</span>Back</span>               
                <?php if ($_SESSION['customer_id']) { ?>
                    <a class="subnav-item" href="<?php echo zen_href_link(FILENAME_MY_MEASUREMENT, '', 'SSL');?>">My Measurements</a>
                    
              <?php $history_count = $db->Execute("select count(orders_id) as count from " . TABLE_ORDERS . " where customers_id = '" . (int)$_SESSION['customer_id'] . "'");
                    if ( $history_count->fields['count'] > 0) { ?>
				        <a class="subnav-item" href="<?php echo zen_href_link(FILENAME_ACCOUNT_HISTORY, '', 'SSL');?>">Order History</a>
              <?php } ?>
                            
                    <a class="subnav-item" href="<?php echo zen_href_link(FILENAME_ACCOUNT, '', 'SSL'); ?>">My Profile</a>	
                    <a class="subnav-item" href="<?php echo zen_href_link(FILENAME_LOGOFF, '', 'SSL'); ?>"><?php echo HEADER_TITLE_LOGOFF; ?></a>
                    
                <?php if ($_SESSION['cart']->count_contents() > 0) { ?>
					<a class="subnav-item" href="<?php echo zen_href_link(FILENAME_CHECKOUT_SHIPPING, '', 'SSL'); ?>"><?php echo HEADER_TITLE_CHECKOUT; ?></a>
                <?php } ?>
                    
				<?php } else { if (STORE_STATUS == '0') { ?>
					<a class="subnav-item" href="<?php echo zen_href_link(FILENAME_LOGIN, '', 'SSL'); ?>"><?php echo HEADER_TITLE_LOGIN; ?></a>
                    <?php /* <a class="subnav-item" href="<?php echo zen_href_link(FILENAME_CREATE_ACCOUNT, '', 'SSL'); ?>">Create Account</a> */ ?>
                    <a class="subnav-item" href="<?php echo zen_href_link(FILENAME_CREATE_ACCOUNT, '', 'SSL'); ?>">Create Account</a>
				<?php } } ?>
                </div>
                <div class="subnav-overlay"></div>    
				</div>
			</div>
<script>
            $(document).ready(function(){
                $(".brand").click(function() {
                    $(".nav-slidein").toggleClass("is-visible");
                    $("#mainWrapper").toggleClass("is-visible");
                    $(".brand").toggleClass('menuOpen');
                });
       $( ".nav-hover" ).click(function() {
         $(".subnav-overlay").toggleClass("is-visible");
        var ids = $(this).attr("id");
        id = ids.split('_');
       // alert("#detail_"+id[1]);
  $("#detail_"+id[1]).toggleClass("is-visible");
}); 
              $( ".subnav-back" ).click(function() {
  $(  ".nav-detail" ).removeClass("is-visible");
   $(".subnav-overlay").toggleClass("is-visible");

    });
});// End Menu Click function
</script>
<!--eof-navigation display-->
<script language="Javascript" type="text/javascript">
$(function() {
  $(".btn-search, #mobileSearch .cancel").click(function(){$("#mobileSearch").slideToggle();$("#mobileSearch# .simplesearchinput").val("")});
});
</script>


<div id="mainBg" class=" row-fluid nav-collapse-left">
<div class=" row-fluid nav-collapse-left">
<div id="navMainWrapper2" class="navbar navbar-fixed-top hidden-desktop nav-collapse-left">
      <div id="navMain2" class="navbar-inner">
        <div class="container">
        <!--  <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-white icon-list"></span>
          </a>-->
		  <a href="javascript: void(0);" class="btn-search"></a>
		  <a class="menu-shopping-cart" style="float:right;margin-right: 60px;" href="<?php echo zen_href_link(FILENAME_SHOPPING_CART, '', 'NONSSL'); ?>"><i class="icon-shopping-cart icon-white"></i>&nbsp;<?php echo $_SESSION['cart']->count_contents(); ?><span id="cartItems">&nbsp;items</span></a>
            
          <a class="brand" data-toggle="is-visible" data-target=".nav-slidein">
			<span class="icon-bar btn-flyout-trigger"></span>
			<span class="icon-bar btn-flyout-trigger"></span>
			<span class="icon-bar btn-flyout-trigger"></span>
		  </a>
          <div class="logo">
		<a href='<?php echo HTTP_SERVER . DIR_WS_CATALOG;?>' rel='home'>
        <img src="/includes/templates/hsuits/images/main_logo_gray.png" /></a>
	</div>
		  <div id="navTopBar" class="mobile-menublock">
			<div id="mobileSearch" class="mobile-search" style="display: none;">
				<a href="javascript: void(0);" class="cancel">Cancel</a>
				<?php echo zen_draw_form('quick_find_header', zen_href_link(FILENAME_ADVANCED_SEARCH_RESULT, '', $request_type, false), 'get', 'class="form-mobileSearch"');
				echo zen_draw_hidden_field('main_page',FILENAME_ADVANCED_SEARCH_RESULT);
				echo zen_draw_hidden_field('search_in_description', '1') . zen_hide_session_id(); ?>
				<input type="text" name="keyword" placeholder="Search" class="simplesearchinput" id="mobile-searchinput">
				</form>
			</div>
		  </div>
   <!--       <div id="navTopBar" class="nav-collapse">
            <ul id="navTopBarLeft" class="nav">
                <?php /* <li <?php if($this_is_home_page){ echo 'class="active"'; } ?>><?php echo '<a href="' . HTTP_SERVER . DIR_WS_CATALOG . '">'; ?><i class="icon-home icon-white"></i>&nbsp;<?php echo HEADER_TITLE_CATALOG; ?></a></li> */ ?>
                
             <?php //if ($_SESSION['customer_id']) { ?>
                
				<li><a href="<?php //echo zen_href_link(FILENAME_MY_MEASUREMENT, '', 'SSL');?>">My Measurements</a></li>
                
                <?php 
						//if ($_SESSION['customer_id']) { 
						//	$history_count = $db->Execute("select count(orders_id) as count from " . TABLE_ORDERS . " where customers_id = '" . (int)$_SESSION['customer_id'] . "'");
					//		if($history_count->fields['count'] > 0) { ?>
							<li><a href="<?php //echo zen_href_link(FILENAME_ACCOUNT_HISTORY, '', 'SSL');?>">Order History</a></li>
							<?php //}
						//} ?>
                
                <li <?php //if($current_page_base=='account'){ echo 'class="active"'; } ?>><a href="<?php //echo zen_href_link(FILENAME_ACCOUNT, '', 'SSL'); ?>"><?php echo HEADER_TITLE_MY_ACCOUNT; ?></a></li>
                
                <li <?php //if($current_page_base=='logoff'){ echo 'class="active"'; } ?>><a href="<?php //echo zen_href_link(FILENAME_LOGOFF, '', 'SSL'); ?>"><?php echo HEADER_TITLE_LOGOFF; ?></a></li>
                
                <?php //if ($_SESSION['cart']->count_contents() != 0) { ?>
						<li><a href="<?php //echo zen_href_link(FILENAME_CHECKOUT_SHIPPING, '', 'SSL'); ?>"><?php //echo HEADER_TITLE_CHECKOUT; ?></a></li>
				<?php //} ?>

				<?php //} else { if (STORE_STATUS == '0') { ?>
                
					<li <?php //if($current_page_base=='login'){ echo 'class="active"'; } ?>><a href="<?php //echo zen_href_link(FILENAME_LOGIN, '', 'SSL'); ?>"><?php echo HEADER_TITLE_LOGIN; ?></a></li>
                    <li <?php //if($current_page_base=='login'){ echo 'class="active"'; } ?>><a href="<?php //echo zen_href_link(FILENAME_LOGIN, '', 'SSL'); ?>">Create Account</a></li>
                    
				<?php //} } ?>
					
			</ul>*/
				<?php /* if ($_SESSION['cart']->count_contents() != 0) { ?>
				<ul class="nav pull-right hidden-desktop">
					<li><?php require(DIR_WS_MODULES . 'sideboxes/search_header.php'); ?></li>
					<li class="dropdown"><a data-toggle="dropdown" class="dropdown-toggle" href="#"><i class="icon-shopping-cart icon-white"></i>&nbsp;<?php echo $_SESSION['cart']->count_contents(); ?>&nbsp;items</a>
					<ul class="dropdown-menu">
						<li><a href="<?php echo zen_href_link(FILENAME_SHOPPING_CART, '', 'NONSSL'); ?>"><?php echo HEADER_TITLE_CART_CONTENTS; ?></a></li>
						<li><a href="<?php echo zen_href_link(FILENAME_CHECKOUT_SHIPPING, '', 'SSL'); ?>"><?php echo HEADER_TITLE_CHECKOUT; ?></a></li>
					</ul>
				</li></ul>
				<?php } */ ?>
          </div>--><!--/.nav-collapse -->
        </div>
      </div>
    </div>

<div id="mainWrapper" class="container"><!--/bof-container-->
<!--bof-header logo and navigation display-->
<?php
if (!isset($flag_disable_header) || !$flag_disable_header) {
?>
<div class='header clearfix row-fluid'>
	<div class="logo visible-desktop">
		<a href='<?php echo HTTP_SERVER . DIR_WS_CATALOG;?>' rel='home'>HarrySuits</a>
	</div>
	<!--<?php echo '<a href="' . HTTP_SERVER . DIR_WS_CATALOG . '">'; ?><img src="includes/templates/hsuits/images/main_mobile_logo_white.png" style="padding-bottom:0;" class="mobile-header hidden-desktop"></a>-->
	<div class="navigation clearfix visible-desktop">
		<!--bof-optional categories tabs navigation display-->
		<?php require($template->get_template_dir('tpl_modules_categories_tabs.php',DIR_WS_TEMPLATE, $current_page_base,'templates'). '/tpl_modules_categories_tabs.php'); ?>
		<!--eof-optional categories tabs navigation display-->
		<!--<ul class='navigation'>
			<li>
				<a href='http://www.harrysuits/suits'<?php if(!$this_is_home_cat_page) echo ' class="flyout-trigger"';?>>Go Shopping</a>            
				<?php //if(!$this_is_home_cat_page) require($template->get_template_dir('tpl_modules_categories_top_fly.php',DIR_WS_TEMPLATE, $current_page_base,'templates'). '/tpl_modules_categories_top_fly.php'); ?>
			</li>
			
		</ul>-->
		<ul class="about-navigation">
            <!--bof-header ezpage links-->
			<?php if (EZPAGES_STATUS_HEADER == '1' or (EZPAGES_STATUS_HEADER == '2' and (strstr(EXCLUDE_ADMIN_IP_FOR_MAINTENANCE, $_SERVER['REMOTE_ADDR'])))) { ?>
			<?php require($template->get_template_dir('tpl_ezpages_bar_header.php',DIR_WS_TEMPLATE, $current_page_base,'templates'). '/tpl_ezpages_bar_header.php'); ?>
			<?php } ?>
			<!--eof-header ezpage links-->
        </ul>
		<ul class='user-navigation'>
			<li><a href="http://www.harrysuits.com/faq">Help</a></li>
			<li><a href="<?php echo zen_href_link(FILENAME_ACCOUNT, '', 'SSL'); ?>"><?php echo HEADER_TITLE_MY_ACCOUNT; ?><b class="caret"></b></a>
				<div id="my-account" class='navigation-flyout shopping-menu clearfix'>
					<ul class="my-account">
						<li><a href="<?php echo zen_href_link(FILENAME_MY_MEASUREMENT, '', 'SSL');?>">MY MEASUREMENTS</a></li>
						<li><a href="<?php echo zen_href_link(FILENAME_ACCOUNT_HISTORY, '', 'SSL');?>">ORDER HISTORY</a></li>
						<li><a href="<?php echo zen_href_link(FILENAME_ACCOUNT, '', 'SSL'); ?>">MY PROFILE</a></li>
					</ul>
				</div>
			</li>
			<li class="search js-search-header">
				<?php
				echo zen_draw_form('quick_find', zen_href_link(FILENAME_ADVANCED_SEARCH_RESULT, '', $request_type, false), 'get', 'class="simplesearch" id="SimpleSearchForm"');
				echo zen_draw_hidden_field('main_page',FILENAME_ADVANCED_SEARCH_RESULT);
				echo zen_draw_hidden_field('search_in_description', '1') . zen_hide_session_id();
				?><input type="hidden" name="convertGET" value="1">
					<fieldset>
						<?php
						echo zen_draw_input_field('keyword', '', 'class="simplesearchinput" id="searchinput" size="6" maxlength="30" value="' . HEADER_SEARCH_DEFAULT_TEXT . '" onfocus="if (this.value == \'' . HEADER_SEARCH_DEFAULT_TEXT . '\') this.value = \'\';" onblur="if (this.value == \'\') this.value = \'' . HEADER_SEARCH_DEFAULT_TEXT . '\';"') 
						?>
						<button type="submit" value="Go" name="simplesearch"><span>Go</span></button>
					</fieldset>
				</form>
			</li>
			<?php if ($_SESSION['customer_id']) { ?>
				<li><a href="<?php echo zen_href_link(FILENAME_LOGOFF, '', 'SSL'); ?>"><?php echo HEADER_TITLE_LOGOFF; ?></a></li>
			<?php
				  } else {
					if (STORE_STATUS == '0') {
			?>
				<li><a href="<?php echo zen_href_link(FILENAME_LOGIN, '', 'SSL'); ?>"><?php echo HEADER_TITLE_LOGIN; ?></a></li>
			<?php } } ?>
			<?php $products = $_SESSION['cart']->get_products();
			$count = count($products);
			if($count > 0) { ?>			
			<li>            
				
				<a href="<?php echo zen_href_link(FILENAME_SHOPPING_CART, '', 'NONSSL'); ?>" class='shopping-bag-trigger'><?php echo HEADER_TITLE_CART_CONTENTS; ?> (<span class='item_count'><?php echo $count; ?></span>)</a>              
				<div id='shopping_bag_submenu' class='navigation-flyout'>
				<ul>
				<?php 
				  if(isset($_GET['measurement_test']) && $_GET['measurement_test'] == 1)
					$measure = '&measurement_test=1';
                    
				  foreach ($products as $product) { 
				    
                    if (isset($_SESSION['picario'][$product['id']]['image_link'])) {
                        $productsImage = '<img src="'.$_SESSION['picario'][$product['id']]['image_link'].'" />';
                    } else {
                        $productsImage = zen_image($prodImage, $product['name'], 50, 40);
                    }
                    
                    ?>
					<li class="shopping-bag-item">
						<span class="back top-pop-cart-image"><?php echo $productsImage; ?></span>
						<span class="top-pop-cart-title">
							<h4><a href="<?php echo zen_href_link(zen_get_info_page($product['id']), 'products_id=' . $product['id']);?>"><?php echo $product['name'];?></a></h4>
							<?php if(zen_has_product_normal_attributes($product['id'])) { ?>
								<a href="<?php echo zen_href_link(FILENAME_CUSTOMIZATIONS, 'products_id=' . $product['id'] . '&edit=1');?>">edit customizations</a>
							<?php }
							if(zen_has_product_measurement_attributes($product['id'])) { ?>
								<a href="<?php echo zen_href_link(FILENAME_MEASUREMENTS, 'products_id=' . $product['id'] . '&edit=1' . $measure);?>">edit measurements</a>
							<?php }	?>
							<a href="<?php echo zen_href_link(FILENAME_SHOPPING_CART, 'action=remove_product&product_id=' . $product['id']);?>">remove</a>
						</span>
						<div class="clearBoth"></div>
					</li>
				<?php  }
				?>
				</ul>
				<a href="<?php echo zen_href_link(FILENAME_CHECKOUT_SHIPPING, '', 'SSL'); ?>" id="shopping_bag_submenu_checkout"><?php echo HEADER_TITLE_CHECKOUT; ?></a>
				</div>
			</li>
			<?php } ?>
		</ul>
	</div>
</div>

</div> <?php /*   <div id="mainWrapper" class="container">   */  ?>

<?php 
//$show_subscribe = false;
    if ($show_subscribe || $_GET['test'] == 'subscribe') { 
        if (isset($_GET['main_page']) && $_GET['main_page'] == 'index' && isset($_GET['cPath']) && $_GET['cPath'] != '') { //echo '!isset'; exit();
            $subscribe_count = 0;
            if (isset($_COOKIE['showsubscribe'])) $subscribe_count = $_COOKIE['showsubscribe'];
            if (isset($_SESSION['showsubscribe'])) $subscribe_count = $_SESSION['showsubscribe'];
            
            $subscribe_count++;
            
            //zen_setcookie('showsubscribe', $subscribe_count, time()+60*60*24*365, '/', (zen_not_null($current_domain) ? $current_domain : ''));  
            $_SESSION['showsubscribe'] = $subscribe_count;
?>
<div class="signup-wrap animate" id="signup-wrap"> <div class="ecapture" id="ecapture"><a class="ecapture-close" id="ecapture-close" href="javascript:void(0)">X</a> 
    <?php /* <form method="post" name="subscribeform" action="//www.studiosuits.com/sendy/sendy.php" id="subscribe-topform"> */ ?>
    <?php echo zen_draw_form('subscribeform', 'sendy/sendy.php', 'post', 'id="subscribe-topform"'); ?>
        <?php /* <h1 class="signup-heading">Sign Up for exclusive content, <br>special offers &amp; style news </h1> */ ?>
        <div class="signup-heading">Sign Up for exclusive content, <br>special offers &amp; style news </div>
        
        <div class="signup-form">
            <input id="enterEmail" class="form-field" name="email" value="" placeholder="enter email address" type="email" />
            <input id="subsEmail" value="Subscribe" name="subscribe" type="submit" />
            <div class="successError"></div>
        </div>
        <input type=hidden name="htmlemail" value="1" />
        <input type="hidden" name="list[2]" value="signup" />
        <input type="hidden" name="listname[2]" value="Jeans"/>
        <p class="antispam" style="display:none;">Leave this empty: <input type="text" name="url" /></p>
    </form>
    <div id="newsletter-topthanks"><p style="color: red;padding: 0;margin: 0;text-align: center;"></p></div>
    </div>
</div>
<script type="text/javascript">
    $('#ecapture-close').click(function() {
        $('#signup-wrap').removeClass('animate');
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'ajax_subscribe.php?do=close',
        });
    })
    
$(function() {
$("#subscribe-topform").submit(function(j){
	j.preventDefault();
	var g=$(this),i=g.find('input[name="email"]').val(),u=g.find('input[name="url"]').val(),h=g.attr("action");
	if(i==""){
		$("#newsletter-topthanks p").text("Please enter email address!")
	}else{
		$("#newsletter-topthanks p").text("Subscribing...");
		$("#subscribe-topform").hide();
		$.post(h,{email:i,url:u},function(k){
			if(k){
				if(k=="Invalid email address."){
					$("#subscribe-topform").show();
					$("#newsletter-topthanks p").text("Please enter a valid email.")
				}else{
					$("#newsletter-topthanks p").text("Thank you, you\'re subscribed!");
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: 'ajax_subscribe.php?do=close',
                    });
				}
			}else{
				$("#subscribe-topform").show();
				$("#newsletter-topthanks p").text("")
			}
		});
	}
});
});    
</script>
<?php } } ?>



<?php } ?>

<div id="mainWrapper" class="container">