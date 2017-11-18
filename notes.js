$( document ).ready(function() {

    $.ajax({
      type: "GET",
      url: "http://localhost:3000/restaurants",
      dataType: 'json',
      success: function(data) {
         generateTableRows(data)
      },
      error: function() {

      }
    });

    function generateTableRows(data){
      data.forEach(function(note){
        let tableRow = $('<tr></tr>');
        let colName = $('<td>'+ note.name +'</td>');
        let colAddress = $('<td>'+ note.city + ', ' + note.state + ' '+ note.zipcode +'</td>');
        let colRating = $('<td>'+ note.rating +'</td>');
        let colCategory = $('<td>'+ note.category +'</td>');
        let colType = $('<td>'+ note.type +'</td>');
        let colReview = $('<td>'+ note.review +'</td>');
        let colCleanBathroom = $('<td>'+ note.cleanBathroom +'</td>');
        let colWouldYouGoBack = $('<td>'+ note.wouldYouGoBack +'</td>');

        let deleteButton = $('<button>Delete</button>');
        deleteButton.addClass('btn btn-danger');
        deleteButton.attr('id', note.id);
        deleteButton.click(function(){
          $.ajax({
            type: "DELETE",
            url: "http://localhost:3000/restaurants/" + deleteButton.attr('id'),
            dataType: 'json',
            success: function(data) {
               console.log('Successfully deleted!')
            },
            error: function() {
              console.log('Oops! There was an error!')
            }
          });
        });
        let colActions = $('<td><button></button></td>');
        $('#tableBody').append(tableRow).append(colName,colAddress,colRating,colCategory,colType,colReview,colCleanBathroom,colWouldYouGoBack,deleteButton);

      })
    };
});
