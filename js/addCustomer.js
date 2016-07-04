$(document).ready(function() {

   $.getJSON('http://localhost:3000/5778ada4407e073be150665a/index', function(data) {

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

}); //end doc ready



/// add a checkbox to the cusomter form
