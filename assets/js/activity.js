(function(){
	
	$(function(){
		fnActivityNav();
	});
	
	function fnActivityNav(){
		var $oActivity = $('.activity-container');
		var $oActivityNav = $oActivity.find('.activity-nav');
		var $aSetionTitle = $oActivityNav.find('.nav-section-title');
		var $aSetionList = $oActivityNav.find('.nav-section-list');
		$.each($aSetionTitle, function(i,ele) {
			$(ele).on('click',function(){
				if($(this).hasClass('open')){
					$(this).removeClass('open');
					$aSetionList.eq(i).removeClass('active');
				}else{
					$(this).addClass('open');
					$aSetionList.eq(i).addClass('active');
				}
			});
		});
	}
	
})();
