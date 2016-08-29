/**
 * Created by Michael on 2016/8/29.
 */

(function (window) {

    $(function () {

        // Slide Navigation
        fnSlides();
    });

    /**
     * Slide Navigation
     */
    function fnSlides() {
        var $oSlide = $('#slides'),
            $oSlideContainer = $oSlide.find('.slide-container'),
            $oBtnPrev = $oSlide.find('.btn-prev'),
            $oBtnPrevText = $oBtnPrev.find('.text'),
            $oBtnNext = $oSlide.find('.btn-next'),
            $oBtnNextText = $oBtnNext.find('.text'),
            tl = new TimelineLite();

        tl.clear();

        // Next Slide
        $oBtnNext.on('click', function () {
            tl.to($oSlideContainer, .5, {
                left: '-100%',
                onStart: function () {
                    $oBtnNext.fadeOut();
                },
                onComplete: function () {
                    $oBtnPrev.fadeIn();
                }
            });
        });

        // Next　Text Toggle
        $oBtnNext.hover(function(){
            $oBtnNextText.fadeIn();
        }, function(){
            $oBtnNextText.fadeOut();
        });

        // Prev Slide
        $oBtnPrev.on('click', function () {
            tl.to($oSlideContainer, .5, {
                left: 0,
                onStart: function () {
                    $oBtnPrev.fadeOut();
                },
                onComplete: function () {
                    $oBtnNext.fadeIn();
                }
            });
        });

        // Prev　Text Toggle
        $oBtnPrev.hover(function(){
            $oBtnPrevText.fadeIn();
        }, function(){
            $oBtnPrevText.fadeOut();
        });
    }

})(window);