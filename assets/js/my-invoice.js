(function() {

	$(function() {
		fnInvoiceInfo();
	});

	function fnInvoiceInfo() {
		var $oInvoice = $('.invoice-container');
		var $oInvoiceHeader = $oInvoice.find('.invoice-header');
		var $oBtnNewInvoice = $oInvoiceHeader.find('.btn-new-invoice');		
		var $oInvoiceBody = $oInvoice.find('.invoice-body');
		var $aInvoiceSection = $oInvoiceBody.find('.invoice-section');
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

		// 发票切换
		$aInvoiceSection.delegate('>li', 'click', function() {
			$(this).addClass('active').siblings('li').removeClass('active');
		});
		// 弹出新建发票模态框
		$oBtnNewInvoice.on('click', function() {
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
				_html += '<span class="h-target">' + txtTarget + '</span>';
				_html += '<span class="h-cake">' + txtContent + '</span>';
				_html += '</p><div class="section-content">';
				_html += '<p>' + txtName + '</p>';
				_html += '</div><p class="section-btns">';
				_html += '<a href="javascript:;" class="btn-invoice-edit">修改</a>|<a href="javascript:;" class="btn-invoice-delete">删除</a></p></li>';				
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
		function fnEmptyInvoiceMask() {
			$oName.val('');
			$oTarget.find('.selector-val').html($oTarget.find('.selector-options').find('.option-item').eq(0).html());
			$oTarget.find('.selector-options').find('.option-item').eq(0).addClass('selected').siblings('.option-item').removeClass('selected');
			$oContent.find('.selector-val').html($oContent.find('.selector-options').find('.option-item').eq(0).html());
			$oContent.find('.selector-options').find('.option-item').eq(0).addClass('selected').siblings('.option-item').removeClass('selected');
		}
		// 重新计算last-col
		function fnReCalLastCol($oInvoiceUl) {
			var $aInvoiceLi = $oInvoiceUl.find('>li');
			$.each($aInvoiceLi, function(i, ele) {
				$(ele).removeClass('last-col');
				if (i % 3 == 2) {
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

	// 检测字符串是否为空
	function isNullOrEmpty(obj) {
		if (obj == null || obj == '' || obj == undefined) {
			return true;
		} else {
			return false;
		}
	}

})();