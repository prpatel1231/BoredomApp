var movieGluSearchCinema = 'https://api-gate2.movieglu.com/cinemasNearby/?n=5';
var email = 'prpatel1231@gmail.com';
var movieGluApiKey = '9BucpObgyh59Szs3Kj5wJ6TSI8HCFHee3FVmVQ43';

$.ajax({
    method: "GET",
    url: movieGluSearchCinema,
    data: 'json',
    headers: {
        'client': email,
        'authorization': 'Basic R1dVQjpnT3hiSmJsaHFLYks=',
        'x-api-key': movieGluApiKey,
        'api-version': 'v200',
        'territory': 'US',
        'device-datetime': '2019-12-22',
        'geolocation': '38.953821;-77.010207'
    }
}).then(function(response){
    console.log(response);
});