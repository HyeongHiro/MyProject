<?php
  try {
    require_once 'config/settings.php';

    $controller = WebContext::getController(BaseController::getPage());
    $controller->run();
     
  }catch(Exception $e) {
     mail(StaticConfig::getAdministratorEmail(), "$site_name - Site error", $e);
     header('Location: /error');
     die();
  }
?>