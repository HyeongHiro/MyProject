<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */

interface Inform8Authenticate {
   
  function performAuthentication();

  function reset();

  function isAuthenticated();

  /**
   * @return AuthenticationError
   */
  function getAuthenticationError();

  function getUser();

}


class AuthenticationError {

  private static $CODE_INVALID_USERNAME = 0;
  private static $CODE_INVALID_PASSWORD = 1;
  private static $CODE_ACCOUNT_DISABLED = 2;
  private static $CODE_TEMP_SUSPENDED = 3;

  private $code;
  private $displayString;

  function __construct($code, $displayString) {
    $this->code = $code;
    $this->displayString = $displayString;
  }

  function getCode() {
    return $this->code;
  }

  function getDisplayString() {
    return $this->displayString;
  }

  public static function invalidUserName() {
    return new AuthenticationError(self::$CODE_INVALID_USERNAME, 'Invalid username');
  }

  public static function invalidPassword() {
    return new AuthenticationError(self::$CODE_INVALID_PASSWORD, 'Invalid password');
  }

  public static function accountDisabled() {
    return new AuthenticationError(self::$CODE_ACCOUNT_DISABLED, 'Account disabled');
  }

}

?>