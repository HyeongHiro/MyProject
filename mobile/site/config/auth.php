<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */
  
  $authManager = Session::getInstance()->getAuthenticationManager();
  
  if (Request::getSafeGetOrPost("logout") == 'true') {
    $authManager->reset();
  }
	
  if (!$authManager->isAuthenticated()) {
  	//attempt login if set
  	if (isset($_POST["login"]) && '1' == $_POST["login"]) {
  		if ($authManager->performAuthentication()) {
  			if($session->getPostLoginCommand() != NULL) {
  			  header("Location: /" . $session->getPostLoginCommand() . '.htm');
  			  die();
  			}
  		}else {
  			$authError = true;
  			Inform8Context::getLogger()->log(BaseLogger::$DEBUG, "AuthError: " . json_encode($authManager->getAuthenticationError()));
  		}
  	}
  }
?>