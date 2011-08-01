<?php
    $HostName =   "localhost";
    $DBName =     "gobean_gbprod";
    $DBUsername = "gobean_p110718gb";
    $DBPassword = "dfiuoew9s87f4f";
	
	$mysqli = new mysqli($HostName, $DBUsername, $DBPassword, $DBName);
	if ($mysqli->connect_error) {
	  include 'config/includes/pages/sitedown.php';
	  die();
	}
	
	Inform8Context::setDbConnection($mysqli);	
?>