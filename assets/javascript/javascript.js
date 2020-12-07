$(document).ready(function () {
    var weather = {
        "city_name": "Custom location",
        "lat": 51.485927,
        "lon": 0.24995,
        "main": {
            "temp": 277.72,
            "temp_min": 275.632,
            "temp_max": 279.15,
            "feels_like": 273.99,
            "pressure": 1029,
            "humidity": 75
        },
        "wind": {
            "speed": 2.6,
            "deg": 10
        },
        "rain": {
            "3h": 1
        },
        "clouds": {
            "all": 75
        },
        "weather": [{
            "id": 500,
            "main": "Rain",
            "description": "light rain",
            "icon": "10n"
        }],
        "dt": 1585612800,
        "dt_iso": "2020-03-31 00:00:00 +0000 UTC",
        "timezone": 3600
    }


    $(".today").text(weather.city_name+ " " +weather.dt_iso)
    $(".jumbotron").html("<p></p>");
    console.log(weather.city_name);
    console.log(weather.dt_iso);



    $(".btn").on("click", function () {
        // this actually grab what the user types in 
        var userCity = $(this).siblings("#searchBar").val();
        console.log(userCity);
        // this prepends user city to the empty li
        $("#previousCity").prepend("<button>" + userCity + "</button><br>");
        // this sets the user date into local storage with a key of time.
        if (userCity !== localStorage.getItem(userCity)) {
            localStorage.setItem(userCity, userCity);
        }
    });





})