(function(){
	
	$(function(){		
		// 图片预加载
		fnPreLoadImg();		
	});
	
	function fnPreLoadImg(){		
		var arrImg = [
			'container_bg_v2.png', 
			'content_bg_v2.png', 
			'star_left_01.png', 
			'star_left_02.png', 
			'star_left_03.png', 
			'star_right_01.png', 
			'star_right_02.png', 
			'star_right_03.png', 
			'star_right_04.png', 
			'btn_buy_bg.png', 
			'cake_bg.png', 
			'christmas_car.png', 
			'christmas_flow_close.png', 
			'christmas_flow_open.png', 
			'christmas_wine_close.png', 
			'christmas_wine_open.png', 
			'roles_logo.png', 
			'snow_toy.png', 
			'text_bg.png', 
			'text_img.png', 
			'tip_flower.png', 
			'tip_sled.png', 
			'tip_wine.png',
			'bottom_bg.png',
			'roles_logo.jpg'
		];		
		var num = 0;
		$.each(arrImg, function(index, obj) {
			var objImg = new Image();
			objImg.src = 'assets/img/christmas/' + obj;
			objImg.onload = function() {
				num++;
				if (num == arrImg.length) {
					fnShowStar();
				}
			};
			//图片加载错误或不全
			objImg.onerror = function() {
				fnShowStar();
			};
		});		
	}
	
	// 星星动画
	function fnShowStar(){
		var $oLeftStarOne = $('#star-left-01');
		var $oLeftStarTwo = $('#star-left-02');
		var $oLeftStarThree = $('#star-left-03');
		var $oRightStarOne = $('#star-right-01');
		var $oRightStarTwo = $('#star-right-02');
		var $oRightStarThree = $('#star-right-03');
		var $oRightStarFour = $('#star-right-04');	
		var objArr = [$oLeftStarOne,$oLeftStarTwo,$oLeftStarThree,$oRightStarOne,$oRightStarTwo,$oRightStarThree,$oRightStarFour];
		$oRightStarTwo.animate({
			top : '0px'
		},600,function(){
			$oLeftStarOne.animate({
				top : '0px'
			},600,function(){
				$oLeftStarTwo.animate({
					top : '0px'
				},600,function(){
					$oRightStarFour.animate({
						top : '0px'
					},600,function(){
						$oRightStarThree.animate({
							top : '0px'
						},600,function(){
							$oRightStarOne.animate({
								top : '0px'
							},600,function(){
								$oLeftStarThree.animate({
									top : '0px'
								},600,function(){
									fnShake(objArr);
									fnShowCar();
								});
							});
						});
					});
				});
			});			
		});			
	}	
	
	function fnShake(arr){		
		$.each(arr, function(i,obj) {
			$(obj).css({
				'-webkit-animation' : 'ani-shake 2.5s linear both infinite',
				'-moz-animation' : 'ani-shake 2.5s linear both infinite',
				'-ms-animation' : 'ani-shake 2.5s linear both infinite',
				'-o-animation' : 'ani-shake 2.5s linear both infinite',
				'animation' : 'ani-shake 2.5s linear both infinite'
			});
		});		
	}
	
	// 鹿车动画
	function fnShowCar(){
		$('#christmas-car')
		.css({
			display : 'block'
		})
		.animate({
			left : '758px',
			top : '137px'
		}, 2000, function() {
			fnShowSnow();
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
