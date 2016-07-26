var apiURL = 'http://localhost:3000/';
// var apiURL = 'http://localhost:3000/';

$(document).ready(function() {

  $.getJSON(apiURL, function(data) {
    $.each(data, function(i) {
      if (Object.keys(data).length === 0) {
        $('#restaurant-list').append('<h2>').text('No restauants yet! Please try again later.');
      } else {
        var image = ($('<img>')
          .css('margin-left', '55px')
          .attr({
            'src': './images/logo.png',
            'width': '72px',
            'height': '72px',
            'alt': 'data[i].restaurantName'
          }));
        var restaurantName = ($('<h2>').addClass('more-top-bottom').text(data[i].restaurantName));
        var website = ($('<p>').addClass('less-top-bottom').text(data[i].website));
        var phone = ($('<p>').addClass('less-top-bottom').text('Contact: ' + data[i].phone));
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
          var delta =
            (moment(data[i].customers[j].finishedWaiting).valueOf() - momentNow.valueOf()) / 60000;
          waitingArray.push(delta);
        });
        var eta = Math.max.apply(Math, waitingArray).toFixed(1);
        if (eta < 1 && data[i].customers.length !== 0) {
          eta = "Due";
        } else if (data[i].customers.length === 0) {
          eta = "--";
        }
        var waitNum = $('<div>').addClass('wait-num')
          .text(eta);
        // .text(_.max(customers, function(customers){ return customers.finishedWaiting}))
        $(homeStats).append(queue, queueNum, wait, waitNum);
        $(homeRestaurant).append(homeStats);

        // If local Storage has no authentication token, render the link tag to non-admin page
          var link = $('<a>')
          .attr('href', './waitingList_public.html?r_id=' + data[i].restaurantNameSuburb) // This need to be changed to the customer only queue list
          .append(homeRestaurant);
          $('#restaurant-list').append(link);
      }
    });
  });

  // Restaurant authentication:
  $('#btn-signin').on('click', function(){
      event.preventDefault();
      $.ajax({
        url: apiURL + 'signin',
        data: {
          restaurantEmail: $('input:eq(0)').val(),
          password: $('input:eq(1)').val()
        },
        dataType: 'json',
        method: 'POST',
      }).done(function(data){
        if(data){
          console.log(data);
          localStorage.setItem('Authorization', "Bearer " + data.token);
          window.location.replace('./restaurantView.html?r_id=' + data.restaurant.restaurantNameSuburb);
        } else {
          console.log("Unable to log in!");
        }
      });
    });

    // Route to restaurant.html for the restaurant registration form
    $('.btn-register').on('click', function(){
        event.preventDefault();
        window.location.replace('./register.html');
      });

    $('#btn-create-restaurant').on('click', function(){
      event.preventDefault();
      $.ajax({
         url: apiURL + 'restaurant/add',
         method: 'POST',
         data: {
           "postcode": $('#restaurant-postcode').val(),
           "suburb": $('#restaurant-suburb').val(),
           "address": $('#restaurant-address').val(),
           "phone": $('#restaurant-phone').val(),
           "website": $('#restaurant-website').val(),
           "restaurantName": $('#restaurant-name').val(),
           "cuisine": $('#restaurant-cuisine').val(),
           "username": $('#restaurant-username').val(),
           "password": $('#restaurant-password').val(),
           "restaurantEmail": $('#restaurant-email').val()
         }
      }).done(function(data) {
        //  location.reload();
        window.location.replace('./home.html');
         console.log("database should load new customer");
      });
    });



}); // end document ready
