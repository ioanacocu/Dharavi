<?php
include('header.php');
 //$connection = mysql_connect("localhost", "root", "");

// Selecting Database 
 //$db = mysql_select_db("dharavi", $connection);
$idM=$_GET['idM'];


$query = "select * from messages Where (receiverID=3 and MessageID>$idM);";
$result = mysql_query($query);
$data = array();


while($row = mysql_fetch_row($result)){

	$dat=mysql_query("SELECT * FROM userdata WHERE ID='$row[0]' limit 1");
	$sender = mysql_fetch_array($dat);
	$temp['TimeMsg'] = $row[4];
	$temp['sender'] = $sender['Name'];
	$temp['Message'] = $row[3];
	$temp['idM']=$row[2];
	$data[] = $temp;
}

echo json_encode($data);
mysql_close ($connection);

?>
