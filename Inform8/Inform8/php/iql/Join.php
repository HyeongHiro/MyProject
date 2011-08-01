<?php 
  /* 
   * Copyright 2011 - Inform8
   * http://www.inform8.com
   *
   * Licensed under the Apache License, Version 2.0 (the "License")
   * http://www.apache.org/licenses/LICENSE-2.0
   */

  /**
  * The Join class holds the information required to build a join clause for a query. 
  * 
  * Note: Currently only inner joins are supported 
  * 
  */
  class Join {
    
    /** The left hand table of the clause*/
    private $table;
    /** The left hand field of the clause*/
    private $field;
    
    /** The right hand table of the clause*/
    private $otherTable;
    /** The right hand table of the clause */
    private $otherField;
    
    /**
     * Constructs a new Join class with the table and field definitions.
     *
     * @param $table the base join table
     * @param $field the base join field
     * @param $otherTable the other join table
     * @param $otherTable the other join field
     *
     */
    function __construct($table, $field, $otherTable, $otherField) {
      $this->table = $table;
      $this->field = $field;
      $this->otherTable = $otherTable;
      $this->otherField = $otherField;  
    }
  
  
    /**
     * Builds an SQL compatible join query portion.
     * @return String the join clause query string
     */    
    public function toSQL() {
      return Inform8Context::getDbConnection()->real_escape_string($this->table) . '.'
        . Inform8Context::getDbConnection()->real_escape_string($this->field) . ' = ' 
        . Inform8Context::getDbConnection()->real_escape_string($this->otherTable) . '.' 
        . Inform8Context::getDbConnection()->real_escape_string($this->otherField);
    }
    
    
    /**
     * @return String The name of the base table. 
     */
    public function getTable() {
      return $this->table;
    }
    
    
    /**
     * @return String The name of the base field. 
     */    
    public function getField() {
      return $this->field;
    }


    /**
     * @return String The name of the other table. 
     */
    public function getOtherTable() {
      return $this->otherTable;
    }


    /**
     * @return String The name of the other field. 
     */
    public function getOtherField() {
      return $this->otherField;
    }
    
  }
?>