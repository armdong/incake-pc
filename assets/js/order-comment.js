(function(){
	$(function(){
		fnRecord();
	});
	
	function fnRecord(){
		var $oBody = $('.content-body');
		var $aBtnItem = $oBody.find('.btn-item');
		
		$.each($aBtnItem, function(index,ele) {
			
			var $oUl = $(ele).find('>ul');
			var $aLi = $oUl.find('>li');
			
			$aLi.on('click',function(){
				var _index = $(this).index();
				for (var i = 0; i < $aLi.length; i++) {
					if(i <= _index){
						$aLi.eq(i).addClass('active');
					}else{
						$aLi.eq(i).removeClass('active');
					}
				}
			});
			
		});
	}
	
})();
