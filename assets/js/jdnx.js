(function(){
	$(function(){
		fnGoPay();
	});
	
	function fnGoPay(){
		var $oBtn = $('.btn-buy');
		var $oMask = $('.mask-go-pay');
		var $oSpanCity = $oMask.find('.go-pay-header').find('span');
		var $oBtnMaskClose = $oMask.find('.btn-go-pay-close');
		var $oUl = $oMask.find('.city-list');
		var $aLi = $oUl.find('.city-item');
		
		$oBtn.on('click',function(){
			$oMask.show();
		});
		$oBtnMaskClose.on('click',function(){
			$oMask.hide();
		});
		$aLi.each(function(i,ele){
			$(ele).on('click',function(){
				$(this).addClass('checked').siblings('.city-item').removeClass('checked');
				$oSpanCity.html($(this).html());
			});
		});
	}
	
})();
