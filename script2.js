// JS
var lat;
var lon;
// var APIKey = "41adf6f71fd0597dbaad07a430a610c9";
var cityName;
var optionsNamesArr = [];
var mainW = [];
var date5=[];
var icon=[];
var temp=[];
var wind=[];
var hum=[] ;
var newdata={};
var hist = [];
var histArr = ["hhh"];
// Get Current Day and display it. 
var currentDay = dayjs().format('dddd, MMMM DD, YYYY.');
document.querySelector("#today").textContent = currentDay;

// Hide elements that will display later. 
document.querySelector("#futures").style.visibility = "hidden";
document.querySelector("#icon").style.visibility = "hidden";

//  SUBMIT BUTTON 
document.querySelector("#submit").addEventListener("click", function(event){
  event.preventDefault();
  // erraseOptions()
  cityName = document.querySelector("#city").value;
  console.log("cityname: "+cityName);
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
    //   newdata=data;
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
    console.log("the id!:"+theId);

    var chosen = optionsNamesArr[theId];
    console.log("chosen clickoptions: "+chosen);

    lat=data[theId].lat;
    lon=data[theId].lon;
    console.log("lat:"+lat);
    console.log("lon"+lon);

    hist[0]=chosen;
    hist[1]=lat;
    hist[2]=lon;
    console.log("hist: "+hist);
    

    // var card = document.createElement("div");
    // card.setAttribute("class", "card");
    // card.textContent= chosen;
    // document.querySelector("#history").appendChild(card);

    appends("div","card",chosen,"#history");
    histArr.push(hist);
    console.log("histArr: "+histArr);
    document.querySelector("#history-text").textContent="Search History";

    // erraseOptions()
    getWeatherApi(lat,lon,chosen)
    
  });
}

// Click on history cards
function clickHistory(data,optionsNamesArr){
  console.log("   clickOptions()");
  var saveButton = $('.options');
  saveButton.on('click', function (event) {
    var theId = this.id;
    console.log("the id!:"+theId);
    var chosen = optionsNamesArr[theId];
    console.log("chosen clickoptions: "+chosen);
    lat=data[theId].lat;
    lon=data[theId].lon;
    console.log("lat:"+lat);
    console.log("lon"+lon);

    
    
    // var card = document.createElement("div");
    // card.setAttribute("class", "card");
    // card.textContent= chosen;
    // document.querySelector("#history").appendChild(card);

    appends("div","card",chosen,"#history");
    document.querySelector("#history-text").textContent="Search History";

    // erraseOptions()
    getWeatherApi(lat,lon,chosen)
    
  });
}

// CLEARS THE OPTIONS. 
function erraseOptions(){
  console.log("   erraseOptions()");
  // console.log("optionsNamesArr before: "+optionsNamesArr);
  document.querySelector(".optionsBox").style.display = "none";
  for (n=0;n<optionsNamesArr.length;n++){
    optionsNamesArr[n]="";
    // console.log(" borrar optionsNamesArr: "+optionsNamesArr);
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

      // console.log("chosen getweatherapi: "+chosen);
      displayInfo(chosen,data)

    });
    lat="";
    lon="";
}

function displayInfo(chosen,data){
  console.log("   displayInfo()");
  // console.log("chosen displayinfo: "+chosen);
  document.querySelector("#cityName").textContent=chosen;
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

// function appends(i,Elname,className,content,selecName){
//   // Elname -  element type (string) eg: "div"
//   // classname - new element class (string) eg: "temp"
//   // content -  content to be appended
//   // selecName - name of parent element (strin) eg: "#history"
//   var varname = document.createElement(Elname);
//   varname.setAttribute("class", className);
//   varname.textContent= content[i];
//   document.querySelector(selecName).appendChild(varname);
// }

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