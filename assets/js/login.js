(function(){
	
	$(function(){
		fnLogin();
		fnRegister();
	});
	
	function fnLogin(){
		var $oLoginForm = $('.login-form');
		var $oAutoLogin = $oLoginForm.find('.auto-login');
		$oAutoLogin.on('click',function(){
			var $oI = $(this).find('i');
			if($oI.hasClass('checked')){
				$oI.removeClass('checked');
			}else{
				$oI.addClass('checked');
			}
		});
	}
	
	function fnRegister(){
		var $oRegisterForm = $('.register-form');
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
