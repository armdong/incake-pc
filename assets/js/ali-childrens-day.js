;(function(){
	var $buy = $('.btn-buy'),
		$shade = $('.shade'),
		$delete = $('.delete'),
		$number = $('.number');
	$buy.click(function(){
		if($number.text() === "0"){
			$('.shade').fadeIn();
		}
	});
	$delete.click(function(){
		$('.shade').fadeOut();
	})
})();
