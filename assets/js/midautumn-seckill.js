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
            $oList = $oProduct.find('.list');

        var currHtml = '',
            listHtml = '';

        // 获得当前日期
        var dayOfWeek = new Date().getDay();
        //var dayOfWeek = 0;

        // 非法日期设为最后一天的价格
        if(dayOfWeek < 1 || dayOfWeek > 5) {
            dayOfWeek = 5;
        }

        // 周一到周五商品列表
        var arrProduct = [{
            day: 1,
            img: 'img_1.jpg',
            price: 'price_1.jpg'
        }, {
            day: 2,
            img: 'img_2.jpg',
            price: 'price_2.jpg'
        }, {
            day: 3,
            img: 'img_3.jpg',
            price: 'price_3.jpg'
        }, {
            day: 4,
            img: 'img_4.jpg',
            price: 'price_4.jpg'
        }, {
            day: 5,
            img: 'img_5.jpg',
            price: 'price_5.jpg'
        }];

        // 购买按钮
        var objBtns = {
            current: 'btn_current.png',
            before: 'btn_before.png',
            after: 'btn_after.png'
        };

        // 获取当天的商品
        var currProduct = arrProduct.slice(dayOfWeek - 1, dayOfWeek)[0];
        // 过滤掉当天的商品
        arrProduct.splice(dayOfWeek - 1, 1);

        // 生成当天商品html
        currHtml += createProductItem(currProduct, objBtns.current);
        $oCurrent.html(currHtml);

        // 生成list商品html
        for (var i = 0, len = arrProduct.length; i < len; i++) {
            listHtml += createProductItem(arrProduct[i], arrProduct[i].day < dayOfWeek ? objBtns.after : objBtns.before);
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