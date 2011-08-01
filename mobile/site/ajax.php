<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */

  require_once 'config/settings.php';
  
  $call = Request::getSafeGetOrPost("call");
  if (ctype_alpha($call)) {
    $regAjax = file_exists('config/ajax/' . $call . '.ajax.php');
    $secureAjax = file_exists('config/authenticatedajax/' . $call . '.ajax.php');

    if ($secureAjax) {
      if (Session::getInstance()->getAuthenticationManager()->isAuthenticated()) {
        include 'config/authenticatedajax/' . $call . '.ajax.php';
      }
    }else if ($regAjax) {
      BasicLogger::logToFile('Running ajax action: '. $call);
      include 'config/ajax/' . $call . '.ajax.php';      
    }
  }
?>