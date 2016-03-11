(function() {

	$(function() {
		// 是否切分状态切换
		fnCutChecked();
		// 更改购物车商品或配件数量
		fnChangeCakeOrPartsNum();
		// 移除已选蛋糕或配件
		fnRemoveCakeOrParts();
		// 图片蛋糕预览
		fnImagePreview();
		// 图片上传
		fnImageUpload();
		// 购物车提交
		fnGoPay();
		// 套餐推荐
		fnRecommend();
	});

	function fnCutChecked() {
		var $oSelectedCake = $('.section-selected-cake');
		var $oBodyList = $oSelectedCake.find('.body-list');
		var $aBAttr = $oBodyList.find('.b-attr');
		var $aCutI = $aBAttr.find('.cut').find('i');
		$aCutI.each(function(i, ele) {
			$(ele).on('click', function() {
				if ($(this).hasClass('checked')) {
					$(this).removeClass('checked');
				} else {
					$(this).addClass('checked');
				}
			});
		});
	}

	function fnChangeCakeOrPartsNum() {
		var $oContainer = $('.section-container');
		var $aBodyList = $oContainer.find('.body-list');
		var $aBtnWrapper = $aBodyList.find('.b-num').find('.num');
		var $aBtnMinus = $aBtnWrapper.find('.btn-minus');
		var $aBtnPlus = $aBtnWrapper.find('.btn-plus');
		// 增加数量
		$aBtnPlus.each(function(i, plusEle) {
			$(plusEle).on('click', function() {
				var $oInput = $(this).siblings('.size-num');
				var $oBtnMinus = $(this).siblings('.btn-minus');
				var iVal = parseInt($oInput.val());
				iVal++;
				if (iVal > 1) {
					$oBtnMinus.addClass('active');
				}
				$oInput.val(iVal);
			});
		});
		// 减少数量
		$aBtnMinus.each(function(i, minusEle) {
			$(minusEle).on('click', function() {
				var $oInput = $(this).siblings('.size-num');
				var iVal = parseInt($oInput.val());
				iVal--;
				if (iVal <= 1) {
					if ($(this).hasClass('active')) {
						$(this).removeClass('active');
					}
				}
				if(iVal < 1){
					iVal = 1;
				}else{
					$oInput.val(iVal);	
				}				
			});
		});
	}

	function fnRemoveCakeOrParts() {
		var $aSection = $('.section');
		var $aBtnDelete = $aSection.find('.btn-delete');
		$.each($aBtnDelete, function(i, ele) {
			$(ele).on('click', function() {
				var $oBodyItem = $(this).closest('.body-item');
				$oBodyItem.remove();
			});
		});
	}
	
	function fnImagePreview(){
		var $oBodyList = $('.body-list');
		var $oMaskPreview = $('.mask-image-preview');
		var $oBtnMaskClose = $oMaskPreview.find('.btn-image-preview-close');
		$oBodyList.delegate('.btn-img-preview','click',function(){
			$oMaskPreview.show();
		});
		$oBtnMaskClose.on('click',function(){
			$oMaskPreview.hide();
		});
	}
	
	function fnImageUpload(){
		var $oBodyList = $('.body-list');
		var $oMaskPreview = $('.mask-image-upload');
		$oBodyList.delegate('.btn-img-upload','click',function(){
			$oMaskPreview.show();
		});
	}
	
	function fnGoPay(){
		var $oBtnGoPay = $('.btn-go-pay');
		var $oMaskGoPay = $('.mask-go-pay');
		var $oSpan = $oMaskGoPay.find('.go-pay-header').find('span');
		var $oCityList = $oMaskGoPay.find('.city-list');
		var $aCityItem = $oCityList.find('.city-item');
		var $oBtnMaskClose = $oMaskGoPay.find('.btn-go-pay-close');
		$oBtnGoPay.on('click',function(){
			$oMaskGoPay.show();
		});
		$oBtnMaskClose.on('click',function(){
			$oMaskGoPay.hide();
		});
		$aCityItem.each(function(i,ele){
			$(ele).on('click',function(){
				$(this).addClass('checked').siblings('.city-item').removeClass('checked');
				$oSpan.html($(this).html());
			});
		});
	}

	function fnRecommend(){
		var $oRecommend = $('.section-recommend');
		var $aCheckBox = $oRecommend.find('.check-box').find('>i');
		$aCheckBox.each(function(i, ele) {
			$(ele).on('click', function() {
				if ($(this).hasClass('checked')) {
					$(this).removeClass('checked');
				} else {
					$(this).addClass('checked');
				}
			});
		});
	}

})();