<?php
$host="localhost"; //replace with database hostname 
$username="root"; //replace with database username 
$password="root"; //replace with database password 
$db_name="urban_planning"; //replace with database name

$con=mysql_connect("$host", "$username", "$password"); 
mysql_select_db("$db_name");
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");
?>
