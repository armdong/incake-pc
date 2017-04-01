(function() {

    var flag = true,
    	content =$(".content03");
    $(".cake").click(function(){
    	$("#mask-register").fadeIn(function(){
    		$(".register").fadeIn();
    	})
    });
    $(".official").click(function(){
    	$("#mask").fadeIn(function(){
    		$("#mask .result").css("display","block");
			$(".shade-result").fadeIn();
		});
//  	if(!flag){
//  		$("#shade").fadeIn(function(){
//  			$(".shade-result").fadeIn();
//  		});
//  	}else{
//  		$("#mask-result").fadeIn(function(){
//  			$(".result").fadeIn();
//  		});
//  	}
    })
	$(".delete").click(function(){
		$(".result").fadeOut(function(){
			$("#shade").fadeOut();
			$("#mask-result").fadeOut();
			$("#mask").fadeOut();
			$("#mask-register").fadeOut();
		});
	})
	$(".draw").click(function(){
		$(".result").fadeOut(function(){
			$("#mask").fadeOut();
			$('html,body').animate({ scrollTop: content.offset().top}, 800);
    	$(".txt-mobile").focus();
		})
	})
})();
