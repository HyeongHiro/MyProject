<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <script type="text/javascript" src="/js/jquery/jquery-1.4.2.min.js"></script>
  <script type="text/javascript" src="/js/jquery/jquery.validate.min.js"></script>
  <script type="text/javascript" src="/js/ajax.js"></script>
  
  <link rel="stylesheet" type="text/css" media="all" href="/css/reset.css" />
  <link rel="stylesheet" type="text/css" media="all" href="/css/960grid.css" />
  <link rel="stylesheet" type="text/css" media="all" href="/css/core.css" />
  
  <link rel="icon" type="image/png" href="/images/favicon.ico" />  
  
  <title><?php echo StaticConfig::getSiteName() . ' | ' . Response::getInstance()->getPageTitle(); ?></title>
</head>
<body>
  <div class="container_24">
  	
  	<div class="grid_8" id="header">
  		<img src="images/logo.png" alt="Inform8 Web"></img>
  	</div>
  	<div class="grid_8" id="header">
  	</div>
  	<div class="grid_8" id="header">
  		
  		<div style="direction: rtl;">
      	<br />
      <?php if (Session::getInstance()->getAuthenticationManager()->isAuthenticated()) { ?>
  			<a href="/logout">Logout</a>
  		<?php }else {?>
  			<a href="/login.htm">Login</a>
  		<?php }?>
  		</div>
  	</div>
  	<div class="clear"></div>
  	
    <div class="pageContent" id="content">
      <?php 
        if (isset($processingContent) && $processingContent != -1 && $processingContent != NULL && $processingContent != '') {
          echo $processingContent;
        }
        
        if (Response::getInstance()->get('content') == NULL) {
          include 'config/includes/pages/404.php';
        } else {
          //display the page content as extracted from the db
          echo Response::getInstance()->get('content');
        }  
      ?>
    </div>
  </div>
  <?php 
    if (StaticConfig::getGoogleAnalyticsCode() != NULL) {
        include 'config/includes/pages/ga.php';
    } 
  ?>
</body>
</html>