$(document).ready(function () {

    var previousCities = JSON.parse(localStorage.getItem("userCities"))
    var cityName;



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

    $(".clear").on("click", function (event) {
        event.preventDefault();
        localStorage.clear();
    })

    $(".search").on("click", function () {

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
            $("#previousCity").prepend("<button>" + userCity + "</button><br>").attr("city");

        }
        console.log("fourth " + previousCities)
        // this sets the user date into local storage with a key of time.
        localStorage.setItem("userCities", JSON.stringify(previousCities))
        console.log(JSON.stringify(previousCities));
        $('#searchBar').val("");;
    });
   

    function weatherBalloon(city) {
        var stringCity = JSON.stringify(city);
        var key = '34af04e7087783be92496c2a33100782';
        var latLonURL = "http://api.openweathermap.org/data/2.5/weather?q="+stringCity+"&appid="+key
        var lat;
        var lon;
        var queryURL = "https: //api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=&appid="+key;
        $.ajax({
            url: latLonURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(response.coord.lon);
            lon = response.coord.lon;
            console.log(response.coord.lat);
            lat = response.coord.lat;
        })
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
   weatherBallon(cityName)

 // window.onload = function () {
    //     weatherBalloon(previousCity[previousCity.length - 1]);
    // }

    // 

    // $('#description').text(d.weather[0].description);
    // $('#temp').text();
    // $('#location').text(d.name);


})