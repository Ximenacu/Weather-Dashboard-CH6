// JS
var lat;
var lon;

// 
document.querySelector("#submit").addEventListener("click", function(event){
  event.preventDefault();
  var name = document.querySelector("#city").value;
  console.log("name: "+name);

  var card = document.createElement("div");
  card.setAttribute("class", "card");
  card.textContent=name;
  document.querySelector("#history").appendChild(card);
  var a = 1;

//   namescore.push(name);
//   namescore.push(finalscore);

//   localStorage.setItem("StoredNamescore", JSON.stringify(namescore));
//   message.textContent="Thanks for submitting your name, you can now compare your score or try again!"
});

function getApi() {
  var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={19.4326}&lon={99.1332}&appid={41adf6f71fd0597dbaad07a430a610c9}';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('data: '+data);
      // //Loop over the data to generate a table, each table row will have a link to the repo url
      // for (var i = 0; i < data.length; i++) {
      //   // Creating elements, tablerow, tabledata, and anchor
      //   var createTableRow = document.createElement('tr');
      //   var tableData = document.createElement('td');
      //   var link = document.createElement('a');

      //   // Setting the text of link and the href of the link
      //   link.textContent = data[i].html_url;
      //   link.href = data[i].html_url;

      //   // Appending the link to the tabledata and then appending the tabledata to the tablerow
      //   // The tablerow then gets appended to the tablebody
      //   tableData.appendChild(link);
      //   createTableRow.appendChild(tableData);
      //   tableBody.appendChild(createTableRow);
      // }
    });
}

// getApi(19.4326,99.1332);

// omg
// function getApi() {
//   // fetch request gets a list of all the repos for the node.js organization
//   var requestUrl = 'https://api.github.com/users/octocat/repos';

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data)
//       //Loop over the data to generate a table, each table row will have a link to the repo url
//       // for (var i = 0; i < data.length; i++) {
//       //   // Creating elements, tablerow, tabledata, and anchor
//       //   var createTableRow = document.createElement('tr');
//       //   var tableData = document.createElement('td');
//       //   var link = document.createElement('a');

//       //   // Setting the text of link and the href of the link
//       //   link.textContent = data[i].html_url;
//       //   link.href = data[i].html_url;

//       //   // Appending the link to the tabledata and then appending the tabledata to the tablerow
//       //   // The tablerow then gets appended to the tablebody
//       //   tableData.appendChild(link);
//       //   createTableRow.appendChild(tableData);
//       //   tableBody.appendChild(createTableRow);
//       // }
//     });
// }

getApi();

// NO FURULA LA PUTA API 
// ERROR : 401 UNAUTHORIZED. 
