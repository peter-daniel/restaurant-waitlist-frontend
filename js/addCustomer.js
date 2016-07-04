$(document).ready(function() {

   $.getJSON('http://localhost:3000/5776194a5260e7e484bbc080/index', function(data) {

      $.each(data, function(i) {
       var customerRef = data[i];

         var customerRow = $('<tr>').addClass('customer-row');
             var customerHeads = $('<td>').addClass('heads')
              .attr('width', '10px')
              .text(customerRef.heads);
             var customerName = $('<td>')
              .attr('width', '300px')
              .addClass('name')
              .text(customerRef.customerName);
              // insert time tracking
              var now = new Date();
              var momentNow = moment(now);
              var waitingArray = [];
              $.each(customerRef, function() {
                var delta =
                  (moment(customerRef.finishedWaiting).valueOf() - momentNow.valueOf()) / 60000;
                waitingArray.push(delta);
              });
              var eta = Math.max.apply(Math, waitingArray);
              if (eta < 1 && data[i].length !== 0) {
                eta = "Due";
              } else if (data[i].length === 0) {
                eta = "--";
              }
              console.log(waitingArray);
              console.log(eta);
              var customerTimer = $('<td>')
              .attr('width', '10px')
              .text(eta)
              .addClass('timer');
              // end time tracking

            var formTd = $('<td>');
              var delayForm = $('<form>').addClass('delayForm flex');
                var customerDelayField = $('<input>')
                  .attr('type', 'number')
                  .attr('placeholder', '#');
                var customerDelayBtn = $('<button>')
                  .addClass('btn-remove')
                  .text('Do it');
              var formComplete = $(delayForm).append(customerDelayField, customerDelayBtn);
            $(formTd).append(formComplete);

            var customerEditRemoveBtnTd = $('<td>').addClass('flex');
              var customerRemoveBtn = $('<button>')
                 .addClass('btn-remove')
                 .css('margin-left', '5px')
                 .text('Remove');
              var customerEditBtn = $('<button>')
                 .addClass('btn-remove')
                 .text('Edit');
              $(customerEditRemoveBtnTd).append(customerEditBtn, customerRemoveBtn);

      $(customerRow).append(
        customerHeads,
        customerName,
        customerTimer,
        formTd,
        customerEditRemoveBtnTd
      );

      $('#customerListAdmin').append(customerRow);

      });
   });

//
// function addCustomerToDomFromForm() {
//   var customerRow = $('<tr>').addClass('customer-row');
//       var customerHeads = $('<td>').addClass('heads')
//        .attr('width', '10px')
//        .text(customer_heads);
//       var customerName = $('<td>')
//        .attr('width', '300px')
//        .addClass('name')
//        .text(customer_name);
//        // insert time tracking
//        var now = new Date();
//        var momentNow = moment(now);
//        var waitingArray = [];
//        $.each(customer_eta, function() {
//          var delta =
//            (moment(customerRef.finishedWaiting).valueOf() - momentNow.valueOf()) / 60000;
//          waitingArray.push(delta);
//        });
//        var eta = Math.max.apply(Math, waitingArray);
//        if (eta < 1 && data[i].length !== 0) {
//          eta = "Due";
//        } else if (data[i].length === 0) {
//          eta = "--";
//        }
//        console.log(waitingArray);
//        console.log(eta);
//        var customerTimer = $('<td>')
//        .attr('width', '10px')
//        .text(eta)
//        .addClass('timer');
//        // end time tracking
//
//      var formTd = $('<td>');
//        var delayForm = $('<form>').addClass('delayForm flex');
//          var customerDelayField = $('<input>')
//            .attr('type', 'number')
//            .attr('placeholder', '#');
//          var customerDelayBtn = $('<button>')
//            .addClass('btn-remove')
//            .text('Do it');
//        var formComplete = $(delayForm).append(customerDelayField, customerDelayBtn);
//      $(formTd).append(formComplete);
//
//      var customerEditRemoveBtnTd = $('<td>').addClass('flex');
//        var customerRemoveBtn = $('<button>')
//           .addClass('btn-remove')
//           .css('margin-left', '5px')
//           .text('Remove');
//        var customerEditBtn = $('<button>')
//           .addClass('btn-remove')
//           .text('Edit');
//        $(customerEditRemoveBtnTd).append(customerEditBtn, customerRemoveBtn);
//
// $(customerRow).append(
//  customerHeads,
//  customerName,
//  customerTimer,
//  formTd,
//  customerEditRemoveBtnTd
// );
//
//
//
// }

var customer_name;
var customer_mobile;
var customer_heads;
var customer_eta;
var customer_vip;

   // ADD A CUSTOMER
$('#newCustomer').on('click', function(event) {
   //stop page refresh
   event.preventDefault();
   //store the input values to prepend later
   customer_name = $('#customer_name').val();
   customer_mobile = $('#customer_mobile').val();
   customer_heads = $('#customer_heads').val();
   customer_eta = $('#customer_eta').val();
   customer_vip = $('#customer_vip').val();

   $.ajax({
      url: 'http://localhost:3000/5776194a5260e7e484bbc080/addCustomer',
      method: 'POST',
      data: {
         //add the input data to the api
         customerName: customer_name,
         phone: customer_mobile,
         heads: customer_heads,
         eta: customer_eta,
         isVip: customer_vip
      },
      success: function() {
         console.log('added succesfully');
      },
      error: function() {
         console.log('not added');
      }
   }).done(function() {
      location.reload();
      console.log("database should load new customer");
   });
});

function deleteMe(){
  var buttonId = $(this).attr('data-id').split(" ")[1];
  $.ajax({
    url: 'http://api.doughnuts.ga/doughnuts/'+ buttonId,
    method: 'DELETE',
    dataType: 'json',
    }).done(function(json){

      console.log(json);
      $('tr[id="doughnut ' + buttonId + '"]').remove();
    });
}



// DELETE A CUSTOMER
$('.btn-remove').on('click', function(event) {

$.ajax({
   url: 'http://localhost:3000/5776194a5260e7e484bbc080/'+_id,
   method: 'DELETE',
   data: {
      //add the input data to the api

   },
   success: function() {
      console.log('added succesfully');
   },
   error: function() {
      console.log('not added');
   }
}).done(function() {
   location.reload();
   console.log("database should load new customer");
});
});







}); //end doc ready



/// add a checkbox to the cusomter form
