(function(){

	$(document).ready(function() {

		// 动画实例
		var tl = new TimelineLite();

		// 调用飞机入场动画
		fnPlaneAnimation(tl);
	});

	// 飞机入场动画
	function fnPlaneAnimation(tl){
		var $oPlane = $('#plane');

		tl.clear();
		tl.to($oPlane, 3, {
			left: '199px',
			ease: Ease.easeOut
		});
	}

})();