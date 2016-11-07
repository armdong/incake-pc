(function($, window, document) {

	$(function() {

		// 城市切换
		fnInitLocation();

		// 抽奖初始化
		fnInitLottery();
	});

	/**
	 * 抽奖初始化逻辑
	 * @return {[type]} [description]
	 */
	function fnInitLottery() {
		var $oContainer = $('#rotaryContainer'),
			$oMsg = $oContainer.find('.msg'),
			$oInnerCircle = $oContainer.find('.inner-circle'),
			$oBtnLottery = $oContainer.find('.btn-lottery'),
			$oMaskWrapper = $('#maskWrapper'),
			$oDialogRegOrLogin = $('#dialogRegOrLogin'),
			$oDialogExpired = $('#dialogExpired'),
			tl = new TimelineLite(),
			validNum = 0,
			isExpired = false; // 是否过期


		// TODO 到后台拿到当前可抽奖次数及附带信息
		// cityCode: 城市代码，厦门地区当日晚上9点清空抽奖此时
		// expireTime: 过期时间
		// validNum: 有效抽奖次数
		var _data = {
			cityCode: '0592', // 城市代码
			expireTime: new Date(2016, 10, 7, 15, 10, 0), // 失效时间
			validNum: 2 // 有效抽奖次数
		};

		// 将当前有效抽奖次数放在全局变量validNum里面
		validNum = _data.validNum;

		fnBindMsg(_data);
		function fnBindMsg(_data) {

			var validTimes = _data.validNum,
				_html = '',
				startCountDown = false;

			var iNow = new Date().getTime();
			var timeDiff = _data.expireTime.getTime() - iNow;

			if(timeDiff < 0) { // 抽奖时间已失效
				isExpired = true;
				_html = '抽奖次数已失效，<a href="javascript:;" class="btn-invalid">为什么失效！</a>';
			} else {

				var diffSeconds = Math.round(timeDiff / 1000);

				// 判断当前时间离失效时间是否在15分钟之内
				if( diffSeconds <= 15 * 60 ) {
					var iMin = Math.floor(diffSeconds / 60),
						iSecond = diffSeconds % 60;
					_html = '可抽奖<span class="times">' + _data.validNum + '</span>次，<span class="countdown">' + iMin + '分' + iSecond + '秒</span>后失效！';
					startCountDown = true;
				} else {
					_html = '可抽奖<span class="times">' + validTimes + '</span>次！';
				}
			}
			
			$oMsg.html(_html);	

			if(startCountDown) {				
				// 开启倒计时
				fnMsgCountDown(_data.expireTime.getTime());
			}
		}

		// 抽奖过期倒计时
		function fnMsgCountDown(endTimestamp) {
			var $oTarget = $oMsg.find('.countdown'),
				timer = null,
	        	endTime = endTimestamp,
	        	curShowTimeSeconds = 0;

	        curShowTimeSeconds = getCurrentShowTimeSeconds();

	        timer = setInterval(function() {
	            render();
	            update();
	        }, 50);

	        function update() {
                var nextShowTimeSeconds = getCurrentShowTimeSeconds();
                var nextMinutes = parseInt(nextShowTimeSeconds / 60);
                var nextSeconds = nextShowTimeSeconds % 60;
                var curMinutes = parseInt(curShowTimeSeconds / 60);
                var curSeconds = curShowTimeSeconds % 60;
                if (nextSeconds != curSeconds) {
                    curShowTimeSeconds = nextShowTimeSeconds;
                }
            }

	        function render() {
	        	var minutes = parseInt(curShowTimeSeconds / 60);
                var seconds = curShowTimeSeconds % 60;

	            if (minutes === 0 && seconds === 0) {
	                clearInterval(timer);
	                isExpired = true;
	                $oMsg.html('抽奖次数已失效，<a href="javascript:;" class="btn-invalid">为什么失效！</a>');
	            } else {
	            	$oTarget.html(minutes + '分' + seconds + '秒');
	            }            
	        }

	        function getCurrentShowTimeSeconds() {
	            var curTime = new Date().getTime();
                var ret = endTime - curTime;
                ret = Math.round(ret / 1000);
                return ret >= 0 ? ret : 0;
	        }
		}


		/**
		 * ===================================================
		 * 转盘相关事件
		 * ===================================================
		 */

		// 点击抽奖
		$oBtnLottery.on('click', function() {

			// Step1: TODO 第一步：检测有没有登录
			var isLogin = true;

			// 未登录状态，弹出登录/注册提示框
			if(!isLogin) {
				$oMaskWrapper.fadeIn(function(){
					$oDialogRegOrLogin.fadeIn();
				});
				return false;
			}

			// 判断是否过期或当前抽奖次数是否有效
			if(isExpired) {	// 已过期
				$oMaskWrapper.fadeIn(function(){
					$oDialogExpired.fadeIn();
				});
				return false;
			}

			// TODO 到后台拿到当前抽到的奖项，计算需要转动的角度
			var rotation = 40;

			tl.clear();
			tl.to($oInnerCircle, 0, {
				rotation: 0
			}).to($oInnerCircle, 8, {
				rotation: 360 * 10 + rotation,
				ease: Circ.easeInOut,
				onComplete: function() {
					cb4Complete(); // 每次抽奖结束后的回调函数
				}
			});
		});

		// 为什么失效
		$oMsg.on('click', '.btn-invalid', function() {
			$oMaskWrapper.fadeIn(function(){
				$oDialogExpired.fadeIn();
			});
		});

		/**
		 * ============================================
		 * 登录/注册相关事件
		 * ============================================
		 */

		// 获取短信验证码
		$oDialogRegOrLogin.on('click', '.btn-vcode', function() {

			var $oThis = $(this),
				isSend = $oThis.attr('isSend');

			// TODO 手机号非空和合法性验证
			

			if(isSend === 'send') { // 已经发送

				// TODO 弹出提示框 提示当前正在获取短信验证码
				var currSec = $oThis.attr('seconds');
				console.log('短信验证码已发送，请' + currSec + 's后重新获取');

			} else { // 没有发送

				// TODO 发送验证码
				
				$oThis.attr('isSend', 'send'); // 发送成功标记为已发送状态
				handler4CountDown($(this), Date.now());
			}			
		});

		// 完成登录/注册
		$oDialogRegOrLogin.on('click', '.btn-confirm', function() {

			// TODO 验证验证码是否填写和正确性检测	
		});

		/**
		 * ============================================
		 * 弹框通用事件
		 * ============================================
		 */

		// 关闭登录/注册弹出层
		$('.dialog').on('click', '.dialog-close', function() {
			$(this).closest('.dialog').fadeOut(function() {
				$oMaskWrapper.fadeOut();
			});
		}).on('mouseover', '.dialog-close', function() { // 鼠标移入关闭按钮时的动画
			tl.clear();
			tl.to($(this), 0.5, {
				rotation: 180
			});
		}).on('mouseleave', '.dialog-close', function() { // 鼠标移出关闭按钮时的动画
			tl.clear();
			tl.to($(this), 0.5, {
				rotation: 0
			});
		});
	}

	/**
	 * 城市切换
	 * @return {[type]} [description]
	 */
	function fnInitLocation() {
		var $oRotaryHeader = $('#rotaryHeader'),
			$oBtnLocation = $oRotaryHeader.find('.btn-location'),
			$oDialogLocation = $oRotaryHeader.find('.dialog-location');

		// 城市切换dialog 显示/隐藏
		$oBtnLocation.hoverDelay({
             hoverDuring: 0, // 鼠标移入延时时间，单位ms
             outDuring: 200, // 鼠标移除延时时间，单位ms
             hoverEvent: function() { // 鼠标移入处理事件
                 $oDialogLocation.fadeIn();
             },
             outEvent: function() { // 鼠标移除处理事件
                 $oDialogLocation.fadeOut();
             }
         });

		// 城市切换
		$oDialogLocation.on('click', 'li', function() {
			$oBtnLocation.find('span').text($(this).text());
			$(this).addClass('active').siblings().removeClass('active');
			$oDialogLocation.fadeOut();
		});
	}


	/**
	 * =================================================
	 * 辅助函数/处理程序
	 * =================================================
	 */

	/**
	 * 倒计时处理程序
	 * @param  {[type]} $oTarget  [目标元素]
	 * @param  {[type]} timestamp [时间戳]
	 * @return {[type]}           [description]
	 */
	function handler4CountDown($oTarget, timestamp) {
		var timer = null;
		var beginTime = timestamp;
        var endTime = beginTime + 90 * 1000;
        var curShowTimeSeconds = 0;

        curShowTimeSeconds = getCurrentShowTimeSeconds();

        timer = setInterval(function() {
            render();
            update();
        }, 50);

        function update() {
            var nextShowTimeSeconds = getCurrentShowTimeSeconds();
            var nextSeconds = nextShowTimeSeconds;
            var curSeconds = curShowTimeSeconds;
            if (nextSeconds !== curSeconds) {
                curShowTimeSeconds = nextShowTimeSeconds;
            }
        }

        function render() {
            var seconds = curShowTimeSeconds;
            if (seconds === 0) {
                clearInterval(timer);

                // 倒计时完成把isSend设成空字符串
                $oTarget.attr('isSend', '');
                $oTarget.attr('seconds', '');
                $oTarget.html('重新获取');
            } else {
            	$oTarget.attr('seconds', seconds);
            	$oTarget.html(seconds + 's后重新获取');
            }            
        }

        function getCurrentShowTimeSeconds() {
            var curTime = new Date().getTime();
            var ret = endTime - curTime;
            ret = Math.round(ret / 1000);
            return ret >= 0 ? ret : 0;
        }
	}

})(jQuery, window, document);