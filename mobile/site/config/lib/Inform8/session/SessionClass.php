<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */


class Session {

  private static $SITE_KEY = 'abc';
  private static $NEW_SESSION = false;

  private $authenticationManager;
  private $postLoginCmd;

  private function __construct() {
    $this->authenticationManager = StaticConfig::getAuthenticationClass();
  }

  public function getPostLoginCommand() {
    return $this->postLoginCmd;
  }

  public function setPostLoginCommand($postLoginCmd) {
    $this->postLoginCmd = $postLoginCmd;
  }

  public function getAuthenticationManager() {
    return $this->authenticationManager;
  }

  public static function isNew() {
    return self::$NEW_SESSION;
  }

  public static function setSiteKey($key) {
    self::$SITE_KEY = $key;
  }

  public static function getInstance() {
    $newSession = false;
     
    if (!isset($_SESSION[self::$SITE_KEY]) || $_SESSION[self::$SITE_KEY] == NULL) {
      $_SESSION[self::$SITE_KEY] = new Session();
      self::$NEW_SESSION = true;
    }
    return $_SESSION[self::$SITE_KEY];
  }



}
?>