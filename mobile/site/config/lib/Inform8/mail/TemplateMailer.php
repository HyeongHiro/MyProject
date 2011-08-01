<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */


class FromName {

  private $from;
  private $fromName;

  function __construct($from, $fromName) {
    $this->from = $from;
    $this->fromName = $fromName;
  }

}

/**
 * Mailer to send out emails created by merging objects with a template and by adding attachments. 
 *  
 * @author ryanhenderson
 *
 */
class TemplateMailer {

  /**
   * The list of To addresses.
   * @var array(String) email address to send to
   */
  private $to = array();

  private $theObject; // the primary object for the template
  
  private $mapObjects = array(); // accessory Objects, variables etc

  /**
   * @var Template the template loader.
   */
  private $template;

  /**
   * Settings for sending the email
   * @var MailSettings
   */
  private $settings;

  
  function __construct() {
    $this->settings = StaticConfig::getEmailSettings(); 
  }

  /**
   * 
   * Add an object that is visible during the template merge.
   * @param String $key
   * @param mixed $object
   */
  function addObject($key, $object) {
    $this->mapObjects[$key] = $object;
  }

  /**
   * Add the email address to the senders list. Each email address is sent to individually. 
   * @param String $to
   */
  function addTo($to) {
    $this->to[] = $to;
  }

  function setTemplate(EmailTemplate $template) {
    $this->template = $template;
  }

  function send() {
    $templateRes = $this->parseTemplate();

    $storageSettingsDao = new JackStorageDao();
    $allSettings = $storageSettingsDao->getAll();
    $storageSettings = $allSettings[0];

    $storageFolder = $storageSettings->getStorageFolder();

    $errors = array();

    foreach ($this->to as $sendTo) {
      $mail = new PHPMailer(); // defaults to using php "mail()"
      $mail->From = $this->getSettings()->getFromEmail();
      $mail->FromName = $this->getSettings()->getFromName();

      $mail->Subject = $templateRes['subject'];
      $mail->AddAddress($sendTo);
      $mail->MsgHTML($templateRes['html']);
      $mail->AltBody = $templateRes['text'];
      
      if ($this->getSettings()->useSMTP()) {
        $mail->IsSMTP(); // telling the class to use SMTP
        $mail->SMTPDebug  = 0;                     // enables SMTP debug information (for testing)
        $mail->Host       = $this->getSettings()->getSmtpServer();
        $mail->Port       = $this->getSettings()->getSmtpPort();  

        if ($this->getSettings()->isSmtpAuthReqd()) {
          $mail->SMTPAuth   = true;                  // enable SMTP authentication
          $mail->Username   = $this->getSettings()->getSmtpUsername(); // SMTP account username
          $mail->Password   = $this->getSettings()->getSmtpPassword();        // SMTP account password
        }
      }else {
        $mail->IsMail();
      }
      
      $templateFiles = $this->template->getEmbeddableFiles();
      if (isset($templateFiles) && is_array($templateFiles)) {
        foreach ($templateFiles as $afile) {
          $mail->AddEmbeddedImage(StaticConfig::getStorageLocation() . '/' .  $afile->getFileName(), $afile->getName());
        }
      }
      
      $attachFiles = $this->template->getAttachmentFiles();
      if (isset($attachFiles) && is_array($attachFiles)) {
        foreach ($attachFiles as $afile) {
          $mail->AddAttachment(StaticConfig::getStorageLocation() . '/' .  $afile->getFileName(), $afile->getName());
        }
      }

      if (!$mail->Send()) {
        $errors[] = 'Failed to send email to: ' . $sendTo;
      }
      Inform8Context::getLogger()->log(BaseLogger::$DEBUG, 'Sent email to: ' . $sendTo);
      set_time_limit(30);
    }
    return $errors;
  }


  private function parseTemplate() {
    $v = array();
    $v = array_merge($v, $this->mapObjects);

    $tempVars = $this->template->getVariables();
    foreach ($tempVars as $tv) {
      $v[$tv->getName()] = $tv->getValue();
    }

    $v['emailSettings'] = $this->getSettings();

    ob_start();
    // using the termination so it's treated it like an include file....
    // see the eval for more docs...
    eval('?>' . $template->getHtmlTemplate());
    $htmlContents = ob_get_contents();
    ob_end_clean();

    ob_start();
    // using the termination so it's treated it like an include file....
    // see the eval for more docs...
    eval('?>' . $template->getTextTemplate());
    $textContents = ob_get_contents();
    ob_end_clean();

    ob_start();
    // using the termination so it's treated it like an include file....
    // see the eval for more docs...
    eval('?>' . $template->getSubjectTemplate());
    $subjectContents = ob_get_contents();
    ob_end_clean();

    return array('text'=>$textContents, 'html'=>$htmlContents, 'subject'=>$subjectContents);
  }
  

  /**
   * @return MailSettings the settings
   */
  public function getSettings() {
    return $this->settings;
  }

  /**
   * Set the new email settings
   * @param MailSettings the email settings
   */
  public function setSettings(MailSettings $settings) {
    $this->settings = $settings;
  }
  
}
?>