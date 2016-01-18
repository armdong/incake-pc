(function(){
	
	$(function(){
		// 图片蛋糕预览
		fnImagePreview();
	});
	
	function fnImagePreview(){
		var $oList = $('.list-container');
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
