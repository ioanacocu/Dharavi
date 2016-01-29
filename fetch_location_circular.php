<?php
include('header.php');
$query = "select * from locations_circular;";
$result = mysql_query($query);
$data = array();
while($row = mysql_fetch_row($result)){
	$temp['latitude'] = $row[0];
	$temp['longitude'] = $row[1];
	$temp['name'] = $row[2];
	$temp['type'] = $row[3];
	$temp['radial'] = $row[4];
	$temp['cost'] = $row[5];
	$temp['margin'] = $row[6];
	$data[] = $temp;
}
echo json_encode($data);
?>
