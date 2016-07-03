$(document).ready(function() {

   console.log('ajax loaded');
   $.getJSON('http://localhost:3000', function(data) {
      $.each(data, function(i) {
         var image = ($('<img>')
            .attr('src', 'https://placehold.it/73x73')
            .attr('alt', 'data[i].restaurantName'));

         var restaurantName = ($('<h2>').text(data[i].restaurantName));
         var website = ($('<p><br>').text(data[i].website));
         var phone = ($('<p>').text('Contact: ' + data[i].phone));

         var homeRestaurant = $('<div>').addClass('home-restaurant');
         var details = $('<div>')
            .addClass('details')
            .append(image, restaurantName, website, phone);
         $(homeRestaurant).append(details);

         var homeStats = $('<div>').addClass('home-stats');
         var queue = $('<div>').addClass('queue').text('QUEUE:');
         var queueNum = $('<div>').addClass('queue-num').text(data[i].customers.length);
         var wait = $('<div>').addClass('wait').text('WAIT: ');
         var waitNum = $('<div>').addClass('wait-num').text('hhh');
         $(homeStats).append(queue, queueNum, wait, waitNum);
         $('#restaurant-list').append(homeRestaurant);
         $('#restaurant-list').append(homeStats);
      });

   });
   //
   //  // ADD A DONUT
   //  $('button').on('click', function(event) {
   //     //stop page refresh
   //     event.preventDefault();
   //     //store the input values to prepend later
   //     var style_input = $('input:eq(0)').val();
   //     var flavor_input = $('input:eq(1)').val();
   //
   //     $.ajax({
   //        url: 'https://api.doughnuts.ga/doughnuts/',
   //        method: 'POST',
   //        data: {
   //           //add the input data to the api
   //           style: style_input,
   //           flavor: flavor_input
   //        },
   //        success: function() {
   //           console.log('added succesfully');
   //        },
   //        error: function() {
   //           console.log('not added');
   //        }
   //     }).done(function() {
   //        //add the input data to the dom
   //        var donut = $('<li>').text(style_input + ' - ' + flavor_input);
   //        $('section ul').prepend(donut);
   //     });
   //
   //
   //  });


}); // end document ready
