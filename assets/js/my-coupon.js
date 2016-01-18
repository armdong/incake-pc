(function() {

	$(function() {
		// 查询积分
		fnQueryCoupon();
		// 页码切换事件
		fnPageNumber();
		// 添加购物券
		fnAddNewCoupon();
	});

	function fnQueryCoupon(){
		var $oCouponNav = $('.coupon-nav');
		var $aCouponTitle = $oCouponNav.find('a');
		var $aCouponList = $('.coupon-list');
		var $oText = '';
		
		$aCouponTitle.on('click',function(){
			$oText = $(this).text();
			
			$aCouponTitle.removeClass('active');
			$(this).addClass('active');
			$aCouponList.addClass('hide');
			
			switch ($oText) {
				case '全部':
					$('.all-coupon').removeClass('hide');
					break;
				case '已使用':
					$('.used-coupon').removeClass('hide');
					break;
				default:
					$('.unUsed-coupon').removeClass('hide');
					break;
			}
		});
	}
	
	function fnPageNumber(){
		var $oListPage = $('.list-page');
		var $aNumber = $oListPage.find('a');
		var $aNotArrow = $aNumber.not($(".arrow"));
				
		$aNotArrow.on('click',function(){
			var $myListPage = $(this).closest('.coupon-list');
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
	
	function fnAddNewCoupon(){
		var $oBtnNewCoupon = $('.btn-new-coupon');
		var $oBtnNewCouponClose = $('.btn-new-coupon-close');
		var $oMaskNewCoupon = $('.mask-new-coupon');
		
		$oBtnNewCoupon.on('click',function(){
			$oMaskNewCoupon.show();
		});
		
		$oBtnNewCouponClose.on('click',function(){
			$oMaskNewCoupon.hide();
		});
		
		
	}

})();