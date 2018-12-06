var root_url = "http://comp426.cs.unc.edu:3001/";

$(document).ready(() => {
    $('#login_btn').on('click', function() {
	
        let user = $('#user').val();
        let pass = $('#pass').val();

        // console.log(user);
        // console.log(pass);

        // authenticated against users; session opens with post and ends with delete
	    $.ajax(root_url + "sessions", {
            type: 'POST',
            xhrFields: {withCredentials: true},
            data: {
                user: {
                    username: "aman98",
                    password: "730085053"
                }
            },
            success: () => {
                build_airlines_interface();
            },
            error: (error) => {
                alert(error);
            }
        });
    });


        //register user request
        $('#register_btn').on('click', () => {
            let reg_user = $("#register_user").val();
            let reg_pw = $("#register_pass").val();
    
            $.ajax(root_url + 'users',
               {
               type: 'POST',
               xhrFields: {withCredentials: true},
               data: {
                user:{
                username: reg_user,
                password: reg_pw
                }
            },
               success: () => {
                   console.log('register worked!');
                   alert('Thank you for registering! Please login to use our features');
    
               },
               error: () => {
                   alert('That username is taken; please choose a different one');
               }
               });
        });
    
        //change password
    
        $('#change_btn').on('click', () => {
            let ch_user = $("#change_user").val();
            let ch_pw_old = $("#old_pass").val();
            let ch_pw_new = $("#new_pass").val();
            console.log(ch_user);
            console.log(ch_pw_old);
            console.log(ch_pw_new);
            $.ajax(root_url + 'passwords',
               {
               type: 'PUT',
               xhrFields: {withCredentials: true},
               data: {
                   user: {
                   username: ch_user,
                   old_password: ch_pw_old,
                   new_password: ch_pw_new
                   }
               },
               success: () => {
    
                    alert("Password Changed");
    
               },
               error: () => {
                   alert('error');
               }
               });
        });
    
    


});

let build_airlines_interface = function() {
    window.location.href= 'home.html';
}