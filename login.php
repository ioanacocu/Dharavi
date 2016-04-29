<?php
include('header.php');
// Establishing connection with server..
// $connection = mysql_connect("localhost", "root", "");

// Selecting Database 
 //$db = mysql_select_db("dharavi", $connection);

//Fetching Values from URL  

$listTypes=array("NGO","GOV","IND","DEV","PRV");
$name=$_POST['name1'];
$tType=$_POST['textType'];
$password= ($_POST['password1']);  // Password Encryption, If you like you can also leave sha1
 mysql_query("BEGIN");
// check if e-mail address syntax is valid or not

 	$result = mysql_query("SELECT * FROM userdata WHERE Name='$name'");
 	$data = mysql_num_rows($result);
	$dat="Unknown" ;   
			//Insert query 
	   //$query = mysql_query("insert into userdata(Name, Email, Password) values ('$name', '$email', '$password')");
	   $query=mysql_query("SELECT ID FROM userdata WHERE Name='$name' AND Password='$password'");
	   $currID=mysql_fetch_array($query);
	   $alreadyWaiting=mysql_query("SELECT UserID FROM WaitList Where (UserID='$currID[ID]')");
	   $existsID=mysql_fetch_array($alreadyWaiting);
	    $data = mysql_num_rows($query);
	    //echo count($existsID['UserID']);
	    if(($data)==1 /*&& (mysql_num_rows($alreadyWaiting)<1)*/) 
		   {
			  echo "You have Successfully Logged In.....";
			  $dat=mysql_query("SELECT Name FROM userdata WHERE Name='$name' AND Password='$password'");
			  $row = mysql_fetch_assoc($dat);
			  $dat=$row['Name'];
			echo $row['Name'];

			 echo " 
			 Your role will be: ";
			 $alreadyWaiting=mysql_query("SELECT * FROM WaitList where PlayingGame='0'");
	   		 $existsType=mysql_fetch_array($alreadyWaiting);
	   		/* while($row = mysql_fetch_row($alreadyWaiting)) {
	   		 	if (($key = array_search($row[1], $listTypes)) !== false) {
	   		 		array_splice($listTypes, $key, 1);
    				//unset($listTypes[$key]);
					}
	   		 	
	   		 }*/
	   		 //echo count($listTypes);
	   		
			 if (count($listTypes)==0) {$listTypes=array("NGO","GOV","IND","DEV","PRV");
									}

			 $playerType=rand(0,count($listTypes)-1);
			 $realType=$listTypes[$playerType];
			 echo $realType;
			 echo $tType[$playerType];
			 //$data[]= $realType;
			 echo "Good luck!";
			 $time=date('Y-m-d H:i:s');
			
			 try {
			 	$updateGame=mysql_query("UPDATE WaitList set PlayingGame='0' where UserID='$currID[ID]'");
			 	$updateGame=mysql_query("UPDATE WaitList set UserType='$realType' where UserID='$currID[ID]'");
			 	$result=mysql_query("INSERT INTO WaitList (UserID,UserType,TimeConnected,PlayingGame) values ('$currID[ID]', '$realType','$time','0')");
			 	//$updateGame=mysql_query("UPDATE WaitList set PlayingGame='0' where UserID='2'");
			 } catch (Exception $e) {
			 	//$updateGame=mysql_query("UPDATE WaitList set PlayingGame='0' where UserID='11'");
			 }
			 
			 
			 $alreadyWaiting=mysql_query("SELECT * FROM WaitList where PlayingGame='0'");
			 $listTypesGame=[];
			 $listUsers=[];
			 /*while($row = mysql_fetch_row($alreadyWaiting)) {
	   		 	if (array_search($row[1], $listTypesGame) == false) {
	   		 		array_push($listTypesGame, $row[1]);
	   		 		echo $row[1];
	   		 		array_push($listUsers, $row[0]);
    				//echo $row[0];
    				//echo " number of vals added ";
    				//echo count($listUsers);
    				//echo"
    				//";

					}
					else echo "ALREADY THERE 
						";
	   		 	
	   		 }*/
	   		/* if(count($listTypesGame)>=5 && count($listUsers)>=5){
	   		 	echo "complete list here ";
	   		 	$gIDQuery = mysql_query("SELECT MAX(gameID) AS max_id FROM GameData");
				$gID = mysql_fetch_array($gIDQuery);
				echo "i have a game id ";
				$resultGame=mysql_query("INSERT INTO GameData (player1ID,player2ID,player3ID,player4ID,player5ID,typePlayer1,typePlayer2,typePlayer3,typePlayer4,typePlayer5) values ('$listUsers[0]', '$listUsers[1]','$listUsers[2]','$listUsers[3]','$listUsers[4]','$listTypesGame[0]','$listTypesGame[1]','$listTypesGame[2]','$listTypesGame[3]','$listTypesGame[4]')");
			 	echo "insertion done 
			 	";
			 	$currGame=mysql_insert_id();
			 	for ($i=0; $i <5 ; $i++) { 
			 		$updateGame=mysql_query("UPDATE WaitList set PlayingGame='$currGame' where UserID='$listUsers[$i]'");
			 	}
			 	echo $currGame;
	   		 	
	   		 	//for(int i=0; )
	   		 }*/
	   		 

			 if(!$result&&!$updateGame){
    			 mysql_query("ROLLBACK");// transaction rolls back
    			//echo "transaction rolled back";
    			exit;
				}
				else{
    			mysql_query("COMMIT");// transaction is committed
    			}
		   		}
		else
		   {
			  echo "Error....!!";   
		   }
		 
	


 
//connection closed
mysql_close ($connection);
?>