(function($, Contenda, document) {
    $(document).ready(function () {
        var $menu = $('nav.header__nav'),
            $menuToggleBtn = $('.header__nav--open, .header__nav--close');

        $menuToggleBtn.on('click', function(e) {
            e.preventDefault(); //Prevent scroll to top of page when opening mobile menu (Firefox)
            e.stopPropagation();
            $menu.toggleClass('header__nav--shown');
        });
    });
})(jQuery, Contenda, document);

