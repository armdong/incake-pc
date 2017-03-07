(function() {

    var flag = true, //判断是否登录
    	register =true, //判断新老用户
    	Margery = true; //判断是小方还是芝士
    $(".Margery,.cheese").click(function(){
    	if(flag){
    		$("#mask-register").fadeIn(function(){
    			$(".register").fadeIn();
    		});
    	}else{
    		if(!flag){
    			$("#shade").fadeIn(function(){
    				$(".shade-result").fadeIn();
	    		});
	    	}else{
	    		$("#mask-result").fadeIn(function(){
	    			$(".result").fadeIn();
		    		if(Margery){
		    			$(".Margery_p").css("display","block");
		    		}else if(!Margery){
		    			$(".cheese_p").css("display","block");
		    		}
	    		});
	    		
	    	}
    	}
    	
    });
	$(".delete").click(function(){
		$(".result").fadeOut(function(){
			$("#shade").fadeOut();
			$("#mask-result").fadeOut();
			$("#mask-register").fadeOut();
		});
	});
})();
