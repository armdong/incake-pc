/**
 * Created by Michael on 2016/8/22.
 */

(function (window, document) {

    $(document).ready(function () {
        // banner 动画
        fnAnimation();
    });

    function fnAnimation() {
        var $oVirgo = $('#virgo'),
            $oBanner = $oVirgo.find('.banner'),
            $oCircle = $oBanner.find('.circle'),
            $oText = $oBanner.find('.text'),
            $oTitle = $oBanner.find('.title'),
            $oContent = $oVirgo.find('.content'),
            $oFlag = $oContent.find('.flag'),
            $oTip = $oFlag.find('.tips'),
            tl = new TimelineLite();

        tl.clear();
        tl.set($oBanner, {perspective: 500});
        tl.set($oFlag, {transformOrigin: '26px 271px'});
        tl.set($oTip, {transformOrigin: 'right center'});

        tl.to($oCircle, .2, {
            rotation: 90,
            repeat: 5,
            yoyo: true,
            ease: Linear.easeInOut
        }).to($oText, 2, {
            left: '396px',
            ease: Elastic.easeOut
        }).fromTo($oTitle, 1, {
            z: 500
        }, {
            z: 0,
            ease: Bounce.easeOut
        }).to($oFlag, .2, {
            rotation: -10,
            yoyo: true,
            repeat: 5
        }).fromTo($oTip, 1, {
            opacity: 0,
            scale: 0
        }, {
            opacity: 1,
            scale: 1
        });

    }

})(window, document);