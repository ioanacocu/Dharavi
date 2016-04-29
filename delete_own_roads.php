<?php
//include('header.php');
include('header.php');
 //$connection = mysql_connect("localhost", "root", "");

// Selecting Database 
 //$db = mysql_select_db("dharavi", $connection);

//Fetching Values from URL  
$roadID=$_POST['idR'];
$query = "DELETE from roads_parts where roadID=$roadID ;";
$result = mysql_query($query);
$dat=mysql_query("DELETE FROM roads_general WHERE RoadID=$roadID ;");
echo($roadID);
echo(" Has been deleted");
mysql_close ($connection);

?>