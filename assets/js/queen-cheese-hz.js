(function() {

    $(function() {

        // 领取福利
        fnWelfare();
    });

    // 领取福利
    function fnWelfare() {
        var $oContainer = $('#queenCheese'),
            $oFrmContainer = $oContainer.find('.bd-wrapper'),
            $aBtn = $oFrmContainer.find('.btn'),
            $oMask = $('#mask-wrapper'),
            $oMaskReg = $oMask.find('.mask-register'),
            $oMaskRegClose = $oMaskReg.find('.mask-close'),
            $oBtnReg = $oMaskReg.find('.btn-reg'),
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

                    // TODO 注册成功后跳转到支付页面
                    
                }else { // 注册失败

                    // TODO: 处理失败逻辑
                    
                }
            }

        });
    }

})();
