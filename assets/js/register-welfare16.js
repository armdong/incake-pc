(function() {

    $(function() {
        //遮罩层处理事件
		fnShade();
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
})();
