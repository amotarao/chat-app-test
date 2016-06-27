document.addEventListener('DOMContentLoaded', function() {

  $('#login-btn').click(function(e){

    e.preventDefault()

    $form = $('#loginForm')
    $button = $('#login-btn')

    $.ajax({
      url: '/api/login.php',
      type: 'post',
      data: $form.serialize(),
      dataType: 'json',
      timeout: 10000,

      beforeSend: function(xhr, settings) {
        $button.attr('disabled', true)
      },
      complete: function(xhr, textStatus) {
        $button.attr('disabled', false)
      },
      success: function(result, textStatus, xhr) {
        $form[0].reset()
        window.location.href = '/room/';
      },
      error: function(xhr, textStatus, error) {
        alert('エラーが発生しました。')
      }
    })
  })

  $('#regist-btn').click(function(e){

    e.preventDefault()

    $form = $('#loginForm')
    $button = $('#regist-btn')

    $.ajax({
      url: '/api/regist.php',
      type: 'post',
      data: $form.serialize(),
      dataType: 'json',
      timeout: 10000,

      beforeSend: function(xhr, settings) {
        $button.attr('disabled', true)
      },
      complete: function(xhr, textStatus) {
        $button.attr('disabled', false)
      },
      success: function(result, textStatus, xhr) {
        $form[0].reset()
        window.location.href = '/room/';
      },
      error: function(xhr, textStatus, error) {
        alert('エラーが発生しました。')
      }
    })
  })

})
