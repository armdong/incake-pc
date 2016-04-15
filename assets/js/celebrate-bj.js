(function() {

    $(function() {
        fnCoupon();
    });

    function fnCoupon() {
        var $oBtnBuy = $('.btn-buy'), 						// 页面领取按钮
            $oMask = $('.mask-coupon'), 					// 弹出层
            $oStep1 = $oMask.find('.step-01'),
            $oStep2 = $oMask.find('.step-02'),
            $oMaskOk = $oMask.find('.btn-coupon-ok'), 		// 弹出层领取按钮
            $oMaskClose = $oMask.find('.btn-coupon-close'), // 弹出层关闭按钮
            $oMaskGo = $oMask.find('.btn-coupon-go'), 		// 弹出层继续购物按钮
            tl = new TimelineLite();

        $oBtnBuy.on('click', function() {
            $oMask.show();
        });

        $oMaskOk.on('click', function() {

        	// TODO 处理领取逻辑

        	// 这里是切换结果页效果
            tl.clear();
            tl.to($oStep1, 0.5, {
                left: '-440px',
                ease: Linear.easeOut,
                onComplete: function() {
                    tl.to($oStep2, 1, {
                        left: '20px',
                        ease: Bounce.easeOut
                    });
                }
            });
        });

        $oMaskClose.on('click', function() {
            $oMask.hide();
        });
    }

})();
