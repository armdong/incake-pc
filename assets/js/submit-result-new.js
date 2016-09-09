(function($) {

    $(function() {

        // TODO 获取创建订单时选择的支付类型
        var currPaymentType = 'china';
        var isTimeout = false; // 订单是否超时

        // 所有支付方式
        var arrPayment = [{
            name: '支付宝',
            type: 'alipay',
            img: 'assets/img/submit-result/payment-icons/alipay.jpg',
            link: 'http://www.alipay.com/'
        }, {
            name: '微信',
            type: 'wechat',
            img: 'assets/img/submit-result/payment-icons/wechat.jpg',
            link: 'javascript:;'
        }, {
            name: '快钱',
            type: '99bill',
            img: 'assets/img/submit-result/payment-icons/99bill.jpg',
            link: 'javascript:;'
        }, {
            name: '银联',
            type: 'unionpay',
            img: 'assets/img/submit-result/payment-icons/unionpay.jpg',
            link: 'javascript:;'
        }, {
            name: '锦江e卡通',
            type: 'jinjiang',
            img: 'assets/img/submit-result/payment-icons/jinjiang.jpg',
            link: 'javascript:;'
        }, {
            name: '招商银行',
            type: 'zhaohang',
            img: 'assets/img/submit-result/payment-icons/zhaohang.jpg',
            link: 'javascript:;'
        }, {
            name: '中国银行',
            type: 'china',
            img: 'assets/img/submit-result/payment-icons/china.jpg',
            link: 'javascript:;'
        }];

        // 订单支付倒计时
        fnPayTimecount();

        // 加载订单中更多商品
        fnMoreProduct();

        // 更改支付方式
        fnChangePayment(currPaymentType);

        /**
         * ================================
         * Functions
         * ================================
         */

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
                timer = null,
                $oPayment = $('#payment'),
                $oPaymentBody = $oPayment.find('.payment-body');

            //var beginTime = new Date(); // TODO:下单时间需要到数据库查询
            var beginTime = new Date(2016, 8, 9, 11, 0, 0);
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

                    // 超时把isTimeout状态改成true
                    isTimeout = true;

                    // 订单支付超时
                    clearInterval(timer);

                    // 超时回调函数
                    fnTimeoutCallback();
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

            function fnTimeoutCallback() {

                var _html = '';
                _html += '<div class="timeout">';
                _html += '<p><i></i>订单已失效！</p>';
                _html += '<a href="javascript:;" class="btn-reorder">重新下单</a>';
                _html += '</div>';

                $oPaymentBody.html(_html);
            }
        }

        /**
         * 加载订单中更多的商品
         * @return null
         */
        function fnMoreProduct() {

            var $oMore = $('#moreProduct'),
                $oText = $oMore.find('.text'),
                $oArrow = $oMore.find('.arrow'),
                $oLoading = $oMore.find('.loading'),
                $oBody = $('#listBody');

            var isFinished = false; // 订单商品是否全部加载完成
            var productCount = 2; // 当前展示的商品个数

            $oMore.on('click', function() {

                // 当前列表是否是展开状态
                var isExpand = $oArrow.hasClass('expand');

                if (isExpand) {

                    // 移出多余的数据，只保留1、2两条
                    productCount = 2;
                    var $oList = $oBody.find('li');

                    // 把第1条，第2条数据重新赋值到id为listBody的元素上
                    $oBody.html($oList.get(0)).append($oList.get(1));

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
                        beforeSend: function() {

                            // 请求发送前回调函数
                            console.log('before send');
                            $oLoading.show();
                        },
                        complete: function() {

                            // 请求完成后回调函数
                            console.log('send complete');
                            $oLoading.hide();

                        },
                        success: function(data) {

                            var _html = '';

                            // 后台获取到的商品列表
                            var list = data.list;

                            // 如果所有商品已加载完
                            if (list.length == 0) {
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
                                _html += '<span>￥' + (unitcost == '' ? '0.00' : unitcost) + '</span>';
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

                            // 累加下一次查询时的开始索引
                            productCount = productCount + list.length;

                        }
                    });
                }

            });
        }

        /**
         * [fnChangePayment 更改订单支付方式]
         * @param  {[type]} currPaymentType [当前支付方式]
         * @return {[type]}                 [null]
         */
        function fnChangePayment(currPaymentType) {

            var $oPayment = $('#payment'),
                $oPaymentHeader = $oPayment.find('.payment-header'),
                $oCurrType = $oPaymentHeader.find('.curr-type'),
                $oChangeType = $oPaymentHeader.find('.change-type'),
                $oPaymentBody = $oPayment.find('.payment-body'),
                $oMaskPayment = $('#maskPayment'),
                $oChangePayment = $oMaskPayment.find('.change-payment'),
                $oCurrentPay = $oChangePayment.find('.current-pay'),
                $oOtherPay = $oChangePayment.find('.other-pay'),
                $oPaymentList = $oOtherPay.find('ul'),
                $oMaskCancel = $oChangePayment.find('.btn-cancel'),
                $oMaskOk = $oChangePayment.find('.btn-ok'),
                $oMaskConfirm = $('#maskConfirm'),
                $oMaskTimeout = $('#maskTimeout');

            // 点击更改支付方式按钮
            $oChangeType.on('click', function() {

                var paytype = $oCurrType.attr('paytype');
                var currIndex = getPayIndex(paytype);

                // 绑定支付方式弹层数据
                fnBindPaymentMask(currIndex);
            });

            // 其它支付方式切换事件
            $oPaymentList.on('click', 'li', function() {
                $(this).addClass('active').siblings('li').removeClass('active');
            });

            // 取消更改支付方式
            $oMaskCancel.on('click', function() {
                $oMaskPayment.fadeOut();
            });

            // 确定更改支付方式
            $oMaskOk.on('click', function() {

                var $oChoosePay = $oPaymentList.find('.active');

                if ($oChoosePay.length !== 0) {

                    var choosePaytype = $oChoosePay.attr('paytype');
                    var choosePayname = $oChoosePay.attr('payname');

                    // 改变当前支付方式
                    $oCurrType.attr('paytype', choosePaytype).html(choosePayname + '支付');

                    // 构建新的支付方式入口
                    if (!isTimeout) {
                        fnBuildPaymentBody(choosePaytype);
                    }
                }
                $oMaskPayment.fadeOut();
            });

            // 支付
            $oPaymentBody.on('click', '.btn-pay', function() {

                // 确认支付前，先判断下订单是否超时
                if (isTimeout) { // 超时
                    $oMaskTimeout.fadeIn();
                } else {

                    // TODO 跳转支付页面
                    
                    $oMaskConfirm.fadeIn();
                }
            });

            // 关闭超时弹层
            $oMaskTimeout.on('click', '.timeout-close', function() {
                $oMaskTimeout.fadeOut();
            });

            // 再逛逛
            $oMaskTimeout.on('click', '.btn-leave', function() {
                // 跳转到列表页
                // TODO 上线时切换到真实商品列表页
                window.location.href = '/cake-list.html';
            });

            // 重新下单
            $oMaskTimeout.on('click', '.btn-reorder', function() {
                // TODO 处理重新下单逻辑
            });

            /**
             * 根据选中的支付方式构建新的支付入口
             * @param  {[type]} paytype [支付方式]
             * @return {[type]}         [null]
             */
            function fnBuildPaymentBody(paytype) {

                var _index = getPayIndex(paytype);
                var _payment = arrPayment[_index];

                var _html = '';

                if (paytype === 'alipay') { // 支付宝支付

                    var alipayLink = _payment.link + '?拼接参数'; // TODO alipay支付参数

                    _html += '<div class="paytype alipay">';
                    _html += '<a href="' + alipayLink + '" class="btn-pay" target="_blank"><img src="assets/img/submit-result/alipay_btn_bg.png" alt=""></a></div>';
                } else if (paytype === 'wechat') { // 微信支付

                    var wechatQrcode = 'assets/img/submit-result/qrcode.jpg'; // TODO wechat二维码需要动态生成

                    _html += '<div class="paytype wechat">';
                    _html += '<div class="scan-pay"><div class="img">';
                    _html += '<img src="' + wechatQrcode + '" alt=""></div></div></div>';
                } else { // 其它在线支付

                    var onlineLink = _payment.link + '?拼接参数'; // TODO 其它在线支付方式参数               

                    _html += '<div class="paytype onlinepay">';
                    _html += '<a href="' + onlineLink + '" class="btn-pay" target="_blank">立即支付</a>';
                    _html += '</div>';
                }

                $oPaymentBody.html(_html);
            }

            /**
             * 绑定支付方式弹层数据
             * @param  {[type]} index [当前支付方式]
             * @return {[type]}       [null]
             */
            function fnBindPaymentMask(index) {

                // 当前支付方式
                var currPay = arrPayment[index];

                // 绑定当前支付方式
                var _currHtml = '';
                _currHtml += '<p>当前支付方式</p>';
                _currHtml += '<a href="javascript:;" paytype="' + currPay.type + '" payname="' + currPay.name + '"><img src="' + currPay.img + '" alt=""></a>';
                $oCurrentPay.html(_currHtml);

                // 其他支付方式
                var _otherHtml = '';
                for (var i = 0, len = arrPayment.length; i < len; i++) {
                    if (i !== index) {
                        _otherHtml += '<li paytype="' + arrPayment[i].type + '" payname="' + arrPayment[i].name + '"><a href="javascript:;"><img src="' + arrPayment[i].img + '" alt=""></a></li>';
                    }
                }
                $oPaymentList.html(_otherHtml);

                // 显示弹层
                $oMaskPayment.fadeIn();
                $oChangePayment.css({
                    'margin-left': -$oChangePayment.width() / 2 + 'px',
                    'margin-top': -$oChangePayment.height() / 2 + 'px'
                });
            }

            // 根据创建订单时选中的支付方式构建支付内容
            if (!!currPaymentType) {
                fnInitPaymentBody(currPaymentType);
            }

            function fnInitPaymentBody(paytype) {

                var currIndex = getPayIndex(paytype);
                var currPay = arrPayment[currIndex];

                // 初始化payment-header
                $oCurrType.attr('paytype', currPay.type).html(currPay.name + '支付');
                fnBuildPaymentBody(paytype);
            }

            /**
             * [getPayIndex 根据支付类型获取对应索引]
             * @param  {[type]} paytype [支付类型]
             * @return {[type]}         [对应支付类型索引]
             */
            function getPayIndex(paytype) {

                var index = 0;

                switch (paytype) {
                    case 'alipay':
                        index = 0;
                        break;
                    case 'wechat':
                        index = 1;
                        break;
                    case '99bill':
                        index = 2;
                        break;
                    case 'unionpay':
                        index = 3;
                        break;
                    case 'jinjiang':
                        index = 4;
                        break;
                    case 'zhaohang':
                        index = 5;
                        break;
                    case 'china':
                        index = 6;
                        break;
                    default:
                        index = 0;
                        break;
                }

                return index;
            }
        }

    });

})(jQuery);
