<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */


class BasicLogger {

  public static function logToFile($msg) {
    $fileName = "logs/log" . date("Ymd") . ".log";

    // open file
    $fd = fopen($fileName, "a");

    // append date/time to message
    $str = "\n[" . date("Ymd h:i:s") . "] " . $msg;

    // write string
    fwrite($fd, $str . "\n");

    // close file
    fclose($fd);
  }

}

?>