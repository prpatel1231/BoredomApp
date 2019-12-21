var input = document.getElementById('autocomplete');
var autocomplete = new google.maps.places.Autocomplete(input, { types: ['(cities)'] });
google.maps.event.addListener(autocomplete, 'place_changed', function () {
  var place = autocomplete.getPlace();
  console.log(place);

})

$("button").on("click", function () {
  var city = $("input").val().split();
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=f299017fc79bef68bd06401cc604c72e";
  console.log(city)

  // var queryURL= "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=GVJjPLYlF9CarxYyXYvdEzLb7GD3cXUc"

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
      
      $(".card-text").prepend("Temperature: " +temperature + "°F");
      
      $(".card-text2").prepend("Feels like: " +temperatureFeelsLikeF + "°F");

      
    
    });
});




