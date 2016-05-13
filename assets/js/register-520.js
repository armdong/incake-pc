(function() {

    $(function() {

        var $oContainer = $('.container-wrapper'),
            $oFrmContainer = $oContainer.find('.frm-container'),
            iFrmT = $oFrmContainer.offset().top,
            iFrmH = $oFrmContainer.height(),
            iViewH = $(window).height(),
            disT = iFrmT - iViewH + iFrmH;

        fnFrmScroll(disT, $oFrmContainer);

        $(window).on('scroll', function() {
            fnFrmScroll(disT, $oFrmContainer);
        });

        fnRegister($oFrmContainer);

    });

    function fnFrmScroll(disT, $obj) {
        var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollT <= disT) {
            $obj.addClass('flt');
        } else {
            if ($obj.hasClass('flt')) {
                $obj.removeClass('flt');
            }
        }
    }

    function fnRegister($oFrmContainer){

        // TODO 处理注册逻辑

        var $oMask = $('#mask-tip');
        $oFrmContainer.on('click', '.btn-quick-register', function(event) {
            event.preventDefault();
            /* Act on the event */
            $oMask.show();
        });

        $oMask.on('click', '.btn-tip-close', function(event) {
            event.preventDefault();
            /* Act on the event */
            $oMask.hide();
        });
    }

})();
