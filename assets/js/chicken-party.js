/**
 * 小鸡派对动画
 * @type {[type]}
 */
;(function(window, undefined) {
    var document = window.document;

    $(document).ready(function() {
        var oMaskParty = document.getElementById('maskParty'),
            oPartyClose = document.getElementById('partyClose'),
            oStart = document.getElementById('startChicken'),
            oInfo = document.getElementById('startInfo'),
            oRun = document.getElementById('runChicken'),
            oJump = document.getElementById('jumpChicken'),
            oDrop = document.getElementById('dropChicken'),
            oJumpTarget = document.getElementById('jumpTarget'),
            oDropTarget = document.getElementById('dropTarget'),
            oLine = document.getElementById('lightLine'),
            oBall = document.getElementById('lightBall'),
            oSwitcher = document.getElementById('switcher'),
            oCakeOriginal = document.getElementById('cakeOriginal'),
            oCakeFinal = document.getElementById('cakeFinal'),
            oBtnGoChicken = document.getElementById('btnGoChicken'),
            tl = new TimelineLite(),
            runClip = new JSMovieclip(oRun, {
                width: 80,
                direction: 'h',
                frames_number: 4,
                framerate: 16
            }).play(true),
            jumpClip = new JSMovieclip(oJump, {
                width: 80,
                direction: 'h',
                frames_number: 5,
                framerate: 20
            }),
            dropClip = new JSMovieclip(oDrop, {
                width: 80,
                direction: 'h',
                frames_number: 2,
                framerate: 10
            }),
            lineClip = new JSMovieclip(oLine, {
                height: 150,
                direction: 'v',
                frames_number: 2,
                framerate: 10
            }),
            ballClip = new JSMovieclip(oBall, {
                width: 130,
                direction: 'h',
                frames_number: 4,
                framerate: 10
            });

        $(oPartyClose).on('click', function() {
            $(oMaskParty).fadeOut();
        });

        // 小鸡入场动画
        (function fnChickenIn() {
            tl.clear();
            tl.to(oStart, 0.1, {
                bottom: '70px',
                yoyo: true,
                repeat: 15,
                onComplete: function() {
                    $(oInfo).fadeIn(function() {
                        $(oStart).css('display', 'none');
                        $(oRun).css('display', 'block');
                        fnChickenRun();
                    });
                }
            });
        })();

        // 小鸡加速跑处理函数
        function fnChickenRun() {
            tl.clear();
            tl.to(oRun, 1.2, {
                left: '660px',
                ease: Power2.easeIn,
                onComplete: function() {
                    $(oRun).css('display', 'none');
                    $(oJump).css('display', 'block');
                    runClip.stop();
                    fnChickenJump();
                }
            });
        }

        // 小鸡第一次跳跃
        function fnChickenJump() {
            jumpClip.play(true);
            var jumpParabola = funParabola(oJump, oJumpTarget, {
                speed: 30,
                curvature: 0.012,
                complete: function() {
                    $(oJump).css('display', 'none');
                    $(oDrop).css('display', 'block');
                    jumpClip.stop();
                    fnChickenDrop();
                }
            }).init();
        }

        // 小鸡第二次跳跃
        function fnChickenDrop() {
            dropClip.play(true);
            var dropParabola = funParabola(oDrop, oDropTarget, {
                speed: 6,
                curvature: 0.015,
                complete: function() {
                    //$(oDrop).css('display', 'none');
                    dropClip.stop();
                    lineClip.play(true);
                    ballClip.play(true);
                    // 处理切换蛋糕逻辑
                    tl.clear();
                    tl.to(oSwitcher, 3, {
                        transformOrigin: 'center center',
                        rotation: -360 * 5,
                        onStart: function() {
                            $(oSwitcher).fadeIn();
                        },
                        onComplete: function() {
                            $(oDrop).hide();
                            $(oCakeOriginal).fadeOut(function() {
                                $(oSwitcher).fadeOut(function() {
                                    $(oCakeFinal).fadeIn();
                                    $(oBtnGoChicken).fadeIn();
                                });
                            });
                        }
                    });
                }
            }).init();
        }
    });

})(window);
