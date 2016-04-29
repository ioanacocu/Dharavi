 <?php

include('header.php');
 //$connection = mysql_connect("localhost", "root", "");

// Selecting Database 
// $db = mysql_select_db("dharavi", $connection);

//Fetching Values from URL  

$name=$_POST['name'];
$latitude=$_POST['latitude'];
$longitude=$_POST['longitude'];
$type=$_POST['type'];
$radial=$_POST['radial'];
$cost=$_POST['cost'];
$margin=$_POST['margin'];
$owner=$_POST['owner'];


$dat=mysql_query("SELECT * FROM userdata WHERE Name='$owner' limit 1");
$data = mysql_fetch_array($dat);
$dat=mysql_query("SELECT * FROM WaitList WHERE UserID='$data[ID]' limit 1");
$typeOwn = mysql_fetch_array($dat);
//echo($data['ID']);

$result =mysql_query("INSERT INTO locations_circular(lat1, long1, name, type, radial, cost, margin, ownerID, PermOrTemp) values 
	('$latitude', '$longitude', '$name', '$typeOwn[UserType]', '$radial', '$cost', '$margin', '$data[ID]','1')");
echo("Property sucessfully added : ");
echo $typeOwn['UserType'];
//$result=mysql_query($query);
//$dat=$query=mysql_query("SELECT ID FROM userdata WHERE Name='$owner'");
mysql_close ($connection);
?>
