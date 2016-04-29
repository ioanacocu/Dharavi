 <?php

include('header.php');
 //$connection = mysql_connect("localhost", "root", "");

// Selecting Database 
 //$db = mysql_select_db("dharavi", $connection);

//Fetching Values from URL  


$sender=$_POST['sender'];
$receiver=$_POST['receiver'];
$message=$_POST['message'];
$time=date('Y-m-d H:i:s');


$dat=mysql_query("SELECT * FROM userdata WHERE Name='$sender' limit 1");
$sendID = mysql_fetch_array($dat);
//echo($data['ID']);
$dat=mysql_query("SELECT * FROM userdata WHERE Name='$receiver' limit 1");
$receiveID = mysql_fetch_array($dat);
echo '$receiveID[ID]';

$result =mysql_query("INSERT INTO messages (senderID,receiverID,Message,TimeMsg) values ('$sendID[ID]', '$receiveID[ID]', '$message', '$time')");
//$result=mysql_query($query);
//$dat=$query=mysql_query("SELECT ID FROM userdata WHERE Name='$owner'");
mysql_close ($connection);
?>
