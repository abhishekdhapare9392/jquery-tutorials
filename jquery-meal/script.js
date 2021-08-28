$(document).ready(function () {
  $('#search-button').click(function () {
    var searchInput = $('#search-input').val()
    $.ajax({
      type: 'GET',
      url: `http://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`,
      error: function (err) {
        console.log(err)
      },
      success: function (data) {
        console.log(data)
        $('#meal-list').html(
          data.meals.map(function (meal) {
            return `
                <div class="col-md-4 my-3">
                    <div class="card card-body shadow border-3">
                        <h4 class="card-title">${meal.strMeal}</h4>
                        <p class="card-text">${meal.strInstructions.slice(
                          0,
                          150,
                        )}...</p>
                        <button id="read-more-meal" data-id="${
                          meal.idMeal
                        }" class="btn btn-warning">Read More</button>
                    </div>
                </div>
            `
          }),
        )
      },
    })
  })

  $('body').on('click', '#read-more-meal', function () {
    console.log()
    var id = $(this).data('id')
    $.ajax({
      type: 'GET',
      url: `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      error: function (err) {
        console.log(err)
      },
      success: function (data) {
        console.log(data)
        let meal = data.meals[0]
        let ingredients = ''
        let m
        for (m = 1; m <= 20; m++) {
          if (
            meal[`strIngredient${m}`] === null ||
            meal[`strIngredient${m}`] === ''
          ) {
            continue
          } else {
            ingredients +=
              '<span class="badge bg-warning mx-1 my-1 p-1">' +
              meal[`strIngredient${m}`] +
              ': ' +
              meal[`strMeasure${m}`] +
              '</span>'
          }
        }

        $('.allModels').html(
          `
            <div class="modal fade" id="mealModal" tabindex="-1" aria-labelledby="mealModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="mealModalLabel">${meal.strMeal}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-md-4">
                        <img class="w-100 h-auto" src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    </div>
                    <div class="col-md-8">
                    <h3>Instructions</h3>    
                    <p>${meal.strInstructions}</p>
                    <h3>Ingredients</h3>
                        <p>${ingredients}</p>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <a href="${meal.strYoutube}" target="_blank" type="button" class="btn btn-danger">You Tube Link</a>
                </div>
              </div>
            </div>
          </div>
              `,
        )

        $('#mealModal').modal('show')
      },
    })
  })
})
