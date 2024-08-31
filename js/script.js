// Cuando se hace click en una pregunta
$('.pregunta').on('click', function () {
    // Si la pregunta en la que se hizo click NO está abierta.
    if (!$('#' + $(this).data('resp_id')).hasClass('resp_act')) {
      // Cierro la que esté abierta, si es que hay alguna
      $('.ico_resp').removeClass('ico_resp_act');
      $('.resp_act').css('height', 0);
      $('.resp_act').removeClass('resp_act');
      // Abro la pregunta en la que se hizo click
      var $respuesta = $('#' + $(this).data('resp_id'));
      $respuesta.css('height', 'auto'); // Altura fija de 40px
      $respuesta.addClass('resp_act');
      $('i', this).addClass('ico_resp_act');
    // Si no, si la pregunta ya está abierta
    } else {
      // La cierro
      $('.ico_resp').removeClass('ico_resp_act');
      $('.resp_act').css('height', 0);
      $('.resp_act').removeClass('resp_act');
    }
});
