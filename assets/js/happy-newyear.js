(function() {

	$(function() {

		var iClickFlag = true; // 防止连续点击抽奖

		fnLottery();
		fnPrizeSlide();
		fnContinue();

		// 转盘抽奖方法
		function fnLottery() {
			var iFlag = false,
				iMaxTime = 3, // 每天可抽奖的次数
				iCount = 0, // 当日已抽奖次数，需从后台记录并返回
				iOffset = 0;

			var $oLotteryTime = $('#lottery-time');
			var $oBtnLottery = $('#btn-lottery');
			$oBtnLottery.on('click', function() {

				if (!iFlag && iClickFlag) {

					iClickFlag = false; // 取反

					// 通过ajax到后台获取，返回0到5之间6个数值
					// 0 : 一等奖
					// 1 : 二等奖
					// 2 : 三等奖
					// 3 : 四等奖
					// 4 : 五等奖
					// 5 : 六等奖
					iOffset = Math.floor(fnRandom(0, 6));

					iCount++;
					fnRotate(iOffset);
					if (iCount == 3) {
						iFlag = !iFlag;
					}
					$oLotteryTime.html(iMaxTime - iCount);
				} else {
					if (iClickFlag) {
						alert('您今天已抽了3次，次数已用完，明天再来试试吧！');
					}
				}

			});
		}

		// 旋转方法
		function fnRotate(offset) {

			var $oPointer = $('#lottery-pointer');
			var $oPrizeList = $('#prize-list');
			var $aPrizeImg = $oPrizeList.find('>div');
			TweenLite.set($oPointer, {transformOrigin:'bottom center'});

			var arrResult = [
				'一等奖：女王芝士蛋糕+起泡酒',
				'二等奖：女王芝士蛋糕（或新年款蛋糕）',
				'三等奖：80元现金券',
				'四等奖：50元现金券',
				'五等奖：30元现金券',
				'六等奖：10元现金券'
			];

			// 转的总度数
			var iTotalDeg = (360 * 10) + (offset * 60);
			var tl = new TimelineLite();
			tl.clear();
			tl.to($oPointer, 5, {
				rotation: iTotalDeg,
				onComplete: fnComplete
			});

			function fnComplete() {
				iClickFlag = true; // 完成后将可点击状态重置为true
				$oPrizeList.css('z-index', '999').show();
				$aPrizeImg.fadeOut().eq(offset).fadeIn();
				tl.to($oPointer, 0, {
					rotation: 0
				});
			}
		}

		// 继续抽奖
		function fnContinue() {
			var $oPrizeList = $('#prize-list');
			var $aPrizeImg = $oPrizeList.find('>div');
			var $oLotteryTime = $('#lottery-time');
			var $oBtnContinue = $('#btn-continue');
			$oBtnContinue.on('click', function() {
				// 剩余抽奖次数，上线时应该由后台返回剩余次数进行判断，客户端可以篡改
				var iTimeLast = parseInt($oLotteryTime.html());
				if (iTimeLast > 0) {
					$oPrizeList.css('z-index', '').fadeOut();
					$aPrizeImg.hide();
					$('#btn-lottery').trigger('click');
				} else {
					//alert('您的次数已用完')
					fnShowMask();
				}
			});
		}

		function fnShowMask() {
			var $oMask = $('#lottery-mask');
			var $oBtnReturn = $oMask.find('.btn-return');
			$oMask.show();
			$oBtnReturn.on('click', function() {
				$oMask.hide();
			});
		}

		// 获取指定范围内的随机数
		function fnRandom(iMin, iMax) {
			return ((iMax - iMin) * Math.random()) + iMin;
		}

		function fnPrizeSlide() {
			$(".prize-box").slide({
				mainCell: ".list",
				autoPlay: true,
				effect: "topMarquee",
				vis: 7,
				interTime: 50
			});
		}

	});

})();