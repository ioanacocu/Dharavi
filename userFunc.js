var user="Unidentified";
var typeOrg='';
var developper_text="\r\n Congratulations! You are a developper! \r\n Your role will be to try and propose at least a road that connects 2 properties \r\n You have a budget but you do not own any properties  \r\n";
var government_text="\r\n Congratulations! You are a government representative! \r\n Your role is to propose roads, within a small budget. \r\n  Your vote is the most important in the game.";
var private_text="\r\n Congratulations! You are a private citizen! \r\n Your role is to own your property and fix a price for it. \r\n Your goal during the game is to convince the road developper or the government to connect a road to your property  \r\n Your vote has an average value ";
var ngo_text="\r\n Congratulations! You are an NGO representative! \r\n  You own some property and have a small budget. \r\n Your vote is more important than that of a citizen but less important than the one of the government representative. \r\n Your goal is to have most of your properties connected to a road";
var ind_text=" \r\n Congratulations! You are an industry representative! \r\n You have a big budget. You can propose roads, but your vote holds less importance than that of an NGO. ";
var typeText=[];
typeText.push(ngo_text);
typeText.push(government_text);
typeText.push(ind_text);
typeText.push(developper_text);
typeText.push(private_text);



$("#chatUser").html(user);
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
	   	 
	   	 //$("#chatUser").html(user);
	     $.post("login.php",{ name1: UserName, password1:Pass, textType:typeText},

		  function(data) {
		   if(data!="Error....!!")
		   {
		   	user=UserName;
		   	//type = parse(data);
		   	$("#chatUser").html(user);
		   	$("form")[0].reset();
		   	}

		   alert(data);

		}

		);

	     	$.ajax({
		 	url : 'fetch_user_info.php',
		 	type : 'GET',
		 	async : true,
		 	data :{ name1: UserName},
		 	success : function(response) {
		 		typeOrg = JSON.parse(response);
		 		$("#propertyType").html(typeOrg['PType']);
		 		//MessageTextBoxPriv='';
		 		/*for (var i = 0; i < allMessages.length; i++) {
		 			MessageTextBoxPriv=MessageTextBoxPriv+allMessages[i]['TimeMsg']+"<br>" + "User: "+allMessages[i]['senderOrig']+" said"+":"+"<br>"+allMessages[i]['Message']+"<br>";
		 			//console.log(MessageTextBox);
		 		};*/
		 		 

		 	},
		 	error : function(response) {
		 		console.log('Failed to load Dataset');
		 	}
		 });

	      


	   }
	   console.log(user);
	
	});

});
