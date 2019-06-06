var ready = $(document).ready(function(e){
    function isCnSite(){
        return (window.location.host.indexOf('byton.cn') != -1) 
    };
    $("#login").click(function () {
            $(".form-input").val("");
    });
    /* Realtime global clocks
     ================================================================ */
    setInterval(update, 1000);
    function update() {
        $('#santa-clara span, #los-angeles span, .time.santa-clara, .time.los-angeles')
            .html(moment().tz("America/Los_Angeles").format("HH:mm A"));
        $('#munich span, .time.munich')
            .html(moment().tz("Europe/Berlin").format("HH:mm A"));
        $('#hong-kong span, .time.hong-kong')
            .html(moment().tz("Hongkong").format("HH:mm A"));
        $('#beijing span, #nanjing span, #Shanghai span, .time.beijing, .time.nanjing, .time.shanghai')
            .html(moment().tz("Asia/Shanghai").format("HH:mm A"));
    }

    /* Sliders
     ================================================================ */
    AOS.init();

    $('.center').slick({
        centerMode: true,
        variableWidth: true,
        infinite: false,
        slidesToShow: 1,
        arrows: true,
        dots: true,
        verticalScrolling: true,
        customPaging : function(center, i) {
            var title = $(center.$slides[i]).data('title');
            return '<a class="pager__item '+title+'">  </a>';
        },
        responsive: [
            {
                breakpoint: 830,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    variableWidth: false,
                    speed: 500,
                    fade: true
                }
            }
        ]
    });

    $('#co-creator-slider').slick({
        centerMode: true,
        variableWidth: false,
        infinite: false,
        slidesToShow: 1,
        arrows: true,
        dots: true,
        dotsClass: "slick-dots-2",
        verticalScrolling: true,
        customPaging : function(center, i) {
            return '';
        },
        responsive: [
            {
                breakpoint: 830,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    variableWidth: false,
                    speed: 500,
                    fade: true
                }
            }
        ]
    });

    // feature slider

    // var item_length = $('.feature-slider > div').length - 1;
    $('.feature-slider').slick({
        centerMode: true,
        variableWidth: true,
        infinite: false,
        slidesToShow: 1,
        arrows: true,
        dots: true,
        verticalScrolling: false,
        customPaging : function(feature, i) {
            var title = $(feature.$slides[i]).data('title');
            return '<a class="pager__item '+title+'"></a>';
        },
        responsive: [
            {
                breakpoint: 830,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    variableWidth: false,
                    speed: 500,
                    fade: true
                }
            }
        ]

    });

    $('.feature-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        // update text selected state
        $('.text-pagination li.active').removeClass('active');
        $('.text-pagination li.slide-' + (currentSlide+1)).addClass('active');
        // check whether we focused / unfocused a video
        checkAutoplay();
    });

    $('.text-pagination li[data-slide]').click(function(e) {
        e.preventDefault();
        var slideno = $(this).data('slide');
        $('.text-pagination li.active').removeClass('active');
        $(this).addClass('active');
        $('.feature-slider').slick('slickGoTo', slideno - 1);
    });

    var docWidth = $(window).width();
    var gridWidth = 1200;
    var rightPosition = (docWidth - gridWidth) / 2;

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {

        $('.map-slider-en').bxSlider({
            infiniteLoop: false,
            pager: false,
            hideControlOnEnd: true,
            useCSS: false
        });

        $('.map-slider-cn').bxSlider({
            startSlide: 1,
            infiniteLoop: false,
            pager: false,
            hideControlOnEnd: true,
            useCSS: false
        });
    }

    /* join page */

    if (isCnSite()) {
        $('.join-bxslider-1').prepend('<li><div class="join-banner-bg fmc_img_01"></div></li>');
        $('.join-bxslider-2 li:eq(0)').after('<li><div class="join-banner-bg fmc_img_02"></div></li>');
    }

    $('.join-bxslider-1').bxSlider({
        Controls: true,
        pager: false,
        mode: 'fade',
        auto: true,
        controls: false,
        infiniteLoop: true,
        pause: 4000,
        touchEnabled: false
    });

    $('.join-bxslider-2').bxSlider({
        Controls: true,
        pager: false,
        mode: 'fade',
        auto: true,
        controls: false,
        infiniteLoop: true,
        pause: 6000,
        touchEnabled: false
    });

    $('.join-bxslider-3').bxSlider({
        Controls: true,
        pager: false,
        mode: 'fade',
        auto: true,
        controls: false,
        infiniteLoop: true,
        pause: 8000,
        touchEnabled: false
    });

    $('.join-bxslider-4').bxSlider({
        Controls: true,
        pager: false,
        mode: 'fade',
        auto: true,
        controls: false,
        infiniteLoop: true,
        pause: 10000,
        touchEnabled: false
    });
    /* end join page */

    /* Byton Place slider */
    $('.byton-place-slider').slick({
        centerMode: true,
        variableWidth: false,
        infinite: true,
        arrows: true,
        dots: true,
        verticalScrolling: false,
        centerPadding: 0
    });


    setTimeout(AOS.refreshHard, 150);

   /* Upload File
     ================================================================ */
    const inputs = document.querySelectorAll('.inputfile');

    $('input#resume-file').change(function(){
        $(".resume-file-name").text(this.files[0].name);
    });

    $('input#cover-letter-file').change(function(){
        $(".cover-file-name").text(this.files[0].name);
    });

    window.addeventasync = function(){
        addeventatc.settings({
            appleical  : {show:true, text:"Apple Calendar"},
            google     : {show:false, text:"Google <em>(online)</em>"},
            outlook    : {show:false, text:"Outlook"},
            outlookcom : {show:false, text:"Outlook.com <em>(online)</em>"},
            yahoo      : {show:false, text:"Yahoo <em>(online)</em>"}
        });
    };

    $(".modal-trigger").click(function () {

        $(".success-text").hide();
        $('.error-text').hide();
        var dataAttr = $(this).data('submodal');
        $('#inquiryModal .sign-up-wrapper').addClass('hidden');
        $('#' + dataAttr).removeClass('hidden');
    });

    $('.switch-inquiry').click(function(e){
        e.preventDefault();
        // debugger;
        var dataAttr = $(this).data('switch');
        $(this).parent().addClass('hidden');
        $('#' + dataAttr).removeClass('hidden');
    });

    setTimeout(function(){
        $('.atcb-link').addClass('foo box');
    }, 2000);


    $('.open-btn').on('click', function(){
        $(this).toggleClass('open');
    });

    // hide wrapper after fade out
    setTimeout(function() {
        $('.white-wrapper').css("display",'none')
    }, 1000);

    /* Concept Page
     ================================================================ */

    var slider_index = $('.index-slider').bxSlider({
        mode: 'fade',
        auto: true,
        speed: 1500,
        infiniteLoop: true,
        hideControlOnEnd: false,
        pause: 10000,
        video: false,
        adaptiveHeight: true,
        touchEnabled: false,
        easing: 'linear',
        pager: true,
        controls: true,
        stopAutoOnClick: true,
        autoStart: true,
        autoHover: true,
        onSliderLoad: function () {
            playTextTransition(true)
        },
        onSlideBefore: function ($slideElement, oldIndex, newIndex) {
            // fix for edge and safari flicker
            $slideElement.css("visibility", "hidden");
            setTimeout(function () {
                $slideElement.css("visibility", "visible");
            }, 100);
            // text transition
            playTextTransition(false)
        }
    });

    var slider_current = 0;
    function playTextTransition(firstLoad){
        $('.index-slider').children('li').each(function (key,li) {
            $(li).children('div').each(function(dKey, div) {
                $(div).children().each(function(eKey, element){
                    var aniIn = $(element).data('in');
                    var aniOut = $(element).data('out');
                    if($( li ).css("z-index") === 50 && !firstLoad){
                        $(element).removeClass(aniOut).addClass(aniOut).removeClass(aniIn)
                    }else{
                        $(element).removeClass(aniIn).addClass(aniIn).removeClass(aniOut)
                    }
                })
            })
        })
    }

    // add share buttons to images
    // var $imageActions = $(
    //     '<div class="gallery-actions">' +
    //         '<a class="share-image-btn round-btn" href="javascript:void(0)"></a>' +
    //     '</div>');
    // var $images = $('.shared-image');
    // $images.append($imageActions);

    // add share and fullscreen buttons to galleries
    var $galleryActions = $('<div class="gallery-actions">');
    $galleryActions.append('<a class="share-image-btn round-btn" href="javascript:void(0)"></a>');
    if(document.fullscreenEnabled) {
        $galleryActions.append(
            '<a class="fullscreen-btn" href="javascript:void(0)"></a>' +
            '<a class="fullscreen-close-btn" href="javascript:void(0)"></a>');
    }

    var $galleries = $('.gallery-container');
    $galleries.append($galleryActions);

    // button listeners
    $(".fullscreen-btn").click(function(evt) {
        var fullScreenElem = evt.target.parentElement.parentElement;
        requestFullscreen(fullScreenElem);
    });
    $(".fullscreen-close-btn").click(function(evt) {
        exitFullscreen();
    });

    $(".share-image-btn").click(function(evt) {
        // in case we're in full screen mode, exit
        exitFullscreen();
        // determine which image was shared
        var element = evt.target.parentElement.parentElement;
        var bxSlider = $(element).find('.image-slider').data("bxSlider");
        var galleryId = $(element).attr("id");
        var galleryIndex = 0;
        if(bxSlider) {
            bxSlider.stopAuto();
            galleryIndex = bxSlider.getCurrentSlide();
        }
        // store image ref and show modal
        $('#image-share').data("image", [galleryId,galleryIndex].join(","));
        $('#image-share').modal('show');
    });

    var slider5 = $('.app-slide').bxSlider({
        mode: 'fade',
        auto: true,
        adaptiveHeight: true,
        speed: 500,
        infiniteLoop: true,
        hideControlOnEnd: true,
        pause: 6000,
        video: false,
        pager: true,
        controls: false,
        stopAutoOnClick: true,
        autoStart: false,
        autoHover: true
    });

   if ( slider5.length > 0 ){
        $(window).scroll(function(){
            if (slider5.isVisible()){
                slider5.startAuto();
            }
        });
    }

    $(".toggle-submenu").on('click', function() {
        $('.mobile-submenu-container').slideToggle(300);
        $('.mobile-submenu-container').toggleClass('submenu-expanded')
    });

    $(".navbar-toggle").on('click', function() {
        if($(".navbar-toggle").hasClass('collapsed')) {
            $('body').addClass('no-scroll');
        }
        else {
            $('body').removeClass('no-scroll');
        }
    });
    $(".sign-up-btn").on('click', function() {
        $('body').removeClass('no-scroll');
    });

    // Smooth Scrolling

    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var $target = $(this.hash);
                $target = $target.length ? $target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if ($target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    scrollToTarget($target);
                }
            }
        });

    if (typeof($('.keep-ar').keepRatio) != "undefined")
        $('.keep-ar').keepRatio({ ratio: 16/9, calculate: 'height' });

    if (typeof($('.keep-wide-ar').keepRatio) != "undefined")
        $('.keep-wide-ar').keepRatio({ ratio: 3/1, calculate: 'height' });

    if (typeof($('.keep-square-ar').keepRatio) != "undefined")
        $('.keep-square-ar').keepRatio({ ratio: 1, calculate: 'height' });

    // init country selector styles
    var $selectCountry = $(".select-country");
    if($selectCountry.chosen) {
        // init form country choosers
        $selectCountry.chosen({
            width: "100%"
        });
        if($selectCountry.css("display") == "none") {
            // show with visibility:hidden to allow use of jquery validate plugin
            $selectCountry.css({display: "initial", visibility: "hidden", position: "absolute"});
        }
    }

    if (typeof($('.checkbox').iCheck) != "undefined") {
        // init checkbox style
        $('.checkbox').iCheck({
            checkboxClass: 'icheckbox_square-grey'
        });
    }
});

$(window).scroll(function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {}
});

$(window).on('beforeunload', function() {
    // $(window).scrollTop(0);
});

/* Move down fullpage button
========================================================= */
//adding the action to the button
$(document).on('click', '.moveDown', function(){
    $.fn.fullpage.moveSectionDown();
});


/*  Go Back Button
========================================================= */

function goBack() {
    window.history.back();
}

/* File Upload
========================================================= */
function uploadFile(){
    var x = document.getElementById("file");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "No file chosen.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                var file = x.files[i];
                if ('name' in file) {
                    txt += file.name + "<br>";
                }
            }
        }
    }
    document.getElementById("fileName").innerHTML = txt;
}



/* Character counter for textarea
 ================================================================ */
/*

/* Rotate See More Button
================================================================= */

$( ".morelink" ).click(function() {
    if (  $( this ).css( "transform" ) == 'none' ){
        $(this).css("transform","rotate(45deg)");
        $(this).css("opacity","1");
        $(this).prev().children().children().css("max-height","1000px");
    } else {
        $(this).css("transform","none");
        $(this).css("transform","" );
        $(this).css("opacity","1");
        $(this).prev().children().children().css("max-height","49px");
    }
});

/* Scroll to Top
==================================================================== */
$("#scroll").click(function() {
    if (screen.width > 768){
        $('html, body').animate({
            scrollTop: $('#to-content').offset().top -84
        }, 'slow');
    }
    else{
        $('html, body').animate({
            scrollTop: $('#to-content').offset().top -34
        }, 'slow');
    }
});

$(".sub-scroll").on('click', function(event) {

    var target = $(this.getAttribute('href'));

    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top -84
        }, 1000);
    }

});

/* Header on scroll
===================================================================== */
$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var halfWindowHeight = $(window).height() / 4;

    if ($(this).scrollTop() > 300) { // this refers to window
        $('.banner').addClass('animate');
    } else {
        $('.banner').removeClass('animate');
    }
});

/* Footer visibility
=================================================================== */
(function() {
    var $window = $(window);
    var $document = $(document);
    var $footer = $('footer');
    $window.scroll(updateFooterVis);
    $window.resize(updateFooterVis);
    updateFooterVis();
    function updateFooterVis() {
        var maxScroll = $document.height() - $window.height();
        if (maxScroll > 500 && $window.scrollTop() < 500 && $window.width() > 768) {
            $footer.css({'display': 'none'});
        } else {
            $footer.css({'display': 'block'});
        }
    }
})();

/* Team Bio
=================================================================== */

$(".member-bio").click(function () {
    $(this).closest('.member-wrapper').find( ".member-bio-content" ).fadeIn( "slow" );
    $('body').css({
        'overflow': 'hidden'
    });
    if ($(window).width() < 920) {
        $(this).closest('.slick-slider').find( ".slick-arrow" ).fadeOut( "slow" );
    }
});

$(".close").click(function () {
    $(this).closest('.member-wrapper').find( ".member-bio-content" ).fadeOut( "slow" );
    if ($(window).width() < 920) {
        $(this).closest('.slick-slider').find( ".slick-arrow" ).fadeIn( "slow" );
    }
});

$(".bio-wrapper .close").click(function(){
    $('body').css({
        'overflow': 'auto'
    });
});

/* Product Menu
 =================================================================== */
(function() {

    var overMenu = false;
    var overTrigger = false;

    $('.products,div.submenu h3').hover(function () {
            $('header').addClass('product-menu-active-lg');
            $('header').removeClass('product-menu-left');
            overTrigger = true;
        },
        function () {
            overTrigger = false;
            checkHideMenu()
        });

    $('div.submenu h3').hover(function () {
            $('header').addClass('product-menu-left');
        });

    $('.product-menu').hover(function () {
            overMenu = true;
        },
        function () {
            overMenu = false;
            checkHideMenu();
        });

    function checkHideMenu() {
        setTimeout(function() {
            if(!overMenu && !overTrigger) {
                $('header').removeClass('product-menu-active-lg');
            }
        }, 500);
    }

    $('.navbar-nav .products').click(function () {
            $('header').addClass('product-menu-active-sm');
        });
    $('.product-menu .products').click(function () {
            $('header').removeClass('product-menu-active-sm');
        });
})();

/* Custom Scrollbar
 =================================================================== */
(function($){
    $(window).on("load",function(){
        if (typeof($(".custom-scroll").mCustomScrollbar) != "undefined"){
            $(".custom-scroll").mCustomScrollbar({
                theme: "inset-dark",
                scrollButtons: {enable:true}
            });
        }
    });
})(jQuery);



$.fn.isVisible = function() {
    // Current distance from the top of the page
    var windowScrollTopView = $(window).scrollTop();

    // Current distance from the top of the page, plus the height of the window
    var windowBottomView = windowScrollTopView + $(window).height();

    // Element distance from top
    var elemTop = $(this).offset().top;

    // Element distance from top, plus the height of the element
    var elemBottom = elemTop + $(this).height();

    return ((elemBottom <= windowBottomView) && (elemTop >= windowScrollTopView));
};

// declare global
var slider_array = new Array();

jQuery(document).ready(function($){

    // launch bxslider
    $('.loc-slider').each(function(i){
        slider_array[i] = $(this).bxSlider({controls:false,  auto: false, pagerCustom: '.bx-pager', mode: 'fade', touchEnabled: false,
            speed: 1000, pause: 10000});
    });


    // bind controls on custom controls, and run functions on every slider
    $('.loc-slider-controls a').bind('click', function(e) {
        e.preventDefault();

        if($(this).hasClass('pull-left')) {
            e.preventDefault();
            $.each(slider_array, function(i,elem){
                elem.goToPrevSlide();
            });

        } else if($(this).hasClass('pull-right')) {
            e.preventDefault();
            $.each(slider_array, function(i,elem){
                elem.goToNextSlide();
            });
        }

    });

});

// helper for detecting if visualiser should show, or a link to appstores.
function isMobile() {
    return ((/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)));
}

function isIE(){
    if(navigator.userAgent.indexOf('MSIE')!==-1 || navigator.appVersion.indexOf('Trident/') > 0){
    /* Microsoft Internet Explorer detected in. */
    return true;
    }
    return false;
}

function isIOS() {
    return navigator.userAgent.match(/ipad|iphone/i);
}

function isVisualiserSupported(){
    // if its not mobile, and its not IE
    return !isMobile() && !isIE()
}

// basic fullscreen API wrapper
document.fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen;
function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
function exitFullscreen() {
    if(!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement && !document.mozFullscreenElement) {
        // not in fullscreen mode
        return;
    }
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

(function() {
     
    $(document).on('fullscreenchange', handleFullscreenChange);
    $(document).on('webkitfullscreenchange', handleFullscreenChange);
    $(document).on('mozfullscreenchange', handleFullscreenChange);
    $(document).on('MSFullscreenChange', handleFullscreenChange);

    function handleFullscreenChange() {
        var fullscreenElem = document.webkitFullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.fullscreenElement;
        if(fullscreenElem) $(fullscreenElem).addClass('fullscreen');
        var $gallery = $('.gallery-container.fullscreen');
        if(!fullscreenElem) $('.fullscreen').removeClass('fullscreen');
        
        // are we dealing with a fullscreen gallery element?
        if(!$gallery.length) return;
    
        if(fullscreenElem) {
            // gallery going fullscreen - force element to honour image aspect ratio
            var aspect = 16 / 9;
            var sw = window.screen.width;
            var sh = window.screen.height;
            $gallery.css('width', Math.min(sw, sh * aspect) + 'px');
            $gallery.css('height', Math.min(sh, sw / aspect) + 'px');
        }
        else {
            // restore original gallery width / height
            $gallery.css("width", "");
            $gallery.css("height", "");
        }
        // redraw sliders
        $('.image-slider').each(function() {
            $(this).data("bxSlider").redrawSlider();
            if($.contains($gallery[0], this)) {
                $(this).data("bxSlider").stopAuto();
            }
        });
    }
})();

function getURLParameter(param) {
    if (!window.location.search) {
        return;
    }
    var m = new RegExp(param + '=([^&]*)').exec(window.location.search.substring(1));
    if (!m) {
        return;
    }
    return decodeURIComponent(m[1]);
}

function scrollToTarget($target) {
    $('html, body').animate({
        scrollTop: $target.offset().top - 100
    }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $($target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
            return false;
        } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
        };
    });
}
$(function () {
/* Video auto play on scroll
 ================================================================ */
var media = $('.autoplay');
var tolerancePixel = 100;
var playing = false;
var players = {};

media.each(function (index, el) {
    if(typeof players[el.id] !== 'undefined') {
        console.error("Video IDs are not unique: ", el.id);
    }
    players[el.id] = false;
    el.player.pause();
});

// safari will only auto play muted videos
var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)
media.find('video').prop('muted', isSafari);

// listen for scroll
$(document).on('scroll', checkAutoplay);
function checkAutoplay() {
    // get vertical centre of viewport
    var yCentre = $(window).height() * 0.5;
    media.each(function (index, el) {
        var rect = el.getBoundingClientRect();
        // is video is hidden in a slider?
        var hiddenInSlider = $('.slick-slide:not(.slick-current) #' + el.id).length === 1;
        // check if video intersects centre of window and is not hidden
        if (!hiddenInSlider && yCentre > rect.top && yCentre < rect.bottom) {
            // play video if not already playing
            if (players[el.id] === false) {
                players[el.id] = true;
                el.player.play();
            }
        } else {
            // stop video if not already stopped
            if (players[el.id] === true) {
                el.player.pause();
                players[el.id] = false;
            }
        }
    });
}
});

function getParam(paramName) {
    paramValue = "", isFound = !1;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = decodeURI(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
}

function bbsBtn(e){
    //得到html
    if (isLogin()) {
        $("#bbsModal").modal("show");
        var videoId = $(e).attr("data-video");
        var commentId = $(e).attr("data-comment");
        var parentId = $(e).attr("data-parent");
        $("#id").attr("value",videoId);
        $("#parent_id").attr("value",parentId);
        $("#comment_id").attr("value",commentId);
        $('.error-text').hide();
    }

}

function commentBtn(e){
    //得到html
    var videoId = $(e).attr("data-video")
    var commentId = $(e).attr("data-comment")
    var parentId = $(e).attr("data-parent")
    $("#id").attr("value",videoId)
    $("#parent_id").attr("value",parentId)
    $("#comment_id").attr("value",commentId)
    $('.error-text').hide();
}

function button2(param){
    var id = getParam(param);
    $(".foo").attr("data-video",id);
    $(".foo").attr("data-comment","");
    $(".foo").attr("data-parent","")

}

function renameForm(e) {
    var storage=window.localStorage;
    $("#old-name").val(storage.name)
    $("#old-name").attr("data-id", storage.id)
}

function session() {
    var storage=window.localStorage;
    if (storage.name!=null && storage.id!=null) {
        $("#login").hide();
        $("#username").text(storage.name).show();
        $("#logout").show();
    } else {
        $("#login").show();
        $("#change-name").hide();
        $("#username").hide();
    }
}

function isLogin() {
    console.log("login()方法被执行啦");
    var storage=window.localStorage;
    if (storage.name!=null && storage.id!=null) {
        $("#login").hide();
        $("#username").text(storage.name).show();
        return true
    } else {
        $("#loginModal").modal("show");
        return false
    }
}

function register() {
    $("#loginModal").modal("hide")
}

function login() {
    $("#registerModal").modal("hide")
}

function clearInput() {
    $("input").val("").focus()
}
/**
 * 初始化layui分页
 */
function initLayPage(type, pageConf) {

    if (!pageConf) {
        pageConf ={};
        pageConf.pageSize = 10;
        pageConf.currentPage = 1;
    }
    var id = getParam("id");
    $.ajax({
        url: 'http://47.103.42.252/get_comment',
        type: 'POST',
        data: {
            id: id,
            page: pageConf.currentPage,
            interval: pageConf.pageSize,
            type: type
        },
        success: function (e) {
            var js = JSON.parse(e);
            var code = js.code;
            var msg = js.message;
            if (code == "0000") {
                var data = js.data;
                layui.use(['laypage', 'layer'], function () {
                    var page = layui.laypage;
                    if (data.total> 10) {
                        page.render({
                            elem: 'layui',
                            count: data.total,
                            curr: pageConf.currentPage,
                            limit: pageConf.pageSize,
                            first: "首页",
                            last: "尾页",
                            layout: ['page'],
                            jump: function (obj, first) {
                                if (!first) {
                                    pageConf.currentPage = obj.curr;
                                    pageConf.pageSize = obj.limit;
                                    initLayPage(type, pageConf);
                                }
                            }
                        });
                    } else {
                        page.render({
                            elem: 'layui',
                            count: data.total,
                            curr: pageConf.currentPage,
                            limit: pageConf.pageSize,
                            first: "首页",
                            last: "尾页",
                            layout: [],
                            jump: function (obj, first) {
                                if (!first) {
                                    pageConf.currentPage = obj.curr;
                                    pageConf.pageSize = obj.limit;
                                    initLayPage(type, pageConf);
                                }
                            }
                        });
                    }
                    getComment(data.comment, id);
                })
            } else {
                $('#comment').html(msg)
            }
        },
        error: function (a ,b ,c) {
            alert(b)
        }
    })
}

function initLayPage2(type, pageConf) {
    if (!pageConf) {
        pageConf ={};
        pageConf.pageSize = 5;
        pageConf.currentPage = 1;
    }
    if (type == 4){
        url = 'http://47.103.42.252/get_videos'
    } else if (type == 5){
        url = 'http://47.103.42.252/get_article'
    }
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            page: pageConf.currentPage,
            interval: pageConf.pageSize,
        },
        success: function (e) {
            var js = JSON.parse(e);
            var code = js.code;
            var msg = js.message;
            if (code == "0000") {
                layui.use(['laypage', 'layer'], function () {
                    var data = js.data;
                    var page = layui.laypage;
                    page.render({
                        elem: 'layui',
                        count: data.total,
                        curr: pageConf.currentPage,
                        limit: pageConf.pageSize,
                        first:"首页",
                        last:"尾页",
                        layout: ['prev', 'page', 'next'],
                        jump: function (obj, first) {
                            if (!first) {
                                pageConf.currentPage = obj.curr;
                                pageConf.pageSize = obj.limit;
                                initLayPage2(type, pageConf);
                            }
                        }
                    });
                    if (type == 4){
                        getVideo(data.comment)
                    } else if (type == 5){
                        getArticle(data.comment);
                    }
                })
            } else {
                $('#comment').html(msg)
            }
        },
        error: function (a ,b ,c) {
            alert(b)
        }
    })
}
//设置cookie
function setCookieObj() {
    var cookieObj={
        'add':function(name, value, hours){ //修改或是添加cookie
            var expire = "";
            if(hours != null){
                expire = new Date((new Date()).getTime() + hours*3600000);
                expire = "; expires=" + expire.toGMTString();
            }
            document.cookie = name + "=" + escape(value) + expire + ";path=/";
            //如果指定域名可以使用如下
            //document.cookie = name + "=" + escape(value) + expire + ";path=/;domain=findme.wang";
        },
        'get':function(c_name){//读取cookie
            if (document.cookie.length>0){
                c_start=document.cookie.indexOf(c_name + "=");
                if (c_start!=-1){
                    c_start=c_start + c_name.length+1;
                    c_end=document.cookie.indexOf(";",c_start);
                    if (c_end==-1){
                        c_end=document.cookie.length
                    }
                    return unescape(document.cookie.substring(c_start,c_end))
                }
            }
            return "";
        }
    };
    window.cookieObj=cookieObj;
}

/*
 * 初始化懒加载
 */

function getLayData(type, gPageSize, i, key,id) {
    //根据页数读取数据
    if (id) {
         var id=id;
    }

    function getData(pagenumber) {
        i++;//页码自动增加，保证下次调用时为新的一页。
        var tp;
        if (type == 1 || type == 4) {
            var url = 'http://47.103.42.252/get_videos';
            tp=0;
        } else if (type == 2) {
            var url = 'http://47.103.42.252/get_article';
            tp=0;
        } else if (type == 3 || type == 5) {
            var url = 'http://47.103.42.252/get_bbs'
        }else if(type ==6){
            var url = 'http://47.103.42.252/get_videos';
            tp=1;
        }else if(type ==7){
            var url = 'http://47.103.42.252/get_article';
            tp=1
        }
        $.ajax({
            url: url,
            type: 'POST',
            traditional: true,
            data: {
                page: pagenumber,
                interval: gPageSize,
                keyword: key,
                id: id,
                type:tp
            },

            success: function (res) {
                var js = JSON.parse(res).data.comment;
                if (pagenumber==1 && js.length==0) {
                    $("#to-content").html('<div class="noContent"><h5 style="font-size: 25px; color: #778899;margin-top:80px">暂无搜索内容</h5><img width="200" height="200" src="http://dinkpic1.51ai.pro/empty.png" alt="为港口提效，智能化港口码头"/></div>')
                }
                insertDiv(js, type);
                if (type==5) {
                    type=3;
                 }
            }
        });
    }

    //初始化加载第一页数据
    if (i==1) {
        getData(1);
    }

    //生成数据html，append到div中
    function insertDiv(data, type) {
        var $mainDiv = $("#to-content");
        if (type==1 ||type==6) {
            getVideo(data)
        } else if (type==2 || type==7) {
            getArticle(data)
        } else if (type==3 || type==5) {
            getBbs(data, type)
        } else if (type==4) {
            getMoreVideo(data)
        }
    };
    

    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollHeight - scrollTop - windowHeight < 1) {
            getData(i);
        }
        });
};

//评论
function getComment(data, id) {
    var html = '';
    if (data.length > 0) {
        for (var i=0;i<data.length;i++ ){
            var c_comment = data[i].child;
            var c_comment_html = '';
            if(c_comment.length > 0){
                c_comment_html += '<div class="expand-body collapse in" id="safety' + data[i].id + '" aria-expanded="true" style="background: #dcdcdc; padding: 0"><div style="padding: 10px 10px; overflow: hidden">'
                for (var j=0;j<c_comment.length;j++){
                    c_comment_html += '<div class="child-content col-md-12"><div class="row"><div class="col-md-11"><span class="user">'+ c_comment[j].name+ '：</span><span class="user">@'+ c_comment[j].name+ '</span><span style="line-height: 1.5;">'+ c_comment[j].content+'</span><div class="content-time" style="margin: 0 0 0 5px"></div><span>' + c_comment[j].insert_time+ '  </span></div></div><span class="recontent icon-edit" data-video="' + id + '" data-parent="' + c_comment[j].parent_id + '" data-comment="' + c_comment[j].id + '" data-toggle="modal" data-target="#commentModal" onclick="commentBtn(this)">&nbsp;</span></div>';
                }
                c_comment_html += '</div></div>'
                html += '<div class="row" ><div class="expand-heading opened"><div class="row"><div class="col-md-11"><span class="user">' + data[i].name + '：</span><span>'+data[i].content+'</span><div class="content-time" style="margin: 0 0 0 5px"></div><span>' + data[i].insert_time + '  </span></div></div><i class="recontent icon-edit" data-video="' + id + '" data-parent="' + data[i].id + '" data-comment="' + data[i].id + '" data-toggle="modal" data-target="#commentModal" onclick="commentBtn(this)"></i><i class="icon-up expand-button morelink" data-target="#safety' + data[i].id + '" style="opacity: 1;" aria-expanded="true" onclick="btnClick(this)"></i></div>'+c_comment_html+'</div></div>'
            } else {
                html += '<div class="row" ><div class="expand-heading opened"><div class="row"><div class="col-md-11"><span class="user">' + data[i].name + '：</span><span>'+data[i].content+'</span><div class="content-time" style="margin: 0 0 0 5px"></div><span>' + data[i].insert_time + '  </span></div></div><i class="recontent icon-edit" data-video="' + id + '" data-parent="' + data[i].id + '" data-comment="' + data[i].id + '" data-toggle="modal" data-target="#commentModal" onclick="commentBtn(this)"></i><i class="icon-up expand-button morelink" data-target="#safety' + data[i].id + '" style="opacity: 0;" aria-expanded="false" onclick="btnClick(this)"></i></div>'+c_comment_html+'</div></div>'
            }
        }
    } else {
        html += '<div class="no-data noContent"><img width="200" height="200" src="http://dinkpic1.51ai.pro/zwpl.png" alt="为港口提效，智能化港口码头"></div>'
    }
    $('#comment').html(html)
}

//展开收起
function btnClick(e) {
    var obj = $(e).parent().parent().find(".expand-body");
    obj.each(function (i, re) {
        if ($(re).css("display") == 'block') {
            $(re).slideUp(500);
            $(e).removeClass('icon-up');
            $(e).addClass('icon-down')
        } else {
            $(re).slideDown(500);
            $(e).removeClass('icon-down');
            $(e).addClass('icon-up')
        }
    })
}

//页面跳转
function openNew(e, type){
    //得到html
    var link = $(e).attr("link");
    if (type == 1) {
        var pre =window.event || arguments.callee.caller.arguments[0];
        if (pre.keyCode==13 || $(e).hasClass('icon-search')) {
            var keyword = $("#search").val();
            var url = link+"?keyword=" +keyword;
            url = encodeURI(url);
            window.location.href = url;
        }
        if ($(e).hasClass('icon-clean')) {
            var url = link;
            url = encodeURI(url);
            window.location.href = url;
        }
    } else if (type == 2) {
        var keyword = $(e).attr("data-key"); //传给弹出页面参数
        if (keyword == undefined) {
            var url = link
        } else {
            var url = link +"?keyword=" +keyword
        }
        url = encodeURI(url);
        window.location.href = url;
    } else {
        var videoId = $(e).attr("data-id"); //传给弹出页面参数
        var type=$(e).attr("data-type");
        var url =type?link +"?id=" + videoId+"&type="+type:link +"?id=" + videoId;
        url = encodeURI(url);
        window.location.href = url;
    }
}

//videojs视频
function vjVideo(data) {
    var html = '';
    for (var i=0;i<data.length;i++ ){
        html+= '<section class="brand" id="'+data[i].id+'" ><div class="light-gray space-top"><div class="content center-aligned-content"><div class="container"><div class="row"><div class="col-md-4 theme-left"><h4>'+data[i].name + '</h4></div><div class="col-md-8 theme-right"><p class="profile">' + data[i].intro + '</p><div class="content-time"><span class="icon-plays">' + data[i].traffic + '</span></span><span class="icon-edit">' + data[i].comment + '</span></div></div><div class="button"><a link="video_details.html" data-id="'+data[i].id+'" data-type="'+data[i].type+'" class="box foo showMore  square-button-dark" data-type="'+data[i].type+'" onclick="openNew(this)">视频详情</a></div></div><div class=" container video-wrapper video-section section"><video class="video-js vjs-big-play-centered" controls preload="none" data-setup='+"'" + '{                    "controls": true,                        "controlBar": {                        "children": [                            "playToggle",                            "progressControl","currentTimeDisplay","volumeMenuButton","FullscreenToggle"]},"autoplay": false,"nativeControlsForTouch": true}'+"'"+' controlsList="nodownload" controls preload="none" poster="'+data[i].profile+'"><source data-src="'+data[i].video_url+'"                src="'+data[i].video_url+'" type="video/mp4"></video></div></div></div></section>'
    }
    $('#to-content').append(html)
}

// ck 视频
function getVideo(data){
    var html = '';
    for (var i=0;i<data.length;i++ ){
        html+= '<section class="brand" id="'+data[i].id+'" type="'+data[i].type+'" videoid="'+data[i].video_id+'"><div class="light-gray space-top"><div class="content center-aligned-content"><div class="container"><div class="row"><div class="col-md-4 col-sm-4 col-xs-4 theme-left"><h4>'+data[i].name + '</h4></div><div class="col-md-8 col-sm-8 col-xs-8 theme-right"><p class="profile">' + data[i].intro + '</p><div class="content-time"><span class="icon-plays">' + data[i].traffic + '</span></span><span class="icon-edit">' + data[i].comment + '</span></div></div><div class="button"><a link="video_details.html" data-id="'+data[i].id+'" data-type="'+data[i].type+'" class="box foo showMore  square-button-dark" onclick="openNew(this)">视频详情</a></div></div><div class="container video-wrapper video-section section" id="' + data[i].video_id + '"></div></div></div></section>'
    }
    $('#to-content').append(html);
    for (var i=0;i<data.length;i++ ) {
        var url = data[i].video_url;
        var videoObject = {
            container: '#'+data[i].video_id, //容器的ID或className
            variable: 'player',//播放函数名称
            autoplay: false, //是否自动播放
            loop: true,
            poster:data[i].profile,//封面图片
            loaded: 'pauseVideo',
            video: url//视频地址列表形式
        };
        var player = new ckplayer(videoObject);
        var videoId;
        $(".brand").click(function () {
            videoId=$(this).attr("videoid");
        });
        player.addListener("play",function () {
            $.ajax({
                url: 'http://47.103.42.252/play_video',
                type: 'POST',
                data: {
                    id:videoId
                },
            })
        })
    }
}

//更多视频
function getMoreVideo(data){
    var html = '';
    for (var i=0;i<data.length;i++ ){
        html+= '<section class="brand" id="'+data[i].id+'"><div class="light-gray space-top"><div class="content center-aligned-content"><div class="container"><div class="row"><div class="col-md-4 col-sm-4 col-xs-4 theme-left"><h4>'+data[i].name + '</h4></div><div class="col-md-8 col-sm-8 col-xs-8 theme-right"><p class="profile">' + data[i].intro + '</p><div class="content-time"><span class="icon-plays">' + data[i].traffic + '</span></span><span class="icon-edit">' + data[i].comment + '</span></div></div><div class="button"><a link="video_details.html" data-id="'+data[i].id+'" class="box foo showMore  square-button-dark" onclick="openNew(this)">视频详情</a></div></div><div class="container video-wrapper video-section section" id="' + data[i].video_id + '"></div></div></div></section>'
    }
    $('#to-content').append(html)
    for (var i=0;i<data.length;i++ ) {
        var url = data[i].video_url;
        var videoObject = {
            container: '#'+data[i].video_id, //容器的ID或className
            variable: 'player',//播放函数名称
            autoplay: false, //是否自动播放
            loop: true,
            poster:data[i].profile,//封面图片
            loaded: 'pauseVideo',
            video: url//视频地址列表形式
        };
        var player = new ckplayer(videoObject);
    }
}

//只允许播放一个视频
function pauseVideo() {
    var videos = document.getElementsByTagName('video');
    for (var i = videos.length - 1; i >= 0; i--) {
        (function(){
            var p = i;
            videos[p].addEventListener('play',function(){
                pauseAll(p);
            })
        })()
    }
    function pauseAll(index){
        for (var j = videos.length - 1; j >= 0; j--) {
            if (j!=index) videos[j].pause();
        }
    };
}

//文章
function getArticle(data) {
    var html = '';
    for (var i=0;i<data.length;i++ ){
        html += '<section class="brand"><div class="light-gray space-top"><div class="container content center-aligned-content"><div class="expand-table safety-table article" id="video_comment"><div class="row"><div class="col-md-4 col-sm-4 col-xs-4"><div class="bbs_left"><h4 class="theme-left bbs_title">'+data[i].theme+'</h4><span>'+data[i].insert_time+'</span></div></div><div class="col-md-8 col-sm-8 col-xs-8 theme-right"><p class="profile">' + data[i].profile + '</p><div class="content-time"><span class="icon-eye">' + data[i].traffic + '</span><span class="icon-edit">' + data[i].comment + '</span></div></div><div class="button"><a link="article_details.html" data-id="'+data[i].id+'" onclick="openNew(this)" class="box foo showMore  square-button-dark">文章详情</a></div></div><div class="row"><div class="cover" alt="为港口提效，智能化港口码头" style="background-image: url(' + data[i].cover + ');background-position: center"></div></div></div></div></section>'
    }
    $('#to-content').append(html)

}

//论坛
function getBbs(data, type) {
    var html = '';
    for (var i=0;i<data.length;i++ ){
        html += '<section class="brand"><div class="light-gray space-top"><div class="container content center-aligned-content center-aligned-content-add"><div class="expand-table safety-table article" id="video_comment"><div class="row"><div class="col-md-4 col-sm-4 col-xs-5"><div class="bbs_left"><h4 class="theme-left bbs_title">'+data[i].title+'</h4><span>'+data[i].insert_time+'</span></div></div><div class="col-md-6 col-sm-6 col-xs-7 theme-right"><p class="profile">' + data[i].content + '</p><div class="content-time"><span class="icon-eye">' + data[i].traffic + '</span><span class="icon-edit">' + data[i].comment + '</span></div></div><div class="button col-sm-2 col-xs-12"><a link="bbs_info.html" style="margin-top: 0" data-id="'+data[i].id+'" onclick="openNew(this)" class="box foo showMore  square-button-dark">进入讨论</a></div></div></div></div></section>'
    }
    if (type == 3) {
        $('#to-content').append(html)
    } else {
        $('#to-content').html(html)
    }
}

//搜索
function search(e) {
    if ($(e).hasClass("icon-search")) {
        openNew(e, 1)
    } else if ($(e).hasClass("icon-clean")) {
        clearInput()
        openNew(e, 1)
    }
}

function cancel() {
    var storage=window.localStorage;
    storage.clear();
    history.go(0);
    $("#cancel").hide();
};

//公用js
$(window).on('load',function(){
    session();
    $('body').addClass('loaded');
});

if (getParam("keyword") != '' && getParam("keyword") != undefined) {
    $("#search").val(getParam("keyword"))
    $('#search-icon').removeClass('icon-search')
    $('#search-icon').addClass('icon-clean')
};

$(".navbar-nav a").each(function (i,e) {
    $(e).attr("data-key", getParam("keyword"))
});

$('#loginModal, #registerModal, #commentModal, #bbsModal').on('show.bs.modal', function (e) {
    $("input:visible").val('').focus();
    $("textarea").val('').focus()
});

$('#renameModal').on('show.bs.modal', function (e) {
    $("input:enabled").val('').focus()
    $("textarea").val('').focus()
});




