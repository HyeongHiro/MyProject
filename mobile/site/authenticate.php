<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */
  // don't auto perform auth...
  $noAuth = 1;
  require_once 'config/settings.php';
  $user = null;
  $result = false;
  $message = '';

  if (Session::getInstance()->getAuthenticationManager()->isAuthenticated()) {
      $message = 'Already authenticated';
  }else {
    include 'config/auth.php';
    if (Session::getInstance()->getAuthenticationManager()->isAuthenticated()) {
      $result = true;
      
      if (Session::getInstance()->getAuthenticationManager()->isAuthenticated()) {
        $realuser = Session::getInstance()->getAuthenticationManager()->getUser();
        $user = array(
        	'Username'=>$realuser->getUsername(), 
        	'Firstname'=>$realuser->getFirstname(), 
        	'Lastname'=>$realuser->getLastname(), 
        	'Email'=>$realuser->getEmail());
      }
    }else {
      $message = 'Authentication Failed.';
    }
  }
  
  
  
  $res = Array('result'=>$result,'msg'=>$message,'user'=>$user);
  echo json_encode($res);
?>