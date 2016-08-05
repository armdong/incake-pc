(function(window, document) {

    $(document).ready(function() {

        var $oContainer = $('#superhive'),
            $oBee = $('#mosueBee'),
            $oBtn = $('#btnBuy'),
            $oFrm = $oContainer.find('.frm-container'),
            iContainerW = $oContainer.width(),
            iContainerH = $oContainer.height() - $oFrm.height(),
            iContainerL = $oContainer.offset().left,
            iContainerT = $oContainer.offset().top,
            iBeeW = $oBee.width(),
            iBeeH = $oBee.height(),
            iBtnW = $oBtn.width(),
            iBtnH = $oBtn.height(),
            iBtnL = $oBtn.offset().left,
            iBtnT = $oBtn.offset().top,
            iClientW = $(window).width();

        // 鼠标位置
        var pageX = 0,
            pageY = 0;

        // 当改变浏览器窗口大小时，重新赋值
        $(window).on('resize', function() {
            iContainerL = $oContainer.offset().left;
            iContainerT = $oContainer.offset().top;
            iBtnL = $oBtn.offset().left;
            iBtnT = $oBtn.offset().top;
            iClientW = $(window).width();
        });

        // 鼠标移动事件
        $(document).on('mousemove', function(e) {

            // 临时变量，用于保存蜜蜂的位置信息
            var pos = {
                x: 0,
                y: 0
            };

            pageX = e.pageX;
            pageY = e.pageY;

            // 判断x轴坐标            
            if (pageX < iBeeW / 2) {
                pos.x = 0;
            } else if (pageX > iClientW - iBeeW / 2) {
                pos.x = iClientW - iBeeW;
            } else {
                pos.x = pageX - iBeeW / 2;
            }

            // 判断y轴坐标
            if (pageY < iContainerT + iBeeH / 2) {
                pos.y = 0;
            } else if (pageY > iContainerT + iContainerH - iBeeH / 2) {
                pos.y = iContainerH - iBeeH;
            } else {
                pos.y = pageY - iContainerT - iBeeH / 2;
            }

            $oBee.css({
                left: pos.x,
                top: pos.y
            });

            // 当鼠标移入按钮所在位置，隐藏蜜蜂
            // 当鼠标移出按钮所在位置，显示蜜蜂
            if ((pageX > iBtnL - iBeeW / 2) &&
                (pageX < iBtnL + iBtnW + iBeeW / 2) &&
                (pageY > iBtnT - iBeeH / 2) &&
                (pageY < iBtnT + iBtnH + iBeeH / 2)) {
                if (!$oBee.hasClass('hide')) {
                    $oBee.addClass('hide').removeClass('show');
                }
            } else {
                if (!$oBee.hasClass('show')) {
                    $oBee.addClass('show').removeClass('hide');
                }
            }

        });

        // 蜜蜂扇动翅膀
        var oFlyBee = document.getElementById('flyBee'),
            movieclip1 = new JSMovieclip(oFlyBee, {
                height: 58,
                direction: 'v',
                frames_number: 2,
                framerate: 10
            }).play(true);

    });

})(window, document);
