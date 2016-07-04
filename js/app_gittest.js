$(document).ready(function(quit, yo, jibba, jabba) {

  console.log('ajax loaded');
  $.getJSON('http://localhost:3000', function(data) {
    $.each(data, function(i) {
      if (Object.keys(data).length === 0) {
        $('#restaurant-list').append('<h2>').text('No restauants yet! Please try again later.');
      } else {
        console.log(Object.keys(data).length);
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
        var customers = data[i].customers;
        var homeStats = $('<div>').addClass('home-stats');
        var queue = $('<div>').addClass('queue').text('No. in Queue:');
        var queueNum = $('<div>').addClass('queue-num').text(data[i].customers.length);
        var wait = $('<div>').addClass('wait').text('Waiting Time: ');
        var now = new Date();
        var momentNow = moment(now);
        var waitingArray = [];
        $.each(data[i].customers, function(j) {
          //  console.log(data[i].customers[j].finishedWaiting);
          var delta =
            (moment(data[i].customers[j].finishedWaiting).valueOf() - momentNow.valueOf()) / 60000;
          waitingArray.push(delta);
        });
        var eta = Math.max.apply(Math, waitingArray);
        if (eta < 1 && data[i].customers.length !== 0) {
          eta = "Due";
        } else if (data[i].customers.length === 0) {
          eta = "--";
        }
        console.log(waitingArray);
        console.log(eta);
        var waitNum = $('<div>').addClass('wait-num')
          .text(eta);
        // .text(_.max(customers, function(customers){ return customers.finishedWaiting}))
        $(homeStats).append(queue, queueNum, wait, waitNum);
        $(homeRestaurant).append(homeStats);
        $('#restaurant-list').append(homeRestaurant);
      }
    });
  });
  //  MOMENT
  //  var max = customers.map(function(customer){
  //    return moment(customer.finishedWaiting, 'DD.MM.YYYY');
  //  });
  //  moment.max(max);  // '11.01.1993'
  //
  //  // ADD A DONUT
  //  $('button').on('click', function(event) {
  //     //stop page refresh
  //     event.preventDefault();
  //     //store the input values to prepend later
  //     var style_input = $('input:eq(0)').val();
  //     var flavor_input = $('input:eq(1)').val();
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
  //  });
}); // end document ready
