(function() {

	$(function() {
		// 查询积分
		fnQueryIncoin();
		// 页码切换事件
		fnPageNumber();
	});

	function fnQueryIncoin(){
		var $oIncoinNav = $('.incoin-nav');
		var $aIncoinTitle = $oIncoinNav.find('a');
		var $aIncoinList = $('.incoin-list');
		var $oText = '';
		
		$aIncoinTitle.on('click',function(){
			$oText = $(this).text();
			
			$aIncoinTitle.removeClass('active');
			$(this).addClass('active');
			$aIncoinList.addClass('hide');
			
			switch ($oText) {
				case '全部':
					$('.all-incoin').removeClass('hide');
					break;
				case '充值记录':
					$('.recharge-incoin').removeClass('hide');
					break;
				default:
					$('.exchange-incoin').removeClass('hide');
					break;
			}
		});
	}
	
	function fnPageNumber(){
		var $oListPage = $('.list-page');
		var $aNumber = $oListPage.find('a');
		var $aNotArrow = $aNumber.not($(".arrow"));
				
		$aNotArrow.on('click',function(){
			var $myListPage = $(this).closest('.incoin-list');
			var $myNumber = $myListPage.find('a');
			var $myNotArrow = $myNumber.not($(".arrow"));
			var $myListPage = $(this).closest('.list-page');
			var $myArrow = $myListPage.find('.arrow');
			var $numberIndex = $(this).index();
			
			$myNotArrow.removeClass('active');
			$(this).addClass('active');
			$myArrow.removeClass('active');
			
			if($numberIndex==1){
				$($myArrow[0]).addClass('active');
			}else if($numberIndex==$myNumber.length-1){
				$($myArrow[1]).addClass('active');
			}
			
		});
	}

})();