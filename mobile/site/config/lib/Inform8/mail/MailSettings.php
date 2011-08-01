<?php 

interface MailSettings {
  
  /**
   * Use the built-in php mail function.
   * @return boolean should use the php mail function to send the email.
   */
  function useMail();
  
  /**
   * Send all mails through a configured SMTP server.
   * Ensure you configure the smtp details below.
   * @return boolean should use SMTP to send the email.
   */
  function useSMTP();
  
  
  /**
   * The sender email address for the email
   * @return string the from email address.
   */
  public function getFromEmail();
  

  /**
   * The name of the email sender.  
   * @return String the from name for the email.
   */
  public function getFromName();
    
  
  /**
   * The host name of the SMTP server
   * @return string the hostname of the server
   */
  function getSmtpServer();

  /**
   * The username for the smtp server. Usually the email name or whole email address.
   * @return string the smtp server username to send the email through
   */
  function getSmtpUsername();

  /**
   * Must we authenticate against the SMTP server ?
   * @return boolean true if authentication is required.
   */
  function isSmtpAuthReqd();
  
  /**
   * The SMTP users Password
   * @return string the password
   */
  function getSmtpPassword();

  /**
   * The SMTP port.
   * @return int Connection port of the SMTP server.
   */
  function getSmtpPort();
  
}

?>