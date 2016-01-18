(function() {

	$(function() {
		fnLoginTab();
		fnFetchVcode();
		fnAutoLogin();
		fnQuickLogin();
	});
	
	// 快速登录/注册 与 登录表单切换
	function fnLoginTab() {
		var $oLoginForm = $('.login-form');
		var $oLoginNav = $oLoginForm.find('.form-nav');
		var $aNavLi = $oLoginNav.find('>li');
		var $oLoginList = $oLoginForm.find('.form-list');
		var $aListLi = $oLoginList.find('>li');
		$.each($aNavLi, function(i, ele) {
			$(ele).on('click', function() {
				$(this).addClass('active').siblings('li').removeClass('active');
				$aListLi.eq(i).addClass('active').siblings('li').removeClass('active');
			});
		});
	}
	
	// 获取手机验证码
	function fnFetchVcode(){
		var $oLoginForm = $('.login-form');
		var $oBtnVcode = $oLoginForm.find('.btn-fetch-vcode');
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
	
	// 快速登录/注册
	function fnQuickLogin(){
		var $oBtn = $('#btn-quick-login');
		var $oMask = $('.mask-quick-login');
		var $oBtnMaskClose = $oMask.find('.btn-quick-login-close');
		var $oBtnMaskCancel = $oMask.find('.btn-quick-login-cancel');
		$oBtn.on('click',function(){
			$oMask.show();
		});
		$oBtnMaskClose.on('click',function(){
			$oMask.hide();
		});
		$oBtnMaskCancel.on('click',function(){
			$oMask.hide();
		});
	}
	
	// 自动登录
	function fnAutoLogin() {
		var $oLoginForm = $('.login-form');
		var $oAutoLogin = $oLoginForm.find('.auto-login');
		$oAutoLogin.on('click', function() {
			var $oI = $(this).find('i');
			if ($oI.hasClass('checked')) {
				$oI.removeClass('checked');
			} else {
				$oI.addClass('checked');
			}
		});
	}

})();