(function() {

    $(function() {

        // 登录注册
        fnRegister();

    });

    function fnRegister() {
        var $oContainer = $('#register-container'),
            $oContentLogin = $oContainer.find('.content-login'),
            $oBefore = $oContentLogin.find(".before"),
            $oAfter = $oContentLogin.find(".after"),
            $oBtnVcode = $oBefore.find(".btn-vcode"),
            $oBtnGet = $oBefore.find(".btn-get"),
            status = true,
            time = 58;

        $oBtnVcode.on('click', function() {
        	if(status){
        		status = false;
	        	$oBtnVcode.css('backgroundColor','#c8c8c8').text('59" 后重新发送');
		    	var interval = setInterval(function(){
		    		$oBtnVcode.text(time-- +'" 后重新发送');
		    		if(time==-1){
		    			clearInterval(interval);
		    			time = 58;
		    			$oBtnVcode.css('backgroundColor','#da8287');
		    			$oBtnVcode.text('获取验证码');
		    			status = true;
		    		}
		    	},1000);
        	}
            
        });
        
        $oBtnGet.on('click', function() {
            $oBefore.hide(350);
            $oAfter.show(350);
        });
    }

})();
