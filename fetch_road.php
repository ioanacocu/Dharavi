<?php
//include('header.php');
include('header.php');
 //$connection = mysql_connect("localhost", "root", "");

// Selecting Database 
 //$db = mysql_select_db("dharavi", $connection);

//Fetching Values from URL  
$query = "select * from roads_parts;";
$result = mysql_query($query);
$data = array();

while($row = mysql_fetch_row($result)){
	$temp['id'] = $row[0];
	$temp['partNo'] = $row[1];
	$temp['lat'] = $row[2];
	$temp['long1'] = $row[3];
	
	$dat=mysql_query("SELECT * FROM roads_general WHERE RoadID='$row[0]' limit 1");
	$own = mysql_fetch_array($dat);
	$temp['owner']=$own['OwnerID'];
	$data[] = $temp;
}

echo json_encode($data);
mysql_close ($connection);

?>