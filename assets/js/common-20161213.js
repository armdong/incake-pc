 /* 导航栏公用js */
 (function() {

     $(function() {

         var iBackTimer = null;
         var iBackStop = true;
         var clientH = document.documentElement.clientHeight;
         var oSadeBar = document.getElementById('sidebar');
         var oBackBtn = document.getElementById('backToTop');

         // 导航菜单切换事件
         fnNavSelect();
         // 城市定位
         fnCityLocate();
         // 城市切换事件
         fnCityChange();
         // 侧边栏垂直居中问题
         fnSidebar();
         // 模拟下拉框
         //fnMockSelector();
         fnMockSelectorAsync();
         // placeholder支持
         fnPlaceholderSupport();

         $(window).on('resize', function() {
             fnSidebar();
         });

         window.onscroll = function() {
             var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
             if (scrollT >= 710) {
                oSadeBar.style.position = 'fixed';
                oSadeBar.style.top = '0';
             } else {
                oSadeBar.style.position = 'absolute';
                oSadeBar.style.top = '788px';
             }
             if (scrollT >= clientH) {
                 oBackBtn.style.display = 'block';
             } else {
                 oBackBtn.style.display = 'none';
             }
             if (!iBackStop) {
                 clearInterval(iBackTimer);
             }
             iBackStop = false;
         };
         

         // 回到顶部
         oBackBtn.onclick = function() {
             iBackTimer = setInterval(function() {
                 //获取滚动条距离顶部的高度
                 var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
                 var iSpeed = Math.floor(-scrollT / 6);
                 document.documentElement.scrollTop = document.body.scrollTop = scrollT + iSpeed;
                 iBackStop = true;
                 if (scrollT == 0) {
                     clearInterval(iBackTimer);
                 }
             }, 30);
         };

     });

     function fnNavSelect() {
         var $oNav = $('#nav');
         var $aNavLi = $oNav.find('.item');
         $.each($aNavLi, function(i, ele) {
             $(ele).hoverDelay({
                 hoverDuring: 0, // 鼠标移入延时时间，单位ms
                 outDuring: 200, // 鼠标移除延时时间，单位ms
                 hoverEvent: function() { // 鼠标移入处理事件
                     $(this).find('.sub-nav').slideDown();
                 },
                 outEvent: function() { // 鼠标移除处理事件
                     $(this).find('.sub-nav').stop().slideUp();
                 }
             });
         });
     }

     function fnCityLocate() {
         var $oBtnLocate = $('.btn-locate');
         var $oCityMask = $('.location-mask');
         $oBtnLocate.on('click', function() {
             if ($oCityMask.hasClass('hide')) {
                 $oCityMask.removeClass('hide');
             } else {
                 $oCityMask.addClass('hide');
             }
         });
         $oCityMask.on('mouseleave', function() {
             var _this = $(this);
             if (!_this.hasClass('hide')) {
                 setTimeout(function() {
                     _this.addClass('hide');
                 }, 400);
             }
             return false;
         });
     }

     function fnCityChange() {
         var $oCities = $('.cities');
         var $aCitiesLi = $oCities.find('li');
         $.each($aCitiesLi, function(i, ele) {
             $(ele).on('click', function() {
                 var changeCity = delnull($(this).find("a").text());
                 var curCity = delnull($(".btn-locate").text());
                 if (changeCity != curCity) {
                     $(this).addClass('active').siblings('li').removeClass('active');
                     CommenConfirm("切换城市购物篮将被清空!", "javascript:fnChangeCityCode('" + $(this).find("a").attr("citycode") + "');", "", "javascript:fnCityClose();", "");
                 }

             });
         });
     }
     
     function fnSidebar() {
         var $oSidebar = $('#sidebar');
         var $oSidebarWrapper = $oSidebar.find('.sidebar-wrapper');
         $oSidebarWrapper.css({
			'margin-top': '50px'
         });
     }

     function fnMockSelectorAsync() {
         $('body').delegate('.selector-val', 'click', function() {
             var _this = $(this);
             // 关闭其他的selector
             var $aMockSelector = $('body').find('.mock-selector');
             $.each($aMockSelector, function(i, ele) {
                 $(ele).find('.selector-options').removeClass('active');
             });
             var $oUl = _this.siblings('.selector-options');
             $oUl.addClass('active');
             //$oUl.toggleClass('active');
         });
         $('body').delegate('.option-item', 'click', function() {
             $(this).addClass('selected').siblings('.option-item').removeClass('selected');
             var $oUl = $(this).closest('.selector-options');
             $oUl.removeClass('active');
             var $oP = $oUl.siblings('.selector-val');
             $oP.html($(this).html());
         });
         // 下拉框失去焦点事件
         $('body').on('blur', '.mock-selector', function(event) {
             console.log('111');
             event.preventDefault();
             /* Act on the event */
             $(this).find('.selector-options').removeClass('active');
         });

         // 如果事件源不是.mock-selector, 关闭所有mock-selector
         $('body').on('click', function(event) {
             //event.preventDefault();
             /* Act on the event */

             //console.log(event.target);
             var $oMockSel = $(event.target).closest('.mock-selector');
             var isMockSel = $oMockSel.length > 0 ? true : false;

             if (!isMockSel) {
                $('.mock-selector').find('.selector-options').removeClass('active');
             }
         });
     }

     function fnMockSelector() {
         var arrUl = [];
         var arrP = [];
         var $aSelector = $('.mock-selector');
         var $aSelectorP = $aSelector.find('.selector-val');
         $.each($aSelectorP, function(i, ele) {
             arrP.push($(ele));
             var $oSelectorUl = $(ele).siblings('.selector-options');
             arrUl.push($oSelectorUl);
         });
         $.each(arrP, function(i, ele) {
             var _index = i;
             var $this = $(ele);
             var $oSelectorUl = arrUl[i];
             var $aSelectorLi = $oSelectorUl.find('.option-item');
             $this.on('click', function() {
                 $.each(arrUl, function(index, elem) {
                     if (index != _index) {
                         $(elem).removeClass('active');
                     }
                 });
                 if ($oSelectorUl.hasClass('active')) {
                     $oSelectorUl.removeClass('active');
                 } else {
                     $oSelectorUl.addClass('active');
                 }
             });
             $aSelectorLi.on('click', function() {
                 var iVal = $(this).html();
                 $this.html(iVal);
                 $(this).addClass('selected').siblings('.option-item').removeClass('selected');
                 $oSelectorUl.removeClass('active');
             });
         });
     }

     function fnPlaceholderSupport() {
         $('input, textarea').placeholder({ customClass: 'my-placeholder' });
     }

 })();

 //过滤空格和换行符
 function delnull(content) {
     return content.replace(/[\n]/ig, '').replace(/[ ]/ig, '');
 }

 function fnCityClose() {
     $(".location-mask").addClass('hide');
     $("#myalertId").hide();
 }

 function fnChangeCityCode(citycode) {
     $.ajax({
         url: "/WebPage/SaveInfo.aspx",
         dataType: "json",
         type: "post",
         timeout: "10000",
         async: false,
         data: { "type": "_cityok", "_citycode": citycode },
         success: function(data) {
             location.href = '/';
         },
         error: function() {
             CommenMsg("网络错误！");
         }
     });

 }
