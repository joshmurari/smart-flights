var loginRoot = "http://comp426.cs.unc.edu:3002/api/";

$(document).ready(() => {
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
    //Empty body and rename title
    $('body').empty();
    $('title').text('UNC Smart Flights Home Page');
}