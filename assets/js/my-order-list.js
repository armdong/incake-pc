(function(){
	$(function(){
		fnMyOrderListTab();
		// 图片蛋糕预览
		fnImagePreview();
	});
	
	function fnMyOrderListTab(){
		
		var $oOrderTabNav = $('.order-tab-nav');
		var $aOrderTabNavLi = $oOrderTabNav.find('>li');
		var $oOrderTabList = $('.order-tab-list');
		var $aOrderTabListLi = $oOrderTabList.find('>li');
		$aOrderTabNavLi.each(function(index,elem){
			$(elem).on('click',function(){
				$(this).addClass('active').siblings('li').removeClass('active');
				$aOrderTabListLi.eq(index).addClass('active').siblings('li').removeClass('active');
			});
		});
		
	}
	
	function fnImagePreview(){
		var $oList = $('.order-list-container');
		var $oMaskPreview = $('.mask-image-preview');
		var $oBtnMaskClose = $oMaskPreview.find('.btn-image-preview-close');
		$oList.delegate('.btn-preview','click',function(){
			$oMaskPreview.show();
		});
		$oBtnMaskClose.on('click',function(){
			$oMaskPreview.hide();
		});
	}
	
})();
