<?php 

class DbMailSettings implements MailSettings{
  
  /**
   * thes settings retrieved form the db 
   * @var EmailSettings
   */
  private $settings;
  
  /**
   * 
   * 
   * @param string $name the name of the settings to load.
   */
  function __construct($name) {
    $this->settings = EmailSettingsIQL::select()->where(NULL, EmailSettingsIQL::$SETTINGSNAME, '=', '$name')->getFirst();
  }
  
  
  /**
   * Use the built-in php mail function.
   * @return boolean should use the php mail function to send the email.
   */
  public function useMail() {
    return $this->settings->getSendType() == 'PHP Mail';
  }
  
  /**
   * Send all mails through a configured SMTP server.
   * Ensure you configure the smtp details below.
   * @return boolean should use SMTP to send the email.
   */
  public function useSMTP() {
    return $this->settings->getSendType() == 'SMTP';
  }
  
  
  /**
   * The sender email address for the email
   * @return string the from email address.
   */
  public function getFromEmail() {
    return $this->settings->getFrom();
  }
  
  
  /**
   * The name of the email sender.  
   * @return String the from name for the email.
   */
  public function getFromName() {
    return $this->settings->getFromName();
  }
  
  
  /**
   * The host name of the SMTP server
   * @return string the hostname of the server
   */
  public function getSmtpServer() {
    return $this->settings->getSmtpServer();
  }

  /**
   * The username for the smtp server. Usually the email name or whole email address.
   * @return string the smtp server username to send the email through
   */
  public function getSmtpUsername() {
    return $this->settings->getSmtpUsername();
  }

  /**
   * Must we authenticate against the SMTP server ?
   * @return boolean true if authentication is required.
   */
  public function isSmtpAuthReqd() {
     return $this->settings->getSmtpAuthReqd();
  }
  
  /**
   * The SMTP users Password
   * @return string the password
   */
  public function getSmtpPassword() {
    return $this->settings->getSmtpPassword();
  }

  /**
   * The SMTP port.
   * @return int Connection port of the SMTP server.
   */
  public function getSmtpPort() {
    return $this->settings->getSmtpPort();
  } 
 
}

?>