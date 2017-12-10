$( document ).ready(function() {
  var form = $('#newNoteForm');

/*   $(form).submit(function(event) {
    event.preventDefault();
    $.get('http://localhost:3000/restaurants', function(data,status){
      alert("Data: " + data + "\nStatus: " + status);
    });
  }) */

  $(form).submit(function(event) {
    event.preventDefault();
    console.log(event.currentTarget); //gets what was clicked (i.e. the form)
    let values = $(event.currentTarget).serializeArray(); 
    //console.log(values);
    let data = {}; 
    $(values).each((index, obj)=> {
      data[obj.name] = obj.value;
    });
    console.log(data);

     $.ajax({
      url: "http://localhost:3000/restaurants",
      type: "POST",
      contentType: "application/json; charset=utf-8", //putting header
      dataType: "json",
      data: JSON.stringify(data),
      success: function(data) {
        console.log(data);
        window.location.href = "notes.html";
        // generateTableRows(data)
     },
     error: function() {
     }
 
  }) 
  // .done((response) => {
  //     console.log(response);
  //     $('#newNoteForm').append(tableRow).append();

  // })
})
});


