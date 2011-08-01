<?php 
  /* 
   * Copyright 2011 - Inform8
   * http://www.inform8.com
   *
   * Licensed under the Apache License, Version 2.0 (the "License")
   * http://www.apache.org/licenses/LICENSE-2.0
   */

    /**
     * Inform8's main exception class 
     *
     */
    class Inform8DbException extends Exception {
    
        public static $UNKNOWN_ERROR = 0;
        
        public static $SQL_ERROR = 100;
        
        public static $SQL_UNIQUE_ERROR = 101;
        public static $SQL_FK_ERROR = 102;
        
        public static $NO_RECORDS = 2001;
    
        private $errorCode;
        private $logDescription; // for log file only
    
        function __construct($errorCode, $subCode, $logDescription) {
            $this->errorCode = $errorCode;
            $this->subCode = $subCode;
        }
    
    
        public function getErrorCode() {
            return $this->errorCode;
        } 
        
        
        /**
         *
         *
         *
         */
        public static function sqlError($mysqlErrorNo, $logDescription = NULL) {
            // In future try and translate $mysqlErrorNo into a sub code...
        
            return new Inform8DbException(self::$SQL_ERROR, NULL, $logDescription);
        }
        
        
        /**
         * Throws an error as the query SHOULD have returned at least one row of results.
         * For example aggregate functions not returning results.
         */ 
        public static function noRecords() {
            return new Inform8DbException(self::$SQL_ERROR, self::$NO_RECORDS, NULL);
        }        
    
    }
?>