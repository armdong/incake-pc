/**
 * js网页雪花效果
 */
(function(){
	$.fn.snow = function(options){
		var $flake = $('<div id="snowbox" />').css({'position': 'absolute', 'top': '130px'}).html('&#10052;'),
			documentHeight = $(document).height(),
			documentWidth = $(document).width(),
			defaults = {
							minSize		: 10,		//雪花的最小尺寸
							maxSize		: 20,		//雪花的最大尺寸
							newOn		: 1000,		//雪花出现的频率
							flakeColor	: "#fff"
						},
			options	= $.extend({}, defaults, options);
			var interval = setInterval( function(){
				var startPositionLeft = Math.random() * documentWidth-40,
				 	startOpacity = 0.5 + Math.random(),
					sizeFlake = options.minSize + Math.random() * options.maxSize,
					endPositionTop = documentHeight - 40,
					endPositionLeft = Math.random() * documentWidth-40,
					durationFall = documentHeight * 10 + Math.random() * 5000;
				$flake.clone().appendTo('body').css({
						left: startPositionLeft,
						opacity: startOpacity,
						'font-size': sizeFlake,
						color: options.flakeColor
					}).animate({
						top: endPositionTop,
						left: endPositionLeft,
						opacity: 0.2
					},durationFall,'linear',function(){
						$(this).remove()
					}
				);
			}, options.newOn);
	};
	
})();