(function() {

	$(function() {
		// 查询评论
		fnQueryComments();
		// 页码切换事件
		fnPageNumber();
	});

	function fnQueryComments(){
		var $oCommentsNav = $('.comments-nav');
		var $aCommentsTitle = $oCommentsNav.find('a');
		var $aCommentsList = $('.comments-list');
		var $oText = '';
		
		$aCommentsTitle.on('click',function(){
			$oText = $(this).text();
			
			$aCommentsTitle.removeClass('active');
			$(this).addClass('active');
			$aCommentsList.addClass('hide');
			
			switch ($oText) {
				case '全部商品':
					$('.all-comments').removeClass('hide');
					break;
				case '已评论':
					$('.used-comments').removeClass('hide');
					break;
				default:
					$('.unUsed-comments').removeClass('hide');
					break;
			}
		});
	}
	
	function fnPageNumber(){
		var $oListPage = $('.list-page');
		var $aNumber = $oListPage.find('a');
		var $aNotArrow = $aNumber.not($(".arrow"));
				
		$aNotArrow.on('click',function(){
			var $myListPage = $(this).closest('.comments-list');
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