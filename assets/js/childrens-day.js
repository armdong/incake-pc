(function() {

    $(function() {
    	// loading
        fnLoading();
    });

	function fnLoading() {
        // 图片数组
        var arrImg = ['banner.png', 'btn_buy.png', 'btn_gift.png', 'get.png', 'gift_left.png', 'gift_right.png', 'gift01.png', 'gift02.png', 'gift03.png', 'icon-ok.png', 'mask_bg.png', 'popup_head.png', 'tips.png', 'yellow01.png', 'yellow02.png', 'yellow03.png', 'yellow04.png'];
        var num = 0;
        var url = 'assets/img/childrens-day/';

        $.each(arrImg, function(index, obj) {
            var objImg = new Image();
            objImg.src = url + obj;
            objImg.onload = function() {
                num++;
                if (num == arrImg.length) {
                    $('#loading').animate({
                        opacity: 0
                    }, 1000, function() {
                        $(this).remove();
        				fnCoupon();
                    });
                }
            };
            //图片加载错误或不全
            objImg.onerror = function() {
                $('#loading').animate({
                    opacity: 0
                }, 1000, function() {
                    $(this).remove();
    				fnCoupon();
                });
            };
        });
    }
	
    function fnCoupon() {
        var $oGiftBox = $('.gift-box'),
        	$aLi = $oGiftBox.find('li'),
        	$oBtnGift = $('.btn-gift'),    // 页面领取按钮
            $oMask = $('.mask-register'),  // 弹出层
            $oBtnRegister = $oMask.find('.btn-register'),
            $oStep1 = $oMask.find('.step-01'),
            $oStep2 = $oMask.find('.step-02'),
            $oStep3 = $oMask.find('.step-03'),
            $oName = $oStep1.find('.li-name'),
			oldUser = false;

		$aLi.on('mouseover', function() {
        	$(this).find('.g-text').stop().animate({
        		width:"480px"
    		});
        });
        
        $aLi.on('mouseleave', function() {
        	$(this).find('.g-text').stop().animate({
        		width:"322px"
    		});
        });
		
        $oBtnGift.on('click', function() {
        	$oMask.show();
        	if(oldUser){
            	$oName.hide();
        	}
        });
		
		$oBtnRegister.on('click', function() {
            if(oldUser){
            	$oStep1.hide();
            	$oStep3.show();
            }else{
            	$oStep1.hide();
            	$oStep2.show();
            }
        });

    }

})();
