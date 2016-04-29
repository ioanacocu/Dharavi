 <?php

include('header.php');
 //$connection = mysql_connect("localhost", "root", "");

// Selecting Database 
// $db = mysql_select_db("dharavi", $connection);

//Fetching Values from URL  

//$name=$_POST['name'];
//$latitude=$_POST['latitude'];
//$longitude=$_POST['longitude'];
//$OrderNo=$_POST['order'];
$owner=$_POST['owner'];
$points=$_POST['points'];
//$a=$points[1];
$dat=mysql_query("SELECT * FROM userdata WHERE Name='$owner' limit 1");
$data = mysql_fetch_array($dat);
$dat=mysql_query("SELECT * FROM WaitList WHERE UserID='$data[ID]' limit 1");
$typeOwn = mysql_fetch_array($dat);
//echo($data['ID']);
$result =mysql_query("INSERT INTO roads_general(ownerID) values	('$data[ID]') ");
$id=mysql_insert_id();
$i=0;
foreach ($points as $value) 
{	
$result =mysql_query("INSERT INTO roads_parts(roadID, PartNo, lat, long1) values	
	('$id','$i','$value[0]','$value[1]')");
//print_r($value[0]);
$i=$i+1;
}
echo("Road Succesfully added, Road identifier is: ");

echo $id;
mysql_close ($connection);

?>