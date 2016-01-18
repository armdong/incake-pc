(function() {

	$(function() {
		// 认证
		fnVipVerify();
	});

	function fnVipVerify(){
		var $oBtnVerify = $('.btn-verify');
		var $oMaskVerifyVip = $('.mask-verify-vip');
		var $oMaskVerifyHide = $('.mask-verify-hide');
		var $oMaskVerifyEmail = $('.mask-verify-email');
		var $oMaskBtnVerify = $('.mask-btn-verify');
		var $oBtnVerifyClose = $('.btn-verify-close');
		
		$oBtnVerify.on('click',function(){
			$oMaskVerifyVip.show();
		});
		
		$oMaskBtnVerify.on('click',function(){
			$oMaskVerifyHide.hide();
			$oMaskVerifyEmail.show();
		});
		
		$oBtnVerifyClose.on('click',function(){
			$oMaskVerifyVip.hide();
		});
		
		
	}

})();