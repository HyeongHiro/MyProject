<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */
 
  //setup the auto loading function
  function __autoload($className) {
    if (Inform8Context::getClassRegistry()->getClass($className) != NULL) {  
        include Inform8Context::getClassRegistry()->getClass($className);  
    }
  }

  require_once 'StaticConfigClass.php';
  require_once 'lib/Inform8/Inform8Context.php';
  require_once 'lib/loadall.php';
  
  // configure the logging system
  Inform8Context::setLogger(StaticConfig::getLogger());
  
  // load the database connection
  include 'config/includes/db/db.conn.prod.php';
  
  $checker = new BlackListChecker();
  if ($checker->isOnBlackList() >= 1) {
    die('Sorry your IP has been blocked. If you think this an error please contact us.');
  }

  setlocale(LC_ALL, StaticConfig::getLocale());
  
  // configure the session
  session_start();
  require_once 'session.php';

  // check authentication
  require_once 'auth.php';
?>