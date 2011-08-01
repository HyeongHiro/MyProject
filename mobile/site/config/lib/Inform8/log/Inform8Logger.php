<?php 
  /* 
   * Copyright 2011 - Inform8
   * http://www.inform8.com
   *
   * Licensed under the Apache License, Version 2.0 (the "License")
   * http://www.apache.org/licenses/LICENSE-2.0
   */

    /**
     * The base interface definition of an Inform8 Logger.
     *
     */
    interface ILogger {

        public function log($level, $msg);
        
        public function isLevel($level);
         
        public function setLevel($level);
        public function getLevel();
    }
    
    
    // a base empty logger
    class BaseLogger implements ILogger{
      
        public static $OFF = 0;
        
        public static $FATAL = 1;
        public static $ERROR = 2;
        public static $WARN = 3;
        public static $INFO = 4;
        public static $DEBUG = 5;
        public static $ALL = 6;      
      
        public function log($level, $msg) {
        }
        public function info($msg) {
        }
        public function debug($msg) {
        }
    	public function fatal($msg) {
        }
        public function warn($msg) {
        }
        public function all($msg) {
        }
        
        public function isLevel($level){
            return false;
        }
         
        public function setLevel($level){}
        public function getLevel(){return ILogger::$OFF;}
    }
    
    
    // build a default logger
    class FileLogger extends BaseLogger{
        
        private $level;

        private $fileHandle;
        
        function __construct($file, $level = 0) {
            $this->level = $level;
            $this->fileHandle = fopen($file, "a");
        }
        
        function __destruct() {
            fclose($this->fileHandle);
        }
        
        public function setLevel($level){
            $this->level = $level;
        }
        
        public function getLevel(){
            return $this->level;
        }
        
        public function isLevel($level) {
            return $this->level >= $level;
        }
        
        public function isHandleOpen() {
            if($this->handle) {
                return true;
            } else {
                return false;
            }
        }
        
        public function debug($msg){
        	$this->log(BaseLogger::$DEBUG, $msg);        
       	}
        
        public function info($msg){
        	$this->log(BaseLogger::$INFO, $msg);
        }
        
    	public function fatal($msg) {
    		$this->log(BaseLogger::$FATAL, $msg);
        }
        public function warn($msg) {
        	$this->log(BaseLogger::$WARN, $msg);
        }
        public function all($msg) {
        	$this->log(BaseLogger::$ALL, $msg);
        }
                
        public function log($level, $msg) {
            $prefix = time();
            
            
            $backtrace = debug_backtrace();
            $prev = $backtrace[0];
            $prefix .= ' - [' . $prev['file'] . ':' . $prev['line'] . ']';
            
            switch ($level) {
                case BaseLogger::$FATAL:
                    $prefix = '[FATAL] - ' . $prefix . ' - ';
                    break;
                case BaseLogger::$WARN:
                    $prefix = '[WARN] - ' . $prefix . ' - ';
                    break;
                case BaseLogger::$INFO:
                    $prefix = '[INFO] - ' . $prefix . ' - ';
                    break;
                case BaseLogger::$DEBUG:
                    $prefix = '[DEBUG] - ' . $prefix . ' - ';
                    break;
                case BaseLogger::$ALL:
                    $prefix = '[ALL] - ' . $prefix . ' - ';
                    break;
            }
            
            if($this->fileHandle && $this->isLevel($level)) {
                // write to file.
                fwrite($this->fileHandle, $prefix . $msg . "\n");
            }
        }
        
    }
?>