<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */

class StaticConfig {

  private static $preProcessors = array(); 


  public static function getSiteName() {
    return 'Go Bean';
  }

    public static function getServerName() {
    return "http://m.gobean.com.au";
  }  

  /**
   * Request pre-processor - run for every request to setup.
   * @see RequestPreProcessor
   * @return array(RequestPreProcessor) pre-processors
   */
  public static function getPreProcessors() {
    self::$preProcessors[] = new RbSessionPreProcessor();
    return self::$preProcessors;
  }


  public static function addPreProcessor($processor) {
    self::$preProcessors[] = $processor;
  }

  
  public static function getFileTemplateBaseFolder() {
    return '/Applications/MAMP/web/';
  }  

  /**
   * @return UserAuthenticate the authenticator
   */
  public static function getAuthenticationClass() {
    return new Inform8UserAuthenticate();
  }

  public static function getDefaultController() {
    return new SimpleFileController();
  }

  /**
   * The email any site errors go to.
   */
  public static function getAdministratorEmail() {
    return 'admin@yourdoman.com';
  }

  public static function getStorageLocation() {
    return '/folderToWebFiles/';
  }


  public static function getLogger() {
    return new FileLogger('logs/log' . date('Ymd') . '.log', BaseLogger::$DEBUG);
  }


  public static function getLocale() {
    return 'en_AU';
  }


  public static function getDefaultPage() {
    if (Session::getInstance()->getAuthenticationManager()->isAuthenticated()) {
      return 'home';
    }else {
      return 'index';
    }
  }

  function isLoginEmailFormat() {
    return false;
  }
  
  
  /**
   * Returns the name of the defaut template.
   * The user can also be used to control the defaut template.
   * 
   * @param Object user The current user or NULL if no user is logged in
   */
  function getDefaultTemplate($user = NULL) {
    return 'default.php';      
  }
  

  /**
   *
   * @return LoginProcessor to process login/logout functions
   */
  public static function getLoginProcessor() {
    return new NullLoginProcessor();
  }

  /** Google analytics code.. optional */
  public static function getGoogleAnalyticsCode() {
    return NULL;
  }

  /** Google analytics domain.. optional */
  public static function getGoogleAnalyticsDomain() {
    return NULL;
  }

  public static function getStreamedContentLocalFolder() {
    return '';
  }


  /**
   * return MailSettings the mailer settings.
   */
  public static function getEmailSettings() {
    return new StaticMailSettings();
  }

}
?>