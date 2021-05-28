
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
            }
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
            for(i = 0; i< 5;i++){
                $("#forecastContainer").append(
                    `<span class='col-sm-4  border bg-light p-3'>Temp: ${data.daily[i].temp.day}</span>
                    <span class='col-sm-4 border bg-light p-3'> Weather: ${data.daily[i].weather[0].description}</span>
                    <span class='col-sm-4 border bg-light p-3'>UV: ${data.daily[i].uvi}</span>` 
                );
            };
        });
    });
}
var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = cityNameEL.value.trim();
    if(cityName) {
        getCityWeather(cityName);
        getForecast(cityName);
        addCityButton(cityName);
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
