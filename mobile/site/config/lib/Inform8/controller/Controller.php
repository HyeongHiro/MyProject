<?php 

/**
 * Controller to control the flow of a request.
 */
interface Controller {
  
  function redirect($location);
  
  function run();
  
  
  
}

/**
 * 
 * Base controller with redirect and page logic.
 * @author ryanhenderson
 *
 */
abstract class BaseController implements Controller {
   
  function run() {
    $toProcess = StaticConfig::getPreProcessors();
    foreach($toProcess as $p) {
        $p->process();
    }
    
    $this->runImpl();
  }
  
  abstract function runImpl();
  
  
  /**
   * Performs a http redirect.
   * @see Controller::redirect()
   */
  function redirect($location) {
    header( 'Location: ' . $location );
    die();
  }
  
  
  /**
   * Gets the requested page name  
   */
  public static function getPage() {
    $page = Request::getSafeGetOrPost("p");
    if ($page == NULL || !ctype_alnum($page)) {
      $page = StaticConfig::getDefaultPage();
    }
    return $page;
  }  
  
}
?>