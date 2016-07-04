$(document).ready(function() {
   var buttonStatus = false;
   var restaurantNameSuburb = "";
   console.log(window.location);
   var globalEta;
   // function to capture an id across various pages
   function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
         results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
   }
   restaurantNameSuburb = getParameterByName('r_id');
   console.log(restaurantNameSuburb);
   $.getJSON('http://localhost:3000/' + restaurantNameSuburb, function(data) {

      $.each(data, function(i) {
         var customerRef = data[i];

         var customerRow = $('<tr>').addClass('customer-row '+ customerRef.phone);
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
         var eta = Math.max.apply(Math, waitingArray).toFixed(1);
         if (eta < 1 && data[i].length !== 0) {
            eta = "Due";
         } else if (data[i].length === 0) {
            eta = "--";
         }
         console.log(waitingArray);
         console.log(eta);
         globalEta = eta;
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
            .addClass('btn-remove '+customerRef.phone)
            // .attr('id', customerRef.phone)
            .css('margin-left', '5px')
            .text('Remove')
            .on('click', deleteMe);
         var customerEditBtn = $('<button>')
            // .attr('id', customerRef.phone)
            .addClass('btn-remove '+customerRef.phone)
            .text('Edit')
            .on('click', editMe);
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


   //


   ////////////////////////////////////////////////
   // CRUD
   ////////////////////////////////////////////////

   // var scope for form variables
   var customer_name;
   var customer_mobile;
   var customer_heads;
   var customer_eta;
   var customer_vip;

   $('#newCustomer').on('click', function(event) {
      //stop page refresh
      event.preventDefault();
      //store the input values to prepend later
      customer_name = $('#customer_name').val();
      customer_mobile = $('#customer_mobile').val();
      customer_heads = $('#customer_heads').val();
      customer_eta = $('#customer_eta').val();
      // customer_vip = $('#customer_vip').val();
      if (buttonStatus === false){

      $.ajax({
         url: 'http://localhost:3000/' + restaurantNameSuburb + '/addcustomer',
         method: 'POST',
         data: {
            //add the input data to the api
            customerName: customer_name,
            phone: customer_mobile,
            heads: customer_heads,
            eta: customer_eta,
            // isVip: customer_vip
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
    } // end if statement
    else {
      $.ajax({
         url: 'http://localhost:3000/' + restaurantNameSuburb + '/' + $('#newCustomer').attr('data-class') + '/update',
         method: 'PUT',
         data: {
            //add the input data to the api
            customerName: customer_name,
            phone: customer_mobile,
            heads: customer_heads,
            eta: customer_eta
            // isVip: customer_vip
         },
         success: function() {
            console.log('updated succesfully');
         },
         error: function() {
            console.log('not updated');
         }
      }).done(function() {
         location.reload();
         console.log("database should load new customer");
      });
    }
   });

   function deleteMe() {
     var buttonClass = $(this).attr('class').split(' ')[1];
     $.ajax({
        url: 'http://localhost:3000/' + restaurantNameSuburb + '/' + buttonClass + '/removecustomer',
        method: 'DELETE',
        dataType: 'json',

     }).done(function() {
        $('tr.'+buttonClass).remove();
        console.log("deleted");
     });
   }

   function editMe(){
     console.log("before click = "+ buttonStatus);
     var buttonClass = $(this).attr('class').split(' ')[1];
     $.ajax({
        url: 'http://localhost:3000/' + restaurantNameSuburb + '/' + buttonClass,
        method: 'GET',
        dataType: 'json',

     }).done(function(data) {
        if(buttonStatus === false){
          buttonStatus = true;
          $('#customer_name').val(data.customerName);
          $('#customer_mobile').val(data.phone);
          $('#customer_heads').val(data.heads);
          $('#customer_eta').val(globalEta);
          $('#newCustomer').attr('data-class', buttonClass);
        } else {
          buttonStatus = false;
          $('#customer_name').val("");
          $('#customer_mobile').val("");
          $('#customer_heads').val("");
          $('#customer_eta').val("");
        }
        console.log("after click = "+ buttonStatus);
     });
   }
}); //end doc ready



/// add a checkbox to the cusomter form
