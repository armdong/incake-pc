(function(){
	
	$(function(){
		fnMemorial();
	});
	
	function fnMemorial(){		
		var $oMemorial = $('.memorial-container');
		var $oMemorialList = $oMemorial.find('.memorial-list');
		var $oBtnNewMemorial = $oMemorial.find('.btn-new-memorial');
		var $oMaskNewMemorial = $('.mask-new-memorial');
		var $oMaskNewMemorialHeader = $oMaskNewMemorial.find('.new-memorial-header');
		var $oMonth = $oMaskNewMemorial.find('.selector-month');
		var $oDay = $oMaskNewMemorial.find('.selector-day');
		var $oName = $oMaskNewMemorial.find('.selector-name');
		var $oSummary = $oMaskNewMemorial.find('.txt-summary');
		var $oBtnMaskNewClose = $oMaskNewMemorial.find('.btn-new-memorial-close');
		var $oBtnMaskNewOk = $oMaskNewMemorial.find('.btn-new-memorial-ok');
		var $oBtnMaskNewCancel = $oMaskNewMemorial.find('.btn-new-memorial-cancel');		
		var $oMaskDeleteMemorial = $('.mask-memorial-delete');
		var $oBtnMaskDeleteClose = $oMaskDeleteMemorial.find('.btn-memorial-delete-close');
		var $oBtnMaskDeleteOk = $oMaskDeleteMemorial.find('.btn-memorial-delete-ok');
		var $oBtnMaskDeleteCancel = $oMaskDeleteMemorial.find('.btn-memorial-delete-cancel');		
		var iAction = 'new';
		var $oEditMemorial = null;		
		// 弹出新增纪念日模态框
		$oBtnNewMemorial.on('click',function(){
			fnEmptyMemorialMask();
			$oMaskNewMemorialHeader.find('>span').html('新加纪念日');
			iAction = 'new';
			$oEditMemorial = null;
			$oMaskNewMemorial.show();
		});
		// 确认新增或修改纪念日
		$oBtnMaskNewOk.on('click',function(){
			var txtMonth = $oMonth.find('.selector-val').html();
			var txtDay = $oDay.find('.selector-val').html();
			var txtName = $oName.find('.selector-val').html();
			var txtSummary = $oSummary.val();
			if(iAction == 'new'){
				var _html = '';
				_html += '<li class="memorial-item"><p class="item-title">';
				_html += '<span><i class="item-month">'+txtMonth+'</i>月<i class="item-day">'+txtDay+'</i>日</span>';
				_html += '</p><div class="item-content"><p>';
				_html += '<span>[ </span><span class="memorial-type">'+txtName+'</span><span> ] </span><span class="memorial-summary">'+txtSummary+'</span></p></div>';
				_html += '<p class="item-btns clearfix"><a href="javascript:;" class="btn-memorial-delete">删除</a><span class="split"></span><a href="javascript:;" class="btn-memorial-edit">修改</a></p></li>';
				$oMemorialList.prepend(_html);
				//重新计算last
				fnReCalLastCol();
			}else if(iAction == 'edit'){
				$oEditMemorial.find('.item-month').html(txtMonth);
				$oEditMemorial.find('.item-day').html(txtDay);
				$oEditMemorial.find('.memorial-type').html(txtName);
				$oEditMemorial.find('.memorial-summary').html(txtSummary);
			}
			$oMaskNewMemorial.hide();
		});
		// 修改纪念日
		$oMemorialList.delegate('.btn-memorial-edit', 'click', function() {
			var $oCurrLi = $(this).closest('li');
			// 绑定数据
			fnBindMask($oCurrLi);
			// 修改状态
			iAction = 'edit';
			$oEditMemorial = $oCurrLi;
			// 阻止事件冒泡
			return false;
		});
		// 删除纪念日
		$oMemorialList.delegate('.btn-memorial-delete', 'click', function() {
			var $oCurrLi = $(this).closest('li');
			$oMaskDeleteMemorial.show();
			$oBtnMaskDeleteClose.on('click', function() {
				$oMaskDeleteMemorial.hide();
			});
			$oBtnMaskDeleteCancel.on('click', function() {
				$oMaskDeleteMemorial.hide();
			});
			$oBtnMaskDeleteOk.on('click', function() {
				$oCurrLi.remove();
				fnReCalLastCol();
				$oMaskDeleteMemorial.hide();
			});
			// 阻止事件冒泡
			return false;
		});
		// 切换纪念日
		$oMemorialList.delegate('>li', 'click', function() {
			$(this).addClass('active').siblings('li').removeClass('active');
		});
		// 关闭模态框
		$oBtnMaskNewClose.on('click', function() {
			$oMaskNewMemorial.hide();
		});
		// 取消新增或编辑
		$oBtnMaskNewCancel.on('click', function() {
			$oMaskNewMemorial.hide();
		});
		// 清空纪念日模态框
		function fnEmptyMemorialMask(){
			$oMonth.find('.selector-val').html($oMonth.find('.selector-options').find('.option-item').eq(0).html());
			$oMonth.find('.selector-options').find('.option-item').eq(0).addClass('selected').siblings('.option-item').removeClass('selected');
			$oDay.find('.selector-val').html($oDay.find('.selector-options').find('.option-item').eq(0).html());
			$oDay.find('.selector-options').find('.option-item').eq(0).addClass('selected').siblings('.option-item').removeClass('selected');
			$oName.find('.selector-val').html($oName.find('.selector-options').find('.option-item').eq(0).html());
			$oName.find('.selector-options').find('.option-item').eq(0).addClass('selected').siblings('.option-item').removeClass('selected');
			$oSummary.val('');
		}
		// 重新计算last-col
		function fnReCalLastCol() {
			var $aMemorialLi = $oMemorialList.find('>li');
			$.each($aMemorialLi, function(i, ele) {
				$(ele).removeClass('last-col');
				if (i % 3 == 2) {
					$(ele).addClass('last-col');
				}
			});
			$aMemorialLi.eq(0).trigger('click');
		}
		// 模态框绑定数据
		function fnBindMask($oCurrLi) {
			var txtMonth = $oCurrLi.find('.item-month').html();
			var txtDay = $oCurrLi.find('.item-day').html();
			var txtName = $oCurrLi.find('.memorial-type').html();
			var txtSummary = $oCurrLi.find('.memorial-summary').html();
			// 修改模态框标题		
			$oMaskNewMemorialHeader.find('>span').html('修改纪念日');
			$oMonth.find('.selector-val').html(txtMonth);
			var $aMonthItem = $oMonth.find('.selector-options').find('.option-item');
			$.each($aMonthItem, function(i, ele) {
				if ($(ele).html() == txtMonth) {
					$(ele).addClass('selected');
				} else {
					$(ele).removeClass('selected');
				}
			});
			$oDay.find('.selector-val').html(txtDay);
			var $aDayItem = $oDay.find('.selector-options').find('.option-item');
			$.each($aDayItem, function(i, ele) {
				if ($(ele).html() == txtDay) {
					$(ele).addClass('selected');
				} else {
					$(ele).removeClass('selected');
				}
			});
			$oName.find('.selector-val').html(txtName);
			var $aNameItem = $oName.find('.selector-options').find('.option-item');
			$.each($aNameItem, function(i, ele) {
				if ($(ele).html() == txtName) {
					$(ele).addClass('selected');
				} else {
					$(ele).removeClass('selected');
				}
			});
			$oSummary.val(txtSummary);
			$oMaskNewMemorial.show();
		}		
	}
	
})();