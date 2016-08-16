/**
 * Created by Michael on 2016/8/15.
 */
(function () {

    $(function () {

        // 图片预加载
        fnPreLoadImg();

    });

    // 图片于加载
    function fnPreLoadImg() {
        var arrImg = [
            'banner.png',
            'banner_leaf.png',
            'btn_buy_bg.png',
            'lion_body.png',
            'lion_cake.png',
            'lion_eat.png',
            'lion_head.png',
            'lion_head_rotate.png',
            'lion_hi.png'
        ];
        var num = 0;
        $.each(arrImg, function (index, obj) {
            var objImg = new Image();
            objImg.src = 'assets/img/lion-half-price/' + obj;
            objImg.onload = function () {
                num++;
                if (num == arrImg.length) {
                    fnShowLion();
                }
            };
            //图片加载错误或不全
            objImg.onerror = function () {
                fnShowLion();
            };
        });
    }

    // 狮子动画
    function fnShowLion() {
        var $oLion = $('#lion'),
            $oLionContainer = $oLion.find('.lion'),
            $oLionHi = $oLionContainer.find('.lion-hi'),
            $oLionEat = $oLionContainer.find('.lion-eat'),
            $oLionHead = $oLionContainer.find('.lion-head'),
            $oLionHeadRotate = $oLionContainer.find('.lion-head-rotate'),
            $oLionBody = $oLionContainer.find('.lion-body'),
            tl = new TimelineLite();

        tl.clear();

        // 显示问候文字
        tl.to($oLionHi, 1, {
            delay: 1,
            opacity: 0,
            ease: Power0.easeOut,
            onComplete: function () {
                $oLionHi.css('display', 'none');
                fnShowHeadAndBody();
            }
        });

        // 显示身体和头部
        function fnShowHeadAndBody() {
            tl.clear();
            tl.to($oLionHead, 1, {
                opacity: 1,
                ease: Power0.easeIn,
                onStart: function () {
                    $oLionHead.css('display', 'block');
                }
            }).to($oLionBody, 1, {
                opacity: 1,
                ease: Power0.easeIn,
                onStart: function () {
                    $oLionBody.css('display', 'block');
                    // 转头
                    fnTurnHead();
                }
            }, 0.1);
        }

        // 转头
        function fnTurnHead(){
            tl.to($oLionHead, 0.2, {
                delay: 1,
                opacity: 0,
                ease: Power0.easeOut
            }).to($oLionHeadRotate, 0.2, {
                opacity: 1,
                ease: Power0.easeIn,
                onStart: function(){
                    $oLionHeadRotate.css('display', 'block');
                },
                onComplete: fnSpeak
            });
        }

        // 说话
        function fnSpeak(){
            tl.to($oLionHeadRotate, 0.2, {
                delay: 1,
                opacity: 0,
                ease: Power0.easeOut
            }).to($oLionHead, 0.2, {
                opacity: 1,
                ease: Power0.easeIn,
                onComplete: function(){
                    $oLionEat.fadeIn(800);

                    // 开始落叶
                    fnShowLeaf();
                }
            });
        }
    }

    // 落叶
    function fnShowLeaf(){
        var $oContainer = $('#lion').find('.lion-body');
        $.fn.leaf({
            $oContainer: $oContainer,
            minSize: 50,	//落叶的最小尺寸
            maxSize: 70, 	//落叶的最大尺寸
            newOn: 5000		//落叶出现的频率 这个数值越小雪花越多
        });
    }
})();

/**
 * js网页落叶效果
 */
(function() {
    $.fn.leaf = function(options) {
        var documentHeight = $(document).height(),
            documentWidth = $(document).width(),
            defaults = {
                $oContainer: null,
                minSize: 5, //落叶的最小尺寸
                maxSize: 10, //落叶的最大尺寸
                newOn: 1000, //落叶出现的频率
                flakeColor: "#fff",
                imgUrl: "assets/img/lion-half-price/",
                imgArr: ['leaf_1.png', 'leaf_2.png', 'leaf_3.png', 'leaf_4.png']
            },
            options = $.extend({}, defaults, options);
        var interval = setInterval(function() {
            var startPositionLeft = Math.random() * documentWidth - 40,
                startOpacity = 0.8 + Math.random(),
                sizeFlake = options.minSize + Math.random() * options.maxSize,
                endPositionTop = documentHeight - 40,
                endPositionLeft = Math.random() * documentWidth - 40,
                durationFall = documentHeight * 10 + Math.random() * 5000;

            var currImg = options.imgUrl + options.imgArr[Math.floor(Math.random() * options.imgArr.length)];
            var img = '<img src="' + currImg + '" width="' + sizeFlake + '" />';

            var $flake = $('<div class="snow-box" />').css({
                'position': 'absolute',
                'top': options.$oContainer.offset().top + options.$oContainer.height(),
                'z-index': '999999'
            }).html(img);
            $flake.clone().appendTo('body').css({
                left: startPositionLeft,
                opacity: startOpacity,
                color: options.flakeColor
            }).animate({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.2
            }, durationFall, 'linear', function() {
                $(this).remove();
            });
        }, options.newOn);
    };

})();