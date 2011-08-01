<?php

/**
 * Retrieves a template from the database. The EmailTemplate table
 *
 * @author ryanhenderson
 *
 */
class DbTemplate implements EmailTemplate{

  protected $templateId;
  protected $template;

  protected $variables;

  protected $templateFiles;
  protected $templateAttachmentFiles;

  /**
   * The database id for the template.
   * @param integer the id of the template in the EmailTemplateFolder.
   */
  function __construct($templateId) {
    $this->templateId = $templateId;
  }


  protected function loadTemplate() {
    if(!isset($this->template) || $this->template == NULL) {
      $dao = new EmailTemplateDao();
      $this->template = $dao->get($this->templateId);
    }
    return $this->template;
  }


  public function getSubjectTemplate() {
    $this->template->getSubjectTemplate();
  }

  public function getTextTemplate() {
    $this->template->getTextTemplate();
  }

  public function getHtmlTemplate() {
    $this->template->getHtmlTemplate();
  }


  /**
   * @return array key to value map of variables and their associated values.
   */
  public function getVariables() {
    if(!isset($this->variables) || $this->variables == NULL) {
      $this->variables = array();

      // load generic variables
      $genericVars = IQL::select(VariableIQL::$_TABLE)->where(null, VariableIQL::$ENABLED, '=', 1)->get();
      if (is_array($genericVars)) {
        foreach ($genericVars as $gv) {
          $this->variables[$gv->getName()] = $gv->getValue();
        }
      }

      // load template specific variables - may overwrite generic.
      $templateVars = IQL::select(VariableIQL::$_TABLE)
        ->where(null, VariableIQL::$ENABLED, '=', 1)
        ->_and(null, VariableIQL::$TEMPLATEID, '=', $this->templateId);
      foreach ($templateVars as $tv) {
        $this->variables[$tv->getName()] = $tv->getValue();
      }

    }

    return $this->variables;
  }


  /**
   * Get the list of files to embedd along with this template.
   * For example logos and css.
   * This method returns the key and the feilname as a string.
   * The KEY is the CID refrence. The filename must be loaded into the email as per emailer requirements.
   *
   * @return array with file name KEY mapping to a TemplateFile object.
   */
  public function getEmbeddableFiles() {
    if(!isset($this->templateFiles) || $this->templateFiles == NULL) {
      $this->templateFiles = IQL::select(TemplateFileIQL::$_TABLE)
        ->where(null, TemplateFileIQL::$TEMPLATEID, '=', $this->templateId)->get();
    }
    return $this->templateFiles;
  }

  
  /**
   * Get the list of files to attach to the email along with this template.
   * For example PDF files.
   *
   * @return array with file name KEY mapping to a TemplateFileAttachment object.
   */
  public function getAttachmentFiles() {
    if(!isset($this->templateAttachmentFiles) || $this->templateAttachmentFiles == NULL) {
      $this->$templateAttachmentFiles = IQL::select(TemplateFileAttachmentIQL::$_TABLE)
        ->where(null, TemplateFileAttachmentIQL::$TEMPLATEID, '=', $this->templateId)->get();
    }
    return $this->templateAttachmentFiles;
  }

}


?>