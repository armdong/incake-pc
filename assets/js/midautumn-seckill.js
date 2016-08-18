/**
 * Created by Michael on 2016/8/17.
 */
(function () {

    $(function () {

        // 生成商品
        fnBindProducts();
    });

    // 生成商品
    function fnBindProducts() {

        var $oSeckill = $('#seckill'),
            $oProduct = $oSeckill.find('.products'),
            $oCurrent = $oProduct.find('.current'),
            $oList = $oProduct.find('.list'),
            currHtml = '',
            listHtml = '',

            // 连续五天商品列表
            arrProduct = [{
                day: 1,
                date: new Date(2016, 7, 24),
                img: 'img_1.jpg',
                price: 'price_1.jpg'
            }, {
                day: 2,
                date: new Date(2016, 7, 25),
                img: 'img_2.jpg',
                price: 'price_2.jpg'
            }, {
                day: 3,
                date: new Date(2016, 7, 26),
                img: 'img_3.jpg',
                price: 'price_3.jpg'
            }, {
                day: 4,
                date: new Date(2016, 7, 27),
                img: 'img_4.jpg',
                price: 'price_4.jpg'
            }, {
                day: 5,
                date: new Date(2016, 7, 28),
                img: 'img_5.jpg',
                price: 'price_5.jpg'
            }],

            // 购买按钮
            objBtns = {
                current: 'btn_current.png',
                before: 'btn_before.png',
                after: 'btn_after.png'
            },

            // 获得当前日期
            date = new Date(),  // 当前日期
            currDay = 1,        // 当前日期处于活动的第几天
            currDayBtn,         // 当天商品的按钮状态
            currProduct;        // 当天商品

        // 日期判断
        if (date.getTime() < arrProduct[0].date.getTime()) {
            currDay = 1;
            currDayBtn = objBtns.before;
        } else if (date.getTime() >= arrProduct[4].date.addDays(1).getTime()) {
            currDay = arrProduct[4].day;
            currDayBtn = objBtns.after;
        } else {
            // 第一天
            if (date.getTime() >= arrProduct[0].date.getTime() && date.getTime() < arrProduct[1].date.getTime()) {
                currDay = 1;
            } else if (date.getTime() >= arrProduct[1].date.getTime() && date.getTime() < arrProduct[2].date.getTime()) {
                currDay = 2;
            } else if (date.getTime() >= arrProduct[2].date.getTime() && date.getTime() < arrProduct[3].date.getTime()) {
                currDay = 3;
            } else if (date.getTime() >= arrProduct[3].date.getTime() && date.getTime() < arrProduct[4].date.getTime()) {
                currDay = 4;
            } else {
                currDay = 5;
            }
            currDayBtn = objBtns.current;
        }

        // 获取当天的商品
        currProduct = arrProduct.slice(currDay - 1, currDay)[0];
        // 过滤掉当天的商品
        arrProduct.splice(currDay - 1, 1);

        // 生成当天商品html
        currHtml += createProductItem(currProduct, currDayBtn);
        $oCurrent.html(currHtml);

        // 生成list商品html
        for (var i = 0, len = arrProduct.length; i < len; i++) {
            listHtml += createProductItem(
                arrProduct[i],
                arrProduct[i].date.getDate() < date.getDate() ? objBtns.after : objBtns.before
            );
        }
        $oList.html(listHtml);

        // 倒计时
        fnCalculateRemainTime();
    }

    // 生成商品html方法
    function createProductItem(item, btnImg) {
        var _html = '';
        _html += '<div class="item"><div class="img">';
        _html += '<img src="assets/img/midautumn-seckill/' + item.img + '" alt="">';
        _html += '</div><div class="price">';
        _html += '<img src="assets/img/midautumn-seckill/' + item.price + '" alt="">';
        _html += '</div><a href="javascript:;" class="btn-buy">';
        _html += '<img src="assets/img/midautumn-seckill/' + btnImg + '" alt="">';
        _html += '</a></div>';

        return _html;
    }

    // 倒计时
    function fnCalculateRemainTime() {

        var $oSeckill = $('#seckill'),
            $oEndTime = $oSeckill.find('.last-time'),
            $oHour = $oEndTime.find('.hour'),
            $oMinute = $oEndTime.find('.minute'),
            $oSecond = $oEndTime.find('.second'),
            timer = null;

        var currDate = new Date(),
            year = currDate.getFullYear(),
            month = currDate.getMonth(),
            date = currDate.getDate();

        var endTime = new Date(year, month, date).addDays(1);
        var curShowTimeSeconds = 0;

        curShowTimeSeconds = getCurrentShowTimeSeconds();

        timer = setInterval(function () {
            render();
            update();
        }, 50);

        function update() {

            var nextShowTimeSeconds = getCurrentShowTimeSeconds();

            var nextHours = parseInt(nextShowTimeSeconds / 3600);
            var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
            var nextSeconds = nextShowTimeSeconds % 60;

            var curHours = parseInt(curShowTimeSeconds / 3600);
            var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
            var curSeconds = curShowTimeSeconds % 60;

            if (nextSeconds != curSeconds) {
                curShowTimeSeconds = nextShowTimeSeconds;
            }
        }

        function render() {
            var hours = parseInt(curShowTimeSeconds / 3600);
            var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
            var seconds = curShowTimeSeconds % 60;

            if (hours == 0 && minutes == 0 && seconds == 0) {
                clearInterval(timer);
            }

            $oHour.html(hours < 10 ? '0' + hours : hours);
            $oMinute.html(minutes < 10 ? '0' + minutes : minutes);
            $oSecond.html(seconds < 10 ? '0' + seconds : seconds);
        }

        function getCurrentShowTimeSeconds() {
            var curTime = new Date();
            var ret = endTime.getTime() - curTime.getTime();
            ret = Math.round(ret / 1000);
            return ret >= 0 ? ret : 0;
        }
    }

})();