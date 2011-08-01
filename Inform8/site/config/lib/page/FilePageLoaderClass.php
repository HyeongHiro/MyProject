<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */


class FilePageLoader {


  public function load() {
    $page = Request::getSafeGetOrPost("p");
    if ($page == NULL || !ctype_alnum($page)) {
      $page = StaticConfig::getDefaultPage();
    }

    $authManager = Session::getInstance()->getAuthenticationManager();

    $authPage = file_exists('config/authenticatedpages/' . $page . '.page.php');
    if ($authPage ) {
      if ($authManager->isAuthenticated()) {

        $formFile = file_exists('config/authenticatedpages/' . $page.'.form.php');
        if ($formFile) {
          include 'config/authenticatedpages/' . $page . '.form.php';
        }

        $processingFile = file_exists('config/authenticatedpages/' . $page.'.process.php');
        if($processingFile) {
          ob_start();
          include 'config/authenticatedpages/' . $page.'.process.php';
          $processingContent = ob_get_contents();
          ob_end_clean();
          Response::getInstance()->set('processingContent', $processingContent);
        }

        $thePage = 'config/authenticatedpages/' . $page . '.page.php';
        ob_start();
        include $thePage;
        $content = ob_get_contents();
        ob_end_clean();
        Response::getInstance()->set('content', $content);

      }else {
        header("Location: /login.htm?postcmd=" . $page);
        die();
      }
    }else {
      $thePage = 'config/pages/' . $page . '.page.php';

      $formFile = file_exists('config/pages/' . $page.'.form.php');
      if ($formFile) {
        include 'config/pages/' . $page . '.form.php';
      }

      $processingFile = file_exists('config/pages/' . $page.'.process.php');
      if($processingFile) {
        ob_start();
        include 'config/pages/' . $page.'.process.php';
        $processingContent = ob_get_contents();
        ob_end_clean();
        Response::getInstance()->set('processingContent', $processingContent);
      }

      ob_start();
      include $thePage;
      $content = ob_get_contents();
      ob_end_clean();
      Response::getInstance()->set('content', $content);
    }

  }

}
?>