(function($){

	$(function(){

		fnLocation();

	});

	function fnLocation() {
		var $oBtnLocation = $('#btnLocation'),
			$oMaskLocation = $('#maskLocation'),
			$oUl = $oMaskLocation.find('.content');

		$oBtnLocation.on('click', function(){
			$oMaskLocation.fadeIn();
		});

		$oUl.on('click', 'li', function(){
			$(this).addClass('active').siblings('li').removeClass('active');
			$oBtnLocation.text($(this).html());
			$oMaskLocation.delay(100).fadeOut();
		});
	}

})(jQuery);