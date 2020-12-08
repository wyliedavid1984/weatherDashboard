$(document).ready(function () {

    // http: //api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=34af04e7087783be92496c2a33100782
    var cityWeather = {
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
    var previousCities = JSON.parse(localStorage.getItem("userCities"))

    console.log("getting cities " + previousCities);
    if (previousCities === null) {
        previousCities = [];
        console.log("if === null " + previousCities);
    } else {
        for (var i = 0; i < previousCities.length; i++) {
            $("#previousCity").prepend("<button>" + previousCities[i] + "</button><br>");
        }
    }

    // getting information from weather api
    $("#today").text(cityWeather.city_name + " " + cityWeather.dt_iso + cityWeather.weather.id);
    $("#temperature").text("Temperature: " + cityWeather.main.feels_like);
    $("#humidity").text("Humidity: " + cityWeather.main.humidity);
    $("#windSpeed").text("Wind Speed: " + cityWeather.wind.speed);
    $("#uvIndex").text("UV Index: " + cityWeather.main.temp)


    $(".btn").on("click", function () {

        // this actually grab what the user types in 
        var userCity = $(this).siblings("#searchBar").val();

        // this check to see if user entered anything or if that city has already been enter, else prepends data to ul.
        if (userCity === "") {
            $("previousCities").prepend().html("<li> No City Enter Please Enter a City </li>").attr("id", "no")

            setTimeout(() => {
                    $("#no").css("display", "none");
            }, 4000);


            alert("No city entered");
            return;
        } else if (previousCities.includes(userCity)) {
            alert("Please just click on the button")
            console.log("else if " + userCity);
        } else {
            previousCities.push(userCity);
            $("#previousCity").prepend("<button>" + userCity + "</button><br>").attr("city");
            console.log("else prepend" + previousCities);
        }
        console.log("fourth " + previousCities)
        // this sets the user date into local storage with a key of time.
        localStorage.setItem("userCities", JSON.stringify(previousCities))
        console.log(JSON.stringify(previousCities));
        $('#searchBar').val("");
        
    });

    function weatherBalloon(cityID) {
        var key = '34af04e7087783be92496c2a33100782';
        fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + key)
            .then(function (resp) {
                return resp.json()
            }) // Convert data to json
            .then(function (data) {
                drawWeather(data);
            })
            .catch(function () {
                // catch any errors
            });
    }
   window.onload = function () {
        weatherBalloon(previousCity[previousCity.length-1]);
    }


    function drawWeather(d) {
        var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
        var fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);

        $('#description').text(d.weather[0].description);
        $('#temp').text(celcius + " c, " + fahrenheit + " f");
        $('#location').text(d.name);
    }
console.log(previousCity[previousCity.length-1]);
})
    
