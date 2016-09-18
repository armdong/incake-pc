(function(){

	$(function(){

		fnAddr();
	});

	function fnAddr(){
		var $oContent = $('.upgrade-container'),
			$oAddr = $oContent.find('.address'),
			$oAddrCur = $oAddr.find('.addr-cur').children('span'),
			$aLi = $oAddr.find('li');
			
			$aLi.on('click',function(){
				$aLi.removeClass('cur');
				$(this).addClass('cur');
				$oAddrCur.text($(this).text());
			});
	}

})();