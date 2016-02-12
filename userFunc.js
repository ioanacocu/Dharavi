var user="Unknown"
$(document).ready(function(){

$("#loginb").click(function(){
	var Pass=$('#Password').val();
	var UserName=$('#UserName').val();
	
		
	if( Pass =='' ||  UserName =='' )
		{
		  alert("Please fill all fields...!!!!!!");
		}	
	else if((Pass.length)<8)
		{
			alert("Password should atleast 8 character in length...!!!!!!");
		}
		
	
	else 
	   {
	     $.post("login.php",{ name1: UserName, password1:Pass},

		  function(data) {
		   if(data=='You have Successfully Registered.....')
		   {
		   	$.get("login.php", function(data) {
         				user=dat;
						});
			$("form")[0].reset();
		   }
		   alert(data);
		});
	   }
	   console.log(user);
	
	});

});
