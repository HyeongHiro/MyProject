<?php

/**
 * Used to place access restrictions on database tables only.
 * Use the permitted levels or non permitted levels only! 
 * 
 * This is a very simple implementation, that essentials allows/blocks access to tables.
 * To offer more restrictive access you should override this class and implement the required feature.
 *
 * @author ryanhenderson
 *
 */
class TableAccess implements DbAccessControl{

  private $name;

  private $permittedLevels;
  private $nonPermittedLevels;


  /**
   * @param String $name the name of the Database Table
   */
  function __construct($name) {
    $this->name = $name;

    $this->permittedLevels = array();
    $this->nonPermittedLevels = array();
  }


  /**
   *
   * Enter description here ...
   * @param unknown_type $level
   */
  function addPermittedLevel(Level $level) {
    $this->permittedLevels[] = $level;
  }


  /**
   *
   * Enter description here ...
   * @param Level $level
   */
  function addNonPermittedLevel(Level $level) {
    $this->nonPermittedLevels[] = $level;
  }


  
  protected function hasTableAccess($user) {
    
    if(count($this->nonPermittedLevels) > 0) {
      foreach ($this->nonPermittedLevels as $level) {
        // check the users level is not in the nonPermittedLevels
        if($level->isUserLevel($user)) {
          return false;
        }
      }
      return true;
    }
    
    if(count($this->permittedLevels) > 0) {
      foreach ($this->permittedLevels as $level) {
      // check the users level is in the permitted levels.
        if ($level->isUserLevel($user)) {
          return true;
        }
        return false;
      }
    }
    
    // no access restrictions defined.
    return true;
  }


  function hasCreateAccessOnTable($table) {
    return $this->hasTableAccess($table);
  }


  function hasWriteAccessOnTable($table) {
    return $this->hasTableAccess($table);
  }


  function hasReadAccessOnTable($table) {
    return $this->hasTableAccess($table);
  }



  function hasCreateAccessOnColumn($col) {
    return true;
  }

  function hasWriteAccessOnColumn($col) {
    return true;
  }

  function hasReadAccessOnColumn($col) {
    return true;
  }


}
?>