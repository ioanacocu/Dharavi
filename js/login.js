$(document).ready(function(){

$("#login").click(function(){

	var name = $("#Liname").val();
	var password = $("#Lipassword").val();
		
	if( name =='' ||  password =='' )
		{
		  alert("Please fill all fields...!!!!!!");
		}	
	else if((password.length)<8)
		{
			alert("Password should atleast 8 character in length...!!!!!!");
		}
		
	
	else 
	   {
	     $.post("login.php",{ name1: name, password1:password},
		  function(data) {
		   if(data=='You have Successfully Registered.....')
		   {
			$("form")[0].reset();
		   }
		   alert(data);
		});
	   }
	
	});

});
