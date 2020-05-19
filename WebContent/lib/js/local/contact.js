// contact-section__form
(function($, document, Contenda) {
    $(document).ready(initialise);

    function initialise() {

        submitTo('form.contact-section__form', function(form) {
            var $form = $(form),
                $submit = $('input[type=submit], button', $form),
                html = $submit.html();

            $submit.html(Contenda.t('Vent'));
            $submit.get(0).disabled = 1;

            $('.error', $form).remove();

            $.post(
                $form.attr('action'),
                $form.serialize(),
                function(data) {
                    $form.html(Contenda.t('Tak for din henvendelse.'));
                },
                "text"
            ).fail(function(data) {
                $submit.get(0).disabled = 0;
                $submit.html(html);
                $form.prepend('<li class="error">Der skete en fejl: '+Contenda.t(data.responseText)+'</li>');
            });
        });

    }
})(jQuery, document, Contenda);