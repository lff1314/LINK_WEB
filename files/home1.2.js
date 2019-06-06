// getLayData(6,10,1, getParam("keyword"));
$('.image-slider').bxSlider({
    mode: 'horizontal',
    moveSlides: 1,
    slideMargin: 40,
    infiniteLoop: true,
    minSlides: 1,
    maxSlides: 1,
    speed: 800,
    controls:true,
    autoHover:true,
    auto:true
});

window.onload=function () {
    $('a').attr("target","_blank");
};