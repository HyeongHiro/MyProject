<?php 
  /* 
   * Copyright 2011 - Inform8
   * http://www.inform8.com
   *
   * Licensed under the Apache License, Version 2.0 (the "License")
   * http://www.apache.org/licenses/LICENSE-2.0
   */

  /**
  * Holds the resulting values from an IQL Aggregate Query.
  * 
  * Depending on the query, some or all fields will be populated.  
  */
  class AggregateResults {
    
    private $min;
    private $max;
    private $avg;
    private $sum;
    
    function __construct() {
    }  
    
    public function setMin($min) {
      $this->min = $min;
      return $this;
    }

    public function setMax($max) {
      $this->max = $max;
      return $this;
    }

    public function setAvg($avg) {
      $this->avg = $avg;
      return $this;
    }
    
    public function setSum($sum) {
      $this->sum = $sum;
      return $this;
    }


    public function getMin() {
      return $this->min;
    }

    public function getMax() {
      return $this->max;
    }

    public function getAvg() {
      return $this->avg;
    }

    public function getSum() {
      return $this->sum;
    }

  }
  
?>