<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */

class SimpleTemplate {

  /**
   * The map contains the variables that are accessible in the 'template' file.
   */
  function parseTemplate($map, $templateFile) {
    include 'config/includes/mail/settings.php';
    $map['_settings'] = $emailSettings;

    ob_start();
    include $templateFile;
    $contents = ob_get_contents();
    ob_end_clean();
    return $contents;
  }


  /**
   * The map contains the variables that are accessible in the 'template' file.
   */
  function parseFile($file) {
    ob_start();
    include $file;
    $contents = ob_get_contents();
    ob_end_clean();
    return $contents;
  }


}
?>