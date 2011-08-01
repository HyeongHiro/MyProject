<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */
 
class StaticConfig {

    public static function getSiteName() {
        return 'Inform8';
    }

    /**
     * @return UserAuthenticate the authenticator
     */
    public static function getAuthenticationClass() {
      return new Inform8UserAuthenticate();
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
    
    
    public static function getEmailSmtpServer() {
        return '';
    }     

    public static function getEmailSmtpUsername() {
        return '';
    }     

    public static function getEmailSmtpPassword() {
        return '';
    }
    
    public static function getEmailSmtpPort() {
        return '25';
    }
    
}
?>