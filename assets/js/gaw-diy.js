(function(window, document) {

    $(function() {
        var $oDiy = $('#gawDiy');

        // 定制申请
        fnFormApply($oDiy);
    });

    /**
     * 翻糖蛋糕定制申请
     * @param  {[type]} $oContainer [表单元素jQery对象]
     * @return {[type]}             [null]
     */
    function fnFormApply($oContainer) {

        var $oForm = $oContainer.find('.form-apply'),
            $aSpan = $oForm.find('.attrs').find('>span'),
            $oRequire = $oForm.find('#txtRequire'),
            $oLastWord = $oForm.find('#lastWord'),
            iMaxLen = 800;

        // 种类、口味和颜色切换逻辑
        $.each($aSpan, function(i, oSpan) {
            $(oSpan).on('click', function() {
                $(this).addClass('checked').siblings('span').removeClass('checked');
            });
        });

        // 字数限制逻辑
        $(document).on('keyup', function(e){
        	var text = $oRequire.val(),
        		iLen = text.length;

        	if (iLen > iMaxLen) {
        		$oRequire.val(text.substring(0, iMaxLen));
        		iLen = iMaxLen;
        	}
        	$oLastWord.html(iMaxLen - iLen);
        });
    }

})(window, document);
