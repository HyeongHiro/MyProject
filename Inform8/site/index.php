<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */

  try {
    require_once 'config/settings.php';

    //loads the page using file based resources.
    $pageLoader = new FilePageLoader();
    $pageLoader->load();
    
    // displays the resultant page using the desired page template (templates/default.php if not set)
    include 'config/templates/' . Response::getInstance()->getPageTemplate();
    
  }catch(Exception $e) {
     mail(StaticConfig::getAdministratorEmail(), "$site_name - Site error", $e);
     header('Location: /error');
     die();
  }
?>