(function() {

	$(function() {
		// 商品缩略图点击事件
		fnPicChange();
		// 商品缩略图列表换页效果
		fnPicSlide();
		// 商品图自动播放
		fnPicAutoPlay();
		// 商品规格切换事件
		fnPoundChange();
		// 商品数量改变事件
		fnNumChange();
		// 商品收藏
		fnCollect();
		// 加入购物篮
		fnAddToCart();
		// 套餐礼盒选择/取消
		fnSetMeal();
		
		
		// GAW蛋糕尺寸、蛋糕体、内陷选项切换事件
		fnGawChange();
	});

	function fnPicChange() {
		var $oPicUl = $('.pic');
		var $aPicLi = $oPicUl.find('li');
		var $oThumbUl = $('.pic-list');
		var $aThumbLi = $oThumbUl.find('li');
		var _activeIndex = 0;
		var _lastIndex = 0;
		$.each($aThumbLi, function(i, ele) {
			$(ele).on('click', function() {
				_activeIndex = $(this).index();
				if (_lastIndex != _activeIndex) {
					$aPicLi.eq(_lastIndex).fadeOut();
				}
				setTimeout(function() {
					$aThumbLi.eq(_activeIndex).addClass('active').siblings('li').removeClass('active');
					$aPicLi.eq(_activeIndex).fadeIn();
				}, 300);
				_lastIndex = _activeIndex;
			});
		});
	}

	function fnPicSlide() {
		var $oPicList = $('.pic-list');
		var $oPicListWrapper = $oPicList.find('.pic-list-wrapper');
		var $aPicLi = $oPicList.find('li');
		var $oBtnPrev = $oPicList.siblings('.prev');
		var $oBtnNext = $oPicList.siblings('.next');
		var iMaxViewNum = 4;
		var iLen = $aPicLi.length;
		var iWrapperHeight = $oPicListWrapper.height();
		var iCurrPosTop = $oPicListWrapper.position().top;
		var iStep = $aPicLi.height();
		var iMinPosTop = -(iWrapperHeight - (iStep * iMaxViewNum));
		// 如果图片个数大于最大的可视个数，next按钮添加active状态
		if (iLen > iMaxViewNum) {
			$oBtnNext.addClass('active');
		}
		// 下滑
		$oBtnNext.on('click', function() {
			if ($(this).hasClass('active')) {
				// 激活状态才可用
				var iTop = iCurrPosTop - iStep;
				if (iTop >= iMinPosTop) {
					$oPicListWrapper.animate({
						'top': iTop + 'px'
					});
					iCurrPosTop = iTop;
					if (iCurrPosTop == iMinPosTop) {
						$oBtnNext.removeClass('active');
					}
				}
				// 控制prev按钮状态
				if (iCurrPosTop < 0) {
					$oBtnPrev.addClass('active');
				}
			}
		});
		// 上滑
		$oBtnPrev.on('click', function() {
			if ($(this).hasClass('active')) {
				// 激活状态才可用
				var iTop = iCurrPosTop + iStep;
				if (iCurrPosTop < 0) {
					$oPicListWrapper.animate({
						'top': iTop + 'px'
					});
					iCurrPosTop = iTop;
					if (iCurrPosTop > iMinPosTop) {
						$oBtnNext.addClass('active');
					}
				}
				// 控制prev按钮状态
				if (iCurrPosTop == 0) {
					$oBtnPrev.removeClass('active');
				}
			}
		});
	}

	function fnPicAutoPlay() {
		var $oDisplay = $('.display');
		var $oPicList = $oDisplay.find('.pic-list');
		var $oPicListWrapper = $oPicList.find('.pic-list-wrapper');
		var $aPicLi = $oPicList.find('li');
		var $oBtnPrev = $oPicList.siblings('.prev');
		var $oBtnNext = $oPicList.siblings('.next');
		var iHeight = $aPicLi.height();
		var iMaxViewNum = 4;
		var iLen = $aPicLi.length;
		var iMaxNum = Math.floor(iLen / iMaxViewNum);
		var iTimer = null;
		var iNow = 0;

		fnPlay();
		iTimer = setInterval(function() {
			fnPlay();
		}, 5000);
		$oDisplay.hover(function() {
			clearInterval(iTimer);
		}, function() {
			iTimer = setInterval(function() {
				fnPlay();
			}, 5000);
		});

		function fnPlay() {
			var iNum = Math.floor(iNow / iMaxViewNum);
			var iTop = -iNum * iHeight * iMaxViewNum;
			$oPicListWrapper.animate({
				'top': iTop + 'px'
			});
			if (iTop < 0) {
				$oBtnPrev.addClass('active');
			}
			if (iNum == iMaxNum) {
				$oBtnNext.removeClass('active');
			}
			$aPicLi.eq(iNow).trigger('click');
			iNow++;
			if (iNow > iLen - 1) {
				$oPicListWrapper.animate({
					'top': '0px'
				});
				$oBtnPrev.removeClass('active');
				if (iLen > iMaxViewNum) {
					$oBtnNext.addClass('active');
				}
				iNow = 0;
			}
		}
	}

	function fnPoundChange() {
		var $oPoundImg = $('.pound-img');
		var $aImg = $oPoundImg.find('img');
		var $oUl = $('.pound-btns');
		var $aLi = $oUl.find('li');
		$.each($aLi, function(i, ele) {
			$(ele).on('click', function() {
				$aImg.eq($(this).index()).addClass('active').siblings('img').removeClass('active');
				$(this).addClass('active').siblings('li').removeClass('active');
			});
		});
	}

	function fnNumChange() {
		var $oBtnMinus = $('.btn-minus');
		var $oBtnPlus = $('.btn-plus');
		var $oInput = $('.size-num');
		// 数量增加
		$oBtnPlus.on('click', function() {
			var iVal = parseInt($oInput.val());
			iVal++;
			if (iVal > 1) {
				$oBtnMinus.addClass('active');
			}
			$oInput.val(iVal);
		});
		// 数量减少
		$oBtnMinus.on('click', function() {
			var iVal = parseInt($oInput.val());
			iVal--;
			if (iVal <= 1) {
				iVal = 1;
				$oBtnMinus.removeClass('active');
			}
			$oInput.val(iVal);
		});
	}

	function fnCollect() {
		var $oCollect = $('.icon-collection');
		$oCollect.on('click', function() {
			if ($(this).hasClass('checked')) {
				$(this).removeClass('checked');
			} else {
				$(this).addClass('checked');
			}
		});
	}

	function fnAddToCart() {
		var $oBtnWrapper = $('.operation-btns');
		var $oAddToCart = $oBtnWrapper.find('.btn-add-to-cart');
		var $oMask = $('.mask-join-cart');
		var $oMaskClose = $oMask.find('.btn-close');
		var $oBtnBuyMore = $oMask.find('.btn-buy-more');
		$oAddToCart.on('click', function() {
			$oMask.show();
		});
		$oMaskClose.on('click', function() {
			$oMask.hide();
		});
		$oBtnBuyMore.on('click', function() {
			$oMask.hide();
		});
	}
	
	function fnSetMeal(){
		var oBtn = $('#set-meal-btn');
		oBtn.on('click',function(){
			var _this = $(this);
			if(_this.hasClass('active')){
				_this.removeClass('active');
			}else{
				_this.addClass('active');
			}
		});
	}
	
	function fnGawChange(){
		var $oContainer = $('.gaw-container');
		var $aLi = $oContainer.find('li');
		$.each($aLi, function(i, ele) {
			$(ele).on('click', function() {
				$(this).addClass('active').siblings('li').removeClass('active');
			});
		});
	}

})();