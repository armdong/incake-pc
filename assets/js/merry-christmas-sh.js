(function() {
	$(function() {
		
		fnInit();
		
	});
	
	function fnInit(){
        var $oContent = $('.content'),
            $oBtnBuy = $oContent.find('.btn-buy'),
            regOverdue = true; // 活动过期验证
            
        // 活动过期验证
        if(regOverdue){
    		var $oMaskResult = $('#mask-result'),
    			$oTimeOut = $oMaskResult.find(".result-timeout"),
    			$aBtnClose =  $oMaskResult.find(".btn-ok");
    		
    		// 展示相应弹窗
        	$oMaskResult.css("display",'block');
    		$oTimeOut.css('display','block');
        	
    		// 关闭弹窗
    		$aBtnClose.on("click",function(){
    			$oMaskResult.css("display",'none');
        		$oTimeOut.css('display','none');
    		});
    		
    		// 关闭弹窗
    		$oBtnBuy.on("click",function(){
    			$oMaskResult.css("display",'block');
    			$oTimeOut.css('display','block');
    		});
        }else{
        	//完善其他正常功能操作
        	
        }
        
    }
    
})();