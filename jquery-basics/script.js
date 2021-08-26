$('#square').click(function () {
  $('#square').toggleClass('bg-primary')
  //   $('#square').toggleClass('w-50')
  $('#square').toggleClass('rotate')
  //   $('#square').toggle.innerWidth(550)
  setTimeout(() => {
    $('#square').removeClass('bg-primary')
  }, 900)
})

$('#email').on('keyup, keydown, keypress', function () {
  $('#square').html($(this).val())
})

$('.clickMe').click(function () {
  console.log($(this).text())
})

$(document).ready(function () {
  console.log('On Load')
  console.log($(document).height())
  console.log($(document).width())
  console.log($('#square').innerWidth())

  //   console.log($(document).screenHeight())
})
