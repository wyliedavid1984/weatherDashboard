# WeatherDashboard

## Description

Our assignment was to create a weather application.  If the user puts in a city in the US, it will give both the daily forecast as well as the five day. The daily has the name of the date listed along the side of teh city. The next part of daily forecast is an icon displaying what the weather will be like.  The temp is displayed in both fahrenheit and celsius. Daily then display what the humidity level will be that day.  Wind speed is next in the display.  Then the last item displayed is UV index that will display both the index as a value and a color to show the where on the index that lies.  Green, yellow, orange, red, and purple are the different level that will be displayed from lowest to highest.  In the the five day shows us the date, an icon, temp and humidity.  The search bar will create buttons to go back to previous links if the user decides to revisit a searched  city.  Upon reload, it will use the very last city searched/ the city at the top of the button list as the current.  If the user wants to clear out the city buttons there is also a clear button. 

## Table of Contents

-[Javascript](#Javascript)
   
-[Usage](##Usage)

-[Credits](##Credits)

## Javascript

<details>
<summary> Javascript</summary>

### Global Variables


I only used two global variables in application.  The first is previous cities which pulls all the old data that was used from local storage.  After I set some conditionals. That will check if there is anything in local storage.  If there isn't set if to an empty array. If there is then it'll create buttons for each index in the array. I also use this to store any new data enter from the search bar.

The next variable city name is used to put the users last searched city on the app.  It will then be called upon in the weather balloon function to display that cities information.

### Buttons

All the buttons are list as they fall in the javascript file.

#### Clear Button

This button was created so that the user can delete the city buttons and start over. It works with jquery.  I select the button through a class name.  Then on the button I use the on method that is listening for a click. That will fire off the anonymous function.  The function itself is very simple.  We clear any default actions and then just clear local store with the clear method.

#### Search Button

This button was made for the user to input a city and then get back weather information on the city.  With jquery I selected the class of the button, and then added the on method listening for a click event to run a function.  I used event.preventDefault() to keep the form from refreshing the page. Then I declare a variable that stores the input value, which is this button's sibling. I use a conditional to check whether or not the user entered in a value.  I also check if the user has previously entered that value. If neither of the conditions are met, the user's data will be push into the previous cities array and a button is created with a class of city and a value of the user's city. From this point we then set that city into local storage. Followed by resetting the search bar to a blank value so that the place holder is showing. The last thing the button will do is call the weather balloon function and passes the user city as a parameter.

#### City Button

This button was created so that the user could just click on the city list and the weather data would reappear. Again using jquery select class and then listen for click with on method and call anonymous function.  In the function to prevent any action preventDefault is used. I then take a variable to set it equal to the text of the button, and pass that value into the weatherBalloon function. So that upon clicking the button the weather data will show on the screen.

### Functions

#### Timed Background

I made this function to create a little bit of a dynamic background that matches the time of the day.  In the function I make use of a var to take in the hour of the day.  The function a conditional will set the color scheme for the time of day. 

#### Weather Balloon

This function makes a couple of ajax calls to retrieve data and then post that data to the screen. I start by making two local variables my api key, and then URL that has the city passed to the function as well as the key variable used to create the URL.  

After that I make a ajax request to get the data from that api.  I only needed the latitude and longitude from the specific call.  So I save them to corresponding variable and then stringify that data.  From there I create and other URL that takes in the lat and lon  and make a second ajax request. 

In the second request I append or add most of my content to the DOM.  I start off by making several local variables that get an icon url and then two to calculate Kalvin into both Celsius and Fahrenheit. In the variables I start to maneuver through the api object that was gotten to get specific data. The next several lines of code is where I start to add some content to the jumbotron on the page. using jquery I add city, date,
temp, humidity, wind speed and an icon.  After that I use a conditional to color code the UV index, and then set the UV index to the dom. 

The Last part of the function is where I add content two the five cards at the bottom of the screen, for the five day forecast. I make use of a for loop to make all the content.  Once again I create another URL for the icons and set it equal to the icon variable. After that I grab the img tag and set the source. The next two local variables are used to create a date and then to calculate the temp in F. After the declaration I add the following content with jquery; date, icon, temp, and humidity.

</details>

## HTML

The HTML was built with bootstrap to help with styling as well as responsiveness. I used the header tag with a nav tag to do the title on the page.  In that header I add a little bit of margin adjustment and made it a fluid container so it took up the full width.  In the nav tag I centered the content. After that I used the a div to create the area that both the buttons and input line are located.  I had it set to the left side of the page.  That was all wrapped in a row. Then I created the clear button, form (where the input and search button were nested), and the last part where all the city buttons were appended. I used a jumbotron to display the current days weather.  Followed it with five cards to set the future five day forecast. 

## Usage 

The users puts in a city name within the USA, and then it will put out the weather forecast for that city.  The user can also click on the city button to check previous locations that have been entered into the search bar. If the user wants to clear out all of the buttons, they just have to click on the clear button. 

### CSS

I used css to add a little color to the app.  I added different colors to the header, jumbotron, and cards. I created several classes for both the UV index as well as for the body color scheme. The UV index will change depending on how high it is.  The body will change color depending on what time of day it is. 

### Screen Shots

<details>
<summary>Screen Shots of application</summary>

This is what the site looks like upon load.
![First load of application with no data](./assets/images/loadScreenNoData.png)
After the first city is entered
![After entering data](./assets/images/loadWithData.png)
This is with multiple cities
![Adding in multiple buttons](./assets/images/multipleData.png)
![Added background color](./assets/images/styled.png)
</details>

## Credits

* [Stack Overflow general research](https://stackoverflow.com/) 
* [W3schools general research](https://www.w3schools.com/default.asp)
* [Mdn web docs general research](https://developer.mozilla.org/en-US/)
* [Bootstrap general research](https://getbootstrap.com/)
* [AskBCS]
* [Moment.js for time](https://momentjs.com/)
* [JQuery documentation](https://api.jquery.com/)
* [Open Weather api](https://openweathermap.org/api)
* [Google Fonts](https://fonts.google.com/)
* [Font Awesome](https://fontawesome.com/v4.7.0/)