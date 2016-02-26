(function(){
	
	$(function(){
		fnInitStatus();
	});
	
	function fnInitStatus(){
		var $oLoginOut = $('.loginOut');
		var $oLoginIn = $('.loginIn');
		var $oUserName = $oLoginIn.find('.userName');
		var $oMyList = $oLoginIn.find('.myList');
		var $oExit = $oLoginIn.find('.exit');
		
		$oLoginOut.hide();
		$oMyList.hide();
		
		$oUserName.on('click',function(){
			$(this).addClass('list-open');
			$oMyList.show();
		});
		
		$oMyList.on('mouseleave',function(){
			$(this).hide();
			$oUserName.removeClass('list-open');
		});
		
		$oExit.on('click',function(){
			$oLoginIn.hide();
			$oLoginOut.show();
		});
		
	}
	
})();
