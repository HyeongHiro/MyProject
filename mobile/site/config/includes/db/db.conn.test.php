<?php
    $HostName =   "inform8.com";
	$DBName =     "gobeantest";
	$DBUsername = "gobeantest";
	$DBPassword = "qemnfsdkjhDsD";

	$mysqli = new mysqli($HostName, $DBUsername, $DBPassword, $DBName);
	if ($mysqli->connect_error) {
	  include 'config/includes/pages/sitedown.php';
	  die();
	}
	
	Inform8Context::setDbConnection($mysqli);
?>