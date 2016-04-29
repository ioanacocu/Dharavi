<?php
include('header.php');
$query = "select * from WaitList;";
$result = mysql_query($query);
$data = array();
while($row = mysql_fetch_row($result)){

	$temp['ID'] = $row[0];
	$temp['UType'] = $row[1];
	$temp['game'] = $row[3];
	$dat=mysql_query("SELECT * FROM userdata WHERE ID='$row[0]' limit 1");
	$own = mysql_fetch_array($dat);
	$temp['Toname']=$own['Name'];
	$data[] = $temp;
}

echo json_encode($data);

?>
