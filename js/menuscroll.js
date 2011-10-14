(function () {
    window.onload = function () {
        var menu = document.getElementById('menu');
        var init = menu.offsetTop + 250;
        var fixed = false; 
		
        window.onscroll = function () {
            if (!fixed && (menu.offsetTop - scrollTop() < 0)) {
                menu.className = 'fixed';
                menu.style.top = 0;
                fixed = true;
            } else if (fixed && scrollTop() <= init) {
                menu.className = 'abs';
                menu.style.top = init + 'px';
                fixed = false;
            }
        };
    };
	

    function scrollTop() {
        return document.body.scrollTop || document.documentElement.scrollTop;
    }
})();
