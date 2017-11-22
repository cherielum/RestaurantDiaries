$( document ).ready(function() {
  var form = $('#newNoteForm');

  $(form).submit(function(event) {
    event.preventDefault();
    $.get('http://localhost:3000/restaurants', function(data,status){
      alert("Data: " + data + "\nStatus: " + status);
    });
  })

  $(form).submit(function(event) {
    event.preventDefault();
    console.log(event.currentTarget); //gets what was clicked (i.e. the form)
    let values = $(event.currentTarget).serializeArray(); 
    console.log(values);
    let data = {}; 
    $(values).each((index, obj)=> {
      data[obj.name] = obj.value;
    });
    console.log(data);

    $.ajax({
      url: "http://localhost:3000/restaurants",
      method: "POST",
      contentType: 'json',
      dataType: 'JSON',
      success: function(data) {
        generateTableRows(data)
     },
     error: function() {
     }
 
  })
  .done((response) => {
      console.log(response);
      $('#newNoteForm').append(tableRow).append();

  })
})
});




// $("#submitReview ").on("submit", (e) => {
  
//   e.preventDefault();
//   console.log(e.currentTarget);
//   let values = $(e.currentTarget).serializeArray();
//   console.log(values);
//   let data = {};
//   $(values).each((index, obj) => {
//       data[obj.name] = obj.value;
//   });
//   console.log(data);
// })


// app.post('/restaurants', function(request, response){
//   let newRestaurant = request.body;
 
//   Restaurant.create ({
//    name: newRestaurant.name,
//    rating: newRestaurant.rating,
//    review: newRestaurant.review,
//    wouldYouGoBack: newRestaurant.wouldYouGoBack,
//    category: newRestaurant.category,
//    type: newRestaurant.type,
//    lastVisited: newRestaurant.lastVisited,
//    cleanBathroom: newRestaurant.cleanBathroom,
//    city: newRestaurant.city,
//    state: newRestaurant.state,
//    zipcode: newRestaurant.zipcode
//    }).then(restaurant => {
//    response.json(restaurant.toJSON())
//    });
//  });