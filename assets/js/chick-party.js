(function() {

 

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
//  小鸡动画	
	var animation = document.getElementById('animation'),
	animationclip = new JSMovieclip(animation, {
        width : 293,        
        direction : 'h',    
        frames_number : 2, 
        framerate : 10      
    }).play(true);
//  点击停止动画
//	animation.onclick=function(){
//		animationclip.toggle(true);
//	}
	
})();
