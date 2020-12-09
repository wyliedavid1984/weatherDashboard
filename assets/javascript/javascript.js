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
            $("#previousCity").prepend("<br><button class='city'>" + previousCities[i] + "</button>");
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
            $("#previousCity").prepend("<br><button class='city'>" + userCity + "</button>");

        }

        // this sets the user city into local storage with a key of userCities.
        localStorage.setItem("userCities", JSON.stringify(previousCities))
        // reset the search to placeholder
        $('#searchBar').val("");
        console.log(cityName);
        // runs the weatherBalloon function
        weatherBalloon(cityName);
    });

    // this creates functionality for the city buttons
    $(".city").click(function (e) {
        e.preventDefault();
        console.log($(this).text());
        var cityValue = $(this).text();
        weatherBalloon(cityValue);
    });

    // this function makes two api calls.  
    function weatherBalloon(city) {
        // setting local variables for the function
        var key = '34af04e7087783be92496c2a33100782';
        var latLonURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
        // first ajax to get the city's lat and lon
        $.ajax({
            url: latLonURL,
            method: "GET"
        }).then(function (res) {
            console.log(res);
            // setting the lon and lat variable to the city's lat and lon
            var lon = JSON.stringify(res.coord.lon);
            var lat = JSON.stringify(res.coord.lat);
            var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=&appid=" + key;
            // second ajax to get the a future forecast as well as regular data
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                // first two variables to get both celcuis and fahrenheit
                var celcius = Math.round(parseFloat(response.current.temp) - 273.15);
                var fahrenheit = Math.round(((parseFloat(response.current.temp) - 273.15) * 1.8) + 32);
                // this var has a url set to get the icon
                var iconURL = "http://openweathermap.org/img/wn/" + response.current.weather[0].icon + ".png";
                // setting up the display to the jumbotron grabbing id and setting text values except the first one that set our icon id to a src URL
                $('#wicon').attr('src', iconURL);
                $("#today").text(res.name + " " + moment().format("dddd, MMMM do YYYY"));
                $("#temperature").text("Temperature: " + fahrenheit + "\u02DAF, " + celcius + "\u02DAC");
                $("#humidity").text("Humidity: " + response.current.humidity);
                $("#windSpeed").text("Wind Speed: " + response.current.wind_speed);
                // giving the p tag a color based on uvIndex
                var uvIndex = response.current.uvi;
                if (uvIndex < 3) {
                    $("#uvIndex").addClass("low")
                } else if (uvIndex < 6) {
                    $("#uvIndex").addClass("moderate")
                } else if (uvIndex < 8) {
                    $("#uvIndex").addClass("high")
                } else if (uvIndex < 11) {
                    $("#uvIndex").addClass("veryHigh")
                } else {
                    $("#uvIndex").addClass("extreme")
                }
                $("#uvIndex").text("UV Index: " + response.current.uvi);
                // use a for loop to put the content into the cards first is for the icons. then after that we set the temp, dates, humidity 
                for (var i = 0; i < 5; i++) {
                    iconURL = "http://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + ".png";
                    $('#dIcon' + i).attr('src', iconURL);
                    var daysForward = new moment().add(i + 1, 'day')
                    var cardFah = Math.round(((parseFloat(response.daily[i].temp.day) - 273.15) * 1.8) + 32);
                    $("#date" + i).text(daysForward.format('MMM do, YY'));
                    $("#dIcon" + i).text(iconURL);
                    $("#temp" + i).text("Temp: " + cardFah + "\u02DAF");
                    $("#humidity" + i).text("Humidity: " + response.daily[i].humidity);
                }
            });
        })
    }
})