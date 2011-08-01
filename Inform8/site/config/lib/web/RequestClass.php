<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */


class Request {

  private static $INSTANCE = NULL;


  public static function getIpAddress() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
      $ip=$_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
      $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
      $ip=$_SERVER['REMOTE_ADDR'];
    }
    return $ip;
  }

  public static function getBrowser() {
    return $_SERVER['HTTP_USER_AGENT'];
  }


  public static function getOrPost($name) {
    if (isset($_POST[$name]) && !is_null($_POST[$name])) {
      return $_POST[$name];
    }
    if (isset($_GET[$name]) && !is_null($_GET[$name])) {
      return $_GET[$name];
    }
    return NULL;
  }

  public static function getSafePost($name) {
    if (!isset($_POST[$name])) {
      return NULL;
    }
    if(get_magic_quotes_gpc()) {
      return stripslashes($_POST[$name]);
    }else {
      return $_POST[$name];
    }
  }

  public static function getSafeGetOrPost($name) {
    if(get_magic_quotes_gpc()) {
      return stripslashes(self::getOrPost($name));
    }else {
      return self::getOrPost($name);
    }
  }


  private $feedback = array();
  private $errors = array();

  public function getError($key) {
    return $this->errors[$key];
  }

  public function addError($key, $value) {
    $this->errors[$key] = $value;
  }

  public function getFeedback($key) {
    return $this->feedback[$key];
  }

  public function addFeedback($key, $value) {
    $this->feedback[$key] = $value;
  }

  public static function getInstance() {
    if(self::$INSTANCE == NULL) {
      self::$INSTANCE = new Request();
    }
    return self::$INSTANCE;
  }

}
?>