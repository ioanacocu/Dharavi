<?php
include('header.php');
 //$connection = mysql_connect("localhost", "root", "");

// Selecting Database 
 //$db = mysql_select_db("dharavi", $connection);


$name=$_GET['name1'];

$dat=mysql_query("SELECT * FROM userdata WHERE Name='$name' limit 1");
$data = mysql_fetch_array($dat);
$dat=mysql_query("SELECT * FROM WaitList WHERE UserID='$data[ID]' limit 1");
$typeOwn = mysql_fetch_array($dat);
$temp['PType']=$typeOwn['UserType'];
$data=$temp;
echo json_encode($data);
mysql_close ($connection);
?>

 






