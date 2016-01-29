<?php
include('header.php');
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

$query = "insert into locations_rectangular values('$lat1', '$long1', '$lat2', '$long2', '$lat3', '$long3', '$lat4', '$long4', '$name', $cost, $margin, '$type');";
$result=mysql_query($query);
?>
