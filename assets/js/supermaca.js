(function() {

    $(document).ready(function() {

        // 动画实例
        var tl = new TimelineLite();

        // 调用飞机入场动画
        fnPlaneAnimation(tl);

        var $oFrmContainer = $('#frm-container');
        if ($oFrmContainer) {
            fnScroll($oFrmContainer);
        }

    });

    function fnScroll($oFrmContainer) {
        var iFrmT = $oFrmContainer.offset().top,
            iFrmH = $oFrmContainer.height(),
            iViewH = $(window).height(),
            disT = iFrmT - iViewH + iFrmH;

        fnFrmScroll(disT, $oFrmContainer);
        $(window).on('scroll', function() {
            fnFrmScroll(disT, $oFrmContainer);
        });
    }

    // 飞机入场动画
    function fnPlaneAnimation(tl) {
        var $oPlane = $('#plane');

        tl.clear();
        tl.to($oPlane, 3, {
            left: '199px',
            ease: Ease.easeOut,
            onComplete: function() {
                fnBottleAnimation();
            }
        });
    }

    function fnBottleAnimation() {
        var $oBottle = $('#bottle'),
            $oCheers = $('#cheers');

        $oBottle.css({
            '-webkit-animation-play-state': 'running',
            '-moz-animation-play-state': 'running',
            '-ms-animation-play-state': 'running',
            '-o-animation-play-state': 'running',
            'animation-play-state': 'running'
        });

        // 瓶子动画结束完成调用丝带动画
        $oBottle.on('webkitAnimationEnd mozAnimationEnd msAnimationEnd oAnimationEnd animationend', function(event) {
            event.preventDefault();
            /* Act on the event */
            $oBottle.css({
                'background-image': 'url("assets/img/supermaca/bottle_open.png")'
            });
            $oCheers.show(function() {
                fnSilkAnimation();
            });
        });
    }

    // 丝带动画
    function fnSilkAnimation() {
        $.fn.silk({
            minSize: 10,
            maxSize: 20,
            newOn: 400
        });
    }

    // 丝带飘落
    $.fn.silk = function(options) {
        var documentHeight = $(document).height(),
            documentWidth = $(document).width(),
            defaults = {
                minSize: 15, //丝带的最小尺寸
                maxSize: 30, //丝带的最大尺寸
                newOn: 1000, //丝带出现的频率
                flakeColor: "#fff",
                imgUrl: "assets/img/supermaca/",
                imgArr: ['silk01.png', 'silk02.png', 'silk03.png', 'silk04.png', 'silk05.png', 'silk06.png', 'silk07.png', 'silk08.png', 'silk09.png', 'silk10.png']
            },
            options = $.extend({}, defaults, options);
        var interval = setInterval(function() {
            var startPositionLeft = Math.random() * documentWidth - 40,
                startOpacity = 0.5 + Math.random(),
                sizeFlake = options.minSize + Math.random() * options.maxSize,
                endPositionTop = documentHeight - 40,
                endPositionLeft = Math.random() * documentWidth - 40,
                durationFall = documentHeight * 6 + Math.random() * 5000;

            var currImg = options.imgUrl + options.imgArr[Math.floor(Math.random() * 10)];
            var img = '<img src="' + currImg + '" width="' + sizeFlake + '" />';

            var $flake = $('<div class="silk-box" />').css({
                'position': 'absolute',
                'top': '0'
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

    function fnFrmScroll(disT, $obj) {
        var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollT <= disT) {
            $obj.addClass('flt');
        } else {
            if ($obj.hasClass('flt')) {
                $obj.removeClass('flt');
            }
        }
    }

})();
