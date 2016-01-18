(function() {

	$(function() {
		fnArticle();
		fnInitArticle();
	});

	function fnArticle() {
		var $oArticle = $('.article-container');
		var $oNav = $oArticle.find('.article-nav');
		var $aNavItem = $oNav.find('.nav-item');
		var $oBody = $oArticle.find('.article-body-list');
		var $oBodyItem = $oBody.find('.body-item');
		$.each($aNavItem, function(i, ele) {
			$(ele).on('click', function() {
				$(this).addClass('active').siblings('.nav-item').removeClass('active');
				$oBodyItem.eq(i).addClass('active').siblings('.body-item').removeClass('active');
			});
		});
	}

	function fnInitArticle() {
		var _article = fnFetchUrlHash('article');
		if (_article != null) {
			_article = _article.toLowerCase();
		}
		var $oArticle = $('.article-container');
		var $oNav = $oArticle.find('.article-nav');
		var $aNavItem = $oNav.find('.nav-item');
		var $oCurrentItem = $aNavItem.first();
		if (!isNullOrEmpty(_article)) {
			$oCurrentItem = $aNavItem.filter('.' + _article);
		}
		$oCurrentItem.trigger('click');

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

	// 检测字符串是否为空
	function isNullOrEmpty(obj) {
		if (obj == null || obj == '' || obj == undefined) {
			return true;
		} else {
			return false;
		}
	}

})();