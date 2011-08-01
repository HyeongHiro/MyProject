<?php 
  /* 
   * Copyright 2011 - Inform8
   * http://www.inform8.com
   *
   * Licensed under the Apache License, Version 2.0 (the "License")
   * http://www.apache.org/licenses/LICENSE-2.0
   */
  /**
  * The OrderBy class holds the information required to build a clause for the 'ORDER BY' segment of a query.
  * 
  */
  class OrderBy {
    
    /** The name of the table containing the field to order by */ 
    private $table;
    
    /** The field to order by */
    private $field;
    
    /** The direction to order by */
    private $direction;
    
    /**
     * Creates a new order by clause.
     * 
     * @param $table String The name of the table containing the field to order by
     * @param $field String The name of the field to order by
     * @param $direction String the direction of the order by clause. ASD or DESC 
     */
    function __construct($table, $field, $direction = 'ASC') {
      $this->table = $table;
      $this->field = $field;
      $this->direction = $direction;
    }
  
    /**
     * Builds an SQL compatible order by query portion.
     * Note: does not include the 'ORDER BY' word as a query can be composed of multiple order by clauses.
     * @return String the order by clause query string
     */
    public function toSQL() {
      return Inform8Context::getDbConnection()->real_escape_string($this->table) . '.'
        . Inform8Context::getDbConnection()->real_escape_string($this->field) . ' ' 
        . Inform8Context::getDbConnection()->real_escape_string($this->direction);
    }
    
    /**
     * 
     * @return String the Field used in the query 
     */
    public function getField() {
      return $this->field;
    }

    /**
     * 
     * @return String the Table used in the query 
     */
    public function getTable() {
      return $this->table;
    }

    /**
     * 
     * @return String the Direction of the order by query 
     */
    public function getDirection() {
      return $this->direction;
    }
    
  }
?>