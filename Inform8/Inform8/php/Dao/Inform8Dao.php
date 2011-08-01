<?php 
  /* 
   * Copyright 2011 - Inform8
   * http://www.inform8.com
   *
   * Licensed under the Apache License, Version 2.0 (the "License")
   * http://www.apache.org/licenses/LICENSE-2.0
   */

/**
 * Base functionality for generated DAO's. 
 *
 */
class Inform8Dao { 

    public static $OPERATION_CREATE = 0;
    public static $OPERATION_SAVE = 0;
    public static $OPERATION_DELETE = 0;
    public static $OPERATION_GET = 0;
    public static $OPERATION_GETALL = 0;
    public static $OPERATION_COUNT = 0;
    public static $OPERATION_SQL = 0;

    /** The mysqli object that represents the database connection to use */
    protected $mysqli;
    
    protected $logger;
    
    function __construct() {
      $this->mysqli = Inform8Context::getDbConnection();
      $this->logger = Inform8Context::getLogger();
    }

    protected function checkResult($result) {
        if(!is_object($result) && !$result) {    
            throw Inform8DbException::sqlError($this->mysqli->errno, $this->mysqli->error);
        }  
    }
    
    protected function getResultAsString($result) {
        if(!is_object($result) && !$result) {
            return "SQL error";
        }else {
            return "Result Object";
        }
    }
    
}
?>