(function() {

    $(function() {

        var $oContainer = $('#durian'),
            $oFrmContainer = $oContainer.find('.frm-container'),
            iFrmT = $oFrmContainer.offset().top,
            iFrmH = $oFrmContainer.height(),
            iViewH = $(window).height(),
            disT = iFrmT - iViewH + iFrmH;

        fnFrmScroll(disT, $oFrmContainer);

        $(window).on('scroll', function() {
            fnFrmScroll(disT, $oFrmContainer);
        });

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

})();
