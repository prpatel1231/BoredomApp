var input = document.getElementById('autocomplete');
var date = new Date();
var dateISO = date.toISOString();
var lat = "";
var long = "";
var exectutedCity = "";
var searchExecuted = false;

var autocomplete = new google.maps.places.Autocomplete(input, { types: ['(cities)'] });
google.maps.event.addListener(autocomplete, 'place_changed', function () {
  place = autocomplete.getPlace();
  lat = place.geometry.location.lat();
  long = place.geometry.location.lng();
  console.log(place.formatted_address);
  console.log(lat);
  console.log(long);
});


//click event to search for events and send various API requests
$("button").on("click", function () {
  var searchedCity = autocomplete.getPlace();
  searchedCity = searchedCity.formatted_address;
  console.log(searchedCity);

  //empty existing results
  $("#events").empty();
  $('#movies').empty();
  
    var city2 = place.address_components[0].short_name;
    var state = place.address_components[2].short_name;

    var today = new Date();
    today.setMonth(today.getMonth()+1)
    var dateTime = today.toISOString().split('.')[0]+"Z";
    var ticketMasterEventURL= "https://app.ticketmaster.com/discovery/v2/events.json?&city=" + city2 +"&stateCode=" + state + "&apikey=GVJjPLYlF9CarxYyXYvdEzLb7GD3cXUc" + "&endDateTime=" + dateTime +"&sort=date,asc&size=10";

  //Ticketmaster API call
    $.ajax({
        url: ticketMasterEventURL,
        method: "GET"
      })
    
        // After the data from the AJAX request comes back
        .then(function (response) {
          console.log(response);

          for (var i = 0; i <= response._embedded.events.length; i++){
            var eventLink = response._embedded.events[i].url;
            var eventName = response._embedded.events[i].name;
            var eventDate = response._embedded.events[i].dates.start.localDate;
            // var eventImage = response._embedded.events[i].images[0].url;

            var eventCard = $("<div>");
            eventCard.addClass("card");

            var eventTitle = $("<h5>").text(eventName + ": " + eventDate);
            eventTitle.addClass("card-header-title");
            eventCard.append(eventTitle);
          
            // var eventThumb = $("<img>");
            // eventThumb.addClass("card-image");
            // eventThumb.attr("src", eventImage);
            // eventCard.append(eventThumb);

            var eventVenue = $("<p>").text("Venue: " + response._embedded.events[i]._embedded.venues[0].name);
            eventVenue.addClass("card-body");
            eventCard.append(eventVenue);

            var eventButton = $("<button>").text("Buy Ticket");
            eventButton.addClass("button is-dark")
            eventButton.attr("onclick", "window.location.href='"+ eventLink+"';");
            eventCard.append(eventButton);

            $("#events").append(eventCard);
          };      
        });

      //Movie theater API Call
      //Set request variables
      var emailMovie = "prpatel1231@gmail.com";
      var apiKeyMovie = "9BucpObgyh59Szs3Kj5wJ6TSI8HCFHee3FVmVQ43";
      var authorizationMovie = "Basic R1dVQjpnT3hiSmJsaHFLYks=";
      var movieURL = "https://api-gate2.movieglu.com/filmsNowShowing/?n=10"

      $.ajax({
        method: "GET",
        url: movieURL,
        headers: {
          "client": emailMovie,
          "x-api-key": apiKeyMovie,
          "Authorization": authorizationMovie,
          "api-version": "v200",
          "territory": "US",
          "device-datetime": dateISO,
          "geolocation": long + ";" + lat,
        }
      }).then(function(response){
        console.log(response)
        for (var i = 0; i <= response.films.length; i++){
          var filmName = response.films[i].film_name;
          var filmImage = response.films[i].images.poster[1].medium.film_image;
          var filmSynopsis = response.films[i].synopsis_long;
            
          //create HTML elements for each movie
          var filmCard = $("<div>");
          filmCard.addClass("card");
          filmCard.attr("id", filmName);
          
          var filmCardBody = $("<div>");
          filmCardBody.addClass("card-body");
          filmCard.prepend(filmCardBody);
          
          var filmPic = $("<img>");
          filmPic.attr("src",filmImage);
          filmPic.addClass("card-image");
          filmCardBody.append(filmPic);

          var filmTitle = $("<h3>").text(filmName + ": ");
          filmTitle.addClass("card-header-title");
          filmCardBody.prepend(filmTitle);

          var filmDescription = $("<p>").text("Plot: " + filmSynopsis);
          filmDescription.addClass("card-content")
          filmCardBody.append(filmDescription);

          $("#movies").append(filmCard);
          };

      });
      
});



  

      


     






