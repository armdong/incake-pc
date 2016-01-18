(function() {

	$(function() {
		// 支付平台
		fnPlatform();
		// 支付方式
		fnPayment();
	});
	
	function fnPlatform() {
		var $oPlatform = $('.section-platform');
		var $oContent = $oPlatform.find('.content-list');
		var $aContentLi = $oContent.find('>li');
		$aContentLi.each(function(i, ele) {
			$(ele).on('click', function() {
				$(this).addClass('active').siblings('li').removeClass('active');
			});
		});
	}

	function fnPayment() {
		var $oPayment = $('.section-payment');
		var $oContent = $oPayment.find('.content-list');
		var $aContentLi = $oContent.find('>li');
		$aContentLi.each(function(i, ele) {
			$(ele).on('click', function() {
				$(this).addClass('active').siblings('li').removeClass('active');
			});
		});
	}

})();