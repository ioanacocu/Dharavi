var currMsg;
var currTime;
var everybody="Unidentified";
var receiver;
var MessageTextBox;
var MessageTextBoxPriv='';
var allUsers=fetch_users();
//var LastTime= encodeURIComponent('Wed Jun 09 2010');
var ch=0
var chP=0;
var MessageTextBox='';

function get_message(){
	console.log("database stuff");
	
	$.post("insert_message.php",{ sender: user, message:currMsg, time: currTime, receiver:everybody});
	$("#message_form")[0].reset();


}
function get_message_private(){
	console.log("database stuff");
	
	$.post("insert_message.php",{ sender: user, message:currMsg, time: currTime, receiver:receiver});
	$("#message_form_private")[0].reset();
}
function chatBoxPopulate()
	{
		$('#wrapper').css('display' , 'inline');
		$('#chatbox').css('display' , 'inline');
		$('#message_form').css('display' , 'inline');
		$('#privateChatbox').css('display' , 'none');
		$('#selectPart').css('display' , 'none');
		$('messages_for').css('display' , 'none');
		$('#editRoads').css('display' , 'none');
		$('#safe_path').css('display' , 'none');
		$('#addition').css('display' , 'none');
		$('#negotiation').css('display' , 'none');
		$('#map-canvas').css('width' , '75%');
		$('#message_form_private').css('display' , 'none');
		clearOverlay();
		fetch_users();
		remove();
		//fetch_users();
		$("#sendPM").click(function(){
			fetch_users();
			privateChatBoxPopulate();});
		$("#exit").click(function(){
			$('#wrapper').css('display' , 'none');
			$('#map-canvas').css('width' , '100%');
			});
	
	}

function privateChatBoxPopulate()
	{
		//fetch_users();
		$('#wrapper').css('display' , 'inline');
		$('#privateChatbox').css('display' , 'inline');
		$('#messages_for').css('display' , 'inline');
		$('#chatbox').css('display' , 'none');
		$('#message_form_private').css('display' , 'inline');
		$('#selectPart').css('display' , 'inline');
		$('#safe_path').css('display' , 'none');
		$('#addition').css('display' , 'none');
		$('#negotiation').css('display' , 'none');
		$('#message_form').css('display','none');
		$('#map-canvas').css('width' , '75%');
		clearOverlay();
		remove();
		
		//var select = document.getElementById('messages_for').selectedIndex;
	
	var select = document.getElementById("messages_for");
	for (var i=select.length-1; i>0;i--)
			select.remove(i);
	var a =allUsers.length;	
	if(a==0){
		fetch_users();
		a =allUsers.length;	
	}
		for (var i = 0; i < a; i++)
		{
			
			var op = document.createElement("option");
			op.textContent = allUsers[i].Toname;
			op.value = allUsers[i].Toname;
			//op.value[1]="circle";
			select.appendChild(op);
		}

		
	
	}

function loadLogPrivate() {
	var oldscrollHeight = $("#privateChatbox").prop("scrollHeight") - 20; //Scroll height before the request
        
		//console.log(oldscrollHeight);
        fetch_messages_private();
        $("#privateChatbox").html(MessageTextBoxPriv); //Insert chat log into the #chatbox div   
                //Auto-scroll           
                var newscrollHeight = $("#privateChatbox").attr("scrollHeight") - 20; //Scroll height after the request
                if(newscrollHeight > oldscrollHeight){
                    $("#privateChatbox").animate({ scrollTop: newscrollHeight }, 'normal'); //Autoscroll to bottom of div
                }               
            

}



function loadLog(){     
        var oldscrollHeight = $("#chatbox").prop("scrollHeight") - 20; //Scroll height before the request
        
		//console.log(oldscrollHeight);
        fetch_messages();
        $("#chatbox").html(MessageTextBox); //Insert chat log into the #chatbox div   
                //Auto-scroll           
                var newscrollHeight = $("#chatbox").attr("scrollHeight") - 20; //Scroll height after the request
                if(newscrollHeight > oldscrollHeight){
                    $("#chatbox").animate({ scrollTop: newscrollHeight }, 'normal'); //Autoscroll to bottom of div
                }               
            
        
    }
 function select_users_changed(){

 	//var select = document.getElementById('messages_for').selectedIndex;
 	var select = document.getElementById('messages_for');
		var index = document.getElementById('messages_for').selectedIndex;
		receiver=select.options[index].value;
		//chP=0;
		//MessageTextBoxPriv='';
		console.log(receiver);
	//var select=[];
	//select = document.getElementById("messages_for");
	/*a=allUsers.length;	
		for (var i = 0; i < a; i++)
		{
			
			var op = document.createElement("option");
			op.textContent = allUsers[i].Toname;
			op.value = allUsers[i].Toname;
			//op.value[1]="circle";
			//select.appendChild(op);
		}*/

		}
 	function fetch_users(){
	$.ajax({
		 	url : 'fetch_users.php',
		 	type : 'GET',
		 	async : false,
		 	success : function(response) {
		 		allUsers = JSON.parse(response);
		 		
		 	},
		 	error : function(response) {
		 		console.log('Failed to load Dataset');
		 	}
		 });
}

    function fetch_messages(){
	$.ajax({
		 	url : 'fetch_messages.php',
		 	type : 'GET',
		 	async : true,
		 	data :{ idM: ch},
		 	success : function(response) {
		 		allMessages = JSON.parse(response);
		 		
		 		for (var i = 0; i < allMessages.length; i++) {
		 			MessageTextBox=MessageTextBox+allMessages[i]['TimeMsg']+"<br>" + "User: "+allMessages[i]['sender']+" said"+":"+"<br>"+allMessages[i]['Message']+"<br>";
		 			//if(allMessages[i]['TimeMsg']>LastTime)
		 			ch=allMessages[i]['idM'];
		 			//console.log(MessageTextBox);
		 		};
		 		
		 		
		 		 

		 	},
		 	error : function(response) {
		 		console.log('Failed to load Dataset');
		 	}
		 });
}
var chP=0;
MessageTextBoxPriv='';
    function fetch_messages_private(){
	$.ajax({
		 	url : 'fetch_messages_private.php',
		 	type : 'GET',
		 	async : true,
		 	data :{ sender: user, message:currMsg, time: currTime, receiver:receiver,idM: chP},
		 	success : function(response) {
		 		allMessages = JSON.parse(response);
		 		MessageTextBoxPriv='';
		 		for (var i = 0; i < allMessages.length; i++) {
		 			MessageTextBoxPriv=MessageTextBoxPriv+allMessages[i]['TimeMsg']+"<br>" + "User: "+allMessages[i]['senderOrig']+" said"+":"+"<br>"+allMessages[i]['Message']+"<br>";
		 			if(parseInt(allMessages[i]['idM'])>parseInt(chP))
		 				{chP=parseInt(allMessages[i]['idM']);}
		 			//console.log(MessageTextBox);
		 		};
		 		 

		 	},
		 	error : function(response) {
		 		console.log('Failed to load Dataset');
		 	}
		 });
}
