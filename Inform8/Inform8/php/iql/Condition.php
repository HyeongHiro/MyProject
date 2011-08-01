<?php 
  /* 
   * Copyright 2011 - Inform8
   * http://www.inform8.com
   *
   * Licensed under the Apache License, Version 2.0 (the "License")
   * http://www.apache.org/licenses/LICENSE-2.0
   */

  
  /**
  * Specifies a Condition for an IQL Query
  * Typically used in the where clause of an IQL query. 
  */
  class Condition {
    
    public static $EQ = '=';
    public static $NEQ = '!=';
    
    public static $GT = '>';
    public static $GTE = '>=';

    public static $LT = '<';
    public static $LTE = '<=';


    /** The name of the table containing the field to apply the condition on */ 
    private $table;
    
    /** The name of the field to apply the condition on */
    private $field;
    
    /** The condition type (Example '=')  */
    private $condition;
    
    /** The value of the condition */
    private $value;
    
    /**
     * Constructs a new condition.
     * 
     * @param $table String the table name.
     * @param $field String the field name.
     * @param $condition String the condition.
     * @param $value String the value of the condition
     */
    function __construct($table, $field, $condition, $value) {
      $this->table = $table;
      $this->field = $field;
      $this->condition = $condition;
      $this->value = $value;  
    }
  
  
    /**
     * Creates an SQL query portion representing this condition.
     * @return String the condition in SQL
     */
    public function toSQL() {
      return Inform8Context::getDbConnection()->real_escape_string($this->table)
        . '.' . Inform8Context::getDbConnection()->real_escape_string($this->field) . ' ' 
        . Inform8Context::getDbConnection()->real_escape_string($this->condition) . ' ' 
        . "'" . Inform8Context::getDbConnection()->real_escape_string($this->value) . "'";
    }


    /**
     * @return String The name of the table this condition applies to. 
     */
    public function getTable() {
      return $this->table;
    }
    
    
    /**
     * @return String The name of the field this condition applied to. 
     */    
    public function getField() {
      return $this->field;
    }


    /**
     * @return String The condition type. 
     */
    public function getCondition() {
      return $this->condition;
    }


    /**
     * @return String The value of the condition. 
     */
    public function getValue() {
      return $this->value;
    }    

  }
?>