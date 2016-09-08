(function() {

    $(function() {

        var $oContainer = $('#register-container'),
            $oHot = $oContainer.find('.hot-product'),
            $oFrmContainer = $oContainer.find('.frm-container'),
            iFrmT = $oFrmContainer.offset().top,
            iFrmH = $oFrmContainer.height(),
            iViewH = $(window).height(),
            disT = iFrmT - iViewH + iFrmH;

        fnFrmScroll(disT, $oFrmContainer);

        $(window).on('scroll', function() {
            fnFrmScroll(disT, $oFrmContainer);
        });

        fnTab($oHot);

        // 页面跳转处理事件
        fnRedirect();

    });

    function fnTab($oHot) {
        var $oTabNav = $oHot.find('.tab-nav'),
            $aNavLi = $oTabNav.find('>li'),
            $oTabContent = $oHot.find('.tab-body'),
            $aContentLi = $oTabContent.find('>li');

        $.each($aNavLi, function(i, ele) {
            $(ele).on('click', function() {
                var _index = $(this).index();
                $(this).addClass('active').siblings('li').removeClass('active');
                $aContentLi.eq(_index).show().siblings('li').hide();
            });
        });
    }

    function fnFrmScroll(disT, $obj) {
        var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollT <= disT) {
            $obj.addClass('flt');
        } else {
            if ($obj.hasClass('flt')) {
                $obj.removeClass('flt');
            }
        }
    }

    // 处理页面跳转事件
    function fnRedirect() {

        var arrLink = [];

        // 拿到所有以.html结尾的a标签
        var $aLinks = $('a');
        $.each($aLinks, function(i, ele) {
            var _href = $(ele).attr('href');
            var reg = /.*\.html.*/i;
            if (reg.test(_href)) {
                arrLink.push(ele);
            }
        });

        //给所有的标签绑定事件
        for (var i = 0, len = arrLink.length; i < len; i++) {
            $(arrLink[i]).on('click', function(ev) {

                var _this = $(this);

                // 检测是否已经注册领取
                var $oHid = $('#hid_isreg');
                var isReg = parseInt($oHid.val(), 10) == 1 ? true : false;

                // 如果没有注册，弹出提示框
                if (!isReg) {

                    var _href = _this.attr('href');

                    // 处理弹框事件
                    handler4Pop(_href);

                    return false;
                }

            });
        }
    }

    // 处理弹框事件
    function handler4Pop(url){
        var $oMask = $('#mask-redirect'),
            $oBtnClose = $oMask.find('.btn-redirect-close'),
            $oBtnOk = $oMask.find('.btn-redirect-ok'),
            $oBtnCancel = $oMask.find('.btn-redirect-cancel'),
            $oTxtMobile = $('#register-container').find('.txt-mobile');

        $oMask.show();

        $oBtnOk.on('click',function(){
            $oMask.hide();
            $oTxtMobile.focus();            
        });
        $oBtnClose.on('click',function(){
            $oMask.hide();
            $oTxtMobile.focus(); 
        });
        $oBtnCancel.on('click',function(){
            window.location.href = url;
        });
    }

})();
