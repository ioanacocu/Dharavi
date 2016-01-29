<?php
include('header.php');
$latitude=$_POST['latitude'];
$longitude=$_POST['longitude'];
$name=$_POST['name'];
$type=$_POST['type'];
$radial=$_POST['radial'];
$cost=$_POST['cost'];
$margin=$_POST['margin'];

$query = "insert into locations values('$latitude', '$longitude', '$name', '$type', $radial, $cost, $margin);";
$result=mysql_query($query);
?>
