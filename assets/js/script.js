
var cityFormEl = document.querySelector("#city-form");
var cityNameEL = document.querySelector("#cityName");
var cityArray = []
var cityList = document.getElementById("cityStored");
var apiKey = "&appid=9fccc04f9b17187972d226baf5326d4a"

var getCityWeather = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city+ apiKey +"&units=metric"
    fetch(apiUrl)
    .then(function(response) {
        return response.json()
        .then(function(data) {
            if (data.cod == "404"){
                $(".cityDate").text("City Name is invalid");
            }
            else{
            console.log(data);
            $(".cityDate").text(city)
            $(".cityTem").text("Temp: "+ data.main.temp + "°C");
            $(".cityWeather").text("Condition: " + data.weather[0].description)
            $(".cityVis").text("Visibility: " + data.visibility)
            $(".cityWind").text("Wind Speed: " + data.wind.speed +"m/s")
            $(".bo").addClass("border rounded bg-light p-4")
            if (!cityArray.includes(city)){cityArray.push(city);}
            getForecast(data.coord.lon, data.coord.lat);
            if(data.weather[0].description === "broken clouds" || "cloud" ||"few clouds" ){
                $(".cityWeather").addClass("text-primary")
            }
            else if(data.weather[0].description == "clear sky"){
                $(".cityWeather").addClass("text-success")
            }
            else(
                $(".cityWeather").addClass("text-danger")
            )
            }
            addCityButton(cityName);
            cityArray = []
        });
    });

    console.log(cityArray);
};
var getForecast = function(lon, lat){

    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&"+ ${apiKey}&units=metric`
    fetch(apiUrl)
    .then(function(response) {
        return response.json()
        .then(function(data) {
            console.log(data)
                $(".day1").text(`------ Day 1 ------Temp: ${data.daily[0].temp.day}°C
                Weather: ${data.daily[0].weather[0].description} 
                UV: ${data.daily[0].uvi} Humidity: ${data.daily[0].humidity}`)
                $(".day2").text(`------ Day 2 ------Temp: ${data.daily[1].temp.day}°C
                Weather: ${data.daily[1].weather[0].description} 
                UV: ${data.daily[1].uvi} Humidity: ${data.daily[1].humidity}`)
                $(".day3").text(`------ Day 3 ------Temp: ${data.daily[2].temp.day}°C
                Weather: ${data.daily[2].weather[0].description} 
                UV: ${data.daily[2].uvi} Humidity: ${data.daily[2].humidity}`) 
                $(".day4").text(`------ Day 4 ------Temp: ${data.daily[3].temp.day}°C
                Weather: ${data.daily[3].weather[0].description} 
                UV: ${data.daily[3].uvi} Humidity: ${data.daily[3].humidity} `)
        });
    });
}
var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = cityNameEL.value.trim();
    if(cityName) {
        getCityWeather(cityName);
        getForecast(cityName);

        cityNameEL.value = "";
    } else {
        alert("Please enter a city name")
    }
};
var addCityButton = function (){
    for (i = 0; i < cityArray.length; i++){
        $("#cityStored").append(`<button class = 'btn cityButton' id = "cityButton"> ${cityArray[i]}</button>`)
    }
};




var cityButton = document.getElementById("cityButton");

cityFormEl.addEventListener("submit", formSubmitHandler);
