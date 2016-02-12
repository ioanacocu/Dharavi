<?php
// Establishing connection with server..
 $connection = mysql_connect("localhost", "root", "");

// Selecting Database 
 $db = mysql_select_db("dharavi", $connection);

//Fetching Values from URL  
$name=$_POST['name1'];
$password= ($_POST['password1']);  // Password Encryption, If you like you can also leave sha1

// check if e-mail address syntax is valid or not

 	$result = mysql_query("SELECT * FROM userdata WHERE Name='$name'");
        $data = mysql_num_rows($result);
	        
			//Insert query 
	   //$query = mysql_query("insert into userdata(Name, Email, Password) values ('$name', '$email', '$password')");
	    $query=mysql_query("SELECT ID FROM userdata WHERE Name='$name' AND Password='$password'");
	    $data = mysql_num_rows($query);
		if(($data)==1)
		   {
			  echo "You have Successfully Logged In.....";
		   }
		else
		   {
			  echo "Error....!!";   
		   }
	
	
 
 
//connection closed
mysql_close ($connection);
?>