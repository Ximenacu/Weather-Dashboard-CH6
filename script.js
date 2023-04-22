// JS
var lat;
var lon;
var APIKey = "41adf6f71fd0597dbaad07a430a610c9";
var cityName;
var optionsNamesArr = [];
var mainW = [];
var currentDay = dayjs().format('dddd, MMMM DD, YYYY.');
console.log("currentDay: "+ currentDay);
document.querySelector("#today").textContent = currentDay;

//  SUBMIT BUTTON 
document.querySelector("#submit").addEventListener("click", function(event){
  event.preventDefault();
  erraseOptions()
  cityName = document.querySelector("#city").value;

  getCoordApi();

});

// USES API TO GET COORDINATES FROM CITY NAME.
//    DISPLAYS CITY OPTIONS TO CHOOSE FROM.
//        CALLS CLICKoPTIONS FOR COORDINATES.
function getCoordApi() {
  console.log("   getCoordApi()");
  var queryURL1 = "http://api.openweathermap.org/geo/1.0/direct?q="+ cityName +"&limit=5&appid=41adf6f71fd0597dbaad07a430a610c9" ;
  // http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

  fetch(queryURL1)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('data from getcoord:');
      console.log(data);

      for (i=0;i<2;i++){
        document.querySelector(".optionsBox").style.display = "block";
        document.querySelector("#Select").textContent="Select your City:";

        var optionsNames = data[i].country+" - "+data[i].name+" ("+data[i].state+")";
        document.getElementById(i).textContent= optionsNames;
        optionsNamesArr[i]=optionsNames;
      }

      clickOptions(data,optionsNamesArr)

    });
}


// CLICK LISTENNER FOR OPTIONS:
//    SAVES CHOSEN COORDINATES
//        CREATES HISTORY CARDS     <-------------BUG HERE MAYBE 
function clickOptions(data,optionsNamesArr){
  console.log("   clickOptions()");
  var saveButton = $('.options');
  saveButton.on('click', function (event) {
    var theId = this.id;
    // console.log("the id!:"+theId);
    lat=data[theId].lat;
    lon=data[theId].lon;
    console.log("lat:"+lat);
    console.log("lon"+lon);

    var card = document.createElement("div");
    card.setAttribute("class", "card");
    var chosen = optionsNamesArr[theId];
    card.textContent= chosen;
    erraseOptions()
    document.querySelector("#history").appendChild(card);
    document.querySelector("#history-text").textContent="Search History";

    getWeatherApi(lat,lon,chosen)
    
  });
}

// CLEARS THE OPTIONS. 
function erraseOptions(){
  console.log("   erraseOptions()");
  document.querySelector(".optionsBox").style.display = "none";
  for (n=0;n<optionsNamesArr.length;n++){
    optionsNamesArr.shift();
    console.log(" borrar optionsNamesArr: "+optionsNamesArr);
  }

}


function getWeatherApi(lat,lon,chosen) {
  console.log("   getweatherApi()");
  // https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=41adf6f71fd0597dbaad07a430a610c9&units=metric" ;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Data from api 2");
      console.log(data);

      // mainW[0] = data.list[0].weather[0].description;
      // console.log(mainw);
      // var wet = data.list[0].weather[0].description;
      // document.querySelector("#stats").textContent=wet;

      //uncommented, this works!
      // document.querySelector("#mainW").textContent=data.list[0].weather[0].description;
      // document.querySelector("#temp").textContent="Temperature: "+data.list[0].main.temp+" °C";
      // document.querySelector("#wind").textContent="Wind: "+data.list[0].wind.speed+" m/sec";
      // document.querySelector("#hum").textContent="Humidity: "+data.list[0].main.humidity+" %";
      displayInfo(chosen,data)

    });

  
  displayInfo(chosen)
}

function displayInfo(chosen,data){
  console.log("   displayInfo()");
  document.querySelector("#cityName").textContent=chosen;
  document.querySelector("#mainW").textContent=data.list[0].weather[0].description;
  document.querySelector("#temp").textContent="Temperature: "+data.list[0].main.temp+" °C";
  document.querySelector("#wind").textContent="Wind: "+data.list[0].wind.speed+" m/sec";
  document.querySelector("#hum").textContent="Humidity: "+data.list[0].main.humidity+" %";
  

}
