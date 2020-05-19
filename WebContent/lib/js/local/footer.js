(function($, Contenda, document) {
    $(document).ready(function () {
        $('.footer__logo-links img').each(function() {
           const $logo = $(this);
           const $src = $logo.data('src');

           $logo.attr('src', $src);
        });
    });
})(jQuery, Contenda, document);

