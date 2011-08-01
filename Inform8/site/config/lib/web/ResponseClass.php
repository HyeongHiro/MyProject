<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */


class Response {

  private static $INSTANCE = NULL;

  private $title = '';
  private $template = NULL;
  private $map = array();

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


  public function getPageTemplate() {
    if ($this->template != NULL) {
      return $this->template;
    }
    return 'default.php';
  }

  public function setPageTemplate($template) {
    $this->template = $template;
  }


  public function getPageTitle() {
    return $this->title;
  }

  public function setPageTitle($title) {
    $this->title = $title;
  }

  public function get($key) {
    return $this->map[$key];
  }

  public function set($key, $val) {
    $this->map[$key] = $val;
  }


  /**
   * @return Response the response class instance.
   */
  public static function getInstance() {
    if(self::$INSTANCE == NULL) {
      self::$INSTANCE = new Response();
    }
    return self::$INSTANCE;
  }

}
?>