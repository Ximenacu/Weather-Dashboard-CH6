// JS
var lat;
var lon;
// var APIKey = "41adf6f71fd0597dbaad07a430a610c9";
var cityName;
var mainW = [];
var date5=[];
var icon=[];
var temp=[];
var wind=[];
var hum=[] ;

// Get Current Day and display it. 
var currentDay = dayjs().format('dddd, MMMM DD, YYYY.');
document.querySelector("#today").textContent = currentDay;

// Hide elements that will display later. 
document.querySelector("#futures").style.visibility = "hidden";
document.querySelector("#icon").style.visibility = "hidden";

//  SUBMIT BUTTON 
document.querySelector("#submit").addEventListener("click", function(event){
  event.preventDefault();
  cityName = document.querySelector("#city").value;
  console.log("cityname: "+cityName);
  getCoordApi();

  document.querySelector("#history-text").textContent="Search History";
  appends("div","card",cityName,"#history");
  clickHistory()
});

// USES API TO GET COORDINATES FROM CITY NAME.
function getCoordApi() {
  console.log("   getCoordApi()");
  var queryURL1 = "https://api.openweathermap.org/geo/1.0/direct?q="+ cityName +"&limit=5&appid=41adf6f71fd0597dbaad07a430a610c9" ;
  // http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

  fetch(queryURL1)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('data from getcoord:');
      console.log(data);

      lat=data[0].lat;
      lon=data[0].lon;
      console.log("lat:"+lat);
      console.log("lon: "+lon);
      localStorage.setItem(cityName, JSON.stringify(lat+ " "+lon));
      getWeatherApi(lat,lon);
    });
}

// API that gets weather info
function getWeatherApi(lat,lon) {
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

      displayInfo(data)
    });
}

// Displays weather info on screen: 
function displayInfo(data){
  console.log("   displayInfo()");
  
  document.querySelector("#cityName").textContent=data.city.country+" - "+data.city.name;
  document.querySelector("#icon").setAttribute("src", "https://openweathermap.org/img/wn/"+data.list[0].weather[0].icon+"@2x.png");
  document.querySelector("#mainW").textContent=data.list[0].weather[0].description;
  document.querySelector("#temp").textContent="Temperature: "+data.list[0].main.temp+" °C";
  document.querySelector("#wind").textContent="Wind: "+data.list[0].wind.speed+" m/sec";
  document.querySelector("#hum").textContent="Humidity: "+data.list[0].main.humidity+" %";

  for (i=0;i<5;i++){
    var indexs =[0,10,20,30,39];
    date5[i] = data.list[indexs[i]].dt_txt.split(' ');
    icon[i] = "https://openweathermap.org/img/wn/"+data.list[indexs[i]].weather[0].icon+"@2x.png"
    document.querySelector("#icon").style.visibility = "visible";
    mainW[i] =data.list[indexs[i]].weather[0].description;
    temp[i] ="Temperature: "+data.list[indexs[i]].main.temp+" °C";
    wind[i] ="Wind: "+data.list[indexs[i]].wind.speed+" m/sec";
    hum[i] = "Humidity: "+data.list[indexs[i]].main.humidity+" %";

    document.querySelector("#future"+i).textContent=date5[i][0];
    var varname = document.createElement("img");
    varname.setAttribute("src", "https://openweathermap.org/img/wn/"+data.list[indexs[i]].weather[0].icon+"@2x.png");
    document.querySelector(("#future"+i)).appendChild(varname);
    appends("p","mainWeatherF",mainW[i],("#future"+i));
    appends("p","temperatureF",temp[i],("#future"+i));
    appends("p","windF",wind[i],("#future"+i));
    appends("p","humF",hum[i],("#future"+i));
    document.querySelector("#futures").style.visibility = "visible";
  } 

}

// Click on history cards
function clickHistory(){
  console.log("   clickHistory()");

  var saveButton = $('.card');
  saveButton.on('click', function () {

    var stored = localStorage.getItem(this.innerHTML).split(" "); 
    var storedlat = parseFloat(stored[0].slice(1));
    var storedlon = parseFloat(stored[1].slice(0,-1)); 
    
    getWeatherApi(storedlat,storedlon);
  });
}

// append function
function appends(Elname,className,content,selecName){
  // Elname -  element type (string) eg: "div"
  // classname - new element class (string) eg: "temp"
  // content -  content to be appended
  // selecName - name of parent element (strin) eg: "#history"
  var varname = document.createElement(Elname);
  varname.setAttribute("class", className);
  varname.textContent= content;
  document.querySelector(selecName).appendChild(varname);
}