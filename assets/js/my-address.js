(function(){
	
	$(function(){
		fnAddress();
	});
	
	function fnAddress(){		
		var $oAddress = $('.address-container');
		var $oAddressUl = $oAddress.find('.address-list');
		var $oBtnNewAddress = $oAddress.find('.btn-new-address');
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
		var $oBtnMaskOk = $oMaskNewAddress.find('.btn-new-address-ok');
		var $oBtnMaskCancel = $oMaskNewAddress.find('.btn-new-address-cancel');	
		var $oSpan = $oMaskNewAddress.find('.default-address');
		var $oMaskDeleteAddress = $('.mask-address-delete');
		var $oBtnMaskDeleteClose = $oMaskDeleteAddress.find('.btn-address-delete-close');
		var $oBtnMaskDeleteOk = $oMaskDeleteAddress.find('.btn-address-delete-ok');
		var $oBtnMaskDeleteCancel = $oMaskDeleteAddress.find('.btn-address-delete-cancel');		
		var iAction = 'new';
		var $oEditAddress = null;
		// 是否设置为默认地址
		var isDefault = false;
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
				if(isDefault){
					$oAddressUl.find('.address-item').removeClass('active');
				}				
				var _html = '';
				_html += '<li class="address-item'+ (isDefault ? ' active':'') +'"><p class="item-title clearfix">';
				_html += '<span class="name">' + txtName + '</span>';
				_html += '<span class="tel-no">' + ((isNullOrEmpty(mobileNo) == false) ? mobileNo : telNo) + '</span>';
				_html += '</p><div class="item-content">';
				_html += '<p><span class="city">' + txtCity + '</span><span class="area">' + txtArea + '</span><span class="street">' + txtStreet + '</span><span class="address-more">' + txtAddressMore + '</span></p>';
				_html += '</div><p class="item-btns">';
				_html += '<a href="javascript:;" class="btn-address-delete">删除</a><span class="split"></span><a href="javascript:;" class="btn-address-edit">修改</a></p></li>';
				$oAddressUl.prepend(_html);
				//重新计算last
				fnReCalLastCol();
			} else if (iAction == 'edit') {
				var $oCurrHeader = $oEditAddress.find('.item-title');
				var $oCurrContent = $oEditAddress.find('.item-content');
				$oCurrHeader.find('.name').html(txtName);
				$oCurrHeader.find('.tel-no').html((isNullOrEmpty(mobileNo) == false) ? mobileNo : telNo);
				$oCurrContent.find('.city').html(txtCity);
				$oCurrContent.find('.area').html(txtArea);
				$oCurrContent.find('.street').html(txtStreet);
				$oCurrContent.find('.address-more').html(txtAddressMore);
				if(isDefault){
					$oAddressUl.find('.address-item').removeClass('active');
					$oEditAddress.addClass('active');
				}
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
			$oMaskDeleteAddress.show();
			$oBtnMaskDeleteClose.on('click', function() {
				$oMaskDeleteAddress.hide();
			});
			$oBtnMaskDeleteCancel.on('click', function() {
				$oMaskDeleteAddress.hide();
			});
			$oBtnMaskDeleteOk.on('click', function() {
				$oCurrLi.remove();
				fnReCalLastCol();
				$oMaskDeleteAddress.hide();
			});
			// 阻止事件冒泡
			return false;
		});
		// 关闭模态框
		$oBtnMaskClose.on('click', function() {
			$oMaskNewAddress.hide();
		});
		// 取消新增或编辑
		$oBtnMaskCancel.on('click', function() {
			$oMaskNewAddress.hide();
		});
		// 设置默认地址
		$oSpan.find('i').on('click',function(){
			var isChecked = $(this).hasClass('checked');
			if(isChecked){
				isDefault = false;
				$(this).removeClass('checked');
			}else{
				isDefault = true;
				$(this).addClass('checked');
			}
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
			$oSpan.find('i').removeClass('checked');
		}
		// 重新计算last-col
		function fnReCalLastCol() {
			var $aAddressLi = $oAddressUl.find('>li');
			$.each($aAddressLi, function(i, ele) {
				$(ele).removeClass('last-col');
				if (i % 3 == 2) {
					$(ele).addClass('last-col');
				}
			});
		}
		// 模态框绑定数据
		function fnBindMask($oCurrLi) {
			var $oCurrHeader = $oCurrLi.find('.item-title');
			var $oCurrContent = $oCurrLi.find('.item-content');
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
			if($oCurrLi.hasClass('active')){
				$oSpan.find('i').addClass('checked');
			}else{
				$oSpan.find('i').removeClass('checked');
			}
			$oMaskNewAddress.show();
		}		
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
