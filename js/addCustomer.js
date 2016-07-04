$(document).ready(function() {

   $.getJSON('http://localhost:3000/populate', function(data) {

      $.each(data[0].customers, function(i) {
       var customerRef = data[0].customers[i];

         var customerRow = $('<tr>').addClass('customer-row');
             var customerHeads = $('<td>').addClass('heads')
              .attr('width', '10px')
              .text(customerRef.heads);
             var customerName = $('<td>')
              .attr('width', '300px')
              .addClass('name')
              .text(customerRef.customerName);
             var customerTimer = $('<td>')
              .attr('width', '10px')
              .text(customerRef.__v)
              .addClass('timer');

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



}); //end doc ready



/// add a checkbox to the cusomter form
