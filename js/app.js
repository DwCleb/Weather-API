//fiveDays(524901);
country();
//city();
var current = false;

function forecast(id) {
  var appKey = "5cfdaac4c096563bcd39c629ac87f25a";
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'http://api.openweathermap.org/data/2.5/forecast',
    async: true,
    data: {
      id: id,
      appid: appKey,
    },
    success: function (response) {
      //console.log("5 Days"); // geral
      console.log(response); // geral
      //console.log(response.city.name); // nome da cidade
      //console.log(response.list["0"].main.temp); // temperatura
      //console.log(response.list["0"].dt_txt); // data e hora do dado 
      //gerar as 5 datas
      
      var dates = [];

      for (let index = 0; index < response.list.length; index++) {
        date = response.list[index].dt_txt.split(" ");
        dates[index] = date[0];
      }

      var newDates = dates.filter(function (here, i) {
        return dates.indexOf(here) == i;
      });
      var superDates = newDates;
      
      var temps = [];

      for (let index = 0; index < response.list.length; index++) {
        date = response.list[index].dt_txt.split(" ");
        if(newDates.indexOf(date[0]) > -1){
          temps[index] = response.list[index].main.temp;
          var delet = newDates.indexOf(date[0]);
          if ( delet > -1) {
            newDates.splice(delet, 1);
          }
        }
      }

      var newTemps = temps.filter(function (here, i) {
        return temps.indexOf(here) == i;
      });
      temps = newTemps;

      for (let index = 0; index < response.list.length; index++) {
        date = response.list[index].dt_txt.split(" ");
        dates[index] = date[0];
      }

      var dates = dates.filter(function (here, i) {
        return dates.indexOf(here) == i;
      });

      for (let index = 0; index < temps.length; index++) {
        console.log(dates[index] + " - " + temps[index]);
      }
       
      /*document.getElementById("MainTemp").innerHTML = response.list["0"].main.temp + " °F";
       $("#resultContainer").fadeIn(500);
       $('html, body').animate({
         scrollTop: $('#footer').offset().top - 50
       }, "slow");
       */
    },
    error: function (jqXHR, exception) {
      msg = "Undefined Error";
      if (jqXHR.status === 0) {
        msg = "Not connect.\n Verify Network.";
      } else if (jqXHR.status == 404) {
        msg = "Requested page not found. [404]";
      } else if (jqXHR.status == 500) {
        msg = "Internal Server Error [500].";
      } else if (exception === "parsererror") {
        msg = "Requested JSON parse failed.";
      } else if (exception === "timeout") {
        msg = "Time out error.";
      } else if (exception === "abort") {
        msg = "Ajax request aborted.";
      } else {
        msg = "Uncaught Error.\n" + jqXHR.responseText;
      }
      console.log(msg);
    }
  });
}

function currentD(id) {
  var appKey = "5cfdaac4c096563bcd39c629ac87f25a";
  var img = "https://openweathermap.org/img/w/";
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'https://api.openweathermap.org/data/2.5/weather',
    async: true,
    data: {
      id: id,
      appid: appKey,
    },
    success: function (response) {
      //console.log("5 Days"); // geral
      console.log(response); // geral
      //console.log(response.city.name); // nome da cidade
      //console.log(response.list["0"].main.temp); // temperatura
      //console.log(response.list["0"].dt_txt); // data e hora do dado 
      document.getElementById("MainTemp").innerHTML = convert(response.main.temp) + " °F";
      document.getElementById("imgWeather").src = img + response.weather[0].icon + ".png";
      document.getElementById("description").innerHTML = response.weather[0].description;
      document.getElementById("selectCity").innerHTML = response.name;
      document.getElementById("selectCountry").innerHTML = response.sys.country;
      $("#resultContainer").fadeIn(500);
      $('html, body').animate({
        scrollTop: $('#footer').offset().top - 50
      }, "slow");
    },
    error: function (jqXHR, exception) {
      msg = "Undefined Error";
      if (jqXHR.status === 0) {
        msg = "Not connect.\n Verify Network.";
      } else if (jqXHR.status == 404) {
        msg = "Requested page not found. [404]";
      } else if (jqXHR.status == 500) {
        msg = "Internal Server Error [500].";
      } else if (exception === "parsererror") {
        msg = "Requested JSON parse failed.";
      } else if (exception === "timeout") {
        msg = "Time out error.";
      } else if (exception === "abort") {
        msg = "Ajax request aborted.";
      } else {
        msg = "Uncaught Error.\n" + jqXHR.responseText;
      }
      console.log(msg);
    }
  });
}

function city() {
  country = document.getElementById("country").options[document.getElementById("country").selectedIndex].text;
  $("#city").html("");
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'https://raw.githubusercontent.com/dwcleb/Weather-API---openWeatherMap/master/city.list.json',
    async: true,
    success: function (response) {
      console.log(response.length);
      // for (let index = 0; index < response.length; index++) {
      for (let index = 0; index < 2; index++) {
        if (response[index].country == country) {
          let cityName = response[index].name;
          let cityId = response[index].id;
          console.log(cityId);
          option = "<option value = " + cityId + ">" + cityName + "</option>";
          $("#city").append(option);
        }
      }

    },
    error: function (jqXHR, exception) {
      msg = "Undefined Error";
      if (jqXHR.status === 0) {
        msg = "Not connect.\n Verify Network.";
      } else if (jqXHR.status == 404) {
        msg = "Requested page not found. [404]";
      } else if (jqXHR.status == 500) {
        msg = "Internal Server Error [500].";
      } else if (exception === "parsererror") {
        msg = "Requested JSON parse failed.";
      } else if (exception === "timeout") {
        msg = "Time out error.";
      } else if (exception === "abort") {
        msg = "Ajax request aborted.";
      } else {
        msg = "Uncaught Error.\n" + jqXHR.responseText;
      }
      console.log(msg);
    }
  });
  cityContainer();
}

function country() {
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'C:/Users/dwcle/Desktop/aubay/API/country.list.json',
    async: true,
    success: function (response) {
      console.log(response.length);
      // for (let index = 0; index < response.length; index++) {
      option = "";
      var c = [];
      for (let index = 0; index < response.length; index++) {
        let countryName = response[index];
        //console.log(countryId);
        option += "<option>" + countryName + "</option>";
        
      }
      $("#country").append(option);

    },
    error: function (jqXHR, exception) {
      msg = "Undefined Error";
      if (jqXHR.status === 0) {
        msg = "Not connect.\n Verify Network.";
      } else if (jqXHR.status == 404) {
        msg = "Requested page not found. [404]";
      } else if (jqXHR.status == 500) {
        msg = "Internal Server Error [500].";
      } else if (exception === "parsererror") {
        msg = "Requested JSON parse failed.";
      } else if (exception === "timeout") {
        msg = "Time out error.";
      } else if (exception === "abort") {
        msg = "Ajax request aborted.";
      } else {
        msg = "Uncaught Error.\n" + jqXHR.responseText;
      }
      console.log(msg);
    }
  });
  setTimeout(() => {}, 1500);
}

function currentData() {
  current = true;
  container();
}

function forecastData() {
  current = false;
  container();
}

function container() {
  $("#container").fadeIn(500);
  $("#cityContainer").fadeOut(500);
  $("#VerifyContainer").fadeOut(500);
  $("#resultContainer").fadeOut(500);
}

function cityContainer() {
  $("#cityContainer").fadeIn(500);
  $("#VerifyContainer").fadeIn(500);
}

function getData() {
  id = document.getElementById("city").value;
  console.log(id);
  if (current) currentD(id);
  else forecast(id);
}
function convert(value) {
  return (1.8 * (value - 273) + 32).toFixed(2);
}