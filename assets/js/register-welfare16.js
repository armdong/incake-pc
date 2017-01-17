(function() {

    $(function() {
        //遮罩层处理事件
		fnShade();
		//遮罩层点击订购事件
		fnShadego();
    });

	function fnShade(){
		var $shade = $(".shade");
		var $shadeOrder = $(".shade-order");
		var $delete = $(".delete");
		setTimeout(function(){
			$shade.fadeIn(function(){
				$shadeOrder.fadeIn();
			})
		},3000)
		$delete.on('click',function(){
			$shadeOrder.fadeOut(function(){
				$shade.fadeOut();
			})
		})
	}
	function fnShadego(){
		var $shade = $(".shade");
		var $shadeOrderGo = $(".shade-order-go");
		var $delete = $(".delete");
	
		$(".orderOne,.orderTwo,.orderThree").on('click',function(){
			$shade.fadeIn(function(){
				$shadeOrderGo.fadeIn();
			})
		});
		$delete.on('click',function(){
			$shadeOrderGo.fadeOut(function(){
				$shade.fadeOut();
			})
		});
	}
})();
