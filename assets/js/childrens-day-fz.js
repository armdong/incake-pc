(function() {

    $(document).ready(function() {
        fnEnv();
    });

    function fnEnv() {
    	var oEnv = document.getElementById('c-env'),
        	aUl = oEnv.getElementsByTagName('ul'),
        	aSpan = oEnv.getElementsByTagName('span');

        for (var i = 0; i < aUl.length; i++) {
            change(aUl[i], aSpan[i]);
        }

        function change(oUl, oSpan) {

            var iW = oUl.offsetWidth / 2;
            var iH = oUl.offsetHeight / 2;
            var src = oUl.dataset.src;

            for (var i = 0; i < 4; i++) {
                var oLi = document.createElement('li');
                oLi.style.width = iW + 'px';
                oLi.style.height = iH + 'px';
                var oImg = document.createElement('img');
                oImg.src = src;
                oImg.style.left = -i % 2 * iW + 'px';
                oImg.style.top = -Math.floor(i / 2) * iH + 'px';
                oImg.oldleft = -i % 2 * iW;
                oImg.oldtop = -Math.floor(i / 2) * iH;
                oLi.appendChild(oImg);
                oUl.appendChild(oLi);
            }

            var data = [
                { name: 'top', value: iH },
                { name: 'left', value: -2 * iW },
                { name: 'left', value: iW },
                { name: 'top', value: -2 * iH }
            ];

            var aImg = oUl.getElementsByTagName('img');
            oUl.onmouseover = function() {
                for (var i = 0; i < aImg.length; i++) {
                    aImg[i].style[data[i].name] = data[i].value + 'px';
                }
                setStyle(oSpan, 'transform', 'scale(1)');
            };
            oUl.onmouseout = function() {
                for (var i = 0; i < aImg.length; i++) {
                    aImg[i].style[data[i].name] = aImg[i]['old' + data[i].name] + 'px';
                }
                setStyle(oSpan, 'transform', 'scale(1.5)');
            };
        }
    }

    // 设置样式，兼容写法
    function setStyle(obj, attr, value) {
        obj.style[attr] = value;
        obj.style['webkit' + attr.substring(0, 1).toUpperCase() + attr.substring(1)] = value;
        obj.style['moz' + attr.substring(0, 1).toUpperCase() + attr.substring(1)] = value;
        obj.style['ms' + attr.substring(0, 1).toUpperCase() + attr.substring(1)] = value;
        obj.style['o' + attr.substring(0, 1).toUpperCase() + attr.substring(1)] = value;
    }

})();
