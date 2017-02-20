(function() {

    var flag = true,
    	content =$(".content03");
    $(".cake").click(function(){
    	$('html,body').animate({ scrollTop: content.offset().top}, 800);
    	$(".txt-mobile").focus();
    })
    $(".btn-quick-register").click(function(){
    	if(flag){
    		$("#shade").fadeIn(function(){
    			$(".shade-result").fadeIn();
    		});
    	}else{
    		$("#mask-result").fadeIn(function(){
    			$(".result").fadeIn();
    		});
    	}
    })
	$(".delete").click(function(){
		$(".result").fadeOut(function(){
			$("#shade").fadeOut();
			$("#mask-result").fadeOut();
		});
	})

})();
