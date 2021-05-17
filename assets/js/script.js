
var cityFormEl = document.querySelector("#city-form");
var cityNameEL = document.querySelector("#cityName");

var getCityWeather = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city+ "&appid=9fccc04f9b17187972d226baf5326d4a&units=metric"
    fetch(apiUrl)
    .then(function(response) {
        return response.json()
        .then(function(data) {
            console.log(data);
            $(".cityDate").text("Current Weather Condition of " + city);
            $(".cityTem").text("Temperature: " + data.main.temp + "°C");
            $(".cityWeather").text("Condition:" + data.weather[0].description)
            $(".cityUV").text("Condition:" + data.weather[0].description)

        });
    });
};
  
var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = cityNameEL.value.trim();
    if(cityName) {
        getCityWeather(cityName);
        cityNameEL.value = "";
    } else {
        alert("Please enter a city name")
    }
    // console.log(event);
};


cityFormEl.addEventListener("submit", formSubmitHandler);