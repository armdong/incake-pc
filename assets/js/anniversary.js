(function($, window, document) {

	$(function() {

		fnInit();
		
	});

	function fnInit(){
        var $oContent = $('.container'),
            $oBtnVcode = $oContent.find('.btn-vcode'),
            $oBtnBuy = $oContent.find('.btn-buy'),
            $oMaskResult = $('#mask-result'),
            $oTimeOut = $oMaskResult.find(".result-timeout"),
			$oTips = $oMaskResult.find(".result-tips"),
			$aBtnClose =  $oMaskResult.find(".btn-ok"),
            regOverdue = true, // 活动过期验证
            regMobile = false, // 手机号验证
            regVcode = false,  // 验证码验证
            regCoupon = false,  // 优惠券验证
            tips = '操作失败', // 提示信息
            time = 58;
            
        // 活动过期验证
        if(regOverdue){
    		
    		// 展示相应弹窗
    		$oTimeOut.show(function(){
            	$oMaskResult.show();
            });
        	
    		// 关闭弹窗
    		$aBtnClose.on("click",function(){
    			$oTimeOut.fadeOut(function(){
                	$oMaskResult.fadeOut();
                });
    		});
        }
        
        // 获取验证码
	    $oBtnVcode.on("click",function(){
	    	$oBtnVcode.css('backgroundColor','#c8c8c8').text('59" 后重新发送');
	    	var interval = setInterval(function(){
	    		$oBtnVcode.text(time-- +'" 后重新发送');
	    		if(time==-1){
	    			clearInterval(interval);
	    			time = 58;
	    			$oBtnVcode.css('backgroundColor','#726d81');
	    			$oBtnVcode.text('获取验证码');
	    		}
	    	},1000);
		});
        
	    // 立即兑换
        $oBtnBuy.on('click', function(event) {
        	
        	// 手机号验证
        	if(regMobile){
        		// 验证码验证
        		if(regVcode){
        			// 优惠券验证
        			if(regCoupon){
        				tips = '优惠券可在配送完成后24小时内激活使用';
        			}else{
        				tips = '没有可使用的优惠券';
        			}
        		}else{
        			tips = '验证码不正确';
        		}
        	}else{
        		tips = '手机号码格式不正确';
        	}
        	
        	$('.tip-text').text(tips);
        	$oMaskResult.css('background','none');
        	$oTips.fadeIn(function(){
            	$oMaskResult.fadeIn(function(){
            		$oTips.fadeOut(2000);
            		$oMaskResult.fadeOut(2000);
            	});
            });
			
        });

    }

})(jQuery, window, document);