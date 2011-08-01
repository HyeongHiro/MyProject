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

class TemplateMailer {

  private $to = array();

  private $theObject; // the primary object for the template
  private $mapObjects = array(); // accessory Objects, variables etc

  private $templateId;

  function __construct($theObject, $to) {
    $this->theObject = $theObject;
    $this->to[] = $to;
  }

  function addMapObjects($mapObjects) {
    $this->mapObjects = array_merge($mapObjects, $this->mapObjects);
  }

  function addTo($to) {
    $this->to[] = $to;
  }

  function setTemplateId($id) {
    $this->templateId = $id;
  }

  function setObject($object) {
    $this->theObject = $object;
  }


  function send() {
    $templateRes = $this->parseDbTemplate($this->templateId);

    $templates = IQL::select(EmailTemplateIQL::$_TABLE)->where(null, EmailTemplateIQL::$TEMPLATEID, '=', $this->templateId)->get();
    $template = $templates[0];

    // get template files to add to the email
    $templateFiles = IQL::select(TemplateFileIQL::$_TABLE)
    ->where(null, TemplateFileIQL::$TEMPLATEID, '=', $template->getPk())->get();

    $setting = $this->getEmailSettings();

    $storageSettingsDao = new JackStorageDao();
    $allSettings = $storageSettingsDao->getAll();
    $storageSettings = $allSettings[0];

    $storageFolder = $storageSettings->getStorageFolder();

    $errors = array();

    foreach ($this->to as $sendTo) {
      $mail = new PHPMailer(); // defaults to using php "mail()"
      $mail->From = $setting->getEmail();
      $mail->FromName = $setting->getFromName();

      $mail->Subject = $templateRes['subject'];
      $mail->AddAddress($sendTo);
      $mail->MsgHTML($templateRes['html']);
      $mail->AltBody = $templateRes['text'];

      $mail->IsSMTP(); // telling the class to use SMTP

      $mail->SMTPDebug  = 0;                     // enables SMTP debug information (for testing)
      $mail->SMTPAuth   = true;                  // enable SMTP authentication
      $mail->Host       = StaticConfig::getEmailSmtpServer(); // SMTP server
      $mail->Port       = StaticConfig::getEmailSmtpPort();  
      $mail->Username   = StaticConfig::getEmailSmtpUsername(); // SMTP account username
      $mail->Password   = StaticConfig::getEmailSmtpPassword();        // SMTP account password

      if (isset($templateFiles) && is_array($templateFiles)) {
        foreach ($templateFiles as $afile) {
          $mail->AddEmbeddedImage(StaticConfig::getStorageLocation() . '/' .  $afile->getFileName(), $afile->getName());
        }
      }

      if (!$mail->Send()) {
        $errors[] = 'Failed to send email to: ' . $sendTo;
      }
      logToFile('Sent email to: ' . $sendTo);
      set_time_limit(30);
    }
    return $errors;
  }


  private function parseDbTemplate($id) {
    // check template exists
    $templates = IQL::select(EmailTemplateIQL::$_TABLE)
    ->where(null, EmailTemplateIQL::$TEMPLATEID, '=', $id)
    ->get();
    $template = $templates[0];

    $map = array();
    $map = array_merge($map, $this->mapObjects);

    // load generic variables
    $genericVars = IQL::select(VariableIQL::$_TABLE)->where(null, VariableIQL::$ENABLED, '=', 1)->get();
    if (is_array($genericVars)) {
      foreach ($genericVars as $v) {
        $map[$v->getName()] = $v->getValue();
      }
    }

    // load template specific variables - may overwrite generic.
    $templateVars = IQL::select(VariableIQL::$_TABLE)->where(null, VariableIQL::$ENABLED, '=', 1)->_and(null, VariableIQL::$TEMPLATEID, '=', $template->getPk());
    foreach ($templateVars as $tv) {
      $map[$tv->getName()] = $tv->getValue();
    }

    $tvars['siteConfig'] = $this->getSiteConfig();
    $tvars['emailSettings'] = $this->getEmailSettings();
    $tvars['obj'] = $this->theObject;
    $tvars['map'] = $map;

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

  private function getEmailSettings() {
    $dao = new EmailSettingsDao();
    $allSettings = $dao->getAll();
    $setting = $allSettings[0];
    return $setting;
  }

  private function getSiteConfig() {
    $dao = new SiteConfigurationDao();
    $configs = $dao->getAll();
    $config = $configs[0];
    return $config;
  }

}
?>