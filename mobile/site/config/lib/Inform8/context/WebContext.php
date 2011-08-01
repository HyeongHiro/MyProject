<?php
/*
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * Inform8 context for the web app.
 *
 * Extends the default Inform8 context to hold web specifics.
 */
class WebContext extends Inform8Context{

  private static $CONTROLLERS = array();
  private static $PAGE_ACCESS = array();
  
  private static $LANG;

  public static function addController($page, $controllerClassName){
    self::$CONTROLLERS[$page] = $controllerClassName;
  }

  public static function getController($page){
    if(self::$CONTROLLERS[$page] != NULL) {
      $controller = self::$CONTROLLERS[$page];
      return new $controller();
    }else {
      return StaticConfig::getDefaultController();
    }
  }
  

  public static function getLanguage(){
    if(self::$LANG == NULL) {
      include 'config/en.php';
      self::$LANG = new LanguageStore($langArray);
    }
    return self::$LANG;
  }

  
  public static function getPageAccess($page){
    if(self::$PAGE_ACCESS[$page] != NULL) {
      return self::$PAGE_ACCESS[$page];
    }else {
      return NULL;
    }
  }  
  
  
  public static function addPageAccess(PageAccess $access){
    self::$PAGE_ACCESS[$access->getName()] = $access;
  }   
  
}

?>