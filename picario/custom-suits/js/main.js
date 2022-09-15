var buttonLabelsArray = [];

$( document ).ready(function() {
    
    $('#fabricsList').scroll(function(){$(this).resize()})

    showLoad('mainImageBox');
    
    var sceneName = $('#sceneName').val();
    //resetScene(); 
    
    //  get button labels
    buttonLabelsArray = getButtonLabels();
    
    getFabricFilters();
    
    //  get all designs from server
    getDesigns([]);
    
    //  get suits
    getSuits();
    
    getButtonsList();
    
    getLiningList();
    
    getHoleColorList();
    
    getStitchList();
    
    getShouldersList();
    
    getSusbutList();
    
    getWorkbutList();
    
    getSideElastList();
    
    //getSideElast1List();
    
    getPanlinList();
    
    getPantsCuffList();
    
    setJacketMonogram();
    
    setCollarMonogram();
    
    //  get lapels
    setLapels('hf_two_button_');
    
    //  get vents
    setVents('hf_two_button_');
    
    //  get cuff buttons
    setCuff('hf_two_button_');
    
    //  get pocket accent
    getPockets('hf_two_button_');
    
    //  get lining type
    setLiningType('hf_two_button_');
    
    //  get waist coat
    setWaist('hf_two_button_');
    
    setTailorChanges();
    
    //  get waist coat
    setPocketStyle('hf_two_button_');
    
    //  get pleats
    setPleats('hf_two_button_');
    
    //  get pleats
    setBackPockets('hf_two_button_');
    
    //  show main tabs when click to title
    $(".mainItem a").click(function() {
        $(".mainItem a").removeClass('active');
        $(this).addClass('active');
        var slide = false;
        if (!$('#'+$(this).attr('rel')).is(':visible')) {
            slide = true
        }
        $('.mainTab').slideUp();
        if (slide) {
            $('#'+$(this).attr('rel')).slideDown();
        }
    });
    
    //   show sub list
    $(".subTitle").click(function() {
        
        $('#styleTab .subTitle').removeClass('opened');
        
            //  close styles submenu
            $(".styleTitle").removeClass('active');
            $(".styleTitle").removeClass('short');
            $("#styleTitles").removeClass('short');
            $(".subTab").removeClass('short');
            $(".subtabsContainer").removeClass('short');
            //$('.styleList').hide();
            $('.styleList').css('left', '-100%');
            $('#closeStyleList').hide();
        
        var slide = false;
        if (!$('#'+$(this).attr('rel')).is(':visible')) {
            slide = true
        }
        $('.subList').slideUp();
        if (slide) {
            $('#'+$(this).attr('rel')).slideDown();
            $(this).addClass('opened');
        }
        
    });
    
    //  show subtabs
    $(".objectTitle, li.submenu a").click(function() {        
        var slide = false;
        if (!$('#'+$(this).attr('rel')).is(':visible')) {
            slide = true
        }
        $('.optionsList').slideUp();
        if (slide) {
            $('#'+$(this).attr('rel')).slideDown();
        }
    });
    
    var isAnimate = false;
    //  show styles submenu
    $(".styleTitle").click(function() {
        if (!isAnimate) {

                $(".styleTitle").removeClass('active');
                $("#styleTitles").addClass('short');
                $(".styleTitle").addClass('short');
                $(".subTab").addClass('short');
                $(".subtabsContainer").addClass('short');
                $(this).addClass('active');
                //$('.styleList').hide();
                //$('#'+$(this).attr('rel')).show();
                $('.styleList').css('left', '-100%');
                isAnimate = true;
                $('#'+$(this).attr('rel')).animate({"left": '95px'}, 1000, function() {
                    $('#closeStyleList').show();
                    isAnimate = false;
                });
        }
    });
    
    //  close styles submenu
    $("#closeStyleList").click(function() {
        $(".styleTitle").removeClass('active');
        $(".styleTitle").removeClass('short');
        $("#styleTitles").removeClass('short');
        $(".subTab").removeClass('short');
        $(".subtabsContainer").removeClass('short');
        //$('.styleList').hide();
        $('.styleList').css('left', '-100%');
        $('#closeStyleList').hide();
    });
    
    //  show third submenu
    $(".secondTitle").click(function() {
        
        $('.secondTitle').removeClass('opened');
        
        //if (!isAnimate) {
            $(".secondTitle").removeClass('active');
            $("#secondTitles").addClass('short');
            $(".seconditle").addClass('short');
            //$(".subTab").addClass('short');
            $(this).addClass('active');
            var slide = false;
            if (!$('#'+$(this).attr('rel')).is(':visible')) {
                slide = true
            }
            $('.subsubList').slideUp();
            if (slide) {
                $('#'+$(this).attr('rel')).slideDown();
                $(this).addClass('opened');
            }
        //}
    });

    if ($(document).width() > 768) {
        var zoomX = '90%';
    } else {
        var zoomX = '90%';
    }
    $("#zoomPlus").colorbox({
        inline:true,
        width: zoomX,
        height: '3000px',
        onLoad: function() {
            //showLoadPopup('showMainImage');
            $('#imageThumb').attr('src', $('#imageThumb').attr('rel'));
        },
        onOpen: function() {
            $('body').css('overflow-y', 'scroll');
        },
        onClosed: function() {
            $(window).scrollTop(0);
            $('body').css('overflow-y', 'hidden');
        }
    });
    
    //$("#zoomLinkMob").colorbox({
    //    inline:true,
    //    width: '100%'
    //});
    
    //hideLoad('mainImageBox');
    
    if ($('#reload').val() == 'true') { 
        //console.log('restoreAttributes');
        restoreAttributes();
    } else { //alert('click');
        //$('#fabric-130 a').click();
    }
    
    $('#attrib-263-0').onchang
      
});

function changeCurrency(id) {
    
    $.ajax({
      url: 'https://www.studiosuits.com/custom-suits/custom.php?curr='+id+'&id='+$('#zenid').val(),
      type: "POST",
      success: function(data, status) {
        //console.log($data);
      },
      dataType: 'json',
      async: false
    });
    
    $('#reload').val('true');
    $('#currRate').val(curr_rates[id]);
    $('#currSymbolLeft').val(curr_left[id]);
    $('#currSymbolRight').val(curr_right[id]);
    getDesigns([]);
    getButtonsList();
    getLiningList();
    setLiningType();
    getStitchList();
    getShouldersList();
    getSusbutList();
    getWorkbutList();
    getSideElastList();
    //getSideElast1List();
    getPanlinList();
    getPantsCuffList();
    setLapels();
    getPockets();
    setJacketMonogram();
    setCollarMonogram();
    
    restoreAttributes();
}

function resetScene() {
    //$('#mainImage').attr('src', 'http://www.suitconfig.com/'+$('#sceneName').val()+'?width=500&p.tn='+$('#shirtDesign').val());
    $('#mainImage').attr('src', 'https://www.suitconfig.com/'+$('#sceneName').val()+'?width=600&p.tn=');
    //$('#showMainImage img#imageThumb').attr('src', 'https://www.suitconfig.com/'+$('#sceneName').val()+'?width=1200&p.tn=');
    $('#showMainImage img#imageThumb').attr('rel', 'https://www.suitconfig.com/'+$('#sceneName').val()+'?width=1200&p.tn=');
    showLoadPopup('showMainImage');
    $('#jacketDesign').val('');
    $('#pantsDesign').val('');
    //$('#shirtDesign').val('');
    $('#tieDesign').val('');
}

function updatePrice() {
    
    coatPrice = parseFloat($('#coatPrice').val());
    
    if (coatPrice > 0) {
        $('#coatPriceDiv').html(' ' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * $('#coatPrice').val()))) + $('#currSymbolRight').val());
    } else {
        coatPrice = 0;
    }
    if ($('#waistAttrID').val() == '1096') {
        coatPlus = coatPrice;
    } else {
        coatPlus = 0;
    }
    
    buttonPrice = parseFloat($('#buttonPrice').val());
    if (buttonPrice > 0) {
        //$('#coatPriceDiv').html(' $'+coatPrice);
    } else {
        buttonPrice = 0;
    }
    
    fabricPrice = parseFloat($('#fabricPrice').val());
    
    if (fabricPrice > 0) {
        $('#fabricAttrPrice').val(fabricPrice - 190);
    } else {
        fabricPrice = 0;
    }
    
    stitchPrice = parseFloat($('#stitchPrice').val());
    shouldersPrice = parseFloat($('#shouldersPrice').val());
    workCuffPrice = parseFloat($('#workCuffPrice').val());
    sideElastPrice = parseFloat($('#sideElastPrice').val());
    sideElast1Price = parseFloat($('#sideElast1Price').val());
    liningTypePrice = parseFloat($('#liningTypePrice').val());
    lapelPrice = parseFloat($('#lapelPrice').val());
    pocketPrice = parseFloat($('#pocketPrice').val());
    holePrice = parseFloat($('#holePrice').val());
    panlinPrice = parseFloat($('#panlinPrice').val());
    pantscuffPrice = parseFloat($('#pantscuffPrice').val());
    jacketMonogramPrice = parseFloat($('#jacketMonogramPrice').val());
    collarMonogramPrice = parseFloat($('#collarMonogramPrice').val());
    susbutPrice = parseFloat($('#susbutPrice').val());
    liningPrice = parseFloat($('#liningPrice').val());

    var totalPrice = Math.round(parseFloat($('#currRate').val() * (fabricPrice + buttonPrice + coatPlus + stitchPrice + shouldersPrice + workCuffPrice + sideElastPrice + sideElast1Price + liningTypePrice + lapelPrice + pocketPrice + holePrice + panlinPrice + pantscuffPrice + jacketMonogramPrice + collarMonogramPrice + susbutPrice + liningPrice)));
    
    $('#suitPrice #price').html(' ' + $('#currSymbolLeft').val() + totalPrice + $('#currSymbolRight').val());
    $('#mobileTotalPrice').html(' ' + $('#currSymbolLeft').val() + totalPrice + $('#currSymbolRight').val());
    
}

function closeFabricBox() { 
    $('#fabricMobileBox').css('left', '-100vw');
    if ($('#leftBox').hasClass('is-visible')) {
        $("#menuButton").click();
    }
    $('#mobileMainMenu a').removeClass('active');
}

function closeFabricMobileBox() { 
    //$('#fabricMobileBox').css('left', '-100vw');
    $('#fabricMobileBox').animate({left: '-100vw'}, 300);
}

function closeStyleBox() { 
    //$('#fabricMobileBox').css('left', '-100vw');
    if ($('#leftBox').hasClass('is-visible')) {
        $("#menuButton").click();
    }
    $('#mobileMainMenu a').removeClass('active');
    $('#styleApply').removeClass('visible');
}

function showFabric(designName, designID, attrArray, coatPrice, tieId, fabricPrice) {
    
    showFabricMobile('fabricMobImageDiv');
    
        
    $('#fabricMobImage').attr('src', 'https://www.suitconfig.com/fabricroll.pfs?height='+$(window).height()+'&width='+$(window).width()+'&p.tn='+designName+'&p.ta=true&p.tw=600&mode=crop');
    $('#fabricMobDesc').html($('li#fabric-'+designID+' a .fabricInfo').html());
    
    if($("div").is('#descInfo-'+designID)) {
        $('#fabricMobExtra').html($('#descInfo-'+designID).html());
        $('#descMore').show();
    } else {
        $('#fabricMobExtra').html();
        $('#descMore').hide();
    }
        
    $('#fabricApply').html('<a href="javascript:void(0)" onclick="setDesign(\''+designName+'\', \''+designID+'\', [\''+attrArray[0]+'\', \''+attrArray[1]+'\'], \''+coatPrice+'\', \''+tieId+'\', \''+fabricPrice+'\'); closeFabricBox();">APPLY</a>');
    //$('#fabricMobZoomed img').attr('src', 'https://www.suitconfig.com/fabricroll.pfs?width=400&p.tn='+designName+'&p.ta=true&p.tw=325');
    
    $('#fabricMobileBox').css('left', '0px');
    
}

function setDesign(designName, designID, attrArray, coatPrice, tieId, fabricPrice) {
        
    if ($(document).width() < 768) { //console.log('setDesign');
        //$('#loadIconFabricMobile').show();
        showFabricMobile('fabricMobImageDiv');
    }
        
/*
    if ($(document).width() < 768) {
        closeFabricBox();
        if ($('#leftBox').hasClass('is-visible')) {
            $("#menuButton").click();
        }
        $('#mobileMainMenu a').removeClass('active');
    }
*/
        
    if (coatPrice > 0) {
        coatPrice = Math.round(parseFloat(coatPrice * 100)) / 100;
        $('#coatPrice').val(coatPrice);
    }
    if (fabricPrice > 0) {
        fabricPrice = Math.round(parseFloat(fabricPrice * 100)) / 100;
        $('#fabricPrice').val(fabricPrice);
    }
    
    updatePrice();
    
    $('#'+attrArray[0]).val(attrArray[1]);
    
    $('#fabricName').val(designName);
    
    if (designID != '') {
        $('#fabricID').val(designID);
    }
    
    //  get design title
    $.ajax({
      //url: 'https://www.suitconfig.com/xpo/api/v2/designs/'+designID+'?api_key=2d5efe1d41694b0cb792b895bcf1b8a3',
      //type: "GET",
      url: 'https://www.studiosuits.com/custom-suits/picario_request.php?action=get',
      type: "POST",
      dataType: 'json',
      data: { 'url': 'https://www.suitconfig.com/xpo/api/v2/designs/'+designID+'' },
      success: function(data, status) { //console.log(data);
        if (data.name) { //console.log(data.name);
            $('#mobileSuitName').html(data.name);
        }
      }
    })
    
    //console.log($('#reload').val());
    //if ($('#reload').val() != 'true') {
        //console.log('remove setDesign');
        $('#fabricsList li').removeClass('active');
        $('li#fabric-'+$('#fabricID').val()).addClass('active');
    //}

    showLoad('mainImageBox');

    $('#jacketDesign').val(designName);
    $('#pantsDesign').val(designName);

    var jacket = $('#jacketDesign').val();
    var pants = $('#pantsDesign').val();
    var shirt = $('#shirtDesign').val();
    $('#tieDesign').val(tieId);
    var tie = $('#tieDesign').val();
    
    if ($('#holecolorAttrID').val() == 0) {
        $('#buttonHoleColor').val($('#jacketDesign').val());
    }
    
    var holecolor = $('#buttonHoleColor').val();

    if ($('#sceneName').val().indexOf("default") > 0) {
        //shirt = '';
    }
    
    var pocketAccent = '';
    var pocketAccentL = '';
    var pocketAccentS = '';
    if ($('#pocketAccent').val() != '') {
        pocketAccent = 'https://www.suitconfig.com/'+$('#pocketAccent').val()+'?width=600&p.tn='+jacket;
        pocketAccentL = 'https://www.suitconfig.com/'+$('#pocketAccent').val()+'?width=1200&p.tn='+jacket;
        pocketAccentS = 'https://www.suitconfig.com/'+$('#pocketAccent').val()+'?width=50&p.tn='+jacket;
    }
    encodedAccent = $.base64.btoa(pocketAccent);
    encodedAccentL = $.base64.btoa(pocketAccentL);
    encodedAccentS = $.base64.btoa(pocketAccentS);
    //console.log(pocketAccent);
    
    var pantsCuff = '';
    var pantsCuffL = '';
    var pantsCuffS = '';
    if ($('#pantsCuff').val() != '') {
        pantsCuff = 'https://www.suitconfig.com/'+$('#pantsCuff').val()+'?width=600&p.tn='+jacket;
        pantsCuffL = 'https://www.suitconfig.com/'+$('#pantsCuff').val()+'?width=1200&p.tn='+jacket;
        pantsCuffS = 'https://www.suitconfig.com/'+$('#pantsCuff').val()+'?width=50&p.tn='+jacket;
    }
    encodedPantsCuff = $.base64.btoa(pantsCuff);
    encodedPantsCuffL = $.base64.btoa(pantsCuffL);
    encodedPantsCuffS = $.base64.btoa(pantsCuffS);
    //console.log(designID);
    
    //  add pickstitch images if need
    var stitchAccent = '';
    var stitchAccentL = '';
    var stitchAccentS = '';
    if ($('#stitchAttrID').is(":checked")) { 
        if ($('#pocketAccent').val() == 'ticket_pocket.pfs') {
            stitchAccent = 'https://www.suitconfig.com/ticket_pocket_pickstitch.png?width=600&p.tn='+jacket;
            stitchAccentL = 'https://www.suitconfig.com/ticket_pocket_pickstitch.png?width=1200&p.tn='+jacket;
            stitchAccentS = 'https://www.suitconfig.com/ticket_pocket_pickstitch.png?width=50&p.tn='+jacket;
        }
        if ($('#pocketAccent').val() == 'patch_pocket.pfs') {
            stitchAccent = 'https://www.suitconfig.com/patch_pocket_pickstitch.png?width=600&p.tn='+jacket;
            stitchAccentL = 'https://www.suitconfig.com/patch_pocket_pickstitch.png?width=1200&p.tn='+jacket;
            stitchAccentS = 'https://www.suitconfig.com/patch_pocket_pickstitch.png?width=50&p.tn='+jacket;
        }
    }
    //console.log(stitchAccent);
    encodedStitchAccent = $.base64.btoa(stitchAccent);
    encodedStitchAccentL = $.base64.btoa(stitchAccentL);
    encodedStitchAccentS = $.base64.btoa(stitchAccentS);
    
    var pON = getPONvalue(designID);
    var stitchLapel = getStitchLapel();
    var stitchSuit = getStitchSuit();
    
    $('#mainImage').attr('src', 'https://www.suitconfig.com/'+$('#sceneName').val()+'?width=600&p.tn='+jacket+','+pants+','+shirt+','+tie+',' + holecolor + ',' + stitchLapel+','+stitchSuit + pON + ',' + encodedAccent + ',' + encodedPantsCuff + ',' + encodedStitchAccent);
    //$('#showMainImage img#imageThumb').attr('src', 'https://www.suitconfig.com/'+$('#sceneName').val()+'?width=1200&p.tn='+jacket+','+pants+','+shirt+','+tie+','+holecolor + ','+stitchLapel+','+stitchSuit + pON + ',' + encodedAccentL + ',' + encodedPantsCuffL);
    $('#showMainImage img#imageThumb').attr('rel', 'https://www.suitconfig.com/'+$('#sceneName').val()+'?width=1200&p.tn='+jacket+','+pants+','+shirt+','+tie+','+holecolor + ','+stitchLapel+','+stitchSuit + pON + ',' + encodedAccentL + ',' + encodedPantsCuffL + ',' + encodedStitchAccentL);
    showLoadPopup('showMainImage');
    
    $('#imageLink').val('https://www.suitconfig.com/'+$('#sceneName').val()+'?width=50&p.tn='+jacket+','+pants+','+shirt+','+tie+',' + holecolor+','+stitchLapel+','+stitchSuit + pON + ',' + encodedAccentS + ',' + encodedPantsCuffS+ ',' + encodedStitchAccentS);
    
    //$('#loadIconFabricMobile').hide();
    hideFabricMobile('fabricMobImageDiv');
    
    //hideLoad('mainImageBox');
    
}

function getPONvalue(id) { //console.log(id);
    
    var designName = $('#fabricName').val(); 
    
    var pON = '';
    
    buttonStyleNew = $('#buttonsStyle').val();
    
    var buttonCount = 'two_buttons_';
    
        if ($('#sceneName').val().substr(0, 14) == 'hf_one_button_') {
            buttonStyleNew = 'one_button_' + buttonStyleNew;
            buttonCount = 'one_button_';
        }
        if ($('#sceneName').val().substr(0, 14) == 'hf_two_button_') {
            buttonStyleNew = 'two_buttons_' + buttonStyleNew;
            buttonCount = 'two_buttons_';
        }
        if ($('#sceneName').val().substr(0, 16) == 'hf_three_button_') { 
            buttonStyleNew = 'three_buttons_' + buttonStyleNew;
            buttonCount = 'three_buttons_';
        }
        if ($('#sceneName').val().substr(0, 19) == 'hf_double_breasted_') {
            //buttonStyleNew = 'double_breasted_' + buttonStyleNew;
            buttonStyleNew = 'db_' + buttonStyleNew;
            buttonCount = 'db_';
        }
    
    buttonSet = false;
    
    if ($('#buttonsStyle').val() != '') {
    //if ($('#buttonClick').val() == 'false') { //console.log(buttonStyleNew);
        pON = '&p.on='+buttonStyleNew;
        buttonSet = true;
    } else {
        pON = '&p.on=';
    }
    
    if ($('#pocketAccent').val() != '') {
        //pON = pON + '&p.on='+$('#pocketAccent').val();
    }

    if (id > 0) { //console.log(id);
    //  check if need show shoes and buttons
        $.ajax({
          //url: 'https://www.suitconfig.com/xpo/api/v2/designs/'+id+'?api_key=2d5efe1d41694b0cb792b895bcf1b8a3',
          //type: "GET",
          url: 'https://www.studiosuits.com/custom-suits/picario_request.php?action=get',
          type: "POST",
          data: { 'url': 'https://www.suitconfig.com/xpo/api/v2/designs/'+id+'' },
          success: function(data, status) { 
                if (data.labels) {
                    pON = '&p.on=';
                    $.each(data.labels, function(index,value) { 
                        if (value.id == '101') {
                            pON = pON + 'brown_shoes.png,';
                        } else {
                            if (in_array(value.id, buttonLabelsArray)) {
                                if ($('#buttonClick').val() == 'false') {
                                    pON = pON + buttonCount + value.name.toLowerCase().replace(/ /g, '_')+'_button.png,';
                                } else {
                                    pON = pON + buttonCount + $('#buttonsStyle').val();
                                }
                                
                                $.ajax({
                                  //url: 'https://www.suitconfig.com/xpo/api/v2/images/byreference/'+value.name.toLowerCase().replace(/ /g, '_')+'_swatch.png'+'?api_key=2d5efe1d41694b0cb792b895bcf1b8a3',
                                  //type: "GET",
                                  url: 'https://www.studiosuits.com/custom-suits/picario_request.php?action=get',
                                  type: "POST",
                                  data: { 'url': 'https://www.suitconfig.com/xpo/api/v2/images/byreference/'+value.name.toLowerCase().replace(/ /g, '_')+'_swatch.png'+'' },
                                  success: function(data, status) {
                                    var attrID = '';
                                    if (data.properties) {
                                        $.each(data.properties, function(index,property) {
                                            if (property.name == 'SSid') {
                                                attrID = property.value;
                                                if ($('#reload').val() != 'true') {
                                                    if ($('#buttonClick').val() == 'false') {
                                                        setAttr(['buttonAttrID', attrID]);
                                                        
                                                        $('#optionsButtons li').removeClass('active');
                                                        $('#optionsButtons li#buttonId-'+attrID).addClass('active');
                                                    }
                                                }
                                                //console.log('set button: '+attrID);
                                            }
                                        })
                                    }
                                  },
                                  dataType: 'json'
                                });
                                
                                buttonSet = true;
                            }
                        }
                    })
                }
          },
          complete: function(data, status) { 
            $("img.lazyload").lazyload();
            $('#optionsButtons').scroll(function(){
                $('#optionsButtons').resize();
            });
          },
          dataType: 'json',
          async: false
        });
    }

    //  set pick stitch if need
    if ($('#stitchAttrID').is(':checked')) {
        var stitchName = $('#sceneName').val().replace('.pfs', '_pickstitch.png');
        pON += ','+stitchName;
    }
    //console.log('stitch: '+stitchName);

    return pON;
    
}

function getStitchLapel() {
    
    var designName = $('#fabricName').val();
    
    var stitchLapel = designName;
    
    return stitchLapel;
    
}

function getStitchSuit() {
    
    var designName = $('#fabricName').val();
    
    var stitchSuit = designName;
    
    return stitchSuit;
    
}

//function getDesigns(labelIds, filtered = 'false') { 
function getDesigns(labelIds, filtered) {
    
    if ($(document).width() > 768) {
        funcName = 'setDesign';
    } else {
        funcName = 'showFabric';
    }
    
    if (typeof filtered === 'undefined') {
        filtered = 'false';
    }
    
    $("#fabricsList").html('');
    //$("#designsSuit").html('');
    //$("#designsPants").html('');
    //$("#designsShirt").html('');
    //$("#designsTie").html('');
    
    labelIds[labelIds.length] = '225';
    
    var sendArray = [];
    sendArray['skip'] = 0;
    sendArray['labelIds'] = [labelIds];

    //  check sort dropdown
    sortField = "Sort Order";
    sortDirection = 'ASC';
    if ($('#sortFilter').val() == 1) {
        sortField = "Price";
        sortDirection = 'ASC';
    }
    if ($('#sortFilter').val() == 2) {
        sortField = "Price";
        sortDirection = 'DESC';
    }
    if ($('#sortFilter').val() == 3) {
        sortField = "createDate";
        sortDirection = 'DESC';
    }

    $.ajax({
      //url: 'https://www.suitconfig.com/xpo/api/v2/designs/query?api_key=2d5efe1d41694b0cb792b895bcf1b8a3',
      url: 'https://www.studiosuits.com/custom-suits/picario_request.php?action=post',
      type: "POST",
      data: { 'skip': 0, 
              'take': 1000,
              'labelIds': labelIds,
              'queryMultipleLabelsWithAnd': true,
              "sortField": sortField,
              'sortDirection': sortDirection,
              'url': 'https://www.suitconfig.com/xpo/api/v2/designs/query'
      },
      success: function(data, status) {
        
            designsArray = [];
        
            if (data.values) {
                $.each(data.values, function(index,value) {  //console.log(value); return false;
                    var price = '';
                    var attrID = '';
                    var coatPrice = 0;
                    var sort_order = 0;
                    var fabricContent = '';
                    var line2 = '';
                    if (value.properties) {
                        $.each(value.properties, function(index,property) {
                            //console.log(property.name);
                            if (property.name == 'Price') {
                                price = property.value;
                            }
                            if (property.name == 'SSid') {
                                attrID = property.value;
                            }
                            if (property.name == 'Waist Coat Price') {
                                coatPrice = property.value;
                            }
                            if (property.name == 'Sort Order') {
                                sort_order = property.value;
                            }
                            if (property.name == 'Fabric Content' && property.value != null) {
                                fabricContent = property.value;
                            }
                            if (property.name == 'Line 2' && property.value != null) {
                                line2 = property.value;
                            }
                        })
                    }
                    //return false;
                    var tieId = '';
                    if (value.labels) {
                        $.each(value.labels, function(index,labelItem) { 
                            if (labelItem.name.indexOf("Tie") !== -1) {
                                tieId = labelItem.name.toLowerCase();
                                tieId = tieId.toLowerCase().replace(/ /g, '_')+'.jpg';
                            }
                        })
                    }
                            
                    if (sort_order == null) sort_order = 1000;
                    
                    var itemNo = designsArray.length;
                    designsArray[itemNo] = [];
                    designsArray[itemNo]['sort'] = sort_order;
                    designsArray[itemNo]['price'] = price;
                    designsArray[itemNo]['attrID'] = attrID;
                    designsArray[itemNo]['coatPrice'] = coatPrice;
                    designsArray[itemNo]['values'] = value;
                    designsArray[itemNo]['tie'] = tieId;
                    designsArray[itemNo]['fabricContent'] = fabricContent.replace('###', '<br />');
                    if (line2 == null) line2 = '';
                    if (line2 == '') {
                        designsArray[itemNo]['line2'] = line2;
                    } else {
                        designsArray[itemNo]['line2'] = '<br />'+line2.replace('###', '<br />');
                    }
                    
                })
                
                //designsArray.sort(function(a, b) {
                    //return a["sort"] - b["sort"] || a["sort"] - b["sort"];
                //});
                
                var jj = 0;
                
                $.each(designsArray, function(index,value) {
                    
                    jj++;
                
                    var ratedPrice = Math.round(parseFloat($('#currRate').val() * value.price));
                
                    //var descHTML = '<div class="descBox"><span class="fabricName">'+value.values.name+'</span><br><br><span class="fabricPrice">' + $('#currSymbolLeft').val() + ratedPrice + $('#currSymbolRight').val() + '</span>';
                    var descHTML = '<div class="descBox"><span class="fabricName">'+value.values.name+'</span><br><span class="fabricContentText">' + value.fabricContent + value.line2 + '</span>';
                    
                    var mobExtraInfo = '';
                    
                    if (value.values.description != null) {

                            var fabricDescription = value.values.description.replace(/###/g, '<br />');

                            descHTML += '<a href="javascript:void(0)" class="descPlus" onclick="showDesc('+value.values.id+')"><img src="images/icons/down-arrow-icon.jpg" /></a>'+
                                        //'<div id="short">'+value.values.description.substring(0, 150)+'...</div>'+
                                        '<div class="descInfo" id="descInfo-'+value.values.id+'">'+fabricDescription+'</div>';
                            mobExtraInfo = '<div class="mobExtraInfo">'+fabricDescription+'</div>';
                    }
                    descHTML += '</div>';
                    
                    //if (jj <= 15 || isAppleDevice()) {
                    if (jj <= 15) {
                        imgSrc = '<img class="lazyload" title="'+value.values.name+'" src="https://www.suitconfig.com/fabricroll.pfs?width=200&p.tn='+value.values.storagePath+'&p.ta=true&p.tw=500" />';
                    } else {
                        imgSrc = '<img class="lazyload" title="'+value.values.name+'" data-original="https://www.suitconfig.com/fabricroll.pfs?width=200&p.tn='+value.values.storagePath+'&p.ta=true&p.tw=500" src="images/icons/lazy-load.gif" />';
                    }

                    $("#fabricsList").append('<li id="fabric-'+value.values.id+'">'+'<a href="javascript:void(0)" onclick="'+funcName+'(\''+value.values.storagePath+'\', '+value.values.id+', [\'fabricAttrID\', \''+value.attrID+'\'], '+value.coatPrice+', \''+value.tie+'\', '+value.price+');">'+
                    //'<img class="lazyload" title="'+value.values.name+'" src="https://www.suitconfig.com/fabricroll.pfs?width=200&p.tn='+value.values.storagePath+'&p.ta=true&p.tw=500" />'+
                    imgSrc +
                    '<div class="fabricInfo">'+
                        '<div class="fabricName">'+value.values.name+'</div>'+
                        '<div class="fabricPrice">' + $('#currSymbolLeft').val() + ratedPrice + $('#currSymbolRight').val() + '</div>' +
                        '<div class="fabricContentText">'+value.fabricContent+'</div>' +
                        //mobExtraInfo +
                    '</div></a>' +
                    '<div class="searchIcon"><a id="zoomLink-'+value.values.id+'" href="#zoomImage-'+value.values.id+'"><img src="images/icons/search-icon.png" /></a></div><div style="display:none;"><div id="zoomImage-'+value.values.id+'" class="zoomBox"><img class="lazyload" data-original="https://www.suitconfig.com/fabricroll.pfs?width=800&p.tn='+value.values.storagePath+'&p.ta=true&p.tw=500" style="background-color: #000000;" />' + descHTML + '</div></div>' +
                    '<div class="tickIcon"><img src="images/icons/tick.png" /></div>' +
                    '</li>');
                    //   onclick="zoomFabric(\''+value.values.storagePath+'\')"
                    
                    if (value.values.description != null) {
                        $("#descLink-"+value.values.id).colorbox({inline:true, width:"500px", height:"400px", opacity:0.5});
                    }
                    
                    $("#zoomLink-"+value.values.id).colorbox({
                        inline:true, 
                        width:"799px", 
                        height:"591px", 
                        opacity:0.5,
                        onComplete: function() {
                            $('.zoomBox').resize();
                        }
                        //  $('.zoomBox').resize();
                    });
                })
                
            }
            
             $("#fabricsList").append('<div class="clearBoth"></div>');
            
            //console.log($('#reload').val()+' - '+filtered);
            if ($('#reload').val() != 'true') {
                if (filtered == 'false') {

                    setDesign('designs-124/essential_wool_mid_charcoal.jpg', 124, ['fabricAttrID', '1383'], 60, 'blue_tie.jpg', 190);
                }
            } else if (filtered == 'false') {

            }

            
      },
      complete: function(data, status) { 
        $("img.lazyload").lazyload();
        $('.subtabsContainer').scroll(function(){
            $('#fabricsList').resize();
        }); 
        
        $('#fabricsList li').removeClass('active');
        $('#fabric-'+$('#fabricID').val()).addClass('active');       
            
      },      
      dataType: 'json'
    });
    
    //setDesign('designs-124/essential_wool_mid_charcoal.jpg', 124, ['fabricAttrID', '922'], '');
    
    
}

function showDesc(id) {
    if ($('#descInfo-'+id).is(':hidden')) {
        $('#zoomImage-'+id+' .descBox .descPlus').html('<img src="images/icons/up-arrow-icon.jpg" />');
        $('#descInfo-'+id).show();
    } else {
        $('#zoomImage-'+id+' .descBox .descPlus').html('<img src="images/icons/down-arrow-icon.jpg" />');
        $('#descInfo-'+id).hide();
    }
}

function showMobDesc(id) {
    if ($('#fabricMobExtra').is(':hidden')) {
        $('#descMobPlus').html('<img src="images/icons/up-arrow-icon.jpg" />');
        $('#fabricMobExtra').show();
        $('#fabricMobDesc').css('bottom', 50+$('#fabricMobExtra').height()+'px');
    } else {
        $('#descMobPlus').html('<img src="images/icons/down-arrow-icon.jpg" />');
        $('#fabricMobExtra').hide();
        $('#fabricMobDesc').css('bottom', '43px');
    }
    /*if ($('#fabricMobExtra').is(':hidden')) {
        $('#descMore').html('<i class="fas fa-arrow-up"></i>');
        $('#fabricMobExtra').fadeOut(1000);
    } else {
        $('#descMore').html('<i class="fas fa-arrow-down"></i>');
        $('#fabricMobExtra').fadeIn(1000);
    }*/
    //$('#fabricMobExtra').toggleClass('expanded');
}

function zoomFabric(storagePath) { 
    
    $('#fabricZoom img').attr('src', '');
    $('#fabricZoom img').attr('src', 'https://www.suitconfig.com/fabricroll.pfs?width=800&height=600&p.tn='+storagePath);
}

function getButtonsList() { 
    
    $("#optionsButtons").html('');
    
    $.ajax({
      //url: 'https://www.suitconfig.com/xpo/api/v2/images/query?api_key=2d5efe1d41694b0cb792b895bcf1b8a3',
      url: 'https://www.studiosuits.com/custom-suits/picario_request.php?action=post',
      type: "POST",
      data: { 'skip': 0, 
              'labelIds': 108,
              'url': 'https://www.suitconfig.com/xpo/api/v2/images/query'
      },
      success: function(data, status){ 
        
            buttonsArray = [];
        
            if (data.values) {
                
                $.each(data.values, function(index,value) {
                    //console.log(value.name);

                    var inStock = 'false';
                    var attrID = '';
                    var price = '';
                    var priceText = '';
                    var sort_order = '';
                    
                    $.each(value.labels, function(index, label) {
                        if (label.id == 227) {
                            inStock = 'true';
                            
                            if (value.properties) {
                                $.each(value.properties, function(index,property) {
                                    //console.log(property.name);
                                    if (property.name == 'SSid') {
                                        attrID = property.value;
                                    }
                                    if (property.name == 'Price') {
                                        price = property.value;
                                    }
                                    if (property.name == 'Sort Order') { //console.log(property.value);
                                        sort_order = property.value;
                                    }
                                })
                            }
                            
                        } else {
                            inStock = 'false';
                        }
                    })
                    
                    //console.log(inStock);
                    if (inStock == 'true') {
                        
                        if (sort_order == null) sort_order = 1000;
                        
                        if (price == null) price = '';
                        
                        var itemNo = buttonsArray.length;
                        buttonsArray[itemNo] = [];
                        buttonsArray[itemNo]['sort'] = sort_order;
                        buttonsArray[itemNo]['price'] = price;
                        buttonsArray[itemNo]['name'] = value.name;
                        buttonsArray[itemNo]['storagePath'] = value.storagePath;
                        buttonsArray[itemNo]['attrID'] = attrID;
                        buttonsArray[itemNo]['referenceId'] = value.referenceId;
                    }
                    
                })
                
                
                buttonsArray.sort(function(a, b) {
                    return a["sort"] - b["sort"] || a["sort"] - b["sort"];
                });
                
                var jj = 0;
                
                $.each(buttonsArray, function(index,value) { //console.log(value);
                    
                    jj++;
                
                    if (value.price != '') {
                        priceText =  $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * value.price))) + $('#currSymbolRight').val();
                    }
                            
                    if (jj <= 15 || isAppleDevice()) {
                        buttonImage = '<img class="lazyload" title="'+value.name+'" src="https://www.suitconfig.com/'+value.storagePath+'?1=1&width=90&height=90&mode=crop" />';
                    } else {
                        //buttonImage = '<img class="lazyload" title="'+value.name+'" data-src="https://www.suitconfig.com/'+value.storagePath+'?1=1&width=90&height=90&mode=crop" src="images/icons/lazy-load-button.jpg" />';
                        buttonImage = '<img class="lazyload" title="'+value.name+'" data-original="https://www.suitconfig.com/'+value.storagePath+'?1=1&width=90&height=90&mode=crop" src="images/icons/lazy-load.gif" />';
                    }
                            
                    var buttonHTML = '<li id="buttonId-'+value.attrID+'"><a href="javascript:void(0)" onclick="setButtons(\''+value.referenceId+'\', [\'buttonAttrID\', \''+value.attrID+'\'], ' + value.price + ');">' +
                        buttonImage +
                        '<div class="fabricInfo"><br /><span class="fabricName">'+value.name+'</span>';
                            
                    if (value.price != '') {
                        buttonHTML += '<br /><span class="fabricPrice">'+priceText+'</span></div>'+
                            '</a>';
                    } else {
                        buttonHTML += '<br /><span class="fabricPrice"></span></div>'+
                            '</a>';
                    }
                            
                    buttonHTML += '<div class="tickIcon"><img src="images/icons/tick.png" /></div>';
                            
                    buttonHTML += '</li>';
                            
                    $("#optionsButtons").append(buttonHTML);
                })
                
            }
      },
      dataType: 'json'
    });
    
}

function getLiningList() { 
    
    $("#optionsLining").html('');
    
    $.ajax({
      //url: 'https://www.suitconfig.com/xpo/api/v2/images/query?api_key=2d5efe1d41694b0cb792b895bcf1b8a3',
      url: 'https://www.studiosuits.com/custom-suits/picario_request.php?action=post',
      type: "POST",
      data: { 'skip': 0, 
              'labelIds': 162,
              'url': 'https://www.suitconfig.com/xpo/api/v2/images/query' 
      },
      success: function(data, status){ 
            if (data.values) {
                
                var jj = 0;
                
                $.each(data.values, function(index,value) {
                    
                    jj++;
                    
                    $.each(value.labels, function(index, label) {                        
                        if (label.id == 226) {
                            var attrID = '';
                            var price = '';
                            var priceText = '';
                            if (value.properties) {
                                $.each(value.properties, function(index,property) {
                                    if (property.name == 'SSid') {
                                        attrID = property.value;
                                    }
                                    if (property.name == 'Price') {
                                        price = property.value;
                                    }
                                })
                            }
                            if (price != '') {
                                //priceText = '$'+price;
                                //priceText =  $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * price * 100)) / 100) + $('#currSymbolRight').val();
                                priceText =  $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * price))) + $('#currSymbolRight').val();
                            } else {
                                price = 0;
                            }
                            
                            if (jj <= 15 || isAppleDevice()) {
                                liningImage = '<img class="lazyload" title="'+value.name+'" src="https://www.suitconfig.com/'+value.storageName+'?1=1&width=200&mode=crop" />';
                            } else {
                                //liningImage = '<img class="lazyload" title="'+value.name+'" data-src="https://www.suitconfig.com/'+value.storageName+'?1=1&width=200&mode=crop" src="images/icons/lazy-load-lining.jpg" />';
                                liningImage = '<img class="lazyload" title="'+value.name+'" data-original="https://www.suitconfig.com/'+value.storageName+'?1=1&width=200&mode=crop" src="images/icons/lazy-load.gif" />';
                            }
                            
                            $("#optionsLining").append('<li id="liningID-'+attrID+'"><a href="javascript:void(0)" onclick="setLining([\'liningAttrID\', \''+attrID+'\'], this, ' + price + ');">' +
                            liningImage +
                            '<div class="fabricInfo"><br /><span class="fabricName">'+value.name+'</span><br /><span class="fabricPrice">'+priceText+'</span></div>'+
                            '</a></li>');
                        }
                    })
                })
            }
            
            if ($('#liningAttrID').val() != '') {
                $('#optionsLining li').removeClass('active');
                $('#optionsLining li#liningID-'+$('#liningAttrID').val()).addClass('active');
            }
            
      },
      complete: function(data, status) { 
        $("img.lazyload").lazyload();
        $('#optionsLining').scroll(function(){
            $('#optionsLining').resize();
        });
      },
      dataType: 'json'
    });
    
}

function getHoleColorList() { 
    
    $("#holeColorOptions").html('');
    
    $("#holeColorOptions").append('<li id="holecolorID-0" class="active"><a href="javascript:void(0)" onclick="setHoleColor(\'\', [\'holecolorAttrID\', \'0\'], this);"><img title="Default" src="images/icons/default_holecolor.png" />'+
                            '<div class="fabricInfo"><br /><span class="fabricName">Default</span>'+
                            '</a></li>');
    
    $.ajax({
      //url: 'https://www.suitconfig.com/xpo/api/v2/designs/query?api_key=2d5efe1d41694b0cb792b895bcf1b8a3',
      url: 'https://www.studiosuits.com/custom-suits/picario_request.php?action=post',
      type: "POST",
      data: { 'skip': 0, 
              'labelIds': 362,
              'url': 'https://www.suitconfig.com/xpo/api/v2/designs/query'
      },
      success: function(data, status){ 
            if (data.values) {
                $.each(data.values, function(index,value) { //console.log(value);
                    
                    if (value.properties) {
                        $.each(value.properties, function(index,property) {
                            if (property.name == 'SSid') {
                                attrID = property.value;
                            }
                        })
                    }

                    $("#holeColorOptions").append('<li id="holecolorID-'+attrID+'"><a href="javascript:void(0)" onclick="setHoleColor(\''+value.storagePath+'\', [\'holecolorAttrID\', \''+attrID+'\'], this);"><img title="'+value.name+'" src="https://www.suitconfig.com/'+value.storageName+'?1=1&width=200&mode=crop" />'+
                            '<div class="fabricInfo"><br /><span class="fabricName">'+value.name+'<br />' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 2))) + $('#currSymbolRight').val() + '</span>'+
                            '</a></li>');

                })
            }
            
            if ($('#holecolorAttrID').val() != '') {
                $('#holeColorOptions li').removeClass('active');
                $('#holeColorOptions li#holecolorID-'+$('#holecolorAttrID').val()).addClass('active');
            }
            
      },
      dataType: 'json'
    });
    
}

function getStitchList() {
    
    $('#stitchOptions').html('');
                
    $('#stitchOptions').append('<li class="stitchOption active" id="stitchID-0"><a href="javascript:void(0)" onclick="setStitch(0);"><img title="No Stich" src="images/icons/no_pickstitch.jpg" /><br />No Stich</a></li>');
    $('#stitchOptions').append('<li class="stitchOption" id="stitchID-1"><a href="javascript:void(0)" onclick="setStitch(1);"><img title="Pick Stich" src="images/icons/pick_stitch.jpg" /><br />Pick Stich<br />' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 10))) + $('#currSymbolRight').val() + '</a></li>');
    
}

function getWorkbutList() {
    
    $('#workCuffOptions').html('');
                
    $('#workCuffOptions').append('<li class="workCuffOption active" id="workCuffID-0"><a href="javascript:void(0)" onclick="setWorkCuff(0);"><img title="No Working Cuff Button" src="images/icons/no-workcuff.jpg" /><br />No Working Cuff Button</a></li>');
    $('#workCuffOptions').append('<li class="workCuffOption" id="workCuffID-1"><a href="javascript:void(0)" onclick="setWorkCuff(1);"><img title="Working Cuff Button" src="images/icons/workcuff.jpg" /><br />Working Cuff Button<br />' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 10))) + $('#currSymbolRight').val() + '</a></li>');
    
}

function getSideElastList() {
    
    $('#sideElastOptions').html('');
                
    $('#sideElastOptions').append('<li class="sideElastOption active" id="sideElastID-0"><a href="javascript:void(0)" onclick="setSideElast(0, 0, 0);"><img width="160" title="None Button" src="images/icons/nones.jpg" /><br />No</a></li>');
    $('#sideElastOptions').append('<li class="sideElastOption" id="sideElastID-7339"><a href="javascript:void(0)" onclick="setSideElast(7339, 262, 12);"><img title="Suspender Button" src="images/icons/sideadjustablebuckle.jpg" /><br />Side Tabs<br />With Loops<br />' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 12))) + $('#currSymbolRight').val() + '</a></li>');
    $('#sideElastOptions').append('<li class="sideElastOption" id="sideElastID-7338"><a href="javascript:void(0)" onclick="setSideElast(7338, 261, 10);"><img title="Suspender Button" src="images/icons/sideadjustablebuckle.jpg" /><br />Side Tabs<br />(No Loops)<br />' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 10))) + $('#currSymbolRight').val() + '</a></li>');
    $('#sideElastOptions').append('<li class="sideElastOption" id="sideElastID-7337"><a href="javascript:void(0)" onclick="setSideElast(7337, 260, 17);"><img title="Suspender Button" src="images/icons/sideelast.jpg" /><br />Side Elasticated Tabs<br />With Loops<br />' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 17))) + $('#currSymbolRight').val() + '</a></li>');
    $('#sideElastOptions').append('<li class="sideElastOption" id="sideElastID-7336"><a href="javascript:void(0)" onclick="setSideElast(7336, 259, 15);"><img title="Suspender Button" src="images/icons/sideelast.jpg" /><br />Side Elasticated Tabs<br />(No Loops)<br />' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 15))) + $('#currSymbolRight').val() + '</a></li>');
    
}
/*
function getSideElast1List() {
    
    $('#sideElast1Options').html('');
                
    $('#sideElast1Options').append('<li class="sideElast1Option active" id="sideElast1ID-0"><a href="javascript:void(0)" onclick="setSideElast1(0);"><img title="None Button" src="images/icons/nones.jpg" /><br />No</a></li>');
    $('#sideElast1Options').append('<li class="sideElast1Option" id="sideElast1ID-1"><a href="javascript:void(0)" onclick="setSideElast1(1);"><img title="Suspender Button" src="images/icons/sideelast.jpg" /><br />Side Elasticated Tabs<br />With Loops<br />' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 17))) + $('#currSymbolRight').val() + '</a></li><div class="clearfix"></div>');
    
}
*/

function getPanlinList() {
    
    $('#panlinOptions').html('');
                
    $('#panlinOptions').append('<li class="panlinOption active" id="panlinID-0"><a href="javascript:void(0)" onclick="setPanlin(0);"><img title="none Lining" src="images/icons/none_panlining.jpg" /><br />No Pants Lining</a></li>');
    
    $('#panlinOptions').append('<li class="panlinOption" id="panlinID-1"><a href="javascript:void(0)" onclick="setPanlin(1);"><img title="Till Knees" src="images/icons/pants_lining.jpg" /><br />Till Knees<br />' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 5))) + $('#currSymbolRight').val() + '</a></li><div class="clearfix"></div>');
    
}

function getPantsCuffList() {
    
    $('#pantsCuffOptions').html('');
                
    $('#pantsCuffOptions').append('<li class="pantsCuffOption active" id="pantsCuffID-0"><a href="javascript:void(0)" onclick="setPantsCuff(0);"><img title="none Pants Cuff" src="images/icons/none_pants_cuff.jpg" /><br />No Cuff</a></li>');
    
    $('#pantsCuffOptions').append('<li class="pantsCuffOption" id="pantsCuffID-1"><a href="javascript:void(0)" onclick="setPantsCuff(1);"><img title="Pants Cuff" src="images/icons/pants_cuff.jpg" /><br />Cuff<br />' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 5))) + $('#currSymbolRight').val() + '</a></li><div class="clearfix"></div>');
    
}

function setJacketMonogram() {
    
    $('#jacketMonogramPriceText').html($('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 10))) + $('#currSymbolRight').val());
    
    if ($('#attrib-245-0').val() == '') {
        $('#jacketMonogramPrice').val(0);
    } else {
        $('#jacketMonogramPrice').val(10);
    }
    
    updatePrice();
    
}

function setCollarMonogram() {
    
    if ($('#attrib-263-0').val().length > 11) {
        $('#attrib-263-0').val($('#attrib-263-0').val().substring(0, 11));
    }
    
    $('#collarMonogramPriceText').html($('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 10))) + $('#currSymbolRight').val());
    
    if ($('#attrib-263-0').val() == '') {
        $('#collarMonogramPrice').val(0);
    } else {
        $('#collarMonogramPrice').val(10);
    }
    
    updatePrice();
    
}


function getShouldersList() {
    
    $('#shouldersOptions').html('');
                
    $('#shouldersOptions').append('<li class="shouldersOption active" id="shouldersID-0"><a href="javascript:void(0)" onclick="setShoulders(0);"><img title="Regular Shoulders" src="images/icons/regular_shoulders.jpg" /><br />Regular Shoulders</a></li>');
    $('#shouldersOptions').append('<li class="shouldersOption" id="shouldersID-1"><a href="javascript:void(0)" onclick="setShoulders(1);"><img title="Natural Shoulders" src="images/icons/natural_shoulders.jpg" /><br />Natural Shoulders<br />' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 20))) + $('#currSymbolRight').val() + '</a></li><div class="clearfix"></div>');
    
}

function getSusbutList() {
    
    $('#susbutOptions').html('');
                
    $('#susbutOptions').append('<li class="susbuttOption active" id="susbuttID-0"><a href="javascript:void(0)" onclick="setSusbutt(0);"><img title="None Button" src="images/icons/nones.jpg" /><br />No</a></li>');
     $('#susbutOptions').append('<li class="susbuttOption" id="susbuttID-1"><a href="javascript:void(0)" onclick="setSusbutt(1);"><img title="Suspender Button" src="images/icons/suspenderbutton.jpg" /><br />Suspender Buttons<br />' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 2))) + $('#currSymbolRight').val() + '</a></li><div class="clearfix"></div>');
    
}

function setButtons(buttonStyle, attrArray, price) { 

    $('#buttonPrice').val(price);
    
    $('#buttonClick').val('true');

    if ($('#reload').val() != 'true') {
        $('#optionsButtons li').removeClass('active');
        //$(element).parent().addClass('active');
        $('#optionsButtons li#buttonId-'+attrArray[1]).addClass('active');
    }

    var buttonStyleNew = buttonStyle.replace('_swatch', '_button');
    //console.log(buttonStyleNew);
    //buttonStyleNew = buttonStyleNew.replace('_default', '');
    //console.log(buttonStyleNew);

    $('#buttonsStyle').val(buttonStyleNew);
    
    setDesign($('#fabricName').val(), '', attrArray, '', $('#tieDesign').val());
    
}

function setHoleColor(holeDesign, attrArray, element) {
    
    $('#'+attrArray[0]).val(attrArray[1]);
    
    $('#holeColorOptions li').removeClass('active');
    $(element).parent().addClass('active');
    
    if (holeDesign == '') {
        holeDesign = $('#jacketDesign').val();
    }
    
    $('#buttonHoleColor').val(holeDesign);
    
    if (attrArray[1] == 0) {
        $('#holePrice').val(0);
    } else {
        $('#holePrice').val(2);
    }
    
    setDesign($('#fabricName').val(), '', attrArray, '', $('#tieDesign').val());
}

function getSuits() { 
    
    $("#optionsJacket").append('<li id="styleID-1118"><a href="javascript:void(0)" onclick="setSuit(\'hf_one_button_notch.pfs\', 1, [\'styleAttrID\', 1118]);"><img title="One Button" src="images/icons/one-button-icon.jpg" /><br />One Button</a><div class="tickIcon"><img src="images/icons/tick.png" /></div></li>');
    $("#optionsJacket").append('<li class="active" id="styleID-1119"><a href="javascript:void(0)" onclick="setSuit(\'hf_two_button_notch_default.pfs\', 1, [\'styleAttrID\', 1119]);"><img title="Two Buttons" src="images/icons/two-buttons-icon.jpg" /><br />Two Buttons</a><div class="tickIcon"><img src="images/icons/tick.png" /></div></li>');
    $("#optionsJacket").append('<li id="styleID-1120"><a href="javascript:void(0)" onclick="setSuit(\'hf_three_button_notch.pfs\', 1, [\'styleAttrID\', 1120]);"><img title="Three Buttons" src="images/icons/three-buttons-icon.jpg" /><br />Three Buttons</a><div class="tickIcon"><img src="images/icons/tick.png" /></div></li>');
    $("#optionsJacket").append('<li id="styleID-1122"><a href="javascript:void(0)" onclick="setSuit(\'hf_double_breasted_notch.pfs\', 1, [\'styleAttrID\', 1122]);"><img title="Double Breasted" src="images/icons/double-breasted-icon.jpg" /><br />Double Breasted</a><div class="tickIcon"><img src="images/icons/tick.png" /></div></li>');
 
}

function setSuit(designName, objectId, attrArray) { //console.log(designName);
    
    $('#'+attrArray[0]).val(attrArray[1]);
    
    if (attrArray[0] == 'styleAttrID') {
        $('#optionsJacket li').removeClass('active');
        $('#optionsJacket li#styleID-'+attrArray[1]).addClass('active');
    }
    
    if (attrArray[0] == 'lapelAttribID') {
        
        if (attrArray[1] == 1974 || attrArray[1] == 1340) {
            $('#lapelPrice').val(10);
        } else {
            $('#lapelPrice').val(0);
        }
        
        $('#optionsLapel li').removeClass('active');
        $('#optionsLapel li#lapelID-'+attrArray[1]).addClass('active');
        
        updatePrice();
    }
    
    showLoad('mainImageBox');

    $('#sceneName').val(designName);
    
    var jacket = $('#jacketDesign').val();
    var pants = $('#pantsDesign').val();
    var shirt = $('#shirtDesign').val();
    var tie = $('#tieDesign').val();
    
    var pON = getPONvalue($('#fabricID').val());
    var stitchLapel = getStitchLapel();
    var stitchSuit = getStitchSuit();
    
    if ($('#holecolorAttrID').val() == 0) {
        $('#buttonHoleColor').val($('#jacketDesign').val());
    }
    
    var holecolor = $('#buttonHoleColor').val();
    
    var pocketAccent = '';
    if ($('#pocketAccent').val() != '') {
        pocketAccent = 'https://www.suitconfig.com/'+$('#pocketAccent').val()+'?width=600&p.tn='+jacket;
    }
    encodedAccent = $.base64.btoa(pocketAccent);
    
    $('#mainImage').attr('src', 'https://www.suitconfig.com/'+$('#sceneName').val()+'?width=600&p.tn='+jacket+','+pants+','+shirt+','+tie+','+holecolor+','+stitchLapel+','+stitchSuit + pON + ',' + encodedAccent);
   // $('#showMainImage img#imageThumb').attr('src', 'https://www.suitconfig.com/'+$('#sceneName').val()+'?width=1200&p.tn='+jacket+','+pants+','+shirt+','+tie+','+holecolor+','+stitchLapel+','+stitchSuit + pON + ',' + encodedAccent);
    $('#showMainImage img#imageThumb').attr('rel', 'https://www.suitconfig.com/'+$('#sceneName').val()+'?width=1200&p.tn='+jacket+','+pants+','+shirt+','+tie+','+holecolor+','+stitchLapel+','+stitchSuit + pON + ',' + encodedAccent);
    showLoadPopup('showMainImage');
    
    if (designName == 'hf_one_button_notch.pfs') {
        setLapels('hf_one_button_');
    }
    if (designName == 'hf_two_button_notch_default.pfs') {
        setLapels('hf_two_button_');
    }
    if (designName == 'hf_three_button_notch.pfs') {
        setLapels('hf_three_button_');
    }
    if (designName == 'hf_double_breasted_notch.pfs') {
        setLapels('hf_double_breasted_');
    }
    
    //hideLoad('mainImageBox');
    
}

function setLapels(style) {
    
    showLoad('mainImageBox');
        
        $("#optionsLapel").html('');
    
    if (style == 'hf_two_button_') { 
        
        $("#optionsLapel").append('<li id="lapelID-1339" class="active"><a href="javascript:void(0)" onclick="setSuit(\''+style+'notch_default.pfs'+'\', 1, [\'lapelAttribID\', 1339]);"><img title="Notch Lapel" src="images/icons/notch-lapel-icon.jpg" /><br />Notch Lapel</a></li>');
        
    } else {
        
        $("#optionsLapel").append('<li id="lapelID-1339" class="active"><a href="javascript:void(0)" onclick="setSuit(\''+style+'notch.pfs'+'\', 1,  [\'lapelAttribID\', 1339]);"><img title="Notch Lapel" src="images/icons/notch-lapel-icon.jpg" /><br />Notch Lapel</a></li>');
        
    }
        $("#optionsLapel").append('<li id="lapelID-1969"><a href="javascript:void(0)" onclick="setSuit(\''+style+'slim_notch.pfs'+'\', 1,  [\'lapelAttribID\', 1969]);"><img title="Slim Notch Lapel" src="images/icons/slim-notch-lapel-icon.jpg" /><br />Slim Notch Lapel</a></li>');
        $("#optionsLapel").append('<li id="lapelID-8101"><a href="javascript:void(0)" onclick="setSuit(\''+style+'wide_notch.pfs'+'\', 1,  [\'lapelAttribID\', 8101]);"><img title="Wide Notch Lapel" src="images/icons/wide-notch-lapel-icon.jpg" /><br />Wide Notch Lapel</a></li>');
        $("#optionsLapel").append('<li id="lapelID-1340"><a href="javascript:void(0)" onclick="setSuit(\''+style+'peak.pfs'+'\', 1,  [\'lapelAttribID\', 1340]);"><img title="Peak Lapel" src="images/icons/peak-lapel-icon.jpg" /><br />Peak Lapel<br />' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 10))) + $('#currSymbolRight').val() + '</a></li>');
        $("#optionsLapel").append('<li id="lapelID-1974"><a href="javascript:void(0)" onclick="setSuit(\''+style+'wide_peak.pfs'+'\', 1,  [\'lapelAttribID\', 1974]);"><img title="Wide Peak Lapel" src="images/icons/wide-peak-lapel-icon.jpg" /><br />Wide Peak Lapel<br />' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 10))) + $('#currSymbolRight').val() + '</a></li>');
    //}
    
    //hideLoad('mainImageBox');
}

function setVents(style) {
    
    showLoad('mainImageBox');
        
        $("#optionsVents").html('');

        $("#optionsVents").append('<li id="ventsID-1092" class="active"><a href="javascript:void(0)" onclick="setAttr([\'ventsAttribID\', 1092]);"><img title="Single Vent" src="images/icons/single-vent-icon.png" /><br />Single Vent</a></li>');
        $("#optionsVents").append('<li id="ventsID-1093"><a href="javascript:void(0)" onclick="setAttr([\'ventsAttribID\', 1093]);"><img title="Double Vents" src="images/icons/double-vents-icon.png" /><br />Double Vents</a></li>');
        $("#optionsVents").append('<li id="ventsID-1094"><a href="javascript:void(0)" onclick="setAttr([\'ventsAttribID\', 1094]);"><img title="No Vents" src="images/icons/no-vents-icon.png" /><br />No Vents</a></li>');

}

function setCuff(style) {
    
    showLoad('mainImageBox');
        
        $("#optionsCuff").html('');

        $("#optionsCuff").append('<li id="cuffID-1097"><a href="javascript:void(0)" onclick="setAttr([\'cuffAttrID\', 1097]);"><img title="One" src="images/icons/one-cuff-icon.png" /><br />One</a></li>');
        $("#optionsCuff").append('<li id="cuffID-1098" class="active"><a href="javascript:void(0)" onclick="setAttr([\'cuffAttrID\', 1098]);"><img title="Two" src="images/icons/two-cuff-icon.png" /><br />Two</a></li>');
        $("#optionsCuff").append('<li id="cuffID-1099"><a href="javascript:void(0)" onclick="setAttr([\'cuffAttrID\', 1099]);"><img title="Three" src="images/icons/three-cuff-icon.png" /><br />Three</a></li>');
        $("#optionsCuff").append('<li id="cuffID-1100"><a href="javascript:void(0)" onclick="setAttr([\'cuffAttrID\', 1100]);"><img title="Four" src="images/icons/four-cuff-icon.png" /><br />Four</a></li>');

}

function getPockets(style) {
    
    showLoad('mainImageBox');
        
        $("#optionsPocket").html('');

        //$("#optionsPocket").append('<li><a href="javascript:void(0)" onclick="setAttr([\'pocketAttrID\', 25]);"><img title="None" src="images/icons/none-pocket-icon.jpg" /><br />None</a></li>');
        //$("#optionsPocket").append('<li><a href="javascript:void(0)" onclick="javascript: setAttr([\'pocketAttrID\', 26]);"><img title="Ticket Pocket" src="images/icons/ticketpock.jpg" /><br />Ticket Pocket</a></li>');
        //$("#optionsPocket").append('<li><a href="javascript:void(0)" onclick="javascript: setAttr([\'pocketAttrID\', 911]);"><img title="Ticket Pocket" src="images/icons/patchpocket.jpg" /><br />Patch Pocket</a></li>');
        $("#optionsPocket").append('<li id="pocketID-1104" class="active"><a href="javascript:void(0)" onclick="setPocket(1104);"><img title="None" src="images/icons/none-pocket-icon.jpg" /><br />None</a></li>');
        $("#optionsPocket").append('<li id="pocketID-1105"><a href="javascript:void(0)" onclick="setPocket(1105);"><img title="Ticket Pocket" src="images/icons/ticketpock.jpg" /><br />Ticket Pocket<br />' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 5))) + $('#currSymbolRight').val() + '</a></li>');
        $("#optionsPocket").append('<li id="pocketID-8571"><a href="javascript:void(0)" onclick="setPocket(8571);"><img title="Patch Pocket" src="images/icons/patchpocket.jpg" /><br />Patch Pocket<br />' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 15))) + $('#currSymbolRight').val() + '</a></li>');

}

function setPocket(id) {
    
    if (id == 1104) { 
        $('#pocketAccent').val(''); 
        $('#pocketPrice').val(0);
    }
    
    if (id == 1105) {  
        $('#pocketAccent').val('ticket_pocket.pfs');
        $('#pocketPrice').val(5);
    }
    
    if (id == 8571) { 
        $('#pocketAccent').val('patch_pocket.pfs'); 
        $('#pocketPrice').val(15);
    }
    
    setDesign($('#fabricName').val(), $('#fabricID').val(), ['pocketAttrID', id], '', $('#tieDesign').val());

    $('#optionsPocket li').removeClass('active');
    $('#optionsPocket li#pocketID-'+id).addClass('active');
    
    //setAttr(['pocketAttrID', id]); 
    
    updatePrice();  
}

function setLiningType() {
    
    showLoad('mainImageBox');
        
        $("#optionsLiningType").html('');

        $("#optionsLiningType").append('<li id="liningTypeID-1936" class="active"><a href="javascript:void(0)" onclick="setAttr([\'liningTypeAttrID\', 1936]);"><img title="Full Lining" src="images/icons/full-lining-icon.jpg" /><br />Full Lining </a></li>');
        $("#optionsLiningType").append('<li id="liningTypeID-1937"><a href="javascript:void(0)" onclick="setAttr([\'liningTypeAttrID\', 1937]);"><img title="Half Lining" src="images/icons/half-lining-icon.jpg" /><br />Half Lining<br />' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 20))) + $('#currSymbolRight').val() + '</a></li>');
        $("#optionsLiningType").append('<li id="liningTypeID-1938"<a href="javascript:void(0)" onclick="setAttr([\'liningTypeAttrID\', 1938]);"><img title="No Lining" src="images/icons/no-lining-icon.jpg" /><br />No Lining<br />' + $('#currSymbolLeft').val() + (Math.round(parseFloat($('#currRate').val() * 20))) + $('#currSymbolRight').val() + '</a></li>');

}

function setTailorChanges() {
    
    showLoad('mainImageBox');
        
        $("#optionsTailorChanges").html('');

        $("#optionsTailorChanges").append('<li id="tailorChangesID-2274" class="active"><a href="javascript:void(0)" onclick="setAttr([\'tailorChangesAttrID\', 2274]);"><img title="Yes - Change if required" src="images/icons/tailor-changes-yes.jpg" /><br />Yes - Change if required</a></li>');
        $("#optionsTailorChanges").append('<li id="tailorChangesID-2275"><a href="javascript:void(0)" onclick="setAttr([\'tailorChangesAttrID\', 2275]);"><img title="No - Contact Me" src="images/icons/tailor-changes-no.jpg" /><br />No - Contact Me</a></li>');

}

function setWaist(style) {
    
    showLoad('mainImageBox');
        
        $("#optionsWaist").html('');

        $("#optionsWaist").append('<li id="waistID-1095" class="active"><a href="javascript:void(0)" onclick="setAttr([\'waistAttrID\', 1095]);"><img title="No Waist Coat" src="images/icons/no-waist-coat-icon.png" /><br />No Waist Coat</a></li>');
        $("#optionsWaist").append('<li id="waistID-1096"><a href="javascript:void(0)" onclick="setAttr([\'waistAttrID\', 1096]);"><img title="Waist Coat" src="images/icons/waist-coat-icon.png" /><br />Waist Coat<div id="coatPriceDiv"></div></a></li>');

}

function setPocketStyle(style) {
    
    showLoad('mainImageBox');
        
        $("#optionsPocketStyle").html('');

        $("#optionsPocketStyle").append('<li id="pockstyleID-1116" class="active"><a href="javascript:void(0)" onclick="setAttr([\'pocketStyleAttrID\', 1116]);"><img title="Cross" src="images/icons/cross-pocket-icon.png" /><br />Cross</a></li>');
        $("#optionsPocketStyle").append('<li id="pockstyleID-1117"><a href="javascript:void(0)" onclick="setAttr([\'pocketStyleAttrID\', 1117]);"><img title="Seam" src="images/icons/seam-pocket-icon.png" /><br />Seam</a></li>');

}

function setPleats(style) {
    
    showLoad('mainImageBox');
        
        $("#optionsPleats").html('');

        $("#optionsPleats").append('<li id="pleatsID-1078" class="active"><a href="javascript:void(0)" onclick="setAttr([\'pleatsAttrID\', 1078]);"><img title="Flat Front" src="images/icons/no-pleats-icon.png" /><br />Flat Front</a></li>');
        $("#optionsPleats").append('<li id="pleatsID-1536"><a href="javascript:void(0)" onclick="setAttr([\'pleatsAttrID\', 1536]);"><img title="Single Pleat" src="images/icons/single-pleat-icon.png" /><br />Single Pleat</a></li>');
        $("#optionsPleats").append('<li id="pleatsID-1079"><a href="javascript:void(0)" onclick="setAttr([\'pleatsAttrID\', 1079]);"><img title="Two Pleats" src="images/icons/two-pleats-icon.png" /><br />Two Pleats</a></li>');

}

function setBackPockets(style) {
    
    showLoad('mainImageBox');
        
        $("#optionsBackPockets").html('');

        $("#optionsBackPockets").append('<li id="backpockID-1061" class="active"><a href="javascript:void(0)" onclick="setAttr([\'backPocketsAttrID\', 1061]);"><img title="2 Welted Pockets" src="images/icons/2-welted-pock-icon.png" /><br />2 Welted Pockets</a></li>');
        $("#optionsBackPockets").append('<li id="backpockID-1062"><a href="javascript:void(0)" onclick="setAttr([\'backPocketsAttrID\', 1062]);"><img title="1 Welted Pocket on Right" src="images/icons/1-welted-pock-icon.png" /><br />1 Welted Pocket on Right</a></li>');
        $("#optionsBackPockets").append('<li id="backpockID-1063"><a href="javascript:void(0)" onclick="setAttr([\'backPocketsAttrID\', 1063]);"><img title="2 Flap Pockets" src="images/icons/2-flap-pock-icon.png" /><br />2 Flap Pockets</a></li>');
        $("#optionsBackPockets").append('<li id="backpockID-1064"><a href="javascript:void(0)" onclick="setAttr([\'backPocketsAttrID\', 1064]);"><img title="1 Flap Pocket On Right" src="images/icons/1-flap-pock-icon.png" /><br />1 Flap Pocket On Right</a></li>');
        $("#optionsBackPockets").append('<li id="backpockID-1065"><a href="javascript:void(0)" onclick="setAttr([\'backPocketsAttrID\', 1065]);"><img title="No Back Pockets" src="images/icons/no-pock-icon.png" /><br />No Back Pockets</a></li>');

}

function getButtonLabels() {
    
    var labelsArray = [];
    
    $.ajax({
      //url: 'https://www.suitconfig.com/xpo/api/v2/labels/designs?api_key=2d5efe1d41694b0cb792b895bcf1b8a3',
      //type: "GET",
      url: 'https://www.studiosuits.com/custom-suits/picario_request.php?action=get',
      type: 'POST',
      data: { 'url': 'https://www.suitconfig.com/xpo/api/v2/labels/designs' },
      success: function(data, status){
                $.each(data, function(index,value) {   
                    if (value.parentId == '103') labelsArray[labelsArray.length] = value.id;
                })
      },
      dataType: 'json',
      async: false
    });
    
    return labelsArray;
    
}

function getFabricFilters() {
    
    var labelsArray = [];
    
    $.ajax({
      //url: 'https://www.suitconfig.com/xpo/api/v2/labels/designs?api_key=2d5efe1d41694b0cb792b895bcf1b8a3',
      //type: "GET",
      url: 'https://www.studiosuits.com/custom-suits/picario_request.php?action=get',
      type: "POST",
      data: { 'url': 'https://www.suitconfig.com/xpo/api/v2/labels/designs' },
      success: function(data, status){
        $.each(data, function(index,value) {   
            if (value.parentId == '195') {
                $("#fabricFilter").append('<option value="'+value.id+'">'+value.name+'</option>');
            }
            if (value.parentId == '197') {
                $("#colorFilter").append('<option value="'+value.id+'">'+value.name+'</option>');
            }
            if (value.parentId == '219') {
                $("#designFilter").append('<option value="'+value.id+'">'+value.name+'</option>');
            }
        })
      },
      dataType: 'json',
      async: false
    });
    
    //  generate new dropdown
    
    
    return labelsArray;
    
}

function filterFabrics() {
    
    var labelIds = [];
    
    if ($('#fabricFilter').val() > 0) {
        labelIds[labelIds.length] = $('#fabricFilter').val();
    }
    if ($('#colorFilter').val() > 0) {
        labelIds[labelIds.length] = $('#colorFilter').val();
    }
    if ($('#designFilter').val() > 0) {
        labelIds[labelIds.length] = $('#designFilter').val();
    }

    getDesigns(labelIds, 'true');
    
}

function showLoad(id) {
    $('#loadIcon').show();
    $('#'+id).css('opacity', '0.3');
}
function hideLoad(id) {
    //setTimeout(function () {
        $('#loadIcon').hide();
        $('#'+id).css('opacity', '1');
    //}, 2000);
}
function doneImage() { hideLoad('mainImageBox'); }

function showLoadPopup(id) { 
    $('#loadIconPopup').show();
    $('#'+id).css('opacity', '0.3');
}
function hideLoadPopup(id) { 
    //setTimeout(function () {
        $('#loadIconPopup').hide();
        $('#'+id).css('opacity', '1');
    //}, 2000);
}
function doneImagePopup() { hideLoadPopup('showMainImage'); }

function showFabricMobile(id) { //console.log('showMobile');
    //$('#loadIconFabricMobile').show();
    $('#loadIconFabricMobile').css('display', 'block');
    $('#'+id).css('opacity', '0.3');
}
function hideFabricMobile(id) { //console.log('hideFabricMobile');
    //setTimeout(function () {
        $('#loadIconFabricMobile').hide();
        $('#'+id).css('opacity', '1');
    //}, 2000);
}
function doneFabricMobile() { hideFabricMobile('fabricMobImageDiv'); }


function imageUp(id) {
    $('#arrowTop').hide();
    $('#arrowBottom').show();
    $('#mainImageBox img#mainImage').animate({'margin-top': "-39vh"});
     
}
function imageDown(id) { 
    $('#arrowTop').show();
    $('#arrowBottom').hide();
    $('#mainImageBox img#mainImage').animate({'margin-top': "-20vh"}); 
}

function in_array(what, where) {
    for(var i=0; i<where.length; i++)
        if(what == where[i])
            return true;
    return false;
}

function addInCart() {
    $('#cartForm').submit();
}

function setLining(attrArray, element, price) { //console.log('setLining');
    
    $('#liningPrice').val(price);
    
    updatePrice();
    
    $('#optionsLining li').removeClass('active');
    $(element).parent().addClass('active');
    
    setAttr(attrArray);
}

function setAttr(attrArray) {
    
    $('#'+attrArray[0]).val(attrArray[1]);
    
    if (attrArray[0] == 'ventsAttribID') {
        $('#optionsVents li').removeClass('active');
        $('#optionsVents li#ventsID-'+attrArray[1]).addClass('active');
    }
    
    if (attrArray[0] == 'cuffAttrID') {
        $('#optionsCuff li').removeClass('active');
        $('#optionsCuff li#cuffID-'+attrArray[1]).addClass('active');
    }
    
    if (attrArray[0] == 'waistAttrID') {
        $('#optionsWaist li').removeClass('active');
        $('#optionsWaist li#waistID-'+attrArray[1]).addClass('active');
        
        //if (attrArray[1] == '28') {
            updatePrice();
        //}
    }
    
    if (attrArray[0] == 'pocketStyleAttrID') {
        $('#optionsPocketStyle li').removeClass('active');
        $('#optionsPocketStyle li#pockstyleID-'+attrArray[1]).addClass('active');
    }
    
    if (attrArray[0] == 'pleatsAttrID') {
        $('#optionsPleats li').removeClass('active');
        $('#optionsPleats li#pleatsID-'+attrArray[1]).addClass('active');
    }
    
    if (attrArray[0] == 'backPocketsAttrID') {
        $('#optionsBackPockets li').removeClass('active');
        $('#optionsBackPockets li#backpockID-'+attrArray[1]).addClass('active');
    }
    
    if (attrArray[0] == 'liningTypeAttrID') {
        if (attrArray[1] == 1937 || attrArray[1] == 1938) {
            $('#liningTypePrice').val(20);
        } else {
            $('#liningTypePrice').val(0);
        }
        
        $('#optionsLiningType li').removeClass('active');
        $('#optionsLiningType li#liningTypeID-'+attrArray[1]).addClass('active');
        
        updatePrice();
    }
    
    if (attrArray[0] == 'tailorChangesAttrID') {
        $('#optionsTailorChanges li').removeClass('active');
        $('#optionsTailorChanges li#tailorChangesID-'+attrArray[1]).addClass('active');
    }

    
}

function setWorkCuff(id) {
    
    $('li.workCuffOption').removeClass('active');
    $('li#workCuffID-'+id).addClass('active');
    
    if (id == 1) {
        $('#workCuffAttrID').prop("checked", true);
        $('#workCuffPrice').val(10);
    } else {
        $('#workCuffAttrID').prop("checked", false);
        $('#workCuffPrice').val(0);
    }
    
    updatePrice();
    //setDesign($('#fabricName').val(), '', '', '', $('#tieDesign').val());
    
}

function setStitch(id) {
    
    $('li.stitchOption').removeClass('active');
    $('li#stitchID-'+id).addClass('active');
    
    if (id == 1) {
        $('#stitchAttrID').prop("checked", true);
        $('#stitchPrice').val(10);
    } else {
        $('#stitchAttrID').prop("checked", false);
        $('#stitchPrice').val(0);
    }
    
    setDesign($('#fabricName').val(), $('#fabricID').val(), '', '', $('#tieDesign').val());
    
}

function setShoulders(id) {
    
    $('li.shouldersOption').removeClass('active');
    $('li#shouldersID-'+id).addClass('active');
    
    if (id == 1) {
        $('#shouldersAttrID').prop("checked", true);
        $('#shouldersPrice').val(20);
    } else {
        $('#shouldersAttrID').prop("checked", false);
        $('#shouldersPrice').val(0);
    }
    
    updatePrice();
    //setDesign($('#fabricName').val(), '', '', '', $('#tieDesign').val());
    
}

function setPantsCuff(id) {
    
    $('li.pantsCuffOption').removeClass('active');
    $('li#pantsCuffID-'+id).addClass('active');
    
    if (id == 1) {
        $('#pantsCuffAttrID').prop("checked", true);
        $('#pantsCuff').val('pant_cuff.pfs');
        $('#pantscuffPrice').val(5);
    } else {
        $('#pantsCuffAttrID').prop("checked", false);
        $('#pantsCuff').val('');
        $('#pantscuffPrice').val(0);
    }
    
    updatePrice();
    
    setDesign($('#fabricName').val(), $('#fabricID').val(), ['pocketAttrID', id], '', $('#tieDesign').val());
    
}

function setPanlin(id) {
    
    $('li.panlinOption').removeClass('active');
    $('li#panlinID-'+id).addClass('active');
    
    if (id == 1) {
        $('#panlinAttrID').prop("checked", true);
        $('#panlinPrice').val(5);
    } else {
        $('#panlinAttrID').prop("checked", false);
        $('#panlinPrice').val(0);
    }
    
    updatePrice();
    
}

function setSlant(id) {
    
    $('li.panlinOption').removeClass('active');
    $('li#panlinID-'+id).addClass('active');
    
    if (id == 1) {
        $('#panlinAttrID').prop("checked", true);
    } else {
        $('#panlinAttrID').prop("checked", false);
    }
    
    //setDesign($('#fabricName').val(), '', '', '', $('#tieDesign').val());
    
}

function setSusbutt(id) {
    
    $('li.susbuttOption').removeClass('active');
    $('li#susbuttID-'+id).addClass('active');
    
    if (id == 1) {
        $('#susbuttID').prop("checked", true);
        $('#susbutPrice').val(2);
    } else {
        $('#susbuttID').prop("checked", false);
        $('#susbutPrice').val(0);
    }
    
    updatePrice();
    
    //setDesign($('#fabricName').val(), '', '', '', $('#tieDesign').val());
    
}

function setSideElast(id, opt_id, price) {
    
    $('li.sideElastOption').removeClass('active');
    $('li#sideElastID-'+id).addClass('active');

    if (id == 0) {
        $('#sideElastID').prop("checked", false);
    } else {
        $('#sideElastID').prop("checked", true);
        $('#sideElastID').attr("name", 'id['+opt_id+']['+id+']');
        $('#sideElastID').val(id);
    }
    $('#sideElastPrice').val(price);
    
    updatePrice();
    
    //setDesign($('#fabricName').val(), '', '', '', $('#tieDesign').val());
    
}

function setSideElast1(id) {
    
    $('li.sideElast1Option').removeClass('active');
    $('li#sideElast1ID-'+id).addClass('active');
    
    if (id == 1) {
        $('#sideElast1ID').prop("checked", true);
        $('#sideElast1Price').val(17);
    } else {
        $('#sideElast1ID').prop("checked", false);
        $('#sideElast1Price').val(0);
    }
    
    updatePrice();
    
    //setDesign($('#fabricName').val(), '', '', '', $('#tieDesign').val());
    
}

function restoreAttributes() {
    
    //  restore suit and lapels
    $('#optionsJacket li').removeClass('active');
    $('#optionsJacket li#styleID-'+$('#styleAttrID').val()).addClass('active');
    
    switch ($('#styleAttrID').val()) {
      case '1118':
        style = 'hf_one_button_';
        //setSuit('hf_one_button_notch.pfs', 1, ['styleAttrID', 5]);
        //setSuit('hf_one_button_notch.pfs', 1, ['lapelAttribID', $('#lapelAttribID').val()]);
      break;
      case '1119':
        style = 'hf_two_button_';
        //setSuit('hf_two_button_notch_default.pfs', 1, ['styleAttrID', 6]);
        //setSuit('hf_two_button_notch_default.pfs', 1, ['lapelAttribID', $('#lapelAttribID').val()]);
      break;
      case '1120':
        style = 'hf_three_button_';
        //setSuit('hf_three_button_notch.pfs', 1, ['styleAttrID', 7]);
        //setSuit('hf_three_button_notch.pfs', 1, ['lapelAttribID', $('#lapelAttribID').val()]);
      break;
      case '1122':
        style = 'hf_double_breasted_';
        //setSuit('hf_double_breasted_notch.pfs', 1, ['styleAttrID', 8]);
        //setSuit('hf_double_breasted_notch.pfs', 1, ['lapelAttribID', $('#lapelAttribID').val()]);
      break;
      default:
        style = 'hf_two_button_';
        //setSuit('hf_two_button_notch_default.pfs', 1, ['styleAttrID', 6]);
        //setSuit('hf_two_button_notch_default.pfs', 1, ['lapelAttribID', $('#lapelAttribID').val()]);
      break;
    }
    
    //$('#optionsLapel li').removeClass('active');
    //$('#optionsLapel li#lapelID-'+$('#lapelAttribID').val()).addClass('active');
    
    switch ($('#lapelAttribID').val()) {
        case '1339':
            if (style == 'hf_two_button_') {
                setSuit(style+'notch_default.pfs', 1, ['lapelAttribID', 1339]);
            } else {
                setSuit(style+'notch.pfs', 1, ['lapelAttribID', 1339]);
            }
        break;
        case '1969':
            setSuit(style+'slim_notch.pfs', 1, ['lapelAttribID', 1969]);
        break;
        case '8101':
            setSuit(style+'wide_notch.pfs', 1, ['lapelAttribID', 8101]);
        break;
        case '1340':
            setSuit(style+'peak.pfs', 1, ['lapelAttribID', 1340]);
        break;
        case '1974':
            setSuit(style+'wide_peak.pfs', 1, ['lapelAttribID', 1974]);
        break;
        default:
            if (style == 'hf_two_button_') {
                setSuit(style+'notch_default.pfs', 1, ['lapelAttribID', 1339]);
            } else {
                setSuit(style+'notch.pfs', 1, ['lapelAttribID', 1339]);
            }
        break;
    }
    //$('#optionsLapel li').removeClass('active');
    //$('#optionsLapel li#lapelID-'+$('#lapelAttribID').val()).addClass('active');
    
    if ($('#pocketAttrID').val() == 1104) { $('#pocketAccent').val(''); }
    if ($('#pocketAttrID').val() == 1105) { $('#pocketAccent').val('ticket_pocket.pfs'); }
    if ($('#pocketAttrID').val() == 8571) { $('#pocketAccent').val('patch_pocket.pfs'); }
    
    var coatPrice = '';
    var price = '';
    
    //  resore design
    //console.log('restore design '+$('#fabricAttrID').val());
    var sendArray = [];
    sendArray['skip'] = 0;
    sendArray['labelIds'] = '225';
    //labelIds[labelIds.length] = '225';
    $.ajax({
      //url: 'https://www.suitconfig.com/xpo/api/v2/designs/query?api_key=2d5efe1d41694b0cb792b895bcf1b8a3',
      url: 'https://www.studiosuits.com/custom-suits/picario_request.php?action=post',
      type: "POST",
      data: { 'skip': 0, 
              'take': 1000,
              //'labelIds': labelIds,
              'queryMultipleLabelsWithAnd': true,
              'url': 'https://www.suitconfig.com/xpo/api/v2/designs/query'
      },
      success: function(data, status){ 
            
            if (data.values) {
                $.each(data.values, function(index,value) { 
                    
                    var needSetDesign = false;
                    
                    //var attrID = '';
                    if (value.properties) { //console.log(value); //return false;
                        $.each(value.properties, function(index,property) { 

                            if (property.name == 'Price') {
                                price = property.value;
                            }
                            if (property.name == 'Waist Coat Price') {
                                coatPrice = property.value;
                            }
                            if (property.name == 'SSid') {
                                //console.log(property.value+' == '+$('#fabricAttrID').val());
                            }
                            if (property.name == 'SSid' && property.value == $('#fabricAttrID').val()) {
                                //console.log(property.value+' == '+$('#fabricAttrID').val());
                                
                                needSetDesign = true;
                                
                                var tieId = '';
                                if (value.labels) {
                                    $.each(value.labels, function(index,labelItem) { 
                                        if (labelItem.name.indexOf("Tie") !== -1) {
                                            tieId = labelItem.name.toLowerCase();
                                            tieId = tieId.toLowerCase().replace(/ /g, '_')+'.jpg';
                                            $('#tieDesign').val(tieId);
                                            //console.log(tieId);
                                        }
                                    })
                                }
                            }
                        })
                    }
                    
                    if (needSetDesign == true) { //console.log('valu '+ value);
                        setDesign(value.storagePath, value.id, ['fabricAttrID', $('#fabricAttrID').val()], coatPrice, $('#tieDesign').val(), price);
                        //console.log('waist: |'+coatPrice+'| - |'.price);
                        $('ul#fabricsList li').removeClass('active');
                        $('ul#fabricsList li#fabric-'+value.id).addClass('active');
                        //console.log('ul#fabricsList li#fabric-'+value.id);
                    }
                })
            }
      },
      complete: function(data, status) {
        
        //  restore buttons
        $.ajax({
          //url: 'https://www.suitconfig.com/xpo/api/v2/images/query?api_key=2d5efe1d41694b0cb792b895bcf1b8a3',
          url: 'https://www.studiosuits.com/custom-suits/picario_request.php?action=post',
          type: "POST",
          data: { 'skip': 0, 
                  'labelIds': 108,
                  'url': 'https://www.suitconfig.com/xpo/api/v2/images/query'
          },
          success: function(data, status){ 
                if (data.values) {
                    $.each(data.values, function(index,value) { 
                        //$.each(value.labels, function(index, label) {
                            //if (label.id == 227) {
                                var attrID = '';
                                if (value.properties) {
                                    $.each(value.properties, function(index,property) {
                                        if (property.name == 'SSid' && property.value == $('#buttonAttrID').val()) {
                                            //console.log('setButtons: '+value.referenceId+' '+property.value);
                                            setButtons(value.referenceId, ['buttonAttrID', property.value]);
                                            $('#optionsButtons li').removeClass('active');
                                            $('#optionsButtons li#buttonId-'+$('#buttonAttrID').val()).addClass('active');
                                        }
                                    })
                                }
                            //}
                        //})
                    })
                }
                
                //$('#reload').val('');
          },
          dataType: 'json'
        });
        
      },
      dataType: 'json'
    });
    
    $('#optionsLapel li').removeClass('active');
    $('#optionsLapel li#lapelID-'+$('#lapelAttribID').val()).addClass('active');

    $('#optionsVents li').removeClass('active');
    $('#optionsVents li#ventsID-'+$('#ventsAttribID').val()).addClass('active');
    
    $('#optionsCuff li').removeClass('active');
    $('#optionsCuff li#cuffID-'+$('#cuffAttrID').val()).addClass('active');
    
    $('#optionsPocket li').removeClass('active');
    $('#optionsPocket li#pocketID-'+$('#pocketAttrID').val()).addClass('active');
    
    $('#optionsWaist li').removeClass('active');
    $('#optionsWaist li#waistID-'+$('#waistAttrID').val()).addClass('active');
    
    $('#optionsPocketStyle li').removeClass('active');
    $('#optionsPocketStyle li#pockstyleID-'+$('#pocketStyleAttrID').val()).addClass('active');
    
    $('#optionsPleats li').removeClass('active');
    $('#optionsPleats li#pleatsID-'+$('#pleatsAttrID').val()).addClass('active');
    
    $('#optionsBackPockets li').removeClass('active');
    $('#optionsBackPockets li#backpockID-'+$('#backPocketsAttrID').val()).addClass('active');
    
    $('#optionsLining li').removeClass('active');
    $('#optionsLining li#liningID-'+$('#liningAttrID').val()).addClass('active');
    
    //console.log('#optionsLiningType li#liningTypeID-'+$('#liningTypeAttrID').val());
    $('#optionsLiningType li').removeClass('active');
    $('#optionsLiningType li#liningTypeID-'+$('#liningTypeAttrID').val()).addClass('active');
    
    if ($('#workCuffAttrID').is(':checked')) {
        $('li.workCuffOption').removeClass('active');
        $('li#workCuffID-1').addClass('active');
    }
    
    if ($('#panlinAttrID').is(':checked')) {
        $('li.panlinOption').removeClass('active');
        $('li#panlinID-1').addClass('active');
    }
    
    if ($('#pantsCuffAttrID').is(':checked')) {
        $('li.pantsCuffOption').removeClass('active');
        $('li#pantsCuffID-1').addClass('active');
    }
    
    if ($('#stitchAttrID').is(':checked')) {
        $('li.stitchOption').removeClass('active');
        $('li#stitchID-1').addClass('active');
    }
    
    if ($('#shouldersAttrID').is(':checked')) {
        $('li.shouldersOption').removeClass('active');
        $('li#shouldersID-1').addClass('active');
    }
    
    if ($('#susbuttID').is(':checked')) {
        $('li.susbuttOption').removeClass('active');
        $('li#susbuttID-1').addClass('active');
    }
    
    if ($('#sideElastID').is(':checked')) {
        $('li.sideElastOption').removeClass('active');
        $('li#sideElastID-1').addClass('active');
    }
    
    if ($('#sideElast1ID').is(':checked')) {
        $('li.sideElast1Option').removeClass('active');
        $('li#sideElast1ID-1').addClass('active');
    }
    
    //$('#reload').delay(5000).val('');
    setTimeout(function () {
        $('#reload').val('');
    }, 5000);

    
}


$(document).ready(function() {
    $("#menuButton").click(function() {
        $(".nav-slidein").toggleClass("is-visible");
        $(".centerColumn").toggleClass("is-visible");
        $("#menuButton").toggleClass('menuOpen');
        
        if (!$(".nav-slidein").hasClass("is-visible")) {
            $('#styleApply').removeClass('visible');
        }
        
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
    
    $('#fabricMobile').click(function() {
        var wasActive = false;
        if ($('#fabricMobile').hasClass('active')) {
            wasActive = true;
        }
        $('.mainTab').hide();
        $('#fabricTab').show();
        $("#menuButton").click();
        if ($('#stylesMobile').hasClass('active')) {
            $("#menuButton").click();
        }      
        $('#mobileMainMenu a').removeClass('active');
        if (!wasActive) {
            $('#fabricMobile').addClass('active');
        }
    });
    $('#stylesMobile').click(function() {
        var wasActive = false;
        if ($('#stylesMobile').hasClass('active')) {
            wasActive = true;
        }
        $('.mainTab').hide();
        $('#styleTab').show();
        $("#menuButton").click();
        if ($('#fabricMobile').hasClass('active')) {
            $("#menuButton").click();
        }      
        $('#mobileMainMenu a').removeClass('active');
        if (!wasActive) {
            $('#stylesMobile').addClass('active');
        }
        if (!$('#styleTab').is('visible')) {
            $('#styleApply').removeClass('visible');
        }
    });
    
    //console.log(currencies.INR);
    
});// End Menu Click function

$(document).ready(function() {
   
});

function isAppleDevice(){
    return (
        (navigator.userAgent.toLowerCase().indexOf("ipad") > -1) ||
        (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) ||
        (navigator.userAgent.toLowerCase().indexOf("ipod") > -1)
    );
}

