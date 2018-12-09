var loginRoot = "http://comp426.cs.unc.edu:3002/api/";
var root = "http://comp426.cs.unc.edu:3001/";
var username = "jnmurari"
var password = "730085553"
var date1;
var date2;

$(document).ready(() => {
    makeHomePage();
    $('#sumbit_login').on('click', () => {
	
	let user = $('#usr').val();
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
	//Create Home Body
	$('body').empty();
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
          <a href="" class="hover_link">Home</a>
        </li>
        <li>
          <a href="" class="hover_link">Bookings</a>
        </li>
        <li>
          <a href="" class="hover_link">Access Boarding Pass</a>
        </li>
        <li>
          <a href="" class="hover_link">Log Out</a>
        </li>
      </ul>
    </nav>
  </div>

  <div class="bookFlightPage"> 
  <h3>Customize Your Flight</h3>
        <div class="trip_options">
        <input id="oneWayTrip" class="option-input radio" type="radio" name="flight" value="oneway"> One Way Trip &nbsp;
        <input  id="roundTrip" class="option-input radio" type="radio" name="flight" value="roundtrip"> Round Trip<br>
        </div>
        <div class="city_options">
            <div autocomplete="off">
              <div class="autocomplete" style="width:300px;">
				Departure: <input id="departureInput" type="text" name="Departure" placeholder="Arrival Airport">
				Arrival:   <input id="arrivalInput" type="text" name="Arrival" placeholder="Departure Airport"><br>
			  </div>
			  <div class="date_options">
                Departure Date: &nbsp; <input id="departureDate" type="date" name="Departure">
                &nbsp; &nbsp; Return Date: &nbsp;<input id="returnDate" type="date" name="Arrival">
				</div>	
				<button id="findflightButton" onclick="findFlights()">Find Flights</button>
            </div>
        </div>
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
   console.log(airportsArray);
}

function getAllAirports(){
    var airports = [];
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
      closeAllLists(e.target);
  	});
}

function findFlights(){
	  console.log("testing");
}