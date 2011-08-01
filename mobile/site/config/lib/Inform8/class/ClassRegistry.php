<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */

class ClassRegistry {

  private $classRegistry = array();

  public function registerClass($className, $file) {
    $this->classRegistry[$className] = $file;
  }

  public function getClass($className) {
    if(isset($this->classRegistry[$className])) {
      return $this->classRegistry[$className];
    }
    return NULL;
  }

}
?>