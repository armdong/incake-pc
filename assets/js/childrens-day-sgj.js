(function() {

    $(function() {
		
		

		
        var $oFrmContainer = $('.frm-container'),
            iFrmT = $oFrmContainer.offset().top,
            iFrmH = $oFrmContainer.height(),
            iViewH = $(window).height(),
            disT = iFrmT - iViewH + iFrmH;

        fnFrmScroll(disT, $oFrmContainer);

        $(window).on('scroll', function() {
            fnFrmScroll(disT, $oFrmContainer);
        });


    });
    var btn = $(".btn");
    var $footer = $('.footer');
	btn.click(function(){
    	$('html,body').animate({ scrollTop: $footer.offset().top}, 800);
    })
  

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
