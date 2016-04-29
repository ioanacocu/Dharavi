 <?php

include('header.php');
 //$connection = mysql_connect("localhost", "root", "");

// Selecting Database 
 //$db = mysql_select_db("dharavi", $connection);

//Fetching Values from URL  


$senderN=$_GET['sender'];
$receiver=$_GET['receiver'];
$idM=$_GET['idM'];



$dat=mysql_query("SELECT * FROM userdata WHERE Name='$senderN' limit 1");
$sendID = mysql_fetch_array($dat);
//echo($data['ID']);
$dat=mysql_query("SELECT * FROM userdata WHERE Name='$receiver' limit 1");
$receiveID = mysql_fetch_array($dat);

$query = "select * from messages Where (receiverID='$receiveID[ID]' and senderID='$sendID[ID]' || (senderID='$receiveID[ID]' and receiverID='$sendID[ID]'));";
$result = mysql_query($query);
//$data = array();


while($row = mysql_fetch_row($result)){
	//$dat=mysql_query("SELECT * FROM userdata WHERE ID='$row[0]' limit 1");
	//$sender = mysql_fetch_array($dat);
	
	//$dat=mysql_query("SELECT * FROM userdata WHERE ID='$row[0]' limit 1");
	//$sender = mysql_fetch_array($dat);
	
	$temp['TimeMsg'] = $row[4];
	if($row[0]==$sendID['ID'])
		$temp['senderOrig'] = $senderN;
	else
		$temp['senderOrig'] = $receiver;
	$temp['Message'] = $row[3];
	$temp['idM']=$row[2];
	$data[] = $temp;
}

echo json_encode($data);
//$result =mysql_query("INSERT INTO messages (senderID,receiverID,Message,TimeMsg) values ('$sendID[ID]', '$receiveID[ID]', '$message', '$time')");
//$result=mysql_query($query);
//$dat=$query=mysql_query("SELECT ID FROM userdata WHERE Name='$owner'");
mysql_close ($connection);
?>