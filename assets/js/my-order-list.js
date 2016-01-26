(function() {
    $(function() {
        fnMyOrderListTab();
        // 图片蛋糕预览
        fnImagePreview();
        // 订单取消
        fnOrderCancel();
    });

    function fnMyOrderListTab() {

        var $oOrderTabNav = $('.order-tab-nav');
        var $aOrderTabNavLi = $oOrderTabNav.find('>li');
        var $oOrderTabList = $('.order-tab-list');
        var $aOrderTabListLi = $oOrderTabList.find('>li');
        $aOrderTabNavLi.each(function(index, elem) {
            $(elem).on('click', function() {
                $(this).addClass('active').siblings('li').removeClass('active');
                $aOrderTabListLi.eq(index).addClass('active').siblings('li').removeClass('active');
            });
        });

    }

    function fnImagePreview() {
        var $oList = $('.order-list-container');
        var $oMaskPreview = $('.mask-image-preview');
        var $oBtnMaskClose = $oMaskPreview.find('.btn-image-preview-close');
        $oList.delegate('.btn-preview', 'click', function() {
            $oMaskPreview.show();
        });
        $oBtnMaskClose.on('click', function() {
            $oMaskPreview.hide();
        });
    }

    function fnOrderCancel() {

        // 拿到所有的“取消订单”按钮
        var $oTabList = $('.order-tab-list');

        var $oMask = $('.mask-undo');
        var $oUndo = $oMask.find('undo');
        var $oBtnUndoClose = $oMask.find('.btn-undo-close');
        var $oBtnUndoCancel = $oMask.find('.btn-undo-cancel');
        var $aLi = $oMask.find('li');

        $oTabList.on('click', '.btn-order-undo', function() {
        	$aLi.removeClass('active');
            $oMask.show();
        });
        $aLi.on('click', function() {
            $(this).addClass('active').siblings('li').removeClass('active');
        });
        $oBtnUndoClose.on('click', function() {
            $oMask.hide();
        });
        $oBtnUndoCancel.on('click', function() {
            $oMask.hide();
        });
    }

})();
