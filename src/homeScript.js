var loginRoot = "http://comp426.cs.unc.edu:3001/api/";

var date1;
var date2;

$(document).ready(() => {
   //Functions go here
   console.log("hello");
   $('#gobutton').click(function () {
        date1 = $('#datepicker1').val();
        console.log($('#datepicker1').val())
        console.log($('#datepicker2').val())
        date2 = $('#datepicker2').val();
        console.log(date1 < date2);
        if(date1 > date2) {
            alert("Departure Date Must Be Earlier Than Arrival Date");
        } else {
            
        }
   });
});

