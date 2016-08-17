/**
 * Created by Michael on 2016/8/17.
 */
(function () {

    $(function () {
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

})();