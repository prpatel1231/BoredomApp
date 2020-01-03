var input = document.getElementById('autocomplete');
var autocomplete = new google.maps.places.Autocomplete(input, { types: ['(cities)'] });
google.maps.event.addListener(autocomplete, 'place_changed', function () {
  var place = autocomplete.getPlace();
   console.log(place.photos[0].html_attributions[0]);
   console.log(place);


})

$("button").on("click", function () {
  var city = $("input").val().split();
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=f299017fc79bef68bd06401cc604c72e";

   var queryURL2= "https://app.ticketmaster.com/discovery/v2/events.json?&apikey=GVJjPLYlF9CarxYyXYvdEzLb7GD3cXUc" ;

  //  var queryURL3= "https://developers.zomato.com/api/v2.1/?&apikey=e889ae928be4b3283e45fbbf217c6dfb";


  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // After the data from the AJAX request comes back
    .then(function (response) {
      console.log(response);
      var temperatureCelvin = [response.main.temp, response.main.feels_like, ];
      var temperature = (temperatureCelvin[0] -273.15) * 9/5 + 32;
      temperature = Math.round(temperature);
      var temperatureFeelsLikeF = (temperatureCelvin[1]-273.15) * 9/5 + 32;
      temperatureFeelsLikeF= Math.round(temperatureFeelsLikeF);
      
      
      var wheatherImage = $("<img>");
      wheatherImage.attr("src", "https://www.almanac.com/sites/default/files/styles/primary_image_in_article/public/image_nodes/cloudy-sky.jpg?itok=FDxeE-I5");
      $(".container").prepend(wheatherImage);


      var TextHeader = "Wheather info:"
      $(".wheatherInfo").prepend(city);


      $(".temperature").prepend(temperature + "°F");
      
      $(".feelsLike").prepend("Feels like: " +temperatureFeelsLikeF + "°F");

      
    
    });




    // -----------------------------------------------------------------------------------------------------


    // $.ajax({
    //   url: queryURL2,
    //   method: "GET"
    // })
  
    //   // After the data from the AJAX request comes back
    //   .then(function (response) {
    //     console.log(response);

    //     var eventLink=response._embedded.events[0].url;
    //     console.log(eventLink);

    //     var eventButton = $("<button>").text("Buy Ticket");
    //     eventButton.attr("onclick", "window.location.href='"+ eventLink+"';");
        

    //     var eventName = response._embedded.events[0].name ;

    //     var p = $("<p>").text( eventName);
        
    //     console.log(response._embedded.events[0].images[0].url)
    //     var eventImage = $("<img>");

    //     eventImage.attr("src", response._embedded.events[0].images[0].url );
        
    //     $("#images-appear-here").prepend(eventButton);

    //     $("#images-appear-here").prepend(p);
    //     $("#images-appear-here").prepend(eventImage);

      
    //   });


     

});




