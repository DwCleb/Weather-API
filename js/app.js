//fiveDays(524901);
country();
//city();
var current = false;

function forecast(id) {
  var appKey = "5cfdaac4c096563bcd39c629ac87f25a";
  var check = document.getElementById("temperature");
  if(check.checked) var unit = "imperial";
  else var unit = "metric";

  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'http://api.openweathermap.org/data/2.5/forecast',
    async: true,
    data: {
      id: id,
      appid: appKey,
      units: unit,
    },
    success: function (response) {
      console.log(response); // geral
      if (unit == "imperial") tempM = " °F";
      else tempM = " °C"; 
      //gerar as 5 datas
      var media = 0;
      var dates = [];
      var temps = [];
      var temps_min = [];
      var temps_max = [];
      var descs = [];
      var icons = [];

      //obtenção das datas para consulta
      for (let index = 0; index < response.list.length; index++) {
        date = response.list[index].dt_txt.split(" ");
        if ((date[1] >= "06:00:00") && (date[1] <= "17:00:00")){
          dates[index] = date[0];
          
        }
      }
      //tratamento das datas
      var newDates = dates.filter(function (here, i) {
        return dates.indexOf(here) == i;
      });
      //./
      
      //obtenção da temperatura, descriçãoe icone atráves da data
      subIndex = 0;
      for (let index = 0; index < response.list.length; index++) {
        date = response.list[index].dt_txt.split(" ");
        if(newDates.indexOf(date[0]) > -1){
          if ((date[1] >= "06:00:00") && (date[1] <= "17:00:00")){
            temps[subIndex] = response.list[index].main.temp;
            temps_min[subIndex] = response.list[index].main.temp_min;
            temps_max[subIndex] = response.list[index].main.temp_max;
            descs[subIndex] = response.list[index].weather[0].description;
            icons[subIndex] = response.list[index].weather[0].icon;
            // exclui a data já usada
            subIndex++;
            var delet = newDates.indexOf(date[0]);
            if ( delet > -1) {
              newDates.splice(delet, 1);
            }
            //console.log(date[1]);
          }
          //./
        }
      }
      //./
     
      // reobtenção das datas que foram utilizadas e perdidas da memória
      for (let index = 0; index < response.list.length; index++) {
        date = response.list[index].dt_txt.split(" ");
        if ((date[1] >= "06:00:00") && (date[1] <= "17:00:00")){
          dates[index] = date[0];
          console.log(date[1]);
        }
      }
      //tratamento das datas
      var dates = dates.filter(function (here, i) {
        return dates.indexOf(here) == i;
      });

      //./

      //modelagem da tabela para exibição dos dados
      table = "<thead>";
      table += "<tr>";
      table += "<th style='text-align:center;'>#</th>";
      table += "<th style='text-align:center;'>Weather</th>";
      table += "<th style='text-align:center;'>Temperature</th>";
      table += "<th style='text-align:center;'>Date</th>";
      table += "</tr>";
      table += "</thead>";
      table += " <tbody>";
      //construção da tabela
      for (let index = 0; index < dates.length; index++) {
        table += "<tr>";
        table += "<th scope=\"row\">" + (index + 1) + "</th> ";
        table += "<td><img src=\"https://openweathermap.org/img/w/" + icons[index] + ".png\" width=\"50\" height=\"50\" ></td> ";
        table += "<td><h4><strong>" + temps[index] + tempM + " </strong></h4>";
        table += "<span style=\"font-size: 10pt;\">" + descs[index] + "</span><br>";
        table += "<span style=\"font-size: 8pt;\">Min <strong>"  + temps_min[index] + tempM + "</strong> | Max <strong>" + temps_max[index] + tempM + "</strong></span></td> ";
        table += "<td>" + dates[index] + "</td> ";
        table += "</tr> ";

        media += temps[index];
        qtdDays = index;
      }
      media = (media/(qtdDays + 1));
      table += "<tr>";
      table += "<td colspan='6'>";
      table += "<center> Forecast average <strong>" + media.toFixed(2) + tempM + "</strong></center>";
      table += "</td>";
      table += "</tr>";
      table += " </tbody>";
      //./
      //./

      //Envio das informações
      document.getElementById("infoCurrent").style.display = "none";
      $("#forecastTable").fadeIn(500);
      document.getElementById("tableWeather").innerHTML = table;
      document.getElementById("selectCity").innerHTML = response.city.name;
      document.getElementById("selectCountry").innerHTML = response.city.country;
      //./
       $("#resultContainer").fadeIn(500);
       $('html, body').animate({
         scrollTop: $('#resultContainer').offset().top - 50
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

function currentD(id) {
  var appKey = "5cfdaac4c096563bcd39c629ac87f25a";
  var img = "https://openweathermap.org/img/w/";
  var check = document.getElementById("temperature");
  if(check.checked) var unit = "imperial";
  else var unit = "metric";
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'https://api.openweathermap.org/data/2.5/weather',
    async: true,
    data: {
      id: id,
      appid: appKey,
      units: unit,
    },
    success: function (response) {
      //console.log(response); // geral
      if (unit == "imperial") tempM = " °F";
      else tempM = " °C"; 
      document.getElementById("infoCurrent").style.display = "block";
      document.getElementById("MainTemp").innerHTML = response.main.temp + tempM;
      document.getElementById("imgWeather").src = img + response.weather[0].icon + ".png";
      document.getElementById("description").innerHTML = response.weather[0].description;
      document.getElementById("temps").innerHTML = "Min <strong>" + response.main.temp_min + tempM;
      document.getElementById("temps").innerHTML += "</strong> | Max <strong>" + response.main.temp_max + tempM + "</strong>";
      document.getElementById("selectCity").innerHTML = response.name;
      document.getElementById("selectCountry").innerHTML = response.sys.country;
      $("#resultContainer").fadeIn(500);
      $("#forecastTable").fadeOut(500);
      $('html, body').animate({
        scrollTop: $('#resultContainer').offset().top - 50
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
  country = document.getElementById("country").value;
  $("#city").fadeOut(500);
  $("#loadCity").html("<center><img src='load.gif' width='30' height='30'></center>");
  $("#city").html("");
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'https://raw.githubusercontent.com/dwcleb/Weather-API---openWeatherMap/master/city.list.min.json',
    async: true,
    success: function (response) {
      response = response.sort();
      for (let index = 0; index < response.length; index++) {
        if (response[index].country == country) {
          let cityName = response[index].name;
          let cityId = response[index].id;
          //console.log(cityId);
          option = "<option value = " + cityId + ">" + cityName + "</option>";
          $("#city").append(option);
        }
      }
      setTimeout(() => {
        $("#loadCity").fadeOut(500);
        $("#city").fadeIn(500);
      }, 500);
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
  $("#country").html("");
  $.ajax({
    type: 'GET',
    dataType: 'json',
    // url: 'https://raw.githubusercontent.com/dwcleb/Weather-API---openWeatherMap/master/country.list.json',
    url: 'https://restcountries.eu/rest/v2/all',
    async: true,
    success: function (response) {
      //console.log(response);
      option = "<option value='#'> Select Country</option>";
      var c = [];
      for (let index = 0; index < response.length; index++) {
        let countryName = response[index].name;
        let alpha2Code = response[index].alpha2Code;
        option += "<option value=" + alpha2Code + ">" + countryName + "</option>";
        
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
  $("select[name=country]").val("#");
}

function forecastData() {
  current = false;
  container();
  $("select[name=country]").val("#");

}

function container() {
  $("#container").fadeIn(500);
  $("#cityContainer").fadeOut(500);
  $("#VerifyContainer").fadeOut(500);
  $("#resultContainer").fadeOut(500);
  $("#forecastTable").fadeOut(500);
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

function change() {
  var check = document.getElementById("temperature");
  if(check.checked) document.getElementById('tmpType').innerHTML = "Fahrenheit";
  else document.getElementById('tmpType').innerHTML = "Celsius";
  $("#resultContainer").fadeOut(500);
  //$("#container").fadeOut(500);
}