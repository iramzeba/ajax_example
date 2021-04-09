$(function() {
// GET/READ
$('#getbutton').on('click', function() {

$.ajax({
method:'GET',
url: '/products',

contentType: 'application/json',
success: function(response) {
console.log(response);
var tbodyEl = $('tbody');

tbodyEl.html('');

response.iram.forEach(function(products) {
tbodyEl.append('\
<tr>\
<td class="id">' + products.id + '</td>\
<td></td>\
<td><input type="text" class="name" value="' + products.name + '"></td>\
<td><input type="text" class="name" value="' + products.description + '"></td>\
<td>\
<button class="update-button">UPDATE/PUT</button>\
<button class="delete-button">DELETE</button>\
</td>\
</tr>\
');
});
}
});
});

//create 
// CREATE/POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

       // var createInput = $('.create-input');
 let namee=$('#name').val();

    let des= $('#description').val();

        $.ajax({

            url: '/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ "name": namee, "description":des }),
             type: 'POST',
              processData: false,
            success: function(response) {
            	console.log(response);
            	alert(response);
                     // createInput.val('');
                $('#get-button').click();
            }
        });
    });

    // UPDATE/PUT
    $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        //var newName = rowEl.find('.name').val();
 let namee=$('#name').val();

    let des= $('#description').val();
        $.ajax({
            url: '/products/' + id,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({  "name": namee, "description":des }),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    // DELETE
    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: '/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                 	alert(response);
                $('#get-button').click();
            }
        });
    });



});