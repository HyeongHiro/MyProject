<?php

/**
 *
 * @author ryanhenderson
 *
 */
class Level {

  private $name;
  private $subLevels;


  /**
   * The name of the level, this must match the database level name as defined in the UserLevel Table.
   * This is used to match a user to their particular level. This name si also used to look up associated permissions.
   *
   * @param String $name
   */
  function __construct($name) {
    $this->name = $name;
    $this->subLevels = array();
  }


  /**
   * Adds a sub level to this one. Giving this level permission to the $level (and its sub levels). passed in.
   * @param $level the sub level to add to this level.
   */
  function addSubLevel(Level $level) {
    $this->subLevels[] = $level;
  }


  /**
   * @param unknown_type $user the suer to check
   */
  public function isUserLevel($user) {
    $userLevel = $user->getUserLevel();
    if ($this->name == $userLevel) {
      return true;  
    }
    foreach($this->subLevels as $sublevel) {
      if ($sublevel->isUserLevel($user)) {
        return true;
      }
    }
  }
  
}

?>