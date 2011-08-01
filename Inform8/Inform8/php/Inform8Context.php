<?php
/*
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * Inform8 context
 *
 */
class Inform8Context {

  private static $CONNECTION;
  private static $LOGGER;
  private static $CLASSREGISTRY;

  public static function getDbConnection(){
    return self::$CONNECTION;
  }

  public static function setDbConnection($mysqli){
    self::$CONNECTION = $mysqli;
  }

  /**
   * @return ILogger
   */
  public static function getLogger(){
    return self::$LOGGER;
  }

  public static function setLogger($logger){
    self::$LOGGER = $logger;
  }


  public static function getClassRegistry(){
    if(self::$CLASSREGISTRY == NULL) {
      self::$CLASSREGISTRY = new ClassRegistry();
    }

    return self::$CLASSREGISTRY;
  }


}

?>