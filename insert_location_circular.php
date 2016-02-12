<?php
include('header.php');
$latitude=$_POST['latitude'];
$longitude=$_POST['longitude'];
$name=$_POST['name'];
$type=$_POST['type'];
$radial=$_POST['radial'];
$cost=$_POST['cost'];
$margin=$_POST['margin'];
$ownerID=$user

$query = "insert into locations_circular values('$latitude', '$longitude', '$name', '$type', $radial, $cost, $margin,$ownerID);";
$result=mysql_query($query);
?>
