(function(){
	
	$(function(){
		fnForetasteTip();
	});
	
	function fnForetasteTip(){
		var $oBtnSubmit = $('.btn-submit-apply');
		var $oMaskForetaste = $('.mask-foretaste-tip');
		var $oBtnMaskClose = $oMaskForetaste.find('.btn-foretaste-tip-close');
		var $oBtnMaskCancel = $oMaskForetaste.find('.btn-foretaste-tip-cancel');
		$oBtnSubmit.on('click',function(){
			$oMaskForetaste.show();
		});
		$oBtnMaskClose.on('click',function(){
			$oMaskForetaste.hide();
		});
		$oBtnMaskCancel.on('click',function(){
			$oMaskForetaste.hide();
		});
	}
	
})();
