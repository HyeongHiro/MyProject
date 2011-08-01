<?php 
  /* 
   * Copyright 2011 - Inform8
   * http://www.inform8.com
   *
   * Licensed under the Apache License, Version 2.0 (the "License")
   * http://www.apache.org/licenses/LICENSE-2.0
   */


  /**
  *
  * IQL, A DSL, providing a fluent interface to your Database.
  * <br><br>
  * 
  * It's constructs are similar to SQL only in PHP.
  * IQL provides a light weight wrapper over SQL, it's main goals are to simplify query construction, and return 
  * PHP Objects instead of record sets. It does not provide query validation.
  * <br><br>
  * 
  * IQL queries are generally setup to return data from a single source table. The query may interact with
  * multiple tables but typically the results apply to a single table.
  * <br><br>
  * 
  * Note: Only portions of the SQL language are supported.
  * <br><br>
  * 
  * Supported Databases: MySQL
  * 
  */
  class IQL {
    
    /** Order Direction Ascending */
    public static $ASC_DIRECTION = 'ASC';
    
    /** Order Direction Descending */
    public static $DESC_DIRECTION = 'DESC';

    /** The base table the query is based on and the table from which the resulting objects will come. */
    protected $table;

    /** Where Groups, holds the where conditions */
    protected $conditions = Array();
    protected $conditionJoins = Array();
    
    /** Start - Index to start of record count */
    protected $start = 0;
    
    /** Limit - The number of records to retrieve */
    protected $limit = -1;
    
    /** Order by params */
    private $orderBys = Array();
  
    /** Table Joins */
    protected $joins = Array();

    protected $distinct = false;

    /** 
     * Construct a new query with the results coming from the supplied table.
     * 
     * @param $table String the name of the database table this query will return results from.
     */ 
    function __construct($table) {
      $this->table = $table;  
    }

    public function distinct($distinct=true) {
        $this->distinct = $distinct;
        return $this;
    }

    /**
     * Set the starting record.
     * @param $start Int/String The database record to start from
     */
    public function start($start) {
        $this->start = $start;
        return $this;
    }

    
    /**
     * The record result limit.
     * @param $limit Int/String the record limit 
     */
    public function limit($limit) {
        $this->limit = $limit;
        return $this;
    }
  
    
    /**
     * Set the first clause of the queries WHERE condition
     *
     * This method (or the shortened whereCondition method) should only be called once to establish the initial where query condition.
     *
     * @param $table String the name of the table that this condition applies to. If NULL uses the table this query is based on. 
     * @param $field String the name of the field that this condition applies to.
     * @param $condition String the condition type of this condition (for example '=')
     * @param $value ? the value of the condition clause
     * @seeAlso whereCondition($cond)
     */
    public function where($table, $field, $condition, $value) {
        if ($table == NULL) {
          $table = $this->table;
        }
        return $this->whereCondition(new Condition($table, $field, $condition, $value));
    }
    
    /**
     * Sets the initial where condition.
     * 
     * This method (or the more verbose where() method)  should only be called once to establish the initial where query condition.
     * 
     */
    public function whereCondition($cond) {
       array_push($this->conditions, $cond);
       return $this;
    }
    
    
    /**
     * Sets a join condition between the queries base table and another table.
     * Note: Currently supports inner joins only. 
     * 
     * @param $field String the name of the field to join with.
     * @param $otherTable String the name of the other table.
     * @param $otherField String the name of the other field to join with.
     * 
     * @see joinWith() method 
     * @see Join class
     */
    public function join($field, $otherTable, $otherField) {
      return $this->joinWith(new Join($this->table, $field, $otherTable, $otherField));
    }
    
    
    /**
     * Sets a join condition between.
     * Note: Currently supports inner joins only. 
     *
     * @param $join Object the join Object specifying the join details.
     * 
     * @see Join class
     * @see join() method
     */
    public function joinWith($join) {
      array_push($this->joins, $join);
      return $this;
    }
    
    
    /**
     * Adds an AND condition in the WHERE clauses. 
     *
     * @param $table String the name of the table that this condition applies to. If NULL uses the table this query is based on. 
     * @param $field String the name of the field that this condition applies to.
     * @param $condition String the condition type of this condition (for example '=')
     * @param $value ? the value of the condition clause
     *
     * @see _andCondition($cond)
     */
    public function _and($table=NULL, $field, $condition, $value) {
      if ($table == NULL) {
        $table = $this->table;
      }
      return $this->_andCondition(new Condition($table, $field, $condition, $value));
    }
    
    
    /**
     * Adds an AND condition in the WHERE clauses. 
     *
     * @param $cond Object the condition to add to the query.
     * @see Condition 
     */
    public function _andCondition($cond) {
      array_push($this->conditionJoins, "AND");
      array_push($this->conditions, $cond);
      return $this;
    }

    
    /**
     * Adds an OR condition in the WHERE clauses. 
     *
     * @param $table String the name of the table that this condition applies to. If NULL uses the table this query is based on. 
     * @param $field String the name of the field that this condition applies to.
     * @param $condition String the condition type of this condition (for example '=')
     * @param $value ? the value of the condition clause
     *
     * @see _orCondition($cond)
     */
    public function _or($table, $field, $condition, $value) {
      if ($table == NULL) {
        $table = $this->table;
      }
      $this->_orCondition(new Condition($table, $field, $condition, $value));
      return $this;
    }
    

    /**
     * Adds an OR condition in the WHERE clauses. 
     *
     * @param $cond Object the condition to add to the query.
     * @see Condition 
     */
    public function _orCondition($cond) {
      array_push($this->conditionJoins, "OR");
      array_push($this->conditions, $cond);
      return $this;
    }
    
    
    /**
     * Adds the ORDER BY clause to the query.
     *
     * @param $table String The table in the order by clause.
     * @param $field String The field in the order by clause
     * @param $direction String The direction of the order by clause.
     *
     * @see OrderBy
     */
    public function orderBy($table, $field, $direction = 'ASC') {
      if ($table == NULL) {
        $table = $this->table;
      }    
      array_push($this->orderBys, new OrderBy($table, $field, $direction));
      return $this;
    }

  
    /**
     * Composes the where query.
     */
    protected function buildWhere() {
      $where = "";
      $whereCount = count($this->conditions);
      
      if ($whereCount > 0) {
        $where .= " WHERE " . $this->conditions[0]->toSQL();
        for ($i=1; $i < $whereCount; $i++) {
          // always one less condition join structure becasue of WHERE statement.
          $where .= " " . $this->conditionJoins[$i-1] . " " .  $this->conditions[$i]->toSQL();
        }
      }
      
      $joinCount = count($this->joins);
      if ($joinCount > 0) {
        $join = $this->buildJoins();
        if ($whereCount > 0) {
          $where .= " AND " . $join;
        }else {
          $where .= " WHERE " . $join;
        }
      }
      
      return $where;   
    }


    /**
     * Builds the join portions of the query.
     */
    protected function buildJoins() {
      $join = "";
      $joinCount = count($this->joins);
      if ($joinCount > 0) {
        $join .= " " . $this->joins[0]->toSQL();
        for ($i=1; $i < $joinCount; $i++) {
          $join .= " AND " . $this->joins[$i]->toSQL();
        }
      }
      return $join;   
    }

    
    /**
     * Builds the order by section of the query.
     */    
    protected function buildOrderBy() {
      $order = "";
      $ct = count($this->orderBys);
      if ($ct > 0) {
        $order .= " ORDER BY " . $this->orderBys[0]->toSql();
        for ($i=1; $i < $ct; $i++) {
          $order .= ", " . $this->orderBys[$i]->toSql();
        }
      } 
      return $order;    
    }
  

    /**
     * Creates a new Aggregate Query
     * @param $table String The name of the table to request aggregate data from. 
     */
    public static function aggregate($table) {
      return new IQLAggregate($table);
    }

  
    /**
     * Creates a new IQLCount query, returning a row count 
     * @param $table String The name of the table to request data from.
     * @param $field String Optional. Defaults to *
     * 
     * @see IQLCount
     */
    public static function count($table, $field='*') {
      return new IQLCount($table, $field);
    }
    
    
    /**
     * Creates a new IQLSelect query
     * @param $table String The name of the table to request data from.
     * @param $fields String Optional. Defaults to *
     * 
     * @see IQLCount
     */    
    public static function select($table, $fields=array('*')) {
      return new IQLSelect($table, $fields);
    }
  
  
    /**
     * Convenience function to extract a single value from the first record in a result set.
     * Takes the first record and extracts the value of the supplied field name. 
     *
     * @param $sql the SQL query to execute.
     * @param $fieldName the name of the field to extract the value from
     * @return ? the value
     */
    public static function getValue($sql, $fieldName) {
      $mysqli = Inform8Context::getDbConnection();
      $result = $mysqli->query($sql); 

      if (!is_object($result) && !$result) {
       return -1;
      } else if ($result->num_rows == 0) {
       return -1;
      } else {
        $record = $result->fetch_assoc();
        $value = $record[$fieldName];
        
        /* Free resultset */
        $result->close();
        
        return $value;
      }
    }
    
    
    /**
     * Convenience function to extract a set of values from the first record in a result set.
     * Takes the first record and extracts the value of the supplied field name. 
     *
     * @param $sql the SQL query to execute.
     * @param $fields the name of the fields to extract the value from
     * @return Array the values
     */    
    public static function getValues($sql, $fields) {
      $mysqli = Inform8Context::getDbConnection();
      $result = $mysqli->query($sql);     

      if (!is_object($result) && !$result) {
       return -1;
      } else if ($result->num_rows == 0) {
       return -1;
      } else {
        $objects = Array();
        while ($record = $result->fetch_assoc()) {
          $arr = array();
          foreach ($fields as $field) {
            if (isset($record[$field])) {
              $arr[$field] = $record[$field];
            }
          } 
          $objects[] = $arr;
        }      

        /* Free resultset */
        $result->close();
        
        return $objects;
      }
    }  
  
  }
  
  
  /**
   * Convenience class to perform simple aggregate queries.
   *
   */
  class IQLAggregate extends IQL{
  
    /** The field to perform the Min calculation on */
    private $minField;

    /** The field to perform the Max calculation on */
    private $maxField;

    /** The field to perform the Avg calculation on */
    private $avgField;
    
    /** The field to perform the Sum calculation on */
    private $sumField;
    
    /**
     * @param $table the table to perform the aggregate functions on.
     */
    function __construct($table) {
      parent::__construct($table);  
    }
    
    /** 
     * Set the field to get the min value from.
     */
    public function min($field) {
      $this->minField = $field;
      return $this;
    }
    
    /** 
     * Set the field to get the max value from.
     */
    public function max($field) {
      $this->maxField = $field;
      return $this;
    }

    /** 
     * Set the field to get the avg value from.
     */
    public function avg($field) {
      $this->avgField = $field;
      return $this;
    }
    
    /** 
     * Set the field to get the sum value from.
     */
    public function sum($field) {
      $this->sumField = $field;
      return $this;
    }

    /**
     * Builds the relevant SQL query
     * @return String the SQL query
     */    
    public function buildQuery() {
      $q = "SELECT ";
      $comma = false;
      if ($this->minField != NULL) {
        if ($comma) { $q .= ", "; }
        $q .= " MIN(" . $this->minField . ") AS MN ";
        $comma = true;
      }
      if ($this->maxField != NULL) {
        if ($comma) { $q .= ", "; }
        $q .= " MAX(" . $this->maxField . ") AS MX ";
        $comma = true;
      }
      if ($this->avgField != NULL) {
        if ($comma) { $q .= ", "; }
        $q .= " AVG(" . $this->avgField . ") AS AV ";
        $comma = true;
      }
      if ($this->sumField != NULL) {
        if ($comma) { $q .= ", "; }
        $q .= " SUM(" . $this->sumField . ") AS SM ";
        $comma = true;
      }
       
      $q .= " FROM " . Inform8Context::getDbConnection()->real_escape_string($this->table) . ' ' . $this->buildWhere();
      return $q;
    }

    /**
     * Returns the aggregate results
     * Executes the query and populates the required values in an Aggregate Object.
     * @return Object of type Aggregate, with the requested values set
     */
    public function get() {
      $agg = new AggregateResults();
      
      $list = IQL::getValues($this->buildQuery(), array("MN", "MX", "AV", "SM"));
      $values = $list[0];      
      
      $agg->setMin($values["MN"])->setMax($values["MX"])->setAvg($values["AV"])->setSum($values["SM"]);
      return $agg;
    }    
     
  }  

  
  /**
   * Provides a simple way to retrieve a record count.
   * 
   * Performs a SELECT COUNT(X) FROM table
   * returns the Integer result or -1 on failure. 
   */
  class IQLCount extends IQL{
  
    /** The field to perform the select on */
    private $field;
    
    /**
    * @param field is optional. If omitted the default is * for a 'select count(*)' query
    */
    function __construct($table, $field = '*') {
      parent::__construct($table);
      $this->field = $field;  
    }
    
    public function buildQuery() {
      $query = "SELECT COUNT(" . Inform8Context::getDbConnection()->real_escape_string($this->field) .  ") AS RC FROM " . Inform8Context::getDbConnection()->real_escape_string($this->table); 
      foreach($this->joins as $join) {
          $query .= ', ' . Inform8Context::getDbConnection()->real_escape_string($join->getOtherTable());
      }
      $query .= ' ' . $this->buildWhere();
      return $query;
    }
    
    /**
    * @return the integer count value or -1 if the operration failed 
    */
    public function get() {
      return IQL::getValue($this->buildQuery(), "RC");
    }    
     
  }
   
  
 
  /**
  * Select records and return Objects representing the table.
  * Can perform full object population or partial object population by specifying the fields required.  
  * 
  */
  class IQLSelect extends IQL {
    
    /** The field to perform the select on */
    private $fields;
    
    /**
    * @param fields is optional. If omitted the default is * for a 'select *' query
    */
    function __construct($table, $fields = array('*')) {
      parent::__construct($table);
      $this->fields = $fields;  
    }
    
    public function buildQuery() {
      $query = "SELECT ";
      
      if ($this->distinct) {
        $query .= ' DISTINCT ';
      }
      
      $comma = false;
      foreach($this->fields as $field) {
        if ($comma) {
          $query .= ', ';  
        }else {
          $comma=true;
        }
        $query .= Inform8Context::getDbConnection()->real_escape_string($this->table . '.'. $field);
      }
      $query .= " FROM " . Inform8Context::getDbConnection()->real_escape_string($this->table);
        
      foreach($this->joins as $join) {
          $query .= ', ' . Inform8Context::getDbConnection()->real_escape_string($join->getOtherTable());
      }
    
      $query .= $this->buildWhere();
      $query .= $this->buildOrderBy();
      
      if ($this->limit > 0) {
        $query .= " LIMIT " . $this->start . ',' . $this->limit;
      }
      
      return $query;
    }
    
    /**
    * 'SELECT *' queries return an array of fully populated ${table.dbname} objects.
    * 'SELECT (field1, field2, ...)' queries return an array of partially populated ${table.dbname} objects.
    * 
    * Using a custom field list will return partially populated objects.
    * If the Primay Key is present then an object which can potentially be loaded later is created. 
    *
    * @return Array of fully or partially populated ${table.dbname} objects
    */
    public function get() {
      $daoName = $this->table . 'Dao';
      $dao = new $daoName();
      if (count($this->fields == 1) && $this->fields[0] == '*') {
        return $dao->getWithSql($this->buildQuery(), false);
      }else {
          return $dao->getWithSql($this->buildQuery(), false, $this->fields);
      }
    }
    
    
    /**
    * This is the same as the get method excpet it retrns only the first object returned in the result set.
    * This does not limit the query results in anyway the user should do this prior to calling this method.  
    * This is just a convenience method to return the first row.
    *
    *
    * @return ${table.dbname} a fully or partially populated ${table.dbname} object OR NULL is no records match the query
    */
    public function getFirst() {
      $daoName = $this->table . 'Dao';
      $dao = new $daoName();
      
      $objs = $dao->getWithSql($this->buildQuery(), false);
      if (is_array($objs) && count($objs) > 0) {
        return $objs[0];
      }
      return $objs;
    }    
  }
  
?>