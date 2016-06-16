(function(){

	$(document).ready(function(){

		fnLoadHero();		

	});

	function fnLoadHero(){

		var $oHero = $('#superHero'),
			tl = new TimelineLite();

		tl.clear();

		tl.fromTo($oHero, 1, {
			scale: 3
		},{
			scale: 1,
			ease: Bounce.easeOut
		});
	}

})();