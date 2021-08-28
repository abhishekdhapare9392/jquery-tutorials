var apiKey = '9556c217159d8c1c863f2be1'
var currencyAPIKey = '6d2c74e5ecd8f7fc4be7'

$(document).ready(function () {
  $.ajax({
    url: `https://free.currconv.com/api/v7/currencies?apiKey=${currencyAPIKey}`,
    type: 'GET',
    error: function (err) {
      console.log(err)
    },
    success: function (data) {
      console.log(data)
      //   var currencyList = JSON.parse(data)
      //   console.log(currencyList)

      $.each(data.results, function (key, obj) {
        $('#currency-one').append(
          `<option value="${obj.id}">${obj.id}</option>`,
        )
        $('#currency-two').append(
          `<option value="${obj.id}">${obj.id}</option>`,
        )
      })
    },
  })
})

$('#convert').click(function () {
  var currencyOne = $('#currency-one').val()
  var currencyTwo = $('#currency-two').val()

  if (currencyOne == 'ALL' || currencyTwo == 'ALL') {
    showAlert('Please select a currency', 'alert alert-danger')
  } else {
    //   console.log(currencyOne, currencyTwo)
    $.ajax({
      type: 'GET',
      url: `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${currencyOne}/${currencyTwo}`,
      error: function (err) {
        console.log(err)
      },
      success: function (data) {
        console.log(data.conversion_rate)

        $('#exchanged-currency-rate').text(`
            ${data.conversion_rate} ${data.target_code}
          `)

        $('#compare-rate').text(`
            1 ${data.base_code} = ${data.conversion_rate} ${data.target_code}
          `)
      },
    })
  }
})

function showAlert(msg, className) {
  $('.alert-msg').append(
    `
            <div class="${className}">${msg}</div>
        `,
  )
  setTimeout(function () {
    $('.alert-msg').empty()
  }, 3000)
}
