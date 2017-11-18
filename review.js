$( document ).ready(function() {
  var form = $('#newNoteForm');

  $(form).submit(function(event) {
    event.preventDefault();
    $.get('http://localhost:3000/restaurants', function(data,status){
      alert("Data: " + data + "\nStatus: " + status);
    });
  })
});
