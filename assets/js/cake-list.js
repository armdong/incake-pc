(function() {

    $(function() {

        // 图片懒加载
        $("img.lazy").lazyload({
            placeholder:"assets/img/loading.gif"
        });

        fnCategory();
        fnSizeChange();
        fnInitCategory();
    });

    function fnCategory() {
        var $oCategory = $('.list-category');
        var $aCategoryDl = $oCategory.find('dl');
        var $oListHeader = $('.list-header');
        var $oFirstSummary = $oListHeader.find('.first-summary');
        var $oSecondSummary = $oListHeader.find('.second-summary');
        var $oCnTitle = $oListHeader.find('.cn');
        var arr = [{
            firstSummary: '汲取创作灵感，紧跟蛋糕未来趋势，甄选新鲜优质食材，传承纯正英国风味。',
            secondSummary: 'INCAKE关注食品健康安全问题， 拒绝防腐剂 ，拒绝食品添加剂，追求精致时尚健康理念。',
            cnTitle: '蛋糕馆'
        }, {
            firstSummary: '如果说要找出一种西点食材能如同做中餐一样将所有的烹饪技巧一网打尽，那一定是芝士。',
            secondSummary: 'INCAKE力求在传承传统食材的组合与比例，不断尝试各种新的烘培工艺，希望呈现更新的口感与可能性。',
            cnTitle: '芝士蛋糕'
        }, {
            firstSummary: '德国巧克力的刚硬、好酒；法国巧克力的甜腻浪漫；瑞士的商务与奢华；比利时的细腻、柔滑。',
            secondSummary: 'INCAKE力求将各国巧克力的特色与各种不同的可可比例之间组合，尽可能将巧克力蛋糕的香、甜、苦、润、滑各种可能性完整呈现。',
            cnTitle: '巧克力蛋糕'
        }, {
            firstSummary: '拿破仑蛋糕跟拿破仑其实没有关系，说法之一是由于它的英文名Napoleon，其实是Napolitain的误传。',
            secondSummary: 'INCAKE拿破仑独有2048标准，历经千次捶打的酥皮作过程，近乎于偏执的繁复只为完整体现一款经典拿破仑应有的品质。',
            cnTitle: '拿破仑蛋糕'
        }, {
            firstSummary: '慕斯蛋糕的百变可能满足人们不断对蛋糕提出的新要求，也提供了一个更大的创造空间。',
            secondSummary: 'INCAKE探索在各类提升口感和风味的各种辅料中组合变化产生更加惊艳的效果。不断创新的灵感去追寻未来蛋糕发展趋势。',
            cnTitle: '慕斯蛋糕'
        }, {
            firstSummary: '选用的乳脂奶油是从天然新鲜的牛奶中提取出来的，无任何色素及添加剂，绝无反式脂肪。',
            secondSummary: '富含多种维生素和矿物质，口感细腻甜润，入口即化。',
            cnTitle: '乳脂蛋糕'
        }, {
            firstSummary: '无论是浓郁的巧克力、醇厚的芝士、香醇的慕斯、还是奶香气十足的乳脂蛋糕。',
            secondSummary: '快乐的选拼，满足贪心而不知如何选择的你。给自己多一点再多一点的幸福感受。',
            cnTitle: '选拼蛋糕'
        }];
        $aCategoryDl.each(function(i, ele) {
            var $oDl = $(ele);
            var $aDd = $oDl.find('dd');
            $.each($aDd, function(index, elem) {
                $(elem).on('click', function() {
                    if ($oDl.hasClass('category')) {
                        $oFirstSummary.html(arr[index].firstSummary);
                        $oSecondSummary.html(arr[index].secondSummary);
                        $oCnTitle.html(arr[index].cnTitle);
                    }
                    $(this).addClass('active').siblings('dd').removeClass('active');
                });
            });
        });
    }

    function fnSizeChange() {
        var $oList = $('.list-body');
        var $aListItem = $oList.find('.list-item');
        var $aBtnSize = $aListItem.find('.btn-size');
        $oList.delegate('.list-item', 'mouseover', function() {
            $(this).css({ 'outline': '1px solid #0f3677', 'outline-offset': '-1px' });
        });
        $oList.delegate('.list-item', 'mouseout', function() {
            $(this).css({ 'outline': 'none' });
        });
        $oList.delegate('.btn-size', 'mouseover', function() {
            var _currBtn = $(this).find('>span');
            var $oListSize = $(this).find('.list-size');
            var $aSize = $oListSize.find('.size-item');
            $oListSize.show();
            $.each($aSize, function(index, elem) {
                $(elem).on('click', function() {
                    var _html = $(this).find('>span').html();
                    _currBtn.html(_html);
                    $(this).addClass('active').siblings('.size-item').removeClass('active');
                });
            });
        });
        $oList.delegate('.btn-size', 'mouseout', function() {
            $(this).find('.list-size').stop().hide(0);
        });
    }

    function fnInitCategory() {
        var _category = fnFetchUrlHash('category');
        if (_category != null) {
            _category = _category.toLowerCase();
            var $oCategory = $('.list-category');
            var $oCategoryDl = $oCategory.find('.category');
            var $aCategoryDd = $oCategoryDl.find('dd');
            var _index = 0;
            switch (_category) {
                case 'cheese':
                    _index = 1;
                    break;
                case 'chocolate':
                    _index = 2;
                    break;
                case 'napoleon':
                    _index = 3;
                    break;
                case 'mousse':
                    _index = 4;
                    break;
                case 'cream':
                    _index = 5;
                    break;
                case 'diy':
                    _index = 6;
                    break;
                default:
                    _index = 0;
                    break;
            }
            $aCategoryDd.eq(_index).trigger('click');
        }
    }

    // 用户获取url中制定name的参数值
    function fnFetchUrlHash(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*(&|$))");
        var result = window.location.search.substr(1).match(reg);
        if (result != null) {
            return unescape(result[2]);
        } else {
            return null;
        }
    }

})();
