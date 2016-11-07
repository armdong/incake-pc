(function($, window, document) {

	$(function() {

		// 立即领取初始化
		fnInit();
	});

	/**
	 * 立即领取初始化逻辑
	 * @return {[type]} [description]
	 */
	function fnInit() {
		var $oContainer = $('#kunbao').find('.kunbao-container'),
			$oBtnFetch = $oContainer.find('.btn-fetch'),
			$oMaskWrapper = $('#maskWrapper'),
			$oDialogRegOrLogin = $('#dialogRegOrLogin'),
			tl = new TimelineLite();

		// 立即领取
		$oBtnFetch.on('click', function() {

			// Step1: TODO 第一步：检测有没有登录
			var isLogin = false;

			// 未登录状态，弹出登录/注册提示框
			if(!isLogin) {
				$oMaskWrapper.fadeIn(function(){
					$oDialogRegOrLogin.fadeIn();
				});
				return false;
			}
		});



		/**
		 * ============================================
		 * 登录/注册相关事件
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
			
			// TODO 是否已领过券
			var isRecieved = true;

			$oDialogRegOrLogin.fadeOut(function(){
				if(!isRecieved) {
					$('#dialogSuccess').fadeIn();
				} else {
					$('#dialogRecieved').fadeIn();
				}
			});

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