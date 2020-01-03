var input = document.getElementById('autocomplete');
var date = new Date();
var dateISO = date.toISOString();
var lat = ""
var long = ""

var autocomplete = new google.maps.places.Autocomplete(input, { types: ['(cities)'] });
google.maps.event.addListener(autocomplete, 'place_changed', function () {
  var place = autocomplete.getPlace();
  lat = place.geometry.location.lat();
  long = place.geometry.location.lng();
  console.log(lat);
  console.log(long);
  console.log(place.photos[0].html_attributions[0]);
  console.log(place);
});


//click event to search for events and send various API requests
$("button").on("click", function () {
  var city = $("input").val().split();
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=f299017fc79bef68bd06401cc604c72e";

  var queryURL2= "https://app.ticketmaster.com/discovery/v2/events.json?&apikey=GVJjPLYlF9CarxYyXYvdEzLb7GD3cXUc" ;

  //  var queryURL3= "https://developers.zomato.com/api/v2.1/?&apikey=e889ae928be4b3283e45fbbf217c6dfb"


//API call for weather data
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // After the data from the AJAX request comes back
    .then(function (response) {
      console.log(response);
      var temperatureCelvin = [response.main.temp, response.main.feels_like];
      var temperature = (temperatureCelvin[0] -273.15) * 9/5 + 32;
      temperature = Math.round(temperature);
      var temperatureFeelsLikeF = (temperatureCelvin[1]-273.15) * 9/5 + 32;
      temperatureFeelsLikeF= Math.round(temperatureFeelsLikeF);
      
      
      var weatherImage = $("<img>");
      weatherImage.attr("src", "https://www.almanac.com/sites/default/files/styles/primary_image_in_article/public/image_nodes/cloudy-sky.jpg?itok=FDxeE-I5");
      $(".weather container").prepend(weatherImage);


      var TextHeader = "Weather info:"
      $(".weatherInfo").prepend(city);


      $(".temperature").prepend(temperature + "°F");
      
      $(".feelsLike").prepend("Feels like: " +temperatureFeelsLikeF + "°F");

          
    });
//Ticketmaster API call
  $.ajax({
      url: queryURL2,
      method: "GET"
    })
  
      // After the data from the AJAX request comes back
      .then(function (response) {
        console.log(response);

        var eventLink=response._embedded.events[0].url;
        console.log(eventLink);

        var eventButton = $("<button>").text("Buy Ticket");
        eventButton.addClass("button is-link")
        eventButton.attr("onclick", "window.location.href='"+ eventLink+"';");
        

        var eventName = response._embedded.events[0].name;

        var eventTitle = $("<h5>").text(eventName);
        eventTitle.addClass("card-header-title");
        
        console.log(response._embedded.events[0].images[0].url)
        var eventImage = $("<img>");
        eventImage.addClass("card-image")
        eventImage.attr("src", response._embedded.events[0].images[0].url );

        
        
        $("#events").append(eventImage);
        $("#events").append(eventTitle);
        $("#events").append(eventButton);

      
      });

    //Movie theather API Call
    //Set request variables
    var emailMovie = "prpatel1231@gmail.com";
    var apiKeyMovie = "9BucpObgyh59Szs3Kj5wJ6TSI8HCFHee3FVmVQ43";
    var authorizationMovie = "Basic R1dVQjpnT3hiSmJsaHFLYks=";
    var movieURL = "https://api-gate2.movieglu.com/filmsNowShowing/?n=5"

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

        var filmPic = $("<img>");
        filmPic.attr("src",filmImage);
        filmPic.addClass("card-image");
        filmCard.append(filmPic);
        
        var filmCardBody = $("<div>");
        filmCardBody.addClass("card-body");
        filmCard.append(filmCardBody);
        
        var filmTitle = $("<h5>").text(filmName + ": ");
        filmTitle.addClass("card-header-title");
        filmCardBody.append(filmTitle);

        var filmDescription = $("<p>").text("Plot: " + filmSynopsis);
        filmDescription.addClass("card-content")
        filmCardBody.append(filmDescription);

        
        $("#movies").append(filmCard);
        };

      });
      


     

});




