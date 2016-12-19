/**
 * js网页雪花效果
 */
(function(){
	$.fn.snow = function(options){
		
		var $flake = $('<div id="snowbox" />').css({'position': 'absolute', 'top': '130px'}),
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
					
				//随机生成雪花或者圆点效果
				var random = Math.floor(Math.random()*2),
					_html = '';
				if(random==0){
					_html = '<img src="assets/img/index-merrychristmas/icon_snow.png" />';
				}else{
					_html = '&#10052;';
				}
				$flake.html(_html),
					
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