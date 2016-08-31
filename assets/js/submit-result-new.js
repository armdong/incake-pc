(function() {

    $(function() {

        // 订单支付倒计时
        fnPayTimecount();

        // 加载订单中更多商品
        fnMoreProduct();
    });

    /**
     * 支付倒计时
     * @return null
     */
    function fnPayTimecount() {

        var $oSucsess = $('#orderSuccess'),
            $oStatus = $oSucsess.find('.status'),
            $oPaytime = $oStatus.find('.paytime'),
            $oMinute = $oPaytime.find('.minutes'),
            $oSecond = $oPaytime.find('.seconds'),
            timer = null;

        var beginTime = new Date(); // TODO:下单时间需要到数据库查询
        var endTime = beginTime.addMinutes(30); // 下单30分钟内需要完成支付
        var curShowTimeSeconds = 0;

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

            if (minutes == 0 && seconds == 0) {

                // 订单支付超时
                clearInterval(timer);
            }

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

    /**
     * 加载订单中更多的商品
     * @return {[type]} [description]
     */
    function fnMoreProduct() {

        var $oMore = $('#moreProduct'),
            $oText = $oMore.find('.text'),
            $oArrow = $oMore.find('.arrow'),
            $oBody = $('#listBody');

        var isFinished = false; // 订单商品是否全部加载完成
        var productCount = 2; // 当前展示的商品个数

        $oMore.on('click', function() {

            // 当前列表是否是展开状态
            var isExpand = $oArrow.hasClass('expand');

            if (isExpand) {
                $oArrow.removeClass('expand');
                $oText.html('展开');
            } else {

                // 发送ajax到后台拉数据，并判断数据是否加载完毕，如果加载完毕，更改isFinished状态
                $.ajax({
                    url: '/assets/fakedata/list.json',
                    type: 'GET',
                    data: {
                        orderNo: 'IN789979870808',
                        startIndex: productCount,
                        requireLen: 20
                    },
                    dateType: 'json',
                    success: function(data) {

                        var _html = '';

                        // 后台获取到的商品列表
                        var list = data.list;

                        if(list.length == 0) {
                        	return false;
                        }

                        // 遍历list
                        for (var i = 0, len = list.length; i < len; i++) {

                            var link = list[i].product.link,
                                img = list[i].product.img,
                                cn_title = list[i].product.title.cn,
                                en_title = list[i].product.title.en,
                                pound = list[i].property.pound,
                                tableware = list[i].property.tableware,
                                split = list[i].property.split,
                                number = list[i].number,
                                require = list[i].require,
                                unitcost = list[i].unitcost;

                            _html += '<li class="clearfix">';
                            _html += '<div class="b-product clearfix">';
                            _html += '<a href="' + link + '" class="img">';
                            _html += '<img src="' + img + '" alt=""></a>';
                            _html += '<div class="text"><p>';
                            _html += '<span class="cn">' + cn_title + '</span>';
                            _html += '<span class="en">' + en_title + '</span>';
                            _html += '</p></div></div>';
                            _html += '<div class="b-property">';
                            _html += '<div class="text"><p>';
                            _html += '<span class="pound">' + pound + '</span>';
                            _html += tableware == '' ? '' : '<span class="tableware">' + tableware + '</span>';
                            _html += split == '' ? '' : '<span class="split">' + split + '</span>';
                            _html += '</p></div></div>';
                            _html += '<div class="b-number"><div class="text"><p>';
                            _html += '<span>' + number + '</span></p></div></div>';
                            _html += '<div class="b-require"><div class="text"><p>';
                            _html += '<span>' + (require == '' ? '-' : require) + '</span>';
                            _html += '</p></div></div>';
                            _html += '<div class="b-unitcost"><div class="text"><p>';
                            _html += '<span>￥'+(unitcost == '' ? '0.00' : unitcost)+'</span>';
                            _html += '</p></div></div></li>';
                        }

                        // 追加到list中
                        $oBody.append(_html);

                        if (data.isFinished == 'complete') {
                            isFinished = true;
                        }

                        if (isFinished) {

                            // 商品加载完成需要更改状态
                            $oArrow.addClass('expand');
                            $oText.html('收起');
                        }

                    }
                });
            }

        });
    }

})();
