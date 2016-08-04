(function() {

    $(function() {

        var $oContainer = $('#register-container'),
            $oHot = $oContainer.find('.hot-product'),
            $oFrmContainer = $oContainer.find('.welfare'),
            iFrmT = $oFrmContainer.offset().top,
            iFrmH = $oFrmContainer.height(),
            iViewH = $(window).height(),
            disT = iFrmT - iViewH + iFrmH;

        fnFrmScroll(disT, $oFrmContainer);

        $(window).on('scroll', function() {
            fnFrmScroll(disT, $oFrmContainer);
        });

        fnTab($oHot);

        // 领取福利
        fnWelfare($oFrmContainer);

    });

    // 领取福利
    function fnWelfare($oWelfare) {
        var $aBtn = $oWelfare.find('.btn'),
            $oMask = $('#mask-wrapper'),
            $oMaskReg = $oMask.find('.mask-register'),
            $oMaskRegClose = $oMaskReg.find('.mask-close'),
            $oBtnReg = $oMaskReg.find('.btn-reg'),
            $oMaskComplete = $oMask.find('.mask-complete'),
            $oMaskCompleteClose = $oMaskComplete.find('.mask-close'),
            $oMaskExists = $oMask.find('.mask-exists'),
            $oMaskExistsClose = $oMaskExists.find('.mask-close');

        // TODO: 判断用户是否登录
        var isUserLogin = false;

        // 点击领取
        $aBtn.on('click', function(e) {
            $oMask.fadeIn(function() {
                if (isUserLogin) { // 用户已登录
                    $oMaskExists.fadeIn();
                } else { // 用户未登录
                    $oMaskReg.fadeIn();
                }
            });
        });

        // 关闭注册弹框
        $oMaskRegClose.on('click', function(e) {
            $oMaskReg.fadeOut(function() {
                $oMask.fadeOut();
            });
        });

        // 关闭注册成功提示框
        $oMaskCompleteClose.on('click', function(e) {
            $oMaskComplete.fadeOut(function() {
                $oMask.fadeOut();
            });
        });

        // 关闭老用户提示框
        $oMaskExistsClose.on('click', function(e) {
            $oMaskExists.fadeOut(function() {
                $oMask.fadeOut();
            });
        });

        // 提交注册
        $oBtnReg.on('click', function(e) {

            // TODO: 处理判断新老用户和新用户注册逻辑
            // 如果是老用户，关闭注册弹框，显示老用户提示
            // 如果注册成功，关闭注册弹框，显示注册成功弹框

            var isUserExists = false; // 是否是老用户
            var isComplete = true; // 是否注册成功

            if (isUserExists) { // 老用户
                $oMaskReg.fadeOut(function() {
                    $oMaskExists.fadeIn();
                });
            } else {
                if (isComplete) { // 注册成功
                    $oMaskReg.fadeOut(function() {
                        $oMaskComplete.fadeIn();
                    });
                }else { // 注册失败

                    // TODO: 处理失败逻辑
                    
                }
            }

        });
    }

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

})();
