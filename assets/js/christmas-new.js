(function(){
	
	$(function(){		
		// 图片预加载
		fnPreLoadImg();		
	});
	
	function fnPreLoadImg(){		
		var arrImg = [
			'cake01.png', 
			'package02.png', 
			'cake02.png', 
			'photo02.png',
			'header-bg.jpg',
			'photo01.jpg',
			'wine.png',
			'banner.jpg',
			'GAW.png',
			'photoL.jpg',
			'GAW-big.jpg',
			'photoR.jpg',
			'button02.png',
			'button01.png',
			'logo.jpg',
			'body-bg.png'
		];		
		var num = 0;
		$.each(arrImg, function(index, obj) {
			var objImg = new Image();
			objImg.src = 'assets/img/christmas-new/' + obj;
			objImg.onload = function() {
				num++;
				if (num == arrImg.length) {
					fnShowSnow();
				}
			};
			//图片加载错误或不全
			objImg.onerror = function() {
				fnShowSnow();
			};
		});		
	}
	
	// 下雪动画
	function fnShowSnow(){
		$.fn.snow({ 
			minSize: 5,		//雪花的最小尺寸
			maxSize: 50, 	//雪花的最大尺寸
			newOn: 300		//雪花出现的频率 这个数值越小雪花越多
		});
	}
	
})();
