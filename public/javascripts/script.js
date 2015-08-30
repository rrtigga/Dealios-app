$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});

$(document).ready(function() {

	$('#register-submit').click(function(){
		/*var username = $('#username').val();
		var email = $('#email').val();
		var password = $('#password').val();
		var confirm_password = $('#confirm-password').val();*/

		var username = $('#register-form').find('input[name="username"]').val();
		var email = $('#register-form').find('input[name="email"]').val();
		var password = $('#register-form').find('input[name="password"]').val();
		var confirm_password = $('#register-form').find('input[name="confirm-password"]').val();

		if (username == '' || email == '' || password == '' || confirm_password == '') {
			alert("Whoops! Please fill all fields!");
		}
		else if ((password.length) < 6) {
			alert("Silly you! Your password should atleast 6 character in length.");
		}
		else if (!(password).match(confirm_password)) {
			alert(" Uh oh! Your passwords don't match.");
		}
		else if(IsEmail(email)==false){
			alert("Not a valid email! :P")
		}
		else{
			alert("Awesome! Your registration will be reviewed shortly!")
		}

	});

});

function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!regex.test(email)) {
       return false;
    }
    else{
       return true;
    }
}
