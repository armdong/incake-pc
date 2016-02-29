(function() {

	$(function() {
		fnInitIncoin();
		fnIncoin();
		fnIncoinPay();
		fnIncoinMask();
	});

	function fnInitIncoin() {
		var _incoin = fnFetchUrlHash('incoin');
		if (_incoin != null) {
			_incoin = _incoin.toLowerCase();
		}
		var $oCurrentItem = '';
		if (!isNullOrEmpty(_incoin)) {
			$oCurrentItem =  '.incoin-'+_incoin;
			$($oCurrentItem).removeClass('hide').siblings('.incoin-item').addClass('hide');
		}
	}

	// 用户获取url中制定name的参数值
	function fnFetchUrlHash(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*(&|$))");
		var result = window.location.search.substr(1).match(reg);
		if (result != null) {
			return unescape(result[2]);
		} else {
			return null;
		}
	}

	// 检测字符串是否为空
	function isNullOrEmpty(obj) {
		if (obj == null || obj == '' || obj == undefined) {
			return true;
		} else {
			return false;
		}
	}
	
	function fnIncoin(){
		var $aSelect = $('.select-click');
		var $aList = $('.select-option');
		var $aOption = $aList.find('li');
		var $oPayWay = $('.pay-way');
		var $aPay = $oPayWay.find('.a-pay');
		
		$aSelect.on('click',function(){
			$(this).siblings('.select-option').toggleClass('hide');
		});
		
		$aList.on('mouseleave',function(){
			$(this).addClass('hide');
		});
		
		$.each($aOption,function(i,ele){
			$(ele).on('click',function(){
				var $value = $(this).html();
				var $value2 = $value.split('元');
				$(this).closest('.select-option').siblings('.select-money').html($value);
				$(this).closest('.num-select').siblings('.tips').children('span').html($value2[0]);
			});
		});
		
		$.each($aPay,function(i,ele){
			$(ele).on('click',function(){
				$aPay.removeClass('active');
				$(this).addClass('active');
			});
		});
		
	}
	
	function fnIncoinPay(){
		var $oRecharge = $('.incoin-recharge');
		var $oBtnPay = $oRecharge.find('.btn-next');
		
		$oBtnPay.on('click',function(){
			$oRecharge.addClass('hide').siblings('.incoin-pay').removeClass('hide');
			var money = $('.moneyNum').html()+'.00';
			$('.pay-num').html(money);
		});
		
	}
	
	function fnIncoinMask(){
		var $oExchange = $('.incoin-exchange');
		var $oBtnMask = $oExchange.find('.btn-next');
		var $oMask = $('.mask');
		var $oBtnClose = $('.btn-close');
		
		$oBtnMask.on('click',function(){
			$('.mask').css('display','block');
			$('.maskIncoin').html($('.incoinNum').html());
			
		});
		
		$oBtnClose.on('click',function(){
			$('.mask').css('display','none');
		});
		
	}
	
	
	
})();