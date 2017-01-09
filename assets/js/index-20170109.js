(function() {

	$(function() {
		
		// 首页轮播图
		fnSwiper();
		fnCityLocation();
		// 公告侧边栏
		fnNotice();
		
	});
	
	
	function fnSwiper() {
		$('.swiper-container').each(function(index) {
			var count = $(this).find(".swiper-slide").length;
			if (count > 1) {
				var $this = $(this).swiper({
					pagination: '.swiper-pagination', //分页标记
					loop: true, //循环
					autoplay: 5000, //自动播放，不指定默认不播放，单位为ms
					autoplayDisableOnInteraction: false,
					speed: 1000,
					paginationClickable: true //分页标记是否可点击
				});
				//向左翻页
				$(this).find('.swiper-button-prev').on('click', function(e) {
					e.preventDefault(); //阻止默认的
					$this.swipePrev(); //前一个
				});
				//向右翻页
				$(this).find('.swiper-button-next').on('click', function(e) {
					e.preventDefault(); //阻止默认的
					$this.swipeNext(); //后一个
				});
				$(this).hover(function() {
					$this.stopAutoplay();
				}, function() {
					$this.startAutoplay();
				});
			} else {
				$(this).swiper({
					autoplay: false //自动播放，不指定默认不播放，单位为ms
				});
				$(this).find('.swiper-button-prev').hide();
				$(this).find('.swiper-button-next').hide();
			}
		});

	}
	
	function fnCityLocation(){
		var $oMaskLocation = $('.mask-city-location');
		var $oBtnOk = $oMaskLocation.find('.btn-location-ok');
		$oBtnOk.on('click',function(){
			$oMaskLocation.hide();
		});
	}
	
	/**
	 * 首页公告自动展开/收缩
	 */
	
	$(window).on('scroll.autoexpand',function(){
		var $oNotice = $('#notice');
		var scrollTop =$(document).scrollTop();
		if(scrollTop>900){
			$(".notice-handle").removeClass('active');
			$oNotice.css({
				'left':'-122px',
				'transition':'.5s'
			});
		}else{
			$(".notice-handle").addClass('active');
			$oNotice.css({
				'left':'0',
				'transition':'.5s'
			});
		}
	});
	function fnNotice(){
		var $oNotice = $('#notice');
		var $oNoticeHandle = $oNotice.find('.notice-handle');
		$oNoticeHandle.on('click',function(){
			var isActive = $(this).hasClass('active');
			if(isActive){
				// 移除监听事件
				$(window).off('scroll.autoexpand');
				$(this).removeClass('active');
				$oNotice.css({
					'left':'-122px',
					'transition':'.5s'
				});
			}else{
				// 移除监听事件
				$(window).off('scroll.autoexpand')
				$(this).addClass('active');
				$oNotice.css({
					'left':'0',
					'transition':'.5s'
				});
				if($(this).addClass('active')){
					// 重新绑定监听事件
					$(window).on('scroll.autoexpand',function(){
						var $oNotice = $('#notice');
						var scrollTop =$(document).scrollTop();
						if(scrollTop>900){
							$(".notice-handle").removeClass('active');
							$oNotice.css({
								'left':'-122px',
								'transition':'.5s'
							});
						}else{
							$(".notice-handle").addClass('active');
							$oNotice.css({
								'left':'0',
								'transition':'.5s'
							});
						}
					});
				}
			}
		});
	}

})();