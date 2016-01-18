(function() {

	$(function() {
		// 密码重置
		fnRePassword();
		
		fnRegister();
	});

	function fnRePassword(){
		var $oBtnNext = $('.btn-next');
		var $oBtnNext2 = $('.btn-next2');
		var $oResetTitle = $('.reset-title');
		var $aSpan =  $oResetTitle.find('span');
		var $oCircleCenter = $oResetTitle.find('.circle-center');
		var $oCircleRight = $oResetTitle.find('.circle-right');
		var $oResetForm = $('.reset-form');
		var $oBox1 = $oResetForm.find('.box01');
		var $oBox2 = $oResetForm.find('.box02');
		var $oBox3 = $oResetForm.find('.box03');
		
		$oBtnNext.on('click',function(){
			$oBox1.addClass('hide');
			$oBox2.removeClass('hide');
			$oCircleCenter.addClass('active');
		});
		
		$oBtnNext2.on('click',function(){
			$oBox2.addClass('hide');
			$oBox3.removeClass('hide');
			$oCircleRight.addClass('active');
			$aSpan.addClass('active');
		});		
	}
	
	function fnRegister(){
		var $oRegisterForm = $('.reset-form');
		var $oBtnVcode = $oRegisterForm.find('.btn-register-vcode');
		var $oMaskVcode = $('.mask-vcode');
		var $oBtnMaskClose = $oMaskVcode.find('.btn-vcode-close');
		var $oBtnMaskCancel = $oMaskVcode.find('.btn-vcode-cancel');
		$oBtnVcode.on('click',function(){
			$oMaskVcode.show();
		});
		$oBtnMaskClose.on('click',function(){
			$oMaskVcode.hide();
		});
		$oBtnMaskCancel.on('click',function(){
			$oMaskVcode.hide();
		});
	}
	
})();