// variable declarations
var currentAQ = document.getElementById("current-aq")
var aqListEl = document.getElementById("aq-li")
var category = document.getElementById("current-cat")
var number = document.getElementById("current-num")
var searchBtn = document.getElementById("search-btn")
var searchInput = document.getElementById("search-input")
var currentCity = document.getElementById("current-city")
var storedHistory = localStorage.getItem('cities');
//declaring search history as an empty array
var searchHistory = [];

// function to show air quality and weather for city from search history
if (storedHistory) {
  searchHistory = JSON.parse(storedHistory);
  var arr = searchHistory.slice(-1)
  var cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${arr}&appid=${api.openWeaKey}`;

  $( function() {
    var cityHistory = searchHistory
    $( "#search-input" ).autocomplete({
      source: cityHistory
    });
  } );
  
  getGeoCodeApi();

  function getGeoCodeApi() {
    var requestUrl = cityUrl;
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
    })
      .then(function (data) {
        var cityLat = data[0].lat
        var storedLat = cityLat.toFixed(2)
        var cityLon = data[0].lon  
        var storedLon = cityLon.toFixed(2)
        var riseSetUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${storedLat}&lon=${storedLon}&units=imperial&appid=${api.openWeaKey}`;
      fetch(riseSetUrl)
        .then((response) => {
            return response.json()
        })
          .then((data) => {
            var sunRise = JSON.stringify(data.current.sunrise)
            var sunSet = JSON.stringify(data.current.sunset)
            var riseUTC = 'Sunrise:' + '  ' + new Date(sunRise * 1000)
            var setUTC = 'Sunset:' + '  ' + new Date(sunSet * 1000)
      
            document.getElementById("sunrise").innerHTML = riseUTC
            document.getElementById("sunset").innerHTML = setUTC
          })
          .catch(error => {
            console.log(error)
          })

          airNowApi();

          function airNowApi() {
            var requestUrl = `https://www.airnowapi.org/aq/forecast/latLong/?format=application/json&latitude=${storedLat}&longitude=${storedLon}&date=2022-08-16&distance=25&API_KEY=${api.airNowKey}`;

            fetch(requestUrl)
              .then(function (response) {
                return response.json(); 
              })
              .then(function (data) {
                currentCity.textContent = arr;
                currentAQ.innerText = data[0].AQI;
                if (data[0].AQI <51) {
                  currentAQ.setAttribute("class", "green")
                }
                if (data[0].AQI <100 && data[0].AQI >=51) {
                  currentAQ.setAttribute("class", "yellow")
                }
                if (data[0].AQI <150 && data[0].AQI >=101) {
                  currentAQ.setAttribute("class", "orange")
                }
                if (data[0].AQI <200 && data[0].AQI >=151) {
                  currentAQ.setAttribute("class", "red")
                }
                if (data[0].AQI <300 && data[0].AQI >=201) {
                  currentAQ.setAttribute("class", "purple")
                }
                if (data[0].AQI <500 && data[0].AQI >=301) {
                  currentAQ.setAttribute("class", "maroon")
                }
                //gives AQ a category name
                category.textContent = data[0].Category.Name
                // gives AQ a categry number
                number.textContent = data[0].Category.Number
          
              });
          }

          getWeatherApi();
          // weather and forecast function
          function getWeatherApi() {
            var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${storedLat}&lon=${storedLon}&units=imperial&appid=${api.openWeaKey}`;
            fetch(requestUrl)
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                // Current weather conditions
                let cHour1 = moment().add(1, "hourly").format("hh:" + "mma");
                let hour1 = data.hourly[1].feels_like;
                let clouds1 = data.hourly[1].clouds;
                let maxTemp1 = data.daily[1].temp.max;
                let minTemp1 = data.daily[1].temp.min;
                let day1hum = data.daily[1].humidity;
                let day1wind = data.daily[1].wind_speed;
                $("#cHour1").text("Current Time: " + cHour1);
                $("#hour1").text("Feels like " + hour1.toFixed() + "°F");
                $("#clouds1").text(clouds1 + "% Cloud Coverage");
                $("#maxTemp1").text("High Today of: " + maxTemp1.toFixed() + "°F");
                $("#minTemp1").text("Low Today of: " + minTemp1.toFixed() + "°F");
                $("#wind1").text("Wind Speed: " + day1wind + " mph");
                $("#hum1").text("Humidity:" + " " + day1hum + "%");
  
                //Next day weather conditions
                let cHour2 = moment().add(2, "hourly").format("hh:" + "mma");
                let hour2 = data.hourly[2].feels_like;
                let clouds2 = data.hourly[2].clouds;
                let maxTemp2 = data.daily[2].temp.max;
                let minTemp2 = data.daily[2].temp.min;
                let day2hum = data.daily[2].humidity;
                let day2wind = data.daily[2].wind_speed;
                $("#cHour2").text("Around " + cHour2 + " Tomorrow");
                $("#hour2").text("It Will Feel like " + hour2.toFixed() + "°F");
                $("#clouds2").text(clouds2 + "% Cloud Coverage");
                $("#maxTemp2").text("Daily High of: " + maxTemp2.toFixed() + "°F");
                $("#minTemp2").text("Daily Low of: " + minTemp2.toFixed() + "°F");
                $("#wind2").text("Wind Speed: " + day2wind + " mph");
                $("#hum2").text("Humidity:" + " " + day2hum + "%");
  
                //3rd day weather conditions
                let cHour3 = moment().add(3, "hourly").format("hh:" + "mma");
                let hour3 = data.hourly[3].feels_like;
                let clouds3 = data.hourly[3].clouds;
                let maxTemp3 = data.daily[3].temp.max;
                let minTemp3 = data.daily[3].temp.min;
                let day3hum = data.daily[3].humidity;
                let day3wind = data.daily[3].wind_speed;
                $("#cHour3").text("Around " + cHour3 + " in 2 Days");
                $("#hour3").text("It Will Feel like " + hour3.toFixed() + "°F");
                $("#clouds3").text(clouds3 + "% Cloud Coverage");
                $("#maxTemp3").text("Daily High of: " + maxTemp3.toFixed() + "°F");
                $("#minTemp3").text("Daily Low of: " + minTemp3.toFixed() + "°F");
                $("#wind3").text("Wind Speed: " + day3wind + " mph");
                $("#hum3").text("Humidity:" + " " + day3hum + "%");
                //4th day weather conditions
                let cHour4 = moment().add(4, "hourly").format("hh:" + "mma");
                let hour4 = data.hourly[4].feels_like;
                let clouds4 = data.hourly[4].clouds;
                let maxTemp4 = data.daily[4].temp.max;
                let minTemp4 = data.daily[4].temp.min;
                let day4hum = data.daily[4].humidity;
                let day4wind = data.daily[4].wind_speed;
                $("#cHour4").text("Around " + cHour4 + " in 3 Days");
                $("#hour4").text("It Will Feel like " + hour4.toFixed() + "°F");
                $("#clouds4").text(clouds4 + "% Cloud Coverage");
                $("#maxTemp4").text("Daily High of: " + maxTemp4.toFixed() + "°F");
                $("#minTemp4").text("Daily Low of: " + minTemp4.toFixed() + "°F");
                $("#wind4").text("Wind Speed: " + day4wind + " mph");
                $("#hum4").text("Humidity:" + " " + day4hum + "%");
                //5th day weather conditions
                let cHour5 = moment().add(5, "hourly").format("hh:" + "mma");
                let hour5 = data.hourly[5].feels_like;
                let clouds5 = data.hourly[5].clouds;
                let maxTemp5 = data.daily[5].temp.max;
                let minTemp5 = data.daily[5].temp.min;
                let day5hum = data.daily[5].humidity;
                let day5wind = data.daily[5].wind_speed;
                $("#cHour5").text("Around " + cHour5 + " in 4 Days");
                $("#hour5").text("It Will Feel like " + hour5.toFixed() + "°F");
                $("#clouds5").text(clouds5 + "% Cloud Coverage");
                $("#maxTemp5").text("Daily High of: " + maxTemp5.toFixed() + "°F");
                $("#minTemp5").text("Daily Low of: " + minTemp5.toFixed() + "°F");
                $("#wind5").text("Wind Speed: " + day5wind + " mph");
                $("#hum5").text("Humidity:" + " " + day5hum + "%");
                //6th day weather conditions
                let cHour6 = moment().add(6, "hourly").format("hh:" + "mma");
                let hour6 = data.hourly[6].feels_like;
                let clouds6 = data.hourly[6].clouds;
                let maxTemp6 = data.daily[6].temp.max;
                let minTemp6 = data.daily[6].temp.min;
                let day6hum = data.daily[6].humidity;
                let day6wind = data.daily[6].wind_speed;
                $("#cHour6").text("Around " + cHour6 + " in 5 Days");
                $("#hour6").text("It Will Feel like " + hour6.toFixed() + "°F");
                $("#clouds6").text(clouds6 + "% Cloud Coverage");
                $("#maxTemp6").text("Daily High of: " + maxTemp6.toFixed() + "°F");
                $("#minTemp6").text("Daily Low of: " + minTemp6.toFixed() + "°F");
                $("#wind6").text("Wind Speed: " + day6wind + " mph");
                $("#hum6").text("Humidity:" + " " + day6hum + "%");
                //7th day weather conditions
                let cHour7 = moment().add(7, "hourly").format("hh:" + "mma");
                let hour7 = data.hourly[7].feels_like;
                let clouds7 = data.hourly[7].clouds;
                let maxTemp7 = data.daily[7].temp.max;
                let minTemp7 = data.daily[7].temp.min;
                let day7hum = data.daily[7].humidity;
                let day7wind = data.daily[7].wind_speed;
                $("#cHour7").text("Around " + cHour7 + " in 6 Days");
                $("#hour7").text("It Will Feel like " + hour7.toFixed() + "°F");
                $("#clouds7").text(clouds7 + "% Cloud Coverage");
                $("#maxTemp7").text("Daily High of: " + maxTemp7.toFixed() + "°F");
                $("#minTemp7").text("Daily Low of: " + minTemp7.toFixed() + "°F");
                $("#wind7").text("Wind Speed: " + day7wind + " mph");
                $("#hum7").text("Humidity:" + " " + day7hum + "%");
              });
        }
      })  
  }
}

//function to retrieve air quality and weather conditions when a city is searched
searchBtn.addEventListener("click", function() {
  var cityInput = searchInput.value;
  var cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${api.openWeaKey}`;
  searchHistory.push(cityInput)
  localStorage.setItem("cities", JSON.stringify(searchHistory));

  getGeoCodeApi();

  function getGeoCodeApi() {
    var requestUrl = cityUrl;
    fetch(requestUrl)
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
        var cityLat = data[0].lat
        var storedLat = cityLat.toFixed(2)
        var cityLon = data[0].lon  
        var storedLon = cityLon.toFixed(2)
        var riseSetUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${storedLat}&lon=${storedLon}&units=imperial&appid=${api.openWeaKey}`;
        fetch(riseSetUrl)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                
              var sunRise = JSON.stringify(data.current.sunrise)
              var sunSet = JSON.stringify(data.current.sunset)
              var riseUTC = 'Sunrise:' + '  ' + new Date(sunRise * 1000)
              var setUTC = 'Sunset:' + '  ' + new Date(sunSet * 1000)
      
              document.getElementById("sunrise").innerHTML = riseUTC
              document.getElementById("sunset").innerHTML = setUTC
            })
            .catch(error => {
              console.log(error)
            })

        airNowApi();

        function airNowApi() {
          var requestUrl = `https://www.airnowapi.org/aq/forecast/latLong/?format=application/json&latitude=${storedLat}&longitude=${storedLon}&date=2022-08-16&distance=25&API_KEY=${api.airNowKey}`;
        
          fetch(requestUrl)
            .then(function (response) {
              return response.json(); 
            })
            .then(function (data) {
              currentCity.textContent = cityInput;
              currentAQ.innerText = data[0].AQI;
              if (data[0].AQI <51) {
                currentAQ.setAttribute("class", "green")
              }
              if (data[0].AQI <100 && data[0].AQI >=51) {
                currentAQ.setAttribute("class", "yellow")
              }
              if (data[0].AQI <150 && data[0].AQI >=101) {
                currentAQ.setAttribute("class", "orange")
              }
              if (data[0].AQI <200 && data[0].AQI >=151) {
                currentAQ.setAttribute("class", "red")
              }
              if (data[0].AQI <300 && data[0].AQI >=201) {
                currentAQ.setAttribute("class", "purple")
              }
              if (data[0].AQI <500 && data[0].AQI >=301) {
                currentAQ.setAttribute("class", "maroon")
              }
              //gives AQ a category name
              category.textContent = data[0].Category.Name
              // gives AQ a categry number
              number.textContent = data[0].Category.Number
        
            });
        }

        getWeatherApi();
        // weather and forecast function
        function getWeatherApi() {
          var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${storedLat}&lon=${storedLon}&units=imperial&appid=${api.openWeaKey}`;
        
          fetch(requestUrl)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              //current weather conditions
              let cHour1 = moment().add(1, "hourly").format("hh:" + "mma");
              let hour1 = data.hourly[1].feels_like;
              let clouds1 = data.hourly[1].clouds;
              let maxTemp1 = data.daily[1].temp.max;
              let minTemp1 = data.daily[1].temp.min;
              let day1hum = data.daily[1].humidity;
              let day1wind = data.daily[1].wind_speed;
              $("#cHour1").text("Current Time: " + cHour1);
              $("#hour1").text("Feels like " + hour1.toFixed() + "°F");
              $("#clouds1").text(clouds1 + "% Cloud Coverage");
              $("#maxTemp1").text("High Today of: " + maxTemp1.toFixed() + "°F");
              $("#minTemp1").text("Low Today of: " + minTemp1.toFixed() + "°F");
              $("#wind1").text("Wind Speed: " + day1wind + " mph");
              $("#hum1").text("Humidity:" + " " + day1hum + "%");

              //next day weather conditions
              let cHour2 = moment().add(2, "hourly").format("hh:" + "mma");
              let hour2 = data.hourly[2].feels_like;
              let clouds2 = data.hourly[2].clouds;
              let maxTemp2 = data.daily[2].temp.max;
              let minTemp2 = data.daily[2].temp.min;
              let day2hum = data.daily[2].humidity;
              let day2wind = data.daily[2].wind_speed;
              
              $("#cHour2").text("Around " + cHour2 + " Tomorrow");
              $("#hour2").text("It Will Feel like " + hour2.toFixed() + "°F");
              $("#clouds2").text(clouds2 + "% Cloud Coverage");
              $("#maxTemp2").text("Daily High of: " + maxTemp2.toFixed() + "°F");
              $("#minTemp2").text("Daily Low of: " + minTemp2.toFixed() + "°F");
              $("#wind2").text("Wind Speed: " + day2wind + " mph");
              $("#hum2").text("Humidity:" + " " + day2hum + "%");

              //3rd day weather conditions
              let cHour3 = moment().add(3, "hourly").format("hh:" + "mma");
              let hour3 = data.hourly[3].feels_like;
              let clouds3 = data.hourly[3].clouds;
              let maxTemp3 = data.daily[3].temp.max;
              let minTemp3 = data.daily[3].temp.min;
              let day3hum = data.daily[3].humidity;
              let day3wind = data.daily[3].wind_speed;

              $("#cHour3").text("Around " + cHour3 + " in 2 Days");
              $("#hour3").text("It Will Feel like " + hour3.toFixed() + "°F");
              $("#clouds3").text(clouds3 + "% Cloud Coverage");
              $("#maxTemp3").text("Daily High of: " + maxTemp3.toFixed() + "°F");
              $("#minTemp3").text("Daily Low of: " + minTemp3.toFixed() + "°F");
              $("#wind3").text("Wind Speed: " + day3wind + " mph");
              $("#hum3").text("Humidity:" + " " + day3hum + "%");

              //4th day weather conditions
              let cHour4 = moment().add(4, "hourly").format("hh:" + "mma");
              let hour4 = data.hourly[4].feels_like;
              let clouds4 = data.hourly[4].clouds;
              let maxTemp4 = data.daily[4].temp.max;
              let minTemp4 = data.daily[4].temp.min;
              let day4hum = data.daily[4].humidity;
              let day4wind = data.daily[4].wind_speed;
              $("#cHour4").text("Around " + cHour4 + " in 3 Days");
              $("#hour4").text("It Will Feel like " + hour4.toFixed() + "°F");
              $("#clouds4").text(clouds4 + "% Cloud Coverage");
              $("#maxTemp4").text("Daily High of: " + maxTemp4.toFixed() + "°F");
              $("#minTemp4").text("Daily Low of: " + minTemp4.toFixed() + "°F");
              $("#wind4").text("Wind Speed: " + day4wind + " mph");
              $("#hum4").text("Humidity:" + " " + day4hum + "%");

              //5th day weather conditions
              let cHour5 = moment().add(5, "hourly").format("hh:" + "mma");
              let hour5 = data.hourly[5].feels_like;
              let clouds5 = data.hourly[5].clouds;
              let maxTemp5 = data.daily[5].temp.max;
              let minTemp5 = data.daily[5].temp.min;
              let day5hum = data.daily[5].humidity;
              let day5wind = data.daily[5].wind_speed;
              $("#cHour5").text("Around " + cHour5 + " in 4 Days");
              $("#hour5").text("It Will Feel like " + hour5.toFixed() + "°F");
              $("#clouds5").text(clouds5 + "% Cloud Coverage");
              $("#maxTemp5").text("Daily High of: " + maxTemp5.toFixed() + "°F");
              $("#minTemp5").text("Daily Low of: " + minTemp5.toFixed() + "°F");
              $("#wind5").text("Wind Speed: " + day5wind + " mph");
              $("#hum5").text("Humidity:" + " " + day5hum + "%");

              //6th day weather conditions
              let cHour6 = moment().add(6, "hourly").format("hh:" + "mma");
              let hour6 = data.hourly[6].feels_like;
              let clouds6 = data.hourly[6].clouds;
              let maxTemp6 = data.daily[6].temp.max;
              let minTemp6 = data.daily[6].temp.min;
              let day6hum = data.daily[6].humidity;
              let day6wind = data.daily[6].wind_speed;
              $("#cHour6").text("Around " + cHour6 + " in 5 Days");
              $("#hour6").text("It Will Feel like " + hour6.toFixed() + "°F");
              $("#clouds6").text(clouds6 + "% Cloud Coverage");
              $("#maxTemp6").text("Daily High of: " + maxTemp6.toFixed() + "°F");
              $("#minTemp6").text("Daily Low of: " + minTemp6.toFixed() + "°F");
              $("#wind6").text("Wind Speed: " + day6wind + " mph");
              $("#hum6").text("Humidity:" + " " + day6hum + "%");

              //7th day weather conditions
              let cHour7 = moment().add(7, "hourly").format("hh:" + "mma");
              let hour7 = data.hourly[7].feels_like;
              let clouds7 = data.hourly[7].clouds;
              let maxTemp7 = data.daily[7].temp.max;
              let minTemp7 = data.daily[7].temp.min;
              let day7hum = data.daily[7].humidity;
              let day7wind = data.daily[7].wind_speed;
              $("#cHour7").text("Around " + cHour7 + " in 6 Days");
              $("#hour7").text("It Will Feel like " + hour7.toFixed() + "°F");
              $("#clouds7").text(clouds7 + "% Cloud Coverage");
              $("#maxTemp7").text("Daily High of: " + maxTemp7.toFixed() + "°F");
              $("#minTemp7").text("Daily Low of: " + minTemp7.toFixed() + "°F");
              $("#wind7").text("Wind Speed: " + day7wind + " mph");
              $("#hum7").text("Humidity:" + " " + day7hum + "%");
            });
      }

        //leaflet map API
        var  OSM_URL  =  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';  
        var  OSM_ATTRIB  =  '&copy;  <a  href="http://openstreetmap.org/copyright">OpenStreetMap</a>  contributors';  
        var  osmLayer  =  L.tileLayer(OSM_URL,  {attribution:  OSM_ATTRIB});  

        var  WAQI_URL    =  "https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=_TOKEN_ID_";  
        var  WAQI_ATTR  =  'Air  Quality  Tiles  &copy;  <a  href="http://waqi.info">waqi.info</a>';  
        var  waqiLayer  =  L.tileLayer(WAQI_URL,  {attribution:  WAQI_ATTR});  
        var  map  =  L.map('map').setView([storedLat,  storedLon],  10);  
        map.addLayer(osmLayer).addLayer(waqiLayer);  
      })  
}
})