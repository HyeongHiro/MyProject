<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */

class WebDate {

  public static function newMysqlDate() {
    return date("Y-m-d");
  }

  public static function fromMysqlDate($date) {
    return strtotime($date);
  }

}
?>