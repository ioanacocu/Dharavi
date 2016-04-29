<?php
include('header.php');
 //$connection = mysql_connect("localhost", "root", "");

// Selecting Database 
 //$db = mysql_select_db("dharavi", $connection);
 
$query = "delete from locations_rectangular where PermOrTemp='1';";
$result = mysql_query($query);
$query = "delete from locations_circular where PermOrTemp='1';";
$result = mysql_query($query);
mysql_close ($connection);
?>
