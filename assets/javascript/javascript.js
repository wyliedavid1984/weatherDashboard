$(document).ready(function () {
    // getting data from local storage parsing it.
    var previousCities = JSON.parse(localStorage.getItem("userCities"));
    
    // checking to see if there is data in local storage if no set variable previousCities to an
    // empty string. Otherwise, create a list of the cities previously entered
    if (previousCities === null) {
        previousCities = [];
        console.log("if === null " + previousCities);
    } else {
        for (var i = 0; i < previousCities.length; i++) {
            $("#previousCity").prepend("<br><button>" + previousCities[i]);
        }

    }
    // Creating this variable and immediately calling the function put data on to the page.
    // It uses the last city that the user looked up.
    var cityName = previousCities[previousCities.length - 1];
    weatherBalloon(cityName);
    
    // functionality on the clear button.
    $(".clear").on("click", function (event) {
        event.preventDefault();
        localStorage.clear();
    })

    // wrapped it in a form tag so that the user can hit the return key, or click on the 
    // search button.
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
            alert("Please just click on the city to get that information.")
        } else {
            previousCities.push(userCity);
            $("#previousCity").prepend("<br><button>" + userCity);
        }
        
        // this sets the user city into local storage with a key of userCities.
        localStorage.setItem("userCities", JSON.stringify(previousCities))
        // reset the search to placeholder
        $('#searchBar').val("");
        console.log(cityName);
        // runs the weatherBalloon function
        weatherBalloon(cityName);
    });

    // $(".city").click(function (e) { 
    //     e.preventDefault();
    //     console.log(this.id);
    //     $(this)

    // });

// this function make three different api calls.  
    function weatherBalloon(city) {
        // setting local variables
        var key = '34af04e7087783be92496c2a33100782';
        var latLonURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key

        $.ajax({
            url: latLonURL,
            method: "GET"
        }).then(function (res) {
            console.log(res);
            var lon = JSON.stringify(res.coord.lon);
            var lat = JSON.stringify(res.coord.lat);
            var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=&appid=" + key;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                var celcius = Math.round(parseFloat(response.current.temp) - 273.15);
                var fahrenheit = Math.round(((parseFloat(response.current.temp) - 273.15) * 1.8) + 32);
                var iconURL = "http://openweathermap.org/img/wn/10d@2x.png"
                $("#today").text(res.name + " " + moment().format("dddd, MMMM do YYYY"));
                $("#temperature").text("Temperature: " + celcius + "\u02DAc, " + fahrenheit + "\u02DAf");
                $("#humidity").text("Humidity: " + response.current.humidity);
                $("#windSpeed").text("Wind Speed: " + response.current.wind_speed);
                $("#uvIndex").text("UV Index: " + response.current.uvi);
                $.ajax({
                    url: iconURL,
                    method: "GET"
                }).then(function (resIcon) {
                    for (var i = 0; i < 5; i++) {

                        var cardFah = Math.round(((parseFloat(response.daily[i].temp.day) - 273.15) * 1.8) + 32);
                        $("#date" + i).text(moment().format('l'));
                        $("#img"+i).text(response.daily[i].weather[0].icon);
                        $("#temp" + i).text("Temperature: " + cardFah);
                        $("#humidity" + i).text("Humidity: " + response.daily[i].humidity);


                    }
                })
            });
        })
    }


    // window.onload = function () {
    //     weatherBalloon(previousCity[previousCity.length - 1]);
    // }

    // 

    // $('#description').text(d.weather[0].description);
    // $('#temp').text();
    // $('#location').text(d.name);


})