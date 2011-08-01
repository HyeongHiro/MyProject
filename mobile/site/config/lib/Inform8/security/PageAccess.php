<?php

/**
 * Used to place page access restrictions
 * @author ryanhenderson
 *
 */
class PageAccess {

  private $name;
  private $permittedLevels;
  private $nonPermittedLevels;


  /**
   * @param String $name the name of the page
   */
  function __construct($name) {
    $this->name = $name;
    $this->permittedLevels = array();
    $this->nonPermittedLevels = array();
  }

  function getName() {
    return $this->name;
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


  
  public function hasPageAccess($user) {
    
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

}

?>