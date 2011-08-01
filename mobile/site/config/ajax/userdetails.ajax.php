<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */
$user = NULL;

if (Session::getInstance()->getAuthenticationManager()->isAuthenticated()) {
  $realuser = Session::getInstance()->getAuthenticationManager()->getUser();
  $user = array(
  	'Username'=>$realuser->getUsername(), 
  	'Firstname'=>$realuser->getFirstname(), 
  	'Lastname'=>$realuser->getLastname(), 
  	'Email'=>$realuser->getEmail());
}


$res = array('authenticated'=>Session::getInstance()->getAuthenticationManager()->isAuthenticated(),'user'=>$user);
echo json_encode($res);
?>