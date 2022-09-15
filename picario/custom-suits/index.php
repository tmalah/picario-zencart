<?php

header("Access-Control-Allow-Origin: *");

include_once('../includes/configure.php');

$link = mysql_connect(DB_SERVER, DB_SERVER_USERNAME, DB_SERVER_PASSWORD)
        or die('Can\'t connect to database: ' . mysql_error());
mysql_select_db(DB_DATABASE, $link) or die('Can\'t select database');

//if (isset($_GET['currency']) && $_GET['currency'] != '') {
    
//    $currency = $_GET['currency'];
    
//} else {

    //  get currency from zencart session
    $currency = 'USD';
    
    $query = "select value from " . DB_PREFIX . "sessions
              where sesskey = '" . $_COOKIE['zenid'] . "'
              and expiry > '" . time() . "'";
    //echo $query; exit();
    $result = mysql_query($query) or die('Query error: ' . mysql_error());
    if (mysql_numrows($result) > 0) {
        $line = mysql_fetch_array($result, MYSQL_ASSOC);
        $session = base64_decode($line['value']);        
        $sess_array = explode(';', $session);
        foreach ($sess_array as $sess_item) {
            $sess1_array = explode('|', $sess_item);
            $sess1_array[0] = str_replace('a:0:{}}', '', $sess1_array[0]);
            if ($sess1_array[0] == 'currency') {
                $sess1_array[1] = str_replace('"', '', $sess1_array[1]);
                $sess1_array[1] = str_replace('s:3:', '', $sess1_array[1]);
                $currency = $sess1_array[1];
            }
        }
    }
//}
//echo $currency; exit();

//  get currency exchange rate from zencart table
$all_currencies = array();
$query = "SELECT * FROM ".DB_PREFIX."currencies
          WHERE code <> 'INR'";
$result = mysql_query($query) or die('Query error: ' . mysql_error());
while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    if ($row['code'] == $currency) {
        $currency_array = $row;
    }
    $all_currencies[$row['code']] = $row;
}
//echo '<pre>'; print_r($currency_array); echo '</pre>'; exit();

if ($currency_array['code'] == 'EUR') {
    $currency_array['symbol_left'] = '&euro;';
}
if ($currency_array['code'] == 'GBP') {
    $currency_array['symbol_left'] = '&pound;';
}

?>
<!DOCTYPE HTML>
<html lang="en">
<head>

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NB96F8C');</script>
    <!-- End Google Tag Manager -->

	<meta http-equiv="content-type" content="text/html" />
	<meta name="author" content="admin" />
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Lato">
    <style>
      body {
        font-family: 'Lato', serif !important;
      }
    </style>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.1/jquery.min.js"></script>
    
    <script src="js/jquery.lazyload.min.js?v=1.9.7"></script>
    <?php /* <script src="https://cdn.jsdelivr.net/npm/lazyload@2.0.0-beta.2/lazyload.js"></script> */ ?>
    <?php /* <script src="js/closest.js"></script>
    <script type="text/javascript" src="js/blazy.min.js"></script> */ ?>
    <?php /* <script type="text/javascript" src="js/jquery.lazy.min.js"></script> */ ?>
    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    
    <script src="js/jquery.colorbox-min.js"></script>
    <link rel="stylesheet" href="css/colorbox.css" />
    
    <script src="js/jquery.base64.js"></script>
    
    <?php /* <script src="js/baron.js"></script>
    <link rel="stylesheet" href="css/baron.css" /> */ ?>
    
    <link rel="stylesheet" href="css/skins/styles1.css" />
    
    <link rel="stylesheet" href="css/style.css" />
    
    <script src="js/jquery.slimscroll.js"></script>
    <script type="text/javascript">
    $( document ).ready(function() {        
        
        
        if ($(document).width() > 768) {
            scrollHeight = ($(window).height() - $('#header').height() - $('.filterSelect').height());
        } else {
            scrollHeight = ($(window).height() - $('#header').height() - $('.filterSelect').height());
        }

        $('.slimScroll').slimScroll({
            //height: '100px',
            height: scrollHeight,
            alwaysVisible: true,
            railVisible: true,
            size : '3px',
            color: 'rgb(171, 169, 169)',
            allowPageScroll: true,
            wheelStep : 60
        });
        
        $('.subtabsContainer.short1').slimScroll({
            //height: '100px',
            height: scrollHeight,
            alwaysVisible: false,
            railVisible: true,
            size : '3px',
            color: 'rgb(171, 169, 169)',
            allowPageScroll: true,
            wheelStep : 60
        });
        
        if ($(document).width() > 768) {
            //styleHeight = ($(document).height()-190)+'px';
            styleHeight = $(window).height() - $('#header').height();
        } else {
            styleHeight = $(window).height() - $('#header').height();
        }
        //console.log('style: '+styleHeight);
        $('.styleListScroll ul').slimScroll({
            height: styleHeight,
            alwaysVisible: true,
            railVisible: true,
            size : '3px',
            color: 'rgb(171, 169, 169)',
            allowPageScroll: true,
            wheelStep : 60
        });
        
        $('.styleList').delegate('li', 'click', function() { //console.log('click');
            $('#styleApply').addClass('visible');
        })
        
        $('#headerSlideIcon').click(function(){ 
            $('#headerSlideMenu').animate({'top': '0px'}, 500);
        })
        
        $('#headerSlideClose').click(function(){ 
            $('#headerSlideMenu').animate({'top': '-50px'}, 500);
        })
        
        $('#nextButton a').click(function() {
            $('#nextButton a').hide();
            $('#styleButton').click();
            $('#addCartLink2 a').show();
        })
        
        if ($(document).width() < 768) {
            $(document).mouseup(function (e) {
                var container = $("#leftBox");
                if (container.has(e.target).length === 0){
                    if ($('#leftBox').hasClass('is-visible')) {
                        //container.hide();
                        $('#leftBox').removeClass('is-visible')
                        $('#mobileMainMenu a').removeClass('active');
                        $('#styleApply').removeClass('visible');
                    }
                }
            });
        }
        
        
        
    })
    
    function getDocHeight() {
        var D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
    }
        
    </script>
    
    <script src="js/main.js"></script>
    
    <?php /* <script defer src="https://use.fontawesome.com/releases/v5.0.7/js/all.js"></script> */ ?>
    
    
    

	<title>Custom Suits</title>
	<meta name="description" content="Try our 3d online suit designer, we are a traditional tailoring workshop offering a variety of custom tailored suits, jackets & pants">
	<meta name="keywords" content="custom suits, tweed suits, wool suits, linen suits, italian suits, bespoke suits, suit designer">

</head>

<body oncontextmenu="<?php /* return false */ ?>">

    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NB96F8C"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <?php /* <div style="display: none;"><div id="fabricZoom"><img src="https://www.suitconfig.com/fabricroll.pfs?width=800&height=600&p.tn=designs-124/essential_wool_mid_charcoal.jpg" width="800" height="600" /></div></div> */ ?>

    <div id="currecyInfo" style="display: none;">
        <input type="hidden" id="currRate" value="<?php echo $currency_array['value']; ?>" />
        <input type="hidden" id="currSymbolLeft" value="<?php echo $currency_array['symbol_left']; ?>" />
        <input type="hidden" id="currSymbolRight" value="<?php echo $currency_array['symbol_right']; ?>" />
        <input type="hidden" id="currCode" value="<?php echo $currency_array['code']; ?>" />
    </div>

<form id="cartForm" action="https://www.studiosuits.com/index.php?main_page=customizations&products_id=<?php echo isset($_POST['products_id']) ? $_POST['products_id'] : '4182'; ?>&cart_quantity=1&number_of_uploads=0&action=update_customize_product" method="post">

<div class="row">

    <div id="mobileMainMenu">
            <a href="javascript:void(0)" id="fabricMobile">FABRIC</a>
            <a href="javascript:void(0)" id="stylesMobile">STYLE</a>
            <a href="javascript:void(0)" id="menuButton" data-toggle="is-visible" data-target=".nav-slidein"></a>
    </div>
    
    <div id="mobileBottom" class="row">
        <div id="mobileSuitTitle" class="col-xs-7">
            CUSTOM <b>SUIT</b><br />
            <span id="mobileSuitName"></span>
        </div>
        <div class="col-xs-3">
            <span id="mobileTotalPrice"></span>
        </div>
        <div class="col-xs-2">
            <a href="javascript:void(0)" onclick="addInCart()"><img src="images/icons/mobile-cart-icon.png" /></a>
        </div>
    </div>

    <div id="header">
    
        <div id="headerSlideMenu">
            <a id="headerSlideClose" href="javascript: void(0)"><img src="images/icons/header-close-icon.jpg" /> </a>
            <a id="headerSlideHome" href="https://www.studiosuits.com">HOME</a>
        </div>
    
        <?php /*
        <a id="menuButton" data-toggle="is-visible" data-target=".nav-slidein">
            <span class="icon-bar btn-flyout-trigger"></span>
            <span class="icon-bar btn-flyout-trigger"></span>
            <span class="icon-bar btn-flyout-trigger" style="margin-bottom: 4px;"></span>
            <span style="font-size: 12px;">Menu</span>
        </a>
        */ ?>
    
        <div id="headerLogo">
            
            <a id="headerSlideIcon" href="javascript:void(0)"><img src="images/icons/header-menu-icon.jpg" /></a>
            
            <img id="logoPC" src="images/ss-logo.png" />
            <img id="logoMobile" src="images/logo-mobile.png" />
            
        </div>
    
        <div id="mainMenu" class="headerBox">
            <div class="mainItem back"><a class="active" href="javascript:void(0)" rel="fabricTab">F A B R I C</a></div>
            <div class="mainItemSeparator back"><img src="images/icons/chevron.png" /></div>
            <div class="mainItem back"><a id="styleButton" href="javascript:void(0)" rel="styleTab">S T Y L E</a></div>
            <div class="mainItemSeparator back"><img src="images/icons/chevron.png" /></div>
            <div class="clearBoth"></div>
        </div>
        
        
        <div id="headerLeft">
            
            <div class="mainItem forward"><a id="addCartLink" href="javascript:void(0)" onclick="addInCart();"><?php echo (isset($_POST['reload']) && $_POST['reload'] == '1') ? 'U P D A T E&nbsp;&nbsp;&nbsp;C A R T' : 'A D D&nbsp;&nbsp;&nbsp;T O&nbsp;&nbsp;&nbsp;C A R T'; ?></a></div>  
            
            <div class="mainItem forward" id="currencyDropDown">
                <select id="curr_select" name="currency" onchange="changeCurrency(this.value)" class="form-control">
                    <?php foreach ($all_currencies as $key => $value) { 
                            if ($key == $currency_array['code']) {
                                $selected = ' selected="selected" ';
                            } else {
                                $selected = '';
                            }
                    ?>
                    <option <?php echo $selected; ?> value="<?php echo $key; ?>"><?php echo $key; ?></option>
                    <?php } ?>
                </select>
            </div>          
            
        </div>
        <div class="clearBoth"></div>
        
        <div id="mobileCart"><a href="javascript:void(0)"><img src="images/icons/mobile-cart-icon.jpg" /></a></div>
        <?php /*
        <div class="mainItem forward" id="currencyMobile">
                <select id="curr_select" name="currency" onchange="changeCurrency(this.value)" class="form-control">
                    <?php foreach ($all_currencies as $key => $value) { 
                            if ($key == $currency_array['code']) {
                                $selected = ' selected="selected" ';
                            } else {
                                $selected = '';
                            }
                    ?>
                    <option <?php echo $selected; ?> value="<?php echo $key; ?>"><?php echo $key; ?></option>
                    <?php } ?>
                </select>
            </div>
            */ ?>
        
    </div>
    <div class="clearBoth"></div>

    <div id="fabricMobileBox" class="nav-slideinFabric u-bb">
        <a id="fabricMobileClose" href="javascript:void(0)" onclick="closeFabricMobileBox()"><img src="images/icons/left-arrow.png" /></a>
        
        <div id="fabricMobImageDiv">
            <img onload="doneFabricMobile()" id="fabricMobImage" src="" />
            <?php /*
            <div class="searchIcon" id="fabricMobImageSearch">
                <a id="zoomLinkMob" href="#fabricMobZoomed" class="cboxElement"><img src="images/icons/search-icon-mob.png" /></a>
            </div>
            <div style="display:none;">
                <div id="fabricMobZoomed" class="zoomBox"><img src="" /></div>
            </div>
            */ ?>
            
            <a href="javascript:void(0)" id="descMore" onclick="showMobDesc()"><img src="images/icons/down-arrow-icon.jpg" /></a>
            
            <div id="loadIconFabricMobile" style="display: none;"><img src="js/loading.svg"></div>
            
        </div>        
        
        <div id="fabricMobDesc"></div>
        
        <div id="fabricMobExtra"></div>
        
        <div id="fabricApply"></div>
        
        <a href="javascript:void(0)" id="descMobPlus" onclick="showMobDesc()"><img src="images/icons/down-arrow-icon.jpg" /></a>
        
    </div>

  <div id="fullContainer">
  
    <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
    <div id="leftBox" class="nav-slidein u-bb">
        
    <div class="pull-left">
        
        <div id="fabricTab" class="mainTab" style="display: inline-block;">
            <?php /* <a class="objectTitle" id="suitTitle" rel="fabricsList" href="javascript:void(0)">Fabrics</a> */ ?>
            
            <div class="filterSelect">
                <select id="fabricFilter" class="form-control" onchange="filterFabrics()">
                    <option value="0">Fabric</option>
                </select>
            </div>
            
            <div class="filterSelect">
                <select id="colorFilter" class="form-control" onchange="filterFabrics()">
                    <option value="0">Color</option>
                </select>
            </div>
            
            <div class="filterSelect">
                <select id="designFilter" class="form-control" onchange="filterFabrics()">
                    <option value="0">Design</option>
                </select>
            </div>
            
            <div class="filterSelect">
                <select id="sortFilter" class="form-control" onchange="filterFabrics()">
                    <option value="0">Sort</option>
                    <option value="1">Price: Low to High</option>
                    <option value="2">Price High to Low</option>
                    <option value="3">Newest</option>
                </select>
            </div>
            
            <div class="clearBoth"></div>
            
            <div class="subtabsContainer">

                <ul class="designsList" id="fabricsList"></ul>
                <div class="clearBoth"></div>
            </div>
        </div>
        
        <div id="styleTab" class="mainTab">
            
            <a id="closeStyleButton" onclick="closeStyleBox()" href="javascript:void(0)"><img src="images/icons/left-arrow-black.png" /></a>
            
            <?php /* <div id="styleApply"><a href="javascript:void(0)" onclick="closeStyleBox()">VIEW CHANGES</a></div> */ ?>
            
            <div class="subtabsContainer">
            <div class="subTab">
                <a href="javascript:void(0)" class="subTitle" rel="jacketTitles">Jacket</a>
                <div id="jacketTitles" class="subList">
                    <a class="styleTitle" id="jacketTitle" rel="optionsJacket" href="javascript:void(0)">Style</a>
                    <a class="styleTitle" id="jacketTitle" rel="optionsLapel" href="javascript:void(0)">Lapels</a>
                    <a class="styleTitle" id="jacketTitle" rel="buttonsContainer" href="javascript:void(0)">Buttons</a>
                    <a class="styleTitle" id="jacketTitle" rel="optionsVents" href="javascript:void(0)">Vents</a>
                    <a class="styleTitle" id="jacketTitle" rel="optionsJacketMonogram" href="javascript:void(0)">Jacket monogram</a>
                    <a class="styleTitle" id="jacketTitle" rel="optionsCollarMonogram" href="javascript:void(0)">Collar monogram</a>
                    <a class="styleTitle" id="jacketTitle" rel="optionsCuff" href="javascript:void(0)">Jacket Cuff Buttons</a>
                    <a class="styleTitle" id="jacketTitle" rel="optionsPocket" href="javascript:void(0)">Pocket Accent</a>
                    <a class="styleTitle" id="jacketTitle" rel="liningContainer" href="javascript:void(0)">Jacket Lining</a>
                    <a class="styleTitle" id="jacketTitle" rel="optionsLiningType" href="javascript:void(0)">Jacket Lining Type</a>
                    <a class="styleTitle" id="jacketTitle" rel="optionsWaist" href="javascript:void(0)">Waist Coat</a>
                    <a class="styleTitle" id="jacketTitle" rel="optionsTailorChanges" href="javascript:void(0)">Tailor Changes</a>
                </div>
                    
            </div>
            
            
            
            <div class="subTab">
                <a href="javascript:void(0)" class="subTitle" rel="trousersTitles">Pants</a>
                <div id="trousersTitles" class="subList">
                    <a class="styleTitle" id="jacketTitle" rel="optionsPocketStyle" href="javascript:void(0)">Pocket Style</a>
                    <a class="styleTitle" id="jacketTitle" rel="optionsPleats" href="javascript:void(0)">Pleats</a>
                    <a class="styleTitle" id="jacketTitle" rel="optionsBackPockets" href="javascript:void(0)">Back Pockets</a>
                </div>
            </div>
            
            <div class="subTab">
                <a href="javascript:void(0)" class="subTitle" rel="moreTitles">More</a>
                <div id="moreTitles" class="subList">
                
                    <a class="secondTitle" id="jacketTitle" rel="optionsJacketDetails" href="javascript:void(0)">Jacket Details</a>
                    <div id="optionsJacketDetails" class="subsubList">
                        <a class="styleTitle" id="jacketTitle" rel="workCuffOptions" href="javascript:void(0)">Working Cuff Buttons</a>
                        
                        <a class="styleTitle" id="jacketTitle" rel="holeColorOptions" href="javascript:void(0)">Button Hole Color</a>
                        
                        <a class="styleTitle" id="jacketTitle" rel="stitchOptions" href="javascript:void(0)">Pick Stitch</a>
                        
                        <a class="styleTitle" id="jacketTitle" rel="shouldersOptions" href="javascript:void(0)">Natural Shoulders</a>
                        
                    </div>
                    
                    <a class="secondTitle" id="jacketTitle" rel="optionsPantsDetails" href="javascript:void(0)">Pants Details</a>
                    <div id="optionsPantsDetails" class="subsubList">
                        <a class="styleTitle" id="jacketTitle" rel="panlinOptions" href="javascript:void(0)">Pants Lining</a>
                        
                        <a class="styleTitle" id="jacketTitle" rel="pantsCuffOptions" href="javascript:void(0)">Pants Cuff</a>
                        
                        <a class="styleTitle" id="jacketTitle" rel="susbutOptions" href="javascript:void(0)">Suspender Buttons</a>
                        
                        <a class="styleTitle" id="jacketTitle" rel="sideElastOptions" href="javascript:void(0)">Side Tabs</a>
                        
                    </div>
                </div>
            </div>
            
            </div>
            
                <ul class="styleList" id="optionsJacket"></ul>
                <div class="clearBoth"></div>
                
                <ul class="styleList" id="optionsLapel"></ul>
                <div class="clearBoth"></div>

                <div class="styleList" id="buttonsContainer">
                    <div class="styleListScroll">
                        <ul id="optionsButtons"></ul>
                    </div>
                </div>
                <div class="clearBoth"></div>
                
                <ul class="styleList" id="optionsVents"></ul>
                <div class="clearBoth"></div>
                
                <ul class="styleList" id="optionsCuff"></ul>
                <div class="clearBoth"></div>
                
                <ul class="styleList" id="optionsPocket"></ul>
                <div class="clearBoth"></div>
                
                <div class="styleList" id="liningContainer">
                    <div class="styleListScroll">
                        <ul id="optionsLining"></ul>
                    </div>
                </div>
                <div class="clearBoth"></div>
                
                <ul class="styleList" id="optionsLiningType"></ul>
                <div class="clearBoth"></div>
                
                <ul class="styleList" id="optionsWaist"></ul>
                <div class="clearBoth"></div>
                
                <ul class="styleList" id="optionsTailorChanges"></ul>
                <div class="clearBoth"></div>
                
                <ul class="styleList" id="optionsPocketStyle"></ul>
                <div class="clearBoth"></div>
                
                <ul class="styleList" id="optionsPleats"></ul>
                <div class="clearBoth"></div>
                
                <ul class="styleList" id="optionsBackPockets"></ul>
                <div class="clearBoth"></div>
                
                <ul class="styleList" id="optionsJacketMonogram">
                    <br />
                    <input name="id[TEXT_PREFIX245]" size="25" maxlength="20" value="<?php echo isset($_POST['id'][245]) ? $_POST['id'][245] : ''; ?>" id="attrib-245-0" placeholder="Line 1" type="text" onkeyup="setJacketMonogram()" />
                    <span id="jacketMonogramPriceText"></span>
                    <br /><input name="id[TEXT_PREFIX246]" size="25" maxlength="20" value="<?php echo isset($_POST['id'][246]) ? $_POST['id'][246] : ''; ?>" id="attrib-246-0" placeholder="Line 2" type="text" /> <br />
                </ul>
                <div class="clearBoth"></div>
                
                <ul class="styleList" id="optionsCollarMonogram">
                    <br />
                    <input name="id[TEXT_PREFIX263]" size="25" maxlength="20" value="<?php echo isset($_POST['id'][263]) ? $_POST['id'][263] : ''; ?>" id="attrib-263-0" placeholder="Collar Monogram" type="text" onkeyup="setCollarMonogram()" />
                    <span id="collarMonogramPriceText"></span>
                </ul>
                <div class="clearBoth"></div>
                
                <ul class="styleList" id="workCuffOptions"></ul>
                
                <ul class="styleList" id="holeColorOptions"></ul>
                
                <ul class="styleList" id="stitchOptions"></ul>
                
                <ul class="styleList" id="shouldersOptions"></ul>
                
                <ul class="styleList" id="panlinOptions"></ul>
                
                <ul class="styleList" id="pantsCuffOptions"></ul>
                
                <ul class="styleList" id="susbutOptions"></ul>
                
                <ul class="styleList" id="sideElastOptions"></ul>
                
            <a href="javascript:void(0)" id="closeStyleList">X</a>

        </div>
        
        <div id="rightBox"></div>
        
    </div>
        
    </div>
    </div>
    
    <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12 text-center">
        
        <div id="mainImageBox">
            <?php /* <a href="#showMainImage"> */ ?>
                <img onload="doneImage()" id="mainImage" src="" />
            <?php /* </a> */ ?>
            
            <div id="loadIcon"><img src="js/loading.svg" /></div>
            
            <div style="display: none;">
                <div id="showMainImage">
                    <img id="imageThumb" src="" onload="doneImagePopup()" />
                    <div id="loadIconPopup"><img src="js/loading.svg" /></div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
        <br /><br /><br /><br />
        <div id="suitPrice">
            <span id="title">CUSTOM SUIT</span><br />
            <span id="price"></span>
        </div>
        <br />
        
        <?php /* <div id="addCartBox"><a id="addCartLink" href="javascript:void(0)" onclick="addInCart();"><?php echo (isset($_POST['reload']) && $_POST['reload'] == '1') ? 'UPDATE&nbsp;&nbsp;MY&nbsp;&nbsp;CART <i class="fas fa-arrow-right"></i>' : 'ADD&nbsp;&nbsp;TO&nbsp;&nbsp;MY&nbsp;&nbsp;CART <i class="fas fa-arrow-right"></i>'; ?></a></div> */ ?>
        
        <div id="nextButton">
            <a href="javascript: void(0)">NEXT -></a>
        </div>
        <div id="addCartLink2">
            <a href="javascript:void(0)" onclick="addInCart();"><?php echo (isset($_POST['reload']) && $_POST['reload'] == '1') ? 'UPDATE CART ->' : 'ADD TO MY CART ->'; ?></a>
        </div>
        
        <br />
        <a class="arrowButtons" id="arrowTop" href="javascript:void(0)" onclick="imageUp()"><img src="images/icons/up-arrow-icon.jpg" /></a>
        <a class="arrowButtons" id="arrowBottom" href="javascript:void(0)" onclick="imageDown()"><img src="images/icons/down-arrow-icon.jpg" /></a>
        <br />
        <a class="arrowButtons" id="zoomPlus" href="#showMainImage"><img src="images/icons/zoom-icon.jpg" /></a>
    </div>
    
    <div class="clearfix"></div>
    
    <div id="styleApply"><a href="javascript:void(0)" onclick="closeStyleBox()">VIEW CHANGES</a></div>
    
    
  </div>

</div>
<?php //echo '<pre>'; print_r($_POST); echo '</pre>'; exit(); ?>
<div style="display: none;">

        <input type="hidden" id="sceneName" value="hf_two_button_notch_default.pfs" />
        <input type="hidden" id="jacketDesign" value="" />
        <input type="hidden" id="pantsDesign" value="" />
        <input type="hidden" id="shirtDesign" value="shirt.jpg" />
        <input type="hidden" id="tieDesign" value="" />
        <input type="hidden" id="fabricName" value="" />
        <input type="hidden" id="fabricID" value="" />
        <input type="hidden" id="buttonsStyle" value="" />
        <input type="hidden" id="buttonClick" value="false" />
        <input type="hidden" id="pocketAccent" value="" />
        <input type="hidden" id="pantsCuff" value="" />
        <input type="hidden" id="buttonHoleColor" value="" />

        <input type="hidden" name="products_id" value="<?php echo isset($_POST['products_id']) ? $_POST['products_id'] : '4182'; ?>" />
        
<?php
    $style_attr = '1379';
    if (isset($_POST['id'][201]) && (int)$_POST['id'][201] > 0) {
        $style_attr = $_POST['id'][201];
    }
    if (isset($_GET['fabric']) && (int)$_GET['fabric'] > 0) {
        $style_attr = $_GET['fabric'];
    }
?>
        <input id="fabricAttrID" type="hidden" name="id[201]" value="<?php echo $style_attr; ?>" />
        
        <input id="styleAttrID" type="hidden" name="id[146]" value="<?php echo isset($_POST['id'][146]) ? $_POST['id'][146] : '1119'; ?>" />
        <input id="buttonAttrID" type="hidden" name="id[247]" value="<?php echo isset($_POST['id'][247]) ? $_POST['id'][247] : '4701'; ?>" />
        <input id="lapelAttribID" type="hidden" name="id[198]" value="<?php echo isset($_POST['id'][198]) ? $_POST['id'][198] : '1339'; ?>" />
        <input id="ventsAttribID" type="hidden" name="id[147]" value="<?php echo isset($_POST['id'][147]) ? $_POST['id'][147] : '1092'; ?>" />
        <input id="cuffAttrID" type="hidden" name="id[149]" value="<?php echo isset($_POST['id'][149]) ? $_POST['id'][149] : '1098'; ?>" />
        <input id="pocketAttrID" type="hidden" name="id[151]" value="<?php echo isset($_POST['id'][151]) ? $_POST['id'][151] : ''; ?>" />
        <input id="liningAttrID" type="hidden" name="id[208]" value="<?php echo isset($_POST['id'][208]) ? $_POST['id'][208] : '1722'; ?>" />
        <input id="liningTypeAttrID" type="hidden" name="id[218]" value="<?php echo isset($_POST['id'][218]) ? $_POST['id'][218] : '1936'; ?>" />
        <input id="waistAttrID" type="hidden" name="id[148]" value="<?php echo isset($_POST['id'][148]) ? $_POST['id'][148] : '1095'; ?>" />
        <input id="pocketStyleAttrID" type="hidden" name="id[144]" value="<?php echo isset($_POST['id'][144]) ? $_POST['id'][144] : '1116'; ?>" />
        <input id="pleatsAttrID" type="hidden" name="id[143]" value="<?php echo isset($_POST['id'][143]) ? $_POST['id'][143] : '1078'; ?>" />
        <input id="backPocketsAttrID" type="hidden" name="id[145]" value="<?php echo isset($_POST['id'][145]) ? $_POST['id'][145] : '1061'; ?>" />
        <input id="holecolorAttrID" type="hidden" name="id[250]" value="<?php echo isset($_POST['id'][250]) ? $_POST['id'][250] : '0'; ?>" />
        
        <input style="display: none;" id="stitchAttrID" type="checkbox" name="id[220][1932]" <?php echo $_POST['id']['220_chk1932'] && $_POST['id']['220_chk1932'] == '1932' ? 'checked="checked"' : ''; ?> value="1932" />
        <input style="display: none;" id="shouldersAttrID" type="checkbox" name="id[255][5597]" <?php echo $_POST['id']['255_chk5597'] && $_POST['id']['255_chk5597'] == '5597' ? 'checked="checked"' : ''; ?> value="5597" />
        <input id="tailorChangesAttrID" type="hidden" name="id[224][2274]" value="<?php echo isset($_POST['id']['224_chk2274']) ? $_POST['id']['224_chk2274'] : '2274'; ?>" value="2274" />
        <input style="display: none;" id="panlinAttrID" type="checkbox" name="id[152][1077]" <?php echo $_POST['id']['152_chk1077'] && $_POST['id']['152_chk1077'] == '1077' ? 'checked="checked"' : ''; ?> value="1077" />
        <input style="display: none;" id="susbuttID" type="checkbox" name="id[258][7335]" <?php echo $_POST['id']['258_chk7335'] && $_POST['id']['258_chk7335'] == '7335' ? 'checked="checked"' : ''; ?> value="7335" />
        <input style="display: none;" id="workCuffAttrID" type="checkbox" name="id[150][1103]" <?php echo $_POST['id']['150_chk1103'] && $_POST['id']['150_chk1103'] == '1103' ? 'checked="checked"' : ''; ?> value="1103" />
        <input style="display: none;" id="pantsCuffAttrID" type="checkbox" name="id[252][5484]" <?php echo $_POST['id']['252_chk5484'] && $_POST['id']['252_chk5484'] == '5484' ? 'checked="checked"' : ''; ?> value="5484" />
        
        <input style="display: none;" id="sideElastID" type="checkbox" name="" <?php //echo $_POST['id']['259_chk7336'] && $_POST['id']['259_chk7336'] == '7336' ? 'checked="checked"' : ''; ?> value="" />
        
        <input type="hidden" name="id[269]" value="<?php echo isset($_POST['id'][269]) ? $_POST['id'][269] : '9107'; ?>" />
        <input type="hidden" name="id[224]" value="<?php echo isset($_POST['id'][224]) ? $_POST['id'][224] : '2274'; ?>" />
            
        <input type="hidden" name="cart_quantity" value="1" />
        <input type="hidden" name="gen_products_id" value="<?php echo isset($_POST['products_id']) ? $_POST['products_id'] : '4182'; ?>" />
        <input type="hidden" name="coat_price" id="coatPrice" value="0" />
        <input type="hidden" name="button_price" id="buttonPrice" value="0" />
        
        <input type="hidden" id="fabricPrice" name="fabric_price" value="0" />
        <input type="hidden" id="fabricAttrPrice" name="fabric_attr_price" value="0" />
        
        <input type="hidden" id="stitchPrice" value="0" />
        <input type="hidden" id="shouldersPrice" value="0" />
        <input type="hidden" id="susbutPrice" value="0" />
        <input type="hidden" id="workCuffPrice" value="0" />
        <input type="hidden" id="sideElastPrice" value="0" />
        <input type="hidden" id="sideElast1Price" value="0" />
        <input type="hidden" id="liningTypePrice" value="0" />
        <input type="hidden" id="lapelPrice" value="0" />
        <input type="hidden" id="pocketPrice" value="0" />
        <input type="hidden" id="holePrice" value="0" />
        <input type="hidden" id="panlinPrice" value="0" />
        <input type="hidden" id="pantscuffPrice" value="0" />
        <input type="hidden" id="jacketMonogramPrice" value="0" />
        <input type="hidden" id="collarMonogramPrice" value="0" />
        <input type="hidden" id="liningPrice" value="0" />
        
        <input type="hidden" id="imageLink" name="image_link" value="" />
</div>

</form>

    <input type="hidden" name="zenid" id="zenid" value="<?php echo $_COOKIE['zenid']; ?>" />

<?php
    $reload = 'false';
    if (isset($_POST['reload']) && $_POST['reload'] == '1') {
        $reload = 'true';
    }
    if (isset($_GET['reload']) && $_GET['reload'] == '1') {
        $reload = 'true';
    }
    
?>
    <input type="hidden" id="reload" value="<?php echo $reload; ?>" />

<?php //echo '<pre>'; print_r($all_currencies); echo '</pre>'; //exit(); ?>

<script type="text/javascript">

    var curr_rates = {
    <?php foreach ($all_currencies as $key => $value) { ?>
        <?php echo $key; ?>: <?php echo $value['value']; ?>,
    <?php } ?>
    }
    
    var curr_left = {
    <?php foreach ($all_currencies as $key => $value) { ?>
        <?php if ($key == 'EUR') { ?>
            <?php echo $key; ?>: '<?php echo '&euro;'; ?>',
        <?php } elseif ($key == 'GBP') { ?>
            <?php echo $key; ?>: '<?php echo '&pound;'; ?>',
        <?php } else { ?>
            <?php echo $key; ?>: '<?php echo $value['symbol_left']; ?>',
        <?php } ?>
    <?php } ?>
    }
    
    var curr_right = {
    <?php foreach ($all_currencies as $key => $value) { ?>
        <?php echo $key; ?>: '<?php echo $value['symbol_right']; ?>',
    <?php } ?>
    }
/*
window.onload = function() {
    // Horizontal
    baron({
        root: '.main__clipper',
        scroller: '.main__scroller',
        bar: '.main__bar',
        scrollingCls: '_scrolling',
        draggingCls: '_dragging',
        direction: 'h'
    })

    baron({
        root: '.baron',
        scroller: '.baron__scroller',
        bar: '.baron__bar',
        scrollingCls: '_scrolling',
        draggingCls: '_dragging'
    }).fix({
        elements: '.header__title',
        outside: 'header__title_state_fixed',
        before: 'header__title_position_top',
        after: 'header__title_position_bottom',
        clickable: true
    }).controls({
        // Element to be used as interactive track. Note: it could be different from 'track' param of baron.
        track: '.baron__track',
        forward: '.baron__down',
        backward: '.baron__up'
    })
}
*/  
</script>


</body>
</html>