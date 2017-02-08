(function() {

    $(".close").click(function(){
    	$("#mask-result").fadeOut();
    	$("#mask").fadeOut();
    });
	
    $(".btn-01,.btn-02,.btn-03,.btn-04,.banner-bottom").click(function(){
    	$("#mask").fadeIn();
    })

})();