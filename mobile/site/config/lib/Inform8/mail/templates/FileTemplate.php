<?php

/**
 * Retrieves a template from the file system.
 *
 * @author ryanhenderson
 *
 */
class FileTemplate implements EmailTemplate{

  protected $subjectTemplateFile;
  protected $textTemplateFile;
  protected $htmlTemplateFile;

  protected $variables;

  protected $templateFiles;
  protected $templateAttachmentFiles;

  /**
   * The database id for the template.
   * @param integer the id of the template in the EmailTemplateFolder.
   */
  function __construct($subjectFileName = NULL, $textFileName = NULL, $htmlFileName = NULL) {
    $this->subjectTemplateFile = $subjectFileName;
    $this->textTemplateFile = $textFileName;
    $this->htmlTemplateFile = $htmlFileName;
    
    $this->variables = array();
    $this->templateFiles = array();
    $this->templateAttachmentFiles = array();
  }


  function setSubjectTemplateFile($fileName) {
    $this->subjectTemplateFile = $fileName;
  }


  function setTextTemplateFile($fileName) {
    $this->textTemplateFile = $fileName;
  }


  function setHtmlTemplateFile($fileName) {
    $this->htmlTemplateFile = $fileName;
  }


  public function getSubjectTemplate() {
    file_get_contents($this->subjectTemplateFile);
  }

  public function getTextTemplate() {
    file_get_contents($this->textTemplateFile);
  }

  public function getHtmlTemplate() {
    file_get_contents($this->htmlTemplateFile);
  }


  public function addVariable($name, $value) {
    $this->variables[$name] = $value;
  }
  
  public function addEmbeddedFile($name, $fileName) {
    $this->templateFiles[$name] = $fileName;
  }
  
  public function addAttachment($name, $fileName) {
    $this->templateAttachmentFiles[$name] = $fileName;
  }  
  
  
  /**
   * @return array key to value map of variables and their associated values.
   */
  public function getVariables() {
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
    return $this->templateFiles;
  }


  /**
   * Get the list of files to attach to the email along with this template.
   * For example PDF files.
   *
   * @return array with file name KEY mapping to a TemplateFileAttachment object.
   */
  public function getAttachmentFiles() {
    return $this->templateAttachmentFiles;
  }

}


?>