<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */

class Inform8UserAuthenticate implements UserAuthenticate{
  var $user;
  var $authenticated = false;
  var $authError;
  var $loginTasks;

  function performAuthentication() {

    $this->authError = NULL;

    StaticConfig::getLoginProcessor()->recordLoginAttempt(Request::getSafePost('Username'), Request::getSafePost('Password'));

    if (Request::getSafePost('Username') == NULL) {
      $this->authError = AuthenticationError::invalidUserName();
      $this->authenticated = false;
      return false;
    }

    if (Request::getSafePost('Password') == NULL) {
      $this->authError = AuthenticationError::invalidPassword();
      $this->authenticated = false;
      return false;
    }
     
    if(StaticConfig::isLoginEmailFormat()) {
      if (!filter_var( Request::getSafePost("Username"), FILTER_VALIDATE_EMAIL)) {
        $this->authError = AuthenticationError::invalidUserName();
        $this->authenticated = false;
        return false;
      }
    }

    $user = UserIQL::select()
    ->where(NULL, UserIQL::$USERNAME, '=', Request::getSafePost('Username'))
    ->getFirst();
     
    if(is_object($user)) {
      $this->user = $user;
    }

    if ($this->user == NULL) {
      $this->authError = AuthenticationError::invalidUserName();
      $this->authenticated = false;
      StaticConfig::getLoginProcessor()->processUnsuccessfulLogin(Request::getSafePost('Username'), Request::getSafePost('Password'), NULL);
      return $this->authenticated;
    }else if($this->user->getEnabled() != 1) {
      $this->authError = AuthenticationError::accountDisabled();
      $this->authenticated = false;
      StaticConfig::getLoginProcessor()->processUnsuccessfulLogin(Request::getSafePost('Username'), Request::getSafePost('Password'), $this->user);
      return $this->authenticated;
    }
    if (md5(Request::getSafePost('Password')) == $this->user->getPassword()) {
      $this->authenticated = true;
      StaticConfig::getLoginProcessor()->processLogin($this->user);
      return $this->authenticated;
    } else {
      $this->authError = AuthenticationError::invalidPassword();
      $this->authenticated = false;
      StaticConfig::getLoginProcessor()->processUnsuccessfulLogin(Request::getSafePost('Username'), Request::getSafePost('Password'), $this->user);
      return $this->authenticated;
    }
    return false;
  }

  function reset() {
    $this->user = null;
    $this->authenticated = false;
    $this->authError = "";
  }

  function isAuthenticated() {
    return $this->authenticated;
  }

  function getAuthenticationError() {
    return $this->authError;
  }

  function getUser() {
    return $this->user;
  }

}
?>