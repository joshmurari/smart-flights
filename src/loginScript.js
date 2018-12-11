var loginRoot = "http://comp426.cs.unc.edu:3002/api/";
var root = "http://comp426.cs.unc.edu:3001/";
var username = "jnmurari"
var password = "730085553"
var date1;
var date2;
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;
todStr = mm + '-' + dd + '-' + yyyy;

$(document).ready(() => {
	makeHomePage();
	$("#weather-infos").hide();
	$("#sortByButton").hide();
	fillValuesInTextBoxes();

    $('#submit_login').on('click', () => {
	
	let user = $('#user').val();
	let pass = $('#pass').val();
	
	$.ajax(loginRoot + 'login',
	       {
		   type: 'GET',
		   xhrFields: {withCredentials: true},
		   data: {
		       username: user,
		       password: pass
		   },
		   success: (response) => {
		       if (response.status) {
			   makeHomePage();
		       } else {
			   $('#err-mssg-conatiner').html("Login Unsuccessful. Please try again.");
		       }
		   },
		   error: () => {
		       alert('error');
		   }
	       });
    });
});

function makeHomePage() {
//TODO
//do nothing if already on home page

//Create Home Body
$('body').empty();

var foobarElement = document.getElementById('main-body');
 foobarElement.style.background = 'none';

homebody = `
  <div id="clouds">
  <div class="cloud x1"></div>
  <div class="cloud x2"></div>
  <div class="cloud x3"></div>
  <div class="cloud x4"></div>
  <div class="cloud x5"></div>
  </div>

  <section id="frontpage">
  <div class="navbar">
    <nav>
      <div class="logo">
        <a href="#"></a>
      </div>
      <ul>
        <li>
          <a href="#" onclick="makeHomePage();" class="hover_link">Home</a>
        </li>
        <li>
          <a href="#" class="hover_link">Bookings</a>
        </li>
        <li>
          <a href="#" onclick="makeAdminPage();" class="hover_link">Admin</a>
        </li>
        <li>
          <a href="#s" class="hover_link">Log Out</a>
        </li>
      </ul>
    </nav>
  </div>


  <div class="bookFlightPage"> 
  <h3>Customize Your Flight</h3>
        <div class="city_options">
            <div autocomplete="off">
              <div class="autocomplete" style="width:300px;">
		<div id="depatureform"> &nbsp; Departure: <input id="departureInput" type="text" name="Departure" placeholder="Departure Airport" autofocus> </div>
		<div id="arrivalform"> &nbsp; Arrival:   <input id="arrivalInput" type="text" name="Arrival" placeholder="Arrival Airport"><br> </div>
			  </div>
			  
			  <div class="date_options">
				<p id="depdate"> Departure Date: &nbsp; </p>
				</div><input id="departureDate" type="date" name="Departure">
                &nbsp; &nbsp; &nbsp;
				<button id="findflightButton" onclick="findFlights()">Find Flights</button>
		</div>
		<div id="flight-picker"></div>
	</div>
	<div id="weather-infos">
	<h4> Weather Forecast </h4>
	<div id="weather-info">
	<div id="departure-weather"></div>
	<div id="arrival-weather"></div>
	</div>
	</div>

<div class="dropdown">
  <button id="sortByButton" class="dropbtn">Sort By</button>
  <div class="dropdown-content">
    <a href="#">Arrival Time</a>
    <a href="#">Departure Time</a>
    <a href="#">Price</a>
  </div>
  `;
  
	$('body').append(homebody);

	//Login to database
    $.ajax(root + 'sessions',
	       {
		   type: 'POST',
		   xhrFields: {withCredentials: true},
		   data: {
            user: {
                username: username  ,
                password: password
              }
		   },
		   success: (response) => {
		      console.log("Logged into database successfully!")
		   },
		   error: () => {
		       alert('error');
		   }
	       });

	//Put in stylesheet because it dissappears for some reason
	$('head').append('<link rel="stylesheet" type="text/css" href="stylesheet.css">')

   //Set autocomplete for departure airports
   //Get all airports
   let airportsArray = getAllAirports();
   autocomplete(document.getElementById("departureInput"), airportsArray);
   autocomplete(document.getElementById("arrivalInput"), airportsArray);
}

function getAllAirports(){
    let airports = [];
    $.ajax(root + 'airports', {
		type: 'GET',
		dataType: 'json',
		xhrFields: {withCredentials: true},
		success: (response) => {
            for(let i=0; i< response.length;i++){
                airports.push(response[i].name);
            }
		}
    }); 
    
	return airports;
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
}

  /*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
      closeAllLists(e.tasrget);
  	});
}

function findFlights(){
	
	//Get Departure Airport
	var departure = $('#departureInput').val()
	console.log(`Departure = ${departure}`)
	//Get Arrival Airport
	var arrival = $('#arrivalInput').val()
	console.log(`Arrival = ${arrival}`)
	//Get Departure Date
	var departureDate = $('#departureDate').val()
	console.log(`Departure Date = ${departureDate}`);

	console.log(today);
	console.log(departureDate < today);
	if (departureDate < today) {

		alert("Please select a date after: " + todStr);
	}
	else {
	//Check if valid departure and arrival
	$.ajax(root + 'airports', {
		type: 'GET',
		dataType: 'json',
		xhrFields: {withCredentials: true},
		success: (response) => {
			//Check if valid airports
			var isValidArrival = false;
			var arrivalIndex =0;
			var isValidDeparture = false;
			var departureIndex = 0;

            for(let i=0; i< response.length;i++){
				if(response[i].name===departure){
					isValidDeparture=true;
					departureIndex=i;
				}
				if(response[i].name===arrival){
					isValidArrival=true;
					arrivalIndex=i;
				}
			}

			//Continue with query if valid airport
			if(!isValidDeparture || !isValidArrival){
				var airportNotFound = '';
				if(!isValidDeparture){
					airportNotFound = departure; 
				}else{
					airportNotFound = arrival
				}
				alert(`Airport:"${airportNotFound}" Not Found! Please enter a valid airport.`);
			}else{
				console.log(`Is valid Departure: ${isValidDeparture}`);
				console.log(`Is valid Arrival: ${isValidArrival}`);

				var departureId = response[departureIndex].id
				var arrivalId = response[arrivalIndex].id

				//Get flights between both airports
				$.ajax(root + `flights?filter[departure_id]=${departureId}&filter[arrival_id]=${arrivalId}`, {
					type: 'GET',
					dataType: 'json',
					xhrFields: {withCredentials: true},
					success: (response) => {
						$("#weather-infos").show();
						$("#sortByButton").show();
						console.log("Flights with specifed departure airport and arrival airport:");
						console.log(response);

						//If flights exist
						if(response.length>0){
							var flightIds = [];
							//Get unique flight id's
							for(let i =0; i< response.length;i++){
								if(flightIds.indexOf(response[i].id)===-1){
									flightIds.push(response[i].id);
								} 
							}
							console.log("Flight Ids:")
							console.log(flightIds);

							//Get flight instances
							let flightInstances=[];
							for(let i =0; i<flightIds.length;i++){
								$.ajax(root + `instances?filter[flight_id]=${flightIds[i]}&filter[date]=${departureDate}`, {
									type: 'GET',
									dataType: 'json',
									xhrFields: {withCredentials: true},
									success: (response) => {
										if(response.length===0){
										}else{
											console.log("Dates found!");
											console.log(response);
											//Add responces to flight instances
											for(let i=0;i<response.length;i++){
												flightInstances.push(response[i]);
											}
										}
									},
									async: false
								}); 
							}

							//No flights are found
							if(flightInstances.length<=0){
								buildFlightsInterface(false,flightInstances,arrival,departure);		
							}else{//Flights are found
								buildFlightsInterface(true,flightInstances,arrival,departure);
							}
						}else{
							//Show that there are no flights, with the option to add a flight
							alert(`No flights found between those airports! Please choose a different airport or add a new flight into our system!`)
						}
					}
				}); 
			}	
		}
	}); 
	
	//Get weather info
	updateWeather(departure,arrival);
}
}

function buildFlightsInterface(dateFound,flightInstances,arrival,departure){
	$('#flight-picker').empty();
	var flightsInterface = `
	
		<div id="flight_options">
		<div id="optionHeader"></div>
        </div>
	`;
	$('#flight-picker').append(flightsInterface);

	if(dateFound){
		$('#optionHeader').text("Here are the flights we have found with your specific date:");

		//Add flights table
		$('#flight_options').append('<table id="flightsTable"></table');
		$('#flightsTable').append(`
		<tr id="header">
		<div id="longFlightTable">
			<th>Flight Number&nbsp;&nbsp;</th>
			<th>Airline&nbsp;&nbsp;</th>
			<th>Departure Date&nbsp;&nbsp;</th>
			<th>Departure Time&nbsp;&nbsp;</th>
			<th>Arrival Date&nbsp;&nbsp;</th>
			<th>Arrival Time&nbsp;&nbsp;</th>
		</div>
		</tr>
		`);

		for(let i=0;i<flightInstances.length;i++){
			//Get flight Id
			let flightId = flightInstances[i].flight_id;
			let date = flightInstances[i].date;

			//Get flight info
			$.ajax(root + `flights/${flightId}`, {
				type: 'GET',
				dataType: 'json',
				xhrFields: {withCredentials: true},
				success: (response) => {
					//Get departure time
					let departureTime = (new Date(response.departs_at)).toLocaleTimeString();
					//Get arrival time
					let arrivalTime = (new Date(response.arrives_at)).toLocaleTimeString();
					//Get flight number
					let flightNumber = response.number;
					//Get airlineId
					let airlineId = response.airline_id;

					//Get airline Info
					$.ajax(root + `airlines/${airlineId}`, {
						type: 'GET',
						dataType: 'json',
						xhrFields: {withCredentials: true},
						success: (response) => {
							let airlineName = response.name;
	
							//Create row
							let row = $('<tr></tr>');
							row.append(`<td>${flightNumber}</td>`);
							row.append(`<td>${airlineName}</td>`);
							row.append(`<td>${date}</td>`);
							row.append(`<td>${departureTime}</td>`);
							//row.append(`<td>${departure}</td>`);
							row.append(`<td>${date}</td>`);
							row.append(`<td>${arrivalTime}</td>`);
							//row.append(`<td>${arrival}</td>`);
							row.append(`<td><button id="bookFlightButton" Flight()">Book Flight</button></td>`);
							$('#flightsTable').append(row);
						}
					});
				}		
			});
		}
	}else{
		$('#optionHeader').text("We could not find any flights leaving on your specific date. Please choose a different date or add a flight in the Admin page.");
	}
}

function updateWeather(departure, arrival){
	//Get airport data

	$.ajax(root + 'airports', {
		type: 'GET',
		dataType: 'json',
		xhrFields: {withCredentials: true},
		success: (response) => {
			let departureIndex = 0;
			let arrivalIndex = 0;
			
			//Get Ids
            for(let i=0; i< response.length;i++){
				if(response[i].name===departure){
					departureIndex=i;
				}
				if(response[i].name===arrival){
					arrivalIndex=i;
				}
			}

			var departure_id = response[departureIndex].id;
			var arrival_id = response[arrivalIndex].id;

			//Get departure airport
			$.ajax(root + `airports/${departure_id}`, {
				type: 'GET',
				dataType: 'json',
				xhrFields: {withCredentials: true},
				success: (response) => {
					let departureName = response.name;
					let departureCode = response.code;
					let departureLat = response.latitude;
					let departureLon = response.longitude;

					//Get weather at departure
					$.ajax(`http://api.openweathermap.org/data/2.5/weather?lat=${departureLat}&lon=${departureLon}&units=imperial&appid=b198f1c7bc6bd22f60f1b42994a05686`, {
						type: 'GET',
						dataType: 'json',
						success: (response) => {
							console.log("Weather:");
							console.log(response.main.temp);
							let weatherDepature = Math.round(response.main.temp);
							$('#departure-weather').text(`${departureCode}: ${weatherDepature} ` +String.fromCharCode(176) + 'F');


							//Get arrival airport
							$.ajax(root + `airports/${arrival_id}`, {
								type: 'GET',
								dataType: 'json',
								xhrFields: {withCredentials: true},
								success: (response) => {
									let arrivalName = response.name;
									let arrivalCode = response.code;
									let arrivalLat = response.latitude;
									let arrivalLon = response.longitude;

									//Get weather at departure
									$.ajax(`http://api.openweathermap.org/data/2.5/weather?lat=${arrivalLat}&lon=${arrivalLon}&units=imperial&appid=b198f1c7bc6bd22f60f1b42994a05686`, {
										type: 'GET',
										dataType: 'json',
										success: (response) => {
											console.log("Weather:");
											console.log(response.main.temp);
											let weatherArrival = Math.round(response.main.temp);
											$('#arrival-weather').text(`${arrivalCode}: ${weatherArrival} ` + String.fromCharCode(176) + 'F');
										
										}
									}); 					
								}
							});
						}
					}); 					
				}
			});
		}
    }); 	 
}

function makeAdminPage(){
	//TODO
	//do nothing if already on admin page

	//Create Home Body
	$('body').empty();

	var foobarElement = document.getElementById('main-body');
	foobarElement.style.background = 'none';

	homebody = `
	<div id="clouds">
	<div class="cloud x1"></div>
	<div class="cloud x2"></div>
	<div class="cloud x3"></div>
	<div class="cloud x4"></div>
	<div class="cloud x5"></div>
	</div>

	<section id="frontpage">
	<div class="navbar">
		<nav>
		<div class="logo">
			<a href="#"></a>
		</div>
		<ul>
			<li>
			<a href="#" onclick="makeHomePage();" class="hover_link">Home</a>
			</li>
			<li>
			<a href="#" class="hover_link">Bookings</a>
			</li>
			<li>
			<a href="#" onclick="makeAdminPage();" class="hover_link">Admin</a>
			</li>
			<li>
			<a href="#" class="hover_link">Log Out</a>
			</li>
		</ul>
		</nav>
	</div>

	<div class="adminPage"> 
	<h3 id="admin-title">Add New Flights</h3>
			<div class="admin_options">
				<div autocomplete="off">
				<div id="add-flight-details" class="autocomplete" style="width:300px;">
					Airline: <input id="airlineInput" type="text" name="Airline" placeholder="Airline">
					Departure: <input id="departureInput" type="text" name="Departure" placeholder="Departure Airport">
					Arrival:   <input id="arrivalInput" type="text" name="Arrival" placeholder="Arrival Airport"><br>
				</div>
				<div class="date_options">
					&nbsp; Flight Number : &nbsp; &nbsp;<input type="number" id="flightNumber" name="Flight Number" placeholder="Enter Flight Number">
					&nbsp; Date : &nbsp; &nbsp; <input id="departure-date" type="date" name="Departure">
					&nbsp; Departure Time : &nbsp; <input id="departure-time" type="time" name="Departure Time">
					&nbsp; &nbsp;Arrival Time : &nbsp; <input id="arrival-time" type="time" name="Arrival Time">
					<button id="addflightButton" onclick="addFlight()">Add Flights</button>
				</div>
			</div>
			<div id="flight-adder"></div>
		</div>
	`;
	
	$('body').append(homebody);

	//Put in stylesheet because it dissappears for some reason
	$('head').append('<link rel="stylesheet" type="text/css" href="stylesheet.css">')

	//Set autocomplete for departure airports
	//Get all airports
	let airportsArray = getAllAirports();
	let airlinesArray = getAllAirlines();
	autocomplete(document.getElementById("airlineInput"), airlinesArray);
	autocomplete(document.getElementById("departureInput"), airportsArray);
	autocomplete(document.getElementById("arrivalInput"), airportsArray);
}

function getAllAirlines(){
	let airlines = [];
    $.ajax(root + 'airlines', {
		type: 'GET',
		dataType: 'json',
		xhrFields: {withCredentials: true},
		success: (response) => {
            for(let i=0; i< response.length;i++){
                airlines.push(response[i].name);
            }
		}
    }); 
    
	return airlines;
}

function addFlight(){
	//Get Airline
	var airline = $('#airlineInput').val()
	console.log(`Airline = ${airline}`)
	//Get Departure Airport
	var departure = $('#departureInput').val()
	console.log(`Departure = ${departure}`)
	//Get Arrival Airport
	var arrival = $('#arrivalInput').val()
	console.log(`Arrival = ${arrival}`)
	//Get Flight Number
	var flightNumber = $('#flightNumber').val()
	console.log(`Flight Number = ${flightNumber}`)
	//Get Departure Date
	var departureDate = $('#departureDate').val()
	console.log(`Departure Date = ${departureDate}`);
	//Get Departure Time
	var departureTime = $('#departureTime').val()
	console.log(`Departure Time = ${departureTime}`);
	//Get Arrival Time
	var arrivalTime = $('#arrivalTime').val()
	console.log(`Arrival Time = ${arrivalTime}`);

	//Check inputs
	//Check if valid airline
	$.ajax(root + 'airlines', {
		type: 'GET',
		dataType: 'json',
		xhrFields: {withCredentials: true},
		success: (response) => {
			//Check if valid airlines
			var isValidAirline = false;
			var airlineIndex =0;
			
            for(let i=0; i< response.length;i++){
				if(response[i].name===airline){
					isValidAirline=true;
					airlineIndex=i;
				}
			}

			//Continue with query if valid airline
			if(!isValidAirline){
				alert(`Airline:"${airline}" Not Found! Please enter a valid airline.`);
			}else{
				console.log(`Is valid Airline: ${isValidAirline}`);
				var airlineId = response[airlineIndex].id
				
				//Check if valid departure and arrival
				$.ajax(root + 'airports', {
					type: 'GET',
					dataType: 'json',
					xhrFields: {withCredentials: true},
					success: (response) => {
						//Check if valid airports
						var isValidArrival = false;
						var arrivalIndex =0;
						var isValidDeparture = false;
						var departureIndex = 0;

						for(let i=0; i< response.length;i++){
							if(response[i].name===departure){
								isValidDeparture=true;
								departureIndex=i;
							}
							if(response[i].name===arrival){
								isValidArrival=true;
								arrivalIndex=i;
							}
						}

						//Continue with query if valid airport
						if(!isValidDeparture || !isValidArrival){
							var airportNotFound = '';
							if(!isValidDeparture){
								airportNotFound = departure; 
							}else{
								airportNotFound = arrival
							}
							alert(`Airport:"${airportNotFound}" Not Found! Please enter a valid airport.`);
						}else{
							console.log(`Is valid Departure: ${isValidDeparture}`);
							console.log(`Is valid Arrival: ${isValidArrival}`);

							var departureId = response[departureIndex].id
							var arrivalId = response[arrivalIndex].id

							//Submit post request with parameters
							/*"flight": {
								"departs_at":   "12:00",
								"arrives_at":   "12:00",
								"number":       "AAA 2667",
								"departure_id": 130599,
								"arrival_id":   130598
							}	*/
							$.ajax(root + 'flights', {
								type: 'POST',
								dataType: 'json',
								xhrFields: {withCredentials: true},
								data: {
									flight: {
										departs_at:departureTime,
										arrives_at:arrivalTime,
										number:flightNumber,
										departure_id:departureId,
										arrival_id:arrivalId,
										airline_id:airlineId
									}
								},
								success: (response) => {
									console.log("Successfully created flight");
									console.log(response);

									let flightId = response.id;

									//Create flight instance
									/*{
										"instance": {
											"flight_id": 1,
											"date":      "2018-12-21"
										}
										}*/
									$.ajax(root + 'instances', {
										type: 'POST',
										dataType: 'json',
										xhrFields: {withCredentials: true},
										data: {
											instance: {
												flight_id:flightId,
												date:departureDate
											}
										},
										success: (response) => {
											console.log("Successfully created flight Instance");
											console.log(response);
		
											//Create flight instance
											alert(`Successfully created flight:${flightNumber} traveling from:${departure} at:${departureTime} to: ${arrival} at:${arrivalTime} on date:${departureDate}`);
										}
									});
								}
							});
						}	
					}
				});		
			}	
		}
	});  
}


function fillValuesInTextBoxes()
{
	var text1 = document.getElementById("departureInput");
	var text2 = document.getElementById("arrivalInput");
    text1.value = "Raleigh Durham International Airport";
    text2.value = "Miami International Airport";
}