(function() {

	$(function() {
		// 查询积分
		fnQueryPoint();
		// 页码切换事件
		fnPageNumber();
	});

	function fnQueryPoint(){
		var $oPointNav = $('.point-nav');
		var $aPointTitle = $oPointNav.find('a');
		var $aPointList = $('.point-list');
		var $oText = '';
		
		$aPointTitle.on('click',function(){
			$oText = $(this).text();
			
			$aPointTitle.removeClass('active');
			$(this).addClass('active');
			$aPointList.addClass('hide');
			
			switch ($oText) {
				case '全部积分':
					$('.all-point').removeClass('hide');
					break;
				case '已获积分':
					$('.get-point').removeClass('hide');
					break;
				default:
					$('.cost-point').removeClass('hide');
					break;
			}
		});
	}
	
	function fnPageNumber(){
		var $oListPage = $('.list-page');
		var $aNumber = $oListPage.find('a');
		var $aNotArrow = $aNumber.not($(".arrow"));
				
		$aNotArrow.on('click',function(){
			var $myListPage = $(this).closest('.point-list');
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