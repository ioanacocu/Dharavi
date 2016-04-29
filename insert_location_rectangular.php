<?php
include('header.php');
 //$connection = mysql_connect("localhost", "root", "");

// Selecting Database 
 //$db = mysql_select_db("dharavi", $connection);

$lat1=$_POST['lat1'];
$long1=$_POST['long1'];
$lat2=$_POST['lat2'];
$long2=$_POST['long2'];
$lat3=$_POST['lat3'];
$long3=$_POST['long3'];
$lat4=$_POST['lat4'];
$long4=$_POST['long4'];
$name=$_POST['name'];
$cost=$_POST['cost'];
$margin=$_POST['margin'];
$type=$_POST['type'];
$owner=$_POST['owner'];

$dat=mysql_query("SELECT * FROM userdata WHERE Name='$owner' limit 1");
$data = mysql_fetch_array($dat);
$dat=mysql_query("SELECT * FROM WaitList WHERE UserID='$data[ID]' limit 1");
$typeOwn = mysql_fetch_array($dat);
$result =mysql_query("INSERT INTO locations_rectangular(lat1, long1, lat2, long2,lat3, long3,lat4, long4,name, type, cost, margin, ownerID, PermOrTemp) 
	values ('$lat1', '$long1', '$lat2', '$long2', '$lat3', '$long3', '$lat4', '$long4', '$name', '$typeOwn[UserType]',  '$cost', '$margin', '$data[ID]','1')");


//$query = "insert into locations_rectangular values, '$name', $cost, $margin, '$type');";
echo("Property sucessfully added : ");
echo $typeOwn['UserType'];
//$result=mysql_query($query);
mysql_close ($connection);
?>

 






