$(document).ready(function () {

    var previousCities = JSON.parse(localStorage.getItem("userCities"));
    console.log("getting cities " + previousCities);

    if (previousCities === null) {
        previousCities = [];
        console.log("if === null " + previousCities);
    } else {
        for (var i = 0; i < previousCities.length; i++) {
            $("#previousCity").prepend("<br><button>" + previousCities[i]);
        }

    }

    var cityName = previousCities[previousCities.length - 1];
    weatherBalloon(cityName);
    // getting information from weather api

    $(".clear").on("click", function (event) {
        event.preventDefault();
        localStorage.clear();
    })

    $(".search").on("click", function (event) {
        event.preventDefault();

        // this actually grab what the user types in 
        var userCity = $(this).siblings("#searchBar").val();
        cityName = userCity;
        // this check to see if user entered anything or if that city has already been enter, else prepends data to ul.
        if (userCity === "") {
            // $("previousCities").prepend().html("<li> No City Enter Please Enter a City </li>").attr("id", "no")

            // setTimeout(() => {
            //     $("#no").css("display", "none");
            // }, 4000);
            alert("No city entered");
            return;
        } else if (previousCities.includes(userCity)) {
            alert("Please just click on the button")

        } else {
            previousCities.push(userCity);
            $("#previousCity").prepend("<br><button>" + userCity);

        }
        console.log("fourth " + previousCities)
        // this sets the user date into local storage with a key of time.
        localStorage.setItem("userCities", JSON.stringify(previousCities))
        console.log(JSON.stringify(previousCities));
        $('#searchBar').val("");
        console.log(cityName);
        weatherBalloon(cityName);
    });

    // $(".city").click(function (e) { 
    //     e.preventDefault();
    //     console.log(this.id);
    //     $(this)

    // });


    function weatherBalloon(city) {

        var key = '34af04e7087783be92496c2a33100782';
        var latLonURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key
        var lat;
        var lon;
        var queryURL= "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=&appid=" + key;
        $.ajax({
            url: latLonURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            lon = JSON.stringify(response.coord.lon);
            console.log(typeof (lon));
            lat = JSON.stringify(response.coord.lat);
            console.log(typeof (lat));
            
        })
        console.log(lat);
        console.log(lon);
        if (lat !== undefined && lon !== undefined) {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                var celcius = Math.round(parseFloat(response.main.temp) - 273.15);
                var fahrenheit = Math.round(((parseFloat(response.main.temp) - 273.15) * 1.8) + 32);
                $("#today").text(response.city_name + " " + response.dt_iso + response.weather.id);
                $("#temperature").text("Temperature: " + celcius + " c, " + fahrenheit + " f");
                $("#humidity").text("Humidity: " + response.main.humidity);
                $("#windSpeed").text("Wind Speed: " + response.wind.speed);
                $("#uvIndex").text("UV Index: " + response.main.temp)

            })
        }

    }


    // window.onload = function () {
    //     weatherBalloon(previousCity[previousCity.length - 1]);
    // }

    // 

    // $('#description').text(d.weather[0].description);
    // $('#temp').text();
    // $('#location').text(d.name);


})