(function() {

	$(function() {
		// 商品规格切换事件
		fnPoundChange();
		// 商品数量改变事件
		fnNumChange();
		// 加入购物篮
		fnAddToCart();
		//更改购物车商品数量
		fnChangePartsNum();
		// 移除已选配件
		fnRemoveParts();
	});


	function fnPoundChange() {
		var $oUl = $('.pound-btns');
		var $aLi = $oUl.find('li');
		var $oOperation = $('.operation');
		var $oBtnMinus = $oOperation.find('.btn-minus');
		var $oInput = $oOperation.find('.size-num');
		var iVal=1;
		$.each($aLi, function(i, ele) {
			$(ele).on('click', function() {
				var $aCartNums = $('.js-num').text();
				var $oText = $(this).find('a').text();
				var index;
				$(this).addClass('active').siblings('li').removeClass('active');
				//判断购物篮是否有此商品
				for(var i=0;i<$aCartNums.length;i++){
					 if($oText==$aCartNums[i]){
						 iVal = $($('.body-item')[i]).find('.size-num').val();
						 break;
					 }else{
						 iVal = 1;
					 }
				}
				//设置按钮背景色
				if(iVal>1){
					$oBtnMinus.addClass('active');
				}else{
					$oBtnMinus.removeClass('active');
				}
				//改变数量
				$oInput.val(iVal);
			});
		});
	}

	function fnNumChange() {
		var $oOperation = $('.operation');
		var $oBtnMinus = $oOperation.find('.btn-minus');
		var $oBtnPlus = $oOperation.find('.btn-plus');
		var $oInput = $oOperation.find('.size-num');
		// 数量增加
		$oBtnPlus.on('click', function() {
			var iVal = parseInt($oInput.val());
			iVal++;
			$oBtnMinus.addClass('active');
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

	function fnAddToCart() {
		var $oBtnWrapper = $('.operation-btns');
		var $oAddToCart = $oBtnWrapper.find('.btn-click');
		var $oBodyList = $('.body-list');
		var $oUnitPrice = $('.js-unitPrice');
		var $oPountBtn='';
		var $oInput='';
		var content1 = '<li class="body-item"><ul class="clearfix"><li class="b-product clearfix"><div class="img"><a href="javascript:;">'
			+'<img src="assets/img/shopping-cart/parts_img.jpg" alt="" /></a></div><div class="text"><p>数字蜡烛(<span class="js-num">';//+$oPountBtn+
		var content2 = '</span>)</p></div></li><li class="b-attr"><div class="text"><p><span class="js-count">';//+$oInput+
		var content3 = '</span>份</p></div></li><li class="b-price"><div class="text"><p>￥'+$oUnitPrice.text()+'</p></div></li><li class="b-num">'
			+'<div class="num"><a href="javascript:;" class="btn-minus"></a><input type="text" class="size-num count" value="';//+$oInput+
		var content4 = '" /><a href="javascript:;" class="btn-plus active"></a></div></li><li class="b-total"><div class="text"><p>￥<span class="js-price">';//+$oInput*2.5+
		var content5 = '</span></p></div></li><li class="b-operator"><a href="javascript:;" class="btn-delete"></a></li></ul></li>';
		
		$oAddToCart.on('click', function() {
			$oPountBtn = $('.pound-btns .active').text();
			$oInput = $('.operation .size-num').val();
			var $aCartNums = $('.body-item .b-product .js-num').text();
			var price = $oInput*$oUnitPrice.text();
			var count='';
			var countPrice;
			
			for(var i=0;i<$aCartNums.length;i++){
				count += $aCartNums[i];
			}
			//购物篮是否已有此商品
			var result = count.indexOf($oPountBtn);
			if(result > -1){
				var obj = $oBodyList.children('.body-item')[result];
				$(obj).find('.b-attr .js-count').text($oInput);
				$(obj).find('.b-num .count').val($oInput);
				if($oInput>1){
					$(obj).find('.btn-minus').addClass('active');
					if((price+'').indexOf('.')>-1){
						price = price+'0';
					}else{
						price = price+'.00';
					}
				}else{
					$(obj).find('.btn-minus').removeClass('active');
					price = $oUnitPrice.text();
				}
				$(obj).find('.js-price').text(price);
			}else{//无此商品
				if($oInput>1){
					content3 = '</span>份</p></div></li><li class="b-price"><div class="text"><p>￥'+$oUnitPrice.text()+'</p></div></li><li class="b-num">'
						+'<div class="num"><a href="javascript:;" class="btn-minus active"></a><input type="text" class="size-num count" value="';
					if((price+'').indexOf('.')>-1){
						countPrice = price+'0';
					}else{
						countPrice = price+'.00';
					}
				}else{
					countPrice = $oUnitPrice.text();
				}
				$oBodyList.append(content1+$oPountBtn+content2+$oInput+content3+$oInput+content4+countPrice+content5);
			}
			//重新计算总价
			Denominated();
		});
	}
	
	function fnChangePartsNum(){
		// 增加数量
		$(".section").delegate('.b-num .btn-plus','click',function(e){
			var $oBodyItem = $(this).closest('.body-item'); 
			var $oJsCount = $oBodyItem.find('.js-count');
			var $oJsPrice = $oBodyItem.find('.js-price');
			var $oBtnMinus = $(this).siblings('.btn-minus');
			var $oInput = $(this).siblings('.size-num');
			var iVal = parseInt($oInput.val());
			
			iVal++;
			$oBtnMinus.addClass('active');
			$oInput.val(iVal);
			$oJsCount.text(iVal);
			$oJsPrice.text(calculate(iVal));
			//重新计算总价
			Denominated();
		});
		// 减少数量
		$(".section").delegate('.b-num .btn-minus','click',function(e){
			var $oBodyItem = $(this).closest('.body-item'); 
			var $oJsCount = $oBodyItem.find('.js-count');
			var $oJsPrice = $oBodyItem.find('.js-price');
			var $oInput = $(this).siblings('.size-num');
			var iVal = parseInt($oInput.val());
			iVal--;
			if (iVal <= 1) {
				iVal = 1;
				$(this).removeClass('active');
			}
			$oInput.val(iVal);
			$oJsCount.text(iVal);
			$oJsPrice.text(calculate(iVal));
			//重新计算总价
			Denominated();
		});
	}
	
	function fnRemoveParts() {
		$(".section").delegate('.btn-delete','click',function(e){
			var $oBodyItem = $(this).closest('.body-item');
			//移除所选配件
			$oBodyItem.remove();
			//重新计算总价
			Denominated();
		});
	}
	
	//计算单件商品金额
	function calculate(count){
		var $oUnitPrice = $('.js-unitPrice');
		var price = $oUnitPrice.text();
		count *= price;
		if((count+'').indexOf('.')>-1){
			count = count+'0';
		}else{
			count = count+'.00';
		}
		return count;
	}
	
	//重新计算总价
	function Denominated(){
		var $oSubTotal = $('.js-subtotal');
		var $oTotalPrice = $('.js-totalPrice');
		var $aPrice = $('.js-price');
		var $aCount = $('.js-count');
		var count = 0;
		var $oTotal = $('.js-total');
		var total = 0;
		//计算总金额
		$.each($aPrice, function(i, ele) {
			count += parseFloat($(this).text());
		});
		if((count+'').indexOf('.')>-1){
			count = count+'0';
		}else{
			count = count+'.00';
		}
		//计算总数量
		$.each($aCount, function(i, ele) {
			total += parseInt($($aCount[i]).text());
		});
		//修改价格
		$oSubTotal.text(count);
		$oTotalPrice.text(count);
		//修改数量
		$oTotal.text(total);
	}

})();