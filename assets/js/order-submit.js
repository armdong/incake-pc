(function() {

	$(function() {
		// 送货信息
		fnAddressInfo();
		// 配送方式
		fnTransport();
		// 支付方式
		fnPayment();
		// 优惠信息
		fnDiscountInfo();
		// 我的优惠券
		fnMyTicket();
		// 发票信息
		fnInvoiceInfo();
		// 生日牌&贺卡
		fnBirthInfo();
		// 订单备注
		fnOrderSummary();
		// 图片蛋糕预览
		fnImagePreview();
		//订单确认
		fnOrderConfirm();
		// 闪电购地址信息
		fnFlashAddress();
		// 闪电购发票信息
		fnFlashInvoice();
	});

	function fnAddressInfo() {
		var $oAddress = $('.section-address-info');
		var $oAddressUl = $oAddress.find('.address-list');
		var $oBtnNewAddress = $oAddress.find('.btn-add-address');
		var $oMaskNewAddress = $('.mask-new-address');
		var $oMaskAddressHeader = $oMaskNewAddress.find('.new-address-header');
		var $oName = $oMaskNewAddress.find('.txt-receiver-name');
		var $oSelCity = $oMaskNewAddress.find('.selector-city');
		var $oSelArea = $oMaskNewAddress.find('.selector-area');
		var $oSelStreet = $oMaskNewAddress.find('.selector-street');
		var $oAddressMore = $oMaskNewAddress.find('.txt-receiver-address');
		var $oMobileNo = $oMaskNewAddress.find('.txt-receiver-mobile-no');
		var $oTelNo = $oMaskNewAddress.find('.txt-receiver-tel-no');
		var $oBtnMaskClose = $oMaskNewAddress.find('.btn-new-address-close');
		var $oBtnMaskCancel = $oMaskNewAddress.find('.btn-new-address-cancel');
		var $oBtnMaskOk = $oMaskNewAddress.find('.btn-new-address-ok');
		var $oMaskDel = $('.mask-address-delete');
		var $oBtnMaskDelClose = $oMaskDel.find('.btn-address-delete-close');
		var $oBtnMaskDelCancel = $oMaskDel.find('.btn-address-delete-cancel');
		var $oBtnMaskDelOk = $oMaskDel.find('.btn-address-delete-ok');
		var iAction = 'new';
		var $oEditAddress = null;
		// 弹出新增地址模态框
		$oBtnNewAddress.on('click', function() {
			fnEmptyMask();
			$oMaskAddressHeader.find('>span').html('新增收货地址');
			// 新增状态
			iAction = 'new';
			$oEditAddress = null;
			$oMaskNewAddress.show();
		});
		// 确认新增或修改地址
		$oBtnMaskOk.on('click', function() {
			var txtName = $oName.val();
			var txtCity = $oSelCity.find('.selector-val').html();
			var txtArea = $oSelArea.find('.selector-val').html();
			var txtStreet = $oSelStreet.find('.selector-val').html();
			var txtAddressMore = $oAddressMore.val();
			var mobileNo = $oMobileNo.val();
			var telNo = $oTelNo.val();
			if (iAction == 'new') {
				var _html = '';
				_html += '<li class="active"><p class="address-header clearfix">';
				_html += '<span class="name">' + txtName + '</span>';
				_html += '<span class="tel-no">' + ((isNullOrEmpty(mobileNo) == false) ? mobileNo : telNo) + '</span>';
				_html += '</p><div class="address-content">';
				_html += '<p><span class="city">' + txtCity + '</span><span class="area">' + txtArea + '</span><span class="street">' + txtStreet + '</span><span class="address-more">' + txtAddressMore + '</span></p>';
				_html += '</div><p class="address-btns">';
				_html += '<a href="javascript:;" class="btn-address-edit">修改</a>|<a href="javascript:;" class="btn-address-delete">删除</a></p></li>';
				$oAddressUl.prepend(_html);
				//重新计算last
				fnReCalLastCol();
			} else if (iAction == 'edit') {
				var $oCurrHeader = $oEditAddress.find('.address-header');
				var $oCurrContent = $oEditAddress.find('.address-content');
				$oCurrHeader.find('.name').html(txtName);
				$oCurrHeader.find('.tel-no').html((isNullOrEmpty(mobileNo) == false) ? mobileNo : telNo);
				$oCurrContent.find('.city').html(txtCity);
				$oCurrContent.find('.area').html(txtArea);
				$oCurrContent.find('.street').html(txtStreet);
				$oCurrContent.find('.address-more').html(txtAddressMore);
			}
			$oMaskNewAddress.hide();
		});
		// 修改地址
		$oAddressUl.delegate('.btn-address-edit', 'click', function() {
			var $oCurrLi = $(this).closest('li');
			// 绑定数据
			fnBindMask($oCurrLi);
			// 修改状态
			iAction = 'edit';
			$oEditAddress = $oCurrLi;
			// 阻止事件冒泡
			return false;
		});
		// 删除地址
		$oAddressUl.delegate('.btn-address-delete', 'click', function() {
			var $oCurrLi = $(this).closest('li');
			$oMaskDel.show();
			$oBtnMaskDelClose.on('click', function() {
				$oMaskDel.hide();
			});
			$oBtnMaskDelCancel.on('click', function() {
				$oMaskDel.hide();
			});
			$oBtnMaskDelOk.on('click', function() {
				$oCurrLi.remove();
				fnReCalLastCol();
				$oMaskDel.hide();
			});
			// 阻止事件冒泡
			return false;
		});
		// 切换地址
		$oAddressUl.delegate('>li', 'click', function() {
			$(this).addClass('active').siblings('li').removeClass('active');
		});
		// 关闭模态框
		$oBtnMaskClose.on('click', function() {
			$oMaskNewAddress.hide();
		});
		// 取消新增或编辑
		$oBtnMaskCancel.on('click', function() {
			$oMaskNewAddress.hide();
		});
		// 清空模态框
		function fnEmptyMask() {
			$oName.val('');
			$oSelCity.find('.selector-val').html($oSelCity.find('.selector-options').find('.option-item').eq(0).html());
			$oSelCity.find('.selector-options').find('.option-item').eq(0).addClass('selected').siblings('.option-item').removeClass('selected');
			$oSelArea.find('.selector-val').html($oSelArea.find('.selector-options').find('.option-item').eq(0).html());
			$oSelArea.find('.selector-options').find('.option-item').eq(0).addClass('selected').siblings('.option-item').removeClass('selected');
			$oSelStreet.find('.selector-val').html($oSelStreet.find('.selector-options').find('.option-item').eq(0).html());
			$oSelStreet.find('.selector-options').find('.option-item').eq(0).addClass('selected').siblings('.option-item').removeClass('selected');
			$oAddressMore.val('');
			$oMobileNo.val('');
			$oTelNo.val('');
		}
		// 重新计算last-col
		function fnReCalLastCol() {
			var $aAddressLi = $oAddressUl.find('>li');
			$.each($aAddressLi, function(i, ele) {
				$(ele).removeClass('last-col');
				if (i % 4 == 3) {
					$(ele).addClass('last-col');
				}
			});
			$aAddressLi.eq(0).trigger('click');
		}
		// 模态框绑定数据
		function fnBindMask($oCurrLi) {
			var $oCurrHeader = $oCurrLi.find('.address-header');
			var $oCurrContent = $oCurrLi.find('.address-content');
			var txtName = $oCurrHeader.find('.name').html();
			var telNo = $oCurrHeader.find('.tel-no').html();
			var txtCity = $oCurrContent.find('.city').html();
			var txtArea = $oCurrContent.find('.area').html();
			var txtStreet = $oCurrContent.find('.street').html();
			var txtAddressMore = $oCurrContent.find('.address-more').html();
			// 修改模态框标题		
			$oMaskAddressHeader.find('>span').html('修改收货地址');
			$oName.val(txtName);
			$oSelCity.find('.selector-val').html(txtCity);
			var $aCityItem = $oSelCity.find('.selector-options').find('.option-item');
			$.each($aCityItem, function(i, ele) {
				if ($(ele).html() == txtCity) {
					$(ele).addClass('selected');
				} else {
					$(ele).removeClass('selected');
				}
			});
			$oSelArea.find('.selector-val').html(txtArea);
			var $aAreaItem = $oSelArea.find('.selector-options').find('.option-item');
			$.each($aAreaItem, function(i, ele) {
				if ($(ele).html() == txtCity) {
					$(ele).addClass('selected');
				} else {
					$(ele).removeClass('selected');
				}
			});
			$oSelStreet.find('.selector-val').html(txtStreet);
			var $aStreetItem = $oSelStreet.find('.selector-options').find('.option-item');
			$.each($aStreetItem, function(i, ele) {
				if ($(ele).html() == txtCity) {
					$(ele).addClass('selected');
				} else {
					$(ele).removeClass('selected');
				}
			});
			$oAddressMore.val(txtAddressMore);
			$oMobileNo.val(telNo);
			$oMaskNewAddress.show();
		}
	}

	function fnTransport() {
		var $oTransport = $('.section-transport');
		var $oTab = $oTransport.find('.tab-list');
		var $aTabLi = $oTab.find('>li');
		var $oContent = $oTransport.find('.content-list');
		var $aContentLi = $oContent.find('>li');
		var $aContentBody = $aContentLi.find('.content-body');
		var $aBodyLi = $aContentBody.find('>li');
		$aTabLi.each(function(i, ele) {
			$(ele).on('click', function() {
				$(this).addClass('active').siblings('li').removeClass('active');
				$aContentLi.eq($(this).index()).addClass('active').siblings('li').removeClass('active');
			});
		});
		$aBodyLi.each(function(i, ele) {
			$(ele).on('click', function() {
				$(this).addClass('active').siblings('li').removeClass('active');
			});
		});
	}

	function fnPayment() {
		var $oPayment = $('.section-payment');
		var $oTab = $oPayment.find('.tab-list');
		var $aTabLi = $oTab.find('>li');
		var $oContent = $oPayment.find('.content-list');
		var $aContentLi = $oContent.find('>li');
		var $aContentBody = $aContentLi.find('.content-body');
		var $aBodyLi = $aContentBody.find('>li');
		$aTabLi.each(function(i, ele) {
			$(ele).on('click', function() {
				$(this).addClass('active').siblings('li').removeClass('active');
				$aContentLi.eq(i).addClass('active').siblings('li').removeClass('active');
			});
		});
		$aBodyLi.each(function(i, ele) {
			$(ele).on('click', function() {
				$(this).addClass('active').siblings('li').removeClass('active');
			});
		});
	}

	function fnDiscountInfo() {
		var $oPayment = $('.section-payment');
		var $oDiscount = $oPayment.find('.discount-info');
		var $oTab = $oDiscount.find('.tab-list');
		var $aTabDd = $oTab.find('>dd');
		var $oContent = $oDiscount.find('.content-list');
		var $aContentLi = $oContent.find('>li');
		$aTabDd.each(function(i, ele) {
			$(ele).on('click', function() {
				$(this).addClass('active').siblings('dd').removeClass('active');
				$aContentLi.eq(i).addClass('active').siblings('li').removeClass('active');
			});
		});
		// 蛋糕卡兑换
		fnCakeCardExchange($oContent);
		// 现金券兑换
		fnCashTicketExchange($oContent);
		// 优惠/团购券验证
		fnTicketVerify($oContent);

		function fnCakeCardExchange($oContent) {
			var $oCakeCardContent = $oContent.find('.cake-card-content');
			fnExchange($oCakeCardContent, 'cake-card');
		}

		function fnCashTicketExchange($oContent) {
			var $oCashTicketContent = $oContent.find('.cash-ticket-content');
			fnExchange($oCashTicketContent, 'cask-ticket');
		}

		function fnTicketVerify($oContent) {
			var $oTicketContent = $oContent.find('.ticket-content');
			fnExchange($oTicketContent, 'ticket');
		}

		function fnExchange($oCakeCardContent, cardType) {
			var _cardType = '';
			switch (cardType) {
				case 'cake-card':
					_cardType = '蛋糕卡';
					break;
				case 'cask-ticket':
					_cardType = '现金券';
					break;
				case 'ticket':
					_cardType = '优惠/团购券';
					break;
				default:
					_cardType = '蛋糕卡';
					break;
			}
			var $oCardId = $oCakeCardContent.find('.txt-cake-card');
			var $oCardPwd = $oCakeCardContent.find('.pwd-cake-card');
			var $oBtnExchange = $oCakeCardContent.find('.btn-exchange');
			var $oCardList = $oCakeCardContent.find('.card-list');
			// 新增蛋糕卡
			$oBtnExchange.on('click', function() {
				var $aCardItem = $oCardList.find('.card-item');
				var iFirst = true;
				var _html = '';
				if ($aCardItem.length == 0) {
					_html += '<div class="card-item last clearfix">';
				} else {
					_html += '<div class="card-item clearfix">';
					iFirst = false;
				}
				_html += '<p class="l-card-pwd">' + _cardType + '卡号后5位 ' + $oCardId.val() + '</p>';
				_html += '<p class="l-card-money">￥15.00</p>';
				_html += '<p class="l-card-operator"><a href="javascript:;" class="btn-card-delete"></a></p></div>';
				if (iFirst) {
					$oCardList.html(_html);
				} else {
					$oCardList.prepend(_html);
				}
				$oCardId.val('');
				$oCardPwd.val('');
			});
			// 删除蛋糕卡
			$oCardList.delegate('.btn-card-delete', 'click', function() {
				$(this).closest('.card-item').remove();
				fnReCalcLastItem();
			});

			function fnReCalcLastItem() {
				var $aCardItem = $oCardList.find('.card-item');
				if ($aCardItem.length > 0) {
					$aCardItem.last().addClass('last');
				}
			}
		}
	}

	function fnMyTicket() {
		var $oPayment = $('.section-payment');
		var $oMyTicket = $oPayment.find('.my-ticket');
		var $oTicketHeader = $oMyTicket.find('.ticket-title');
		var $oTicketContent = $oMyTicket.find('.ticket-content');
		var $oContentList = $oTicketContent.find('.content-list');
		var $aContentItem = $oContentList.find('.content-item');
		$oTicketHeader.on('click', function() {
			var $oSpan = $(this).find('>span');
			if ($oSpan.hasClass('open')) {
				$oSpan.removeClass('open');
				$oTicketContent.hide();
			} else {
				$oSpan.addClass('open');
				$oTicketContent.show();
			}
		});
		$aContentItem.each(function(i, ele) {
			$(ele).on('click', function() {
				$(this).addClass('active').siblings('.content-item').removeClass('active');
			});
		});
	}

	function fnInvoiceInfo() {
		var $oMore = $('.section-more-info');
		var $oInvoiceSwitch = $oMore.find('.invoice-header').find('.mock-selector');
		var $aSelectorOption = $oInvoiceSwitch.find('.option-item');
		var $oInvoiceBody = $oMore.find('.invoice-body');
		var $aInvoiceSection = $oInvoiceBody.find('.invoice-section');
		var $oBtnNewInvoice = $oInvoiceBody.find('.btn-add-invoice');
		var $oMaskNewInvoice = $('.mask-new-invoice');		
		var $oMaskInvoiceHeader = $oMaskNewInvoice.find('.new-invoice-header');
		var $oMaskInvoiceContent = $oMaskNewInvoice.find('.new-invoice-content');
		var $oTargetShow = $oMaskInvoiceContent.find('.target-show');
		var $oTargetHidden = $oMaskInvoiceContent.find('.target-hidden');
		var $oTarget = $oMaskInvoiceContent.find('.selector-target');
		var $oContent = $oMaskInvoiceContent.find('.selector-content');
		var $oName = $oMaskInvoiceContent.find('.txt-invoice-name');
		var $oBtnMaskClose = $oMaskNewInvoice.find('.btn-new-invoice-close');
		var $oBtnMaskCancel = $oMaskNewInvoice.find('.btn-new-invoice-cancel');
		var $oBtnMaskOk = $oMaskNewInvoice.find('.btn-new-invoice-ok');		
		var $oInvoiceUl = $aInvoiceSection.filter('.active');
		var $oMaskDel = $('.mask-invoice-delete');
		var $oBtnMaskDelClose = $oMaskDel.find('.btn-invoice-delete-close');
		var $oBtnMaskDelCancel = $oMaskDel.find('.btn-invoice-delete-cancel');
		var $oBtnMaskDelOk = $oMaskDel.find('.btn-invoice-delete-ok');
		var iAction = 'new';
		var $oEditInvoice = null;
		// 发票抬头切换
		$.each($aSelectorOption, function(i,ele) {
			$(ele).on('click',function(){
				$aInvoiceSection.eq(i).addClass('active').siblings('.invoice-section').removeClass('active');
				$oInvoiceUl = $aInvoiceSection[i];
			});
		});
		// 发票切换
		$aInvoiceSection.delegate('>li','click',function(){
			$(this).addClass('active').siblings('li').removeClass('active');
		});
		// 弹出新建发票模态框
		$oBtnNewInvoice.on('click',function(){			
			fnEmptyInvoiceMask();
			$oMaskInvoiceHeader.find('>span').html('新增发票');
			$oTargetShow.show();
			$oTargetHidden.hide();
			// 新增状态
			iAction = 'new';
			$oEditInvoice = null;
			$oMaskNewInvoice.show();
		});
		// 修改发票
		$aInvoiceSection.delegate('.btn-invoice-edit', 'click', function() {
			var $oCurrLi = $(this).closest('li');
			// 绑定数据
			fnBindMask($oCurrLi);
			// 修改状态
			iAction = 'edit';
			$oEditInvoice = $oCurrLi;
			// 阻止事件冒泡
			return false;
		});
		// 删除发票
		$aInvoiceSection.delegate('.btn-invoice-delete', 'click', function() {
			var $oCurrLi = $(this).closest('li');
			$oMaskDel.show();
			$oBtnMaskDelClose.on('click', function() {
				$oMaskDel.hide();
			});
			$oBtnMaskDelCancel.on('click', function() {
				$oMaskDel.hide();
			});
			$oBtnMaskDelOk.on('click', function() {
				$oCurrLi.remove();
				fnReCalLastCol($oInvoiceUl);
				$oMaskDel.hide();
			});
			// 阻止事件冒泡
			return false;
		});
		// 确认新增或修改发票
		$oBtnMaskOk.on('click', function() {
			var txtName = $oName.val();
			var txtTarget = $oTarget.find('.selector-val').html();
			var txtContent = $oContent.find('.selector-val').html();
			if (iAction == 'new') {
				var _html = '';
				_html += '<li class="active"><p class="section-header clearfix">';
				_html += '<span class="h-type">普通发票</span>';
				_html += '<span class="h-target">'+txtTarget+'</span>';
				_html += '<span class="h-cake">'+txtContent+'</span>';
				_html += '</p><div class="section-content">';
				_html += '<p>'+txtName+'</p>';
				_html += '</div><p class="section-btns">';
				_html += '<a href="javascript:;" class="btn-invoice-edit">修改</a>|<a href="javascript:;" class="btn-invoice-delete">删除</a></p></li>';
				//判断发票抬头
				if(txtTarget == '公司'){
					$oInvoiceUl = $aInvoiceSection.filter('.invoice-company');
				}else{
					$oInvoiceUl = $aInvoiceSection.filter('.invoice-personal');
				}
				$oInvoiceUl.prepend(_html);
				//重新计算last
				fnReCalLastCol($oInvoiceUl);
			} else if (iAction == 'edit') {				
				var $oCurrHeader = $oEditInvoice.find('.section-header');
				var $oCurrContent = $oEditInvoice.find('.section-content');
				$oCurrHeader.find('.h-cake').html(txtContent);
				$oCurrContent.find('p').html(txtName);
			}
			$oMaskNewInvoice.hide();
		});
		// 关闭模态框
		$oBtnMaskClose.on('click', function() {
			$oMaskNewInvoice.hide();
		});
		// 取消新增或编辑
		$oBtnMaskCancel.on('click', function() {
			$oMaskNewInvoice.hide();
		});
		// 清空模态框
		function fnEmptyInvoiceMask(){
			$oName.val('');
			$oTarget.find('.selector-val').html($oTarget.find('.selector-options').find('.option-item').eq(0).html());
			$oTarget.find('.selector-options').find('.option-item').eq(0).addClass('selected').siblings('.option-item').removeClass('selected');
			$oContent.find('.selector-val').html($oContent.find('.selector-options').find('.option-item').eq(0).html());
			$oContent.find('.selector-options').find('.option-item').eq(0).addClass('selected').siblings('.option-item').removeClass('selected');
		}
		// 重新计算last-col
		function fnReCalLastCol($oInvoiceUl) {
			var $aInvoiceLi = $($oInvoiceUl).find('>li');
			$.each($aInvoiceLi, function(i, ele) {
				$(ele).removeClass('last-col');
				if (i % 4 == 3) {
					$(ele).addClass('last-col');
				}
			});
			$aInvoiceLi.eq(0).trigger('click');
		}
		// 模态框绑定数据
		function fnBindMask($oCurrLi) {
			var $oCurrHeader = $oCurrLi.find('.section-header');
			var $oCurrContent = $oCurrLi.find('.section-content');
			var txtTarget = $oCurrHeader.find('.h-target').html();
			var txtContent = $oCurrHeader.find('.h-cake').html();
			var txtName = $oCurrContent.find('p').html();
			// 修改模态框标题		
			$oMaskInvoiceHeader.find('>span').html('修改发票');
			$oName.val(txtName);
			$oTargetShow.hide();
			$oTargetHidden.show();
			$oTargetHidden.find('.content-target').html(txtTarget);
			$oContent.find('.selector-val').html(txtContent);
			var $aContentItem = $oContent.find('.selector-options').find('.option-item');
			$.each($aContentItem, function(i, ele) {
				if ($(ele).html() == txtContent) {
					$(ele).addClass('selected');
				} else {
					$(ele).removeClass('selected');
				}
			});
			$oMaskNewInvoice.show();
		}
	}
	
	function fnBirthInfo(){
		var $oBirth = $('.birth-info');
		var $oBirthCard = $oBirth.find('.birth-card');
		var $oBSelector = $oBirthCard.find('.mock-selector');
		var $oBVal = $oBSelector.find('.selector-val');
		var $oBUl = $oBSelector.find('.selector-options');
		var $aBItem = $oBUl.find('.option-item');
		var $oBItemDiy = $oBUl.find('.option-diy');
		var $oInput = $oBItemDiy.find('.txt-diy-content');
		var $oBtnOk = $oBItemDiy.find('.btn-diy-ok');
		
		var $oCongratulationCard = $oBirth.find('.congratulation-card');
		var $oCSelector = $oCongratulationCard.find('.mock-selector');
		var $oCVal = $oCSelector.find('.selector-val');
		var $oCUl = $oCSelector.find('.selector-options');
		var $aCItem = $oCUl.find('.option-item');	
		var $oTextCongratulation = $oCongratulationCard.find('.txt-congratulation');
		//生日牌选择
		$aBItem.each(function(i,ele){
			// 解绑前面定义的click事件
			$(ele).unbind('click');
			$(ele).on('click',function(e){
				var iVal = $(this).html();				
				if(iVal == '自定义'||$(this).hasClass('option-diy')){
					if(iVal == '自定义'){
						$(this).hide();
						$(this).siblings('.option-diy').show();
					}
				}else{
					$oBItemDiy.hide();
					$oInput.val('');
					$oBItemDiy.prev('.option-item').show();
					$oBVal.html(iVal);
					$oBUl.removeClass('active');
				}				
				if(iVal == '无'){
					$oBVal.html('请选择生日牌');
				}				
			});
		});		
		$oBtnOk.on('click',function(){
			var iVal = $oInput.val();
			$oBVal.html(iVal);
			$oBUl.removeClass('active');
		});
		// 贺卡选择
		$aCItem.each(function(i,ele){
			$(ele).on('click',function(){
				if($(this).html() == '无'){
					$oCVal.html('请选择贺卡');
					$oTextCongratulation.hide();
				}else{
					$oTextCongratulation.show();
				}
			});
		});
	}
	
	function fnOrderSummary(){
		var $oSummary = $('.order-summary');
		var $oSummaryTitle = $oSummary.find('.summary-title');
		var $oSpan = $oSummaryTitle.find('span');
		var $oSummaryContainer = $oSummary.find('.summary-container');
		$oSummaryTitle.on('click',function(){
			if($oSpan.hasClass('open')){
				$oSpan.removeClass('open');
				$oSummaryContainer.hide();
			}else{
				$oSpan.addClass('open');
				$oSummaryContainer.show();
			}
		});
	}
	
	function fnOrderConfirm(){
		var $oBtnOrderSubmit= $('.btn-order-submit');
		var $oMaskOrderConfirm = $('.mask-order-confirm');
		var $oBtnConfirmClose = $oMaskOrderConfirm.find('.btn-confirm-close');
		var $oBtnConfirmCancel = $oMaskOrderConfirm.find('.btn-confirm-cancel');
		$oBtnOrderSubmit.on('click',function(){
			$oMaskOrderConfirm.show();
		});
		$oBtnConfirmClose.on('click',function(){
			$oMaskOrderConfirm.hide();
		});
		$oBtnConfirmCancel.on('click',function(){
			$oMaskOrderConfirm.hide();
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
	
	function fnFlashAddress(){
		var $oFlashForm = $('.form-flash-address');
		var $oBtnVcode = $oFlashForm.find('.btn-flash-vcode');
		var $oMaskVcode = $('.mask-vcode');
		var $oBtnMaskClose = $oMaskVcode.find('.btn-vcode-close');
		var $oBtnMaskCancel = $oMaskVcode.find('.btn-vcode-cancel');
		var $oBtnReciever = $oFlashForm.find('.chk-reciever').find('i');
		$oBtnVcode.on('click',function(){
			$oMaskVcode.show();
		});
		$oBtnMaskClose.on('click',function(){
			$oMaskVcode.hide();
		});
		$oBtnMaskCancel.on('click',function(){
			$oMaskVcode.hide();
		});
		$oBtnReciever.on('click',function(){
			if($(this).hasClass('checked')){
				$(this).removeClass('checked');
			}else{
				$(this).addClass('checked');
			}
		});
	}
	
	function fnFlashInvoice(){
		var $oInvoiceFlash = $('.invoice-flash');
		var $oSelector = $oInvoiceFlash.find('.selector-target');
		var $aSelectorItem = $oSelector.find('.option-item');
		var $oInvoiceWrapper = $oInvoiceFlash.find('.invoice-wrapper');
		var $oTarget = $oInvoiceWrapper.find('.content-target');
		$aSelectorItem.each(function(i,ele){
			$(ele).on('click',function(){
				var _val = $(this).html();
				if(_val === '无'){
					$oInvoiceWrapper.hide();
				}else{
					$oTarget.html(_val);
					$oInvoiceWrapper.show();
				}
			});
		});
	}
	
	// 检测字符串是否为空
	function isNullOrEmpty(obj) {
		if (obj == null || obj == '' || obj == undefined) {
			return true;
		} else {
			return false;
		}
	}

})();