<?php
//$host="131.211.143.240"; //replace with database hostname 
//$username="youplaceit"; //replace with database username 
//$password="Bs5SZP710YVBFhcN"; //replace with database password 
//$db_name="youplaceit.hum.uu.nl"; //replace with database name

$connection = mysql_connect("localhost", "root", "");

// Selecting Database 
 $db = mysql_select_db("dharavi", $connection);
//$connection=mysql_connect("$host", "$username", "$password"); 
//mysql_select_db("$db_name");
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");
?>
