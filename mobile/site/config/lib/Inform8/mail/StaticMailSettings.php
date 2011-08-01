<?php 

class StaticMailSettings implements MailSettings{
  
  /**
   * Use the built-in php mail function.
   * @return boolean should use the php mail function to send the email.
   */
  public function useMail() {
    return true;
  }
  
  /**
   * Send all mails through a configured SMTP server.
   * Ensure you configure the smtp details below.
   * @return boolean should use SMTP to send the email.
   */
  public function useSMTP() {
    return false;
  }
  
  
  /**
   * The sender email address for the email
   * @return string the from email address.
   */
  public function getFromEmail() {
    return 'from@yourdomain.com';
  }  
  

  /**
   * The name of the email sender.  
   * @return String the from name for the email.
   */
  public function getFromName() {
    return 'From Name';
  }  
  
  
  /**
   * The host name of the SMTP server
   * @return string the hostname of the server
   */
  public function getSmtpServer() {
    return 'localhost';
  }

  /**
   * The username for the smtp server. Usually the email name or whole email address.
   * @return string the smtp server username to send the email through
   */
  public function getSmtpUsername() {
    return 'emailusername';
  }

  /**
   * Must we authenticate against the SMTP server ?
   * @return boolean true if authentication is required.
   */
  public function isSmtpAuthReqd() {
    return false;
  }
  
  /**
   * The SMTP users Password
   * @return string the password
   */
  public function getSmtpPassword() {
    return '';
  }

  /**
   * The SMTP port.
   * @return int Connection port of the SMTP server.
   */
  public function getSmtpPort() {
    return '25';
  } 
 
}

?>