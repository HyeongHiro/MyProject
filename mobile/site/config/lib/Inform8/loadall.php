<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */


    /** Convenience file to load/register all libraries */

  	require_once 'class/ClassRegistry.php';
  	
    require_once 'auth/Inform8Authenticate.php';
    require_once 'auth/Inform8UserAuthenticate.php';
    require_once 'auth/LoginProcessor.php';
        
    require_once 'context/WebContext.php';
    
    require_once 'controller/Controller.php';
    require_once 'controller/SimpleFileController.php';
    
    Inform8Context::getClassRegistry()->registerClass('WebDate', 'config/lib/Inform8/date/WebDateClass.php');
    require_once 'form/FormClass.php';
    
    Inform8Context::getClassRegistry()->registerClass('Html', 'config/lib/Inform8/html/Html.php');
    
    require_once 'language/LanguageStore.php';
    
    require_once 'longpoll/LongPoller.php';
    
    require_once 'logging/BasicLoggerClass.php';
    
    require_once 'mail/class.phpmailer.php';
    require_once 'mail/class.smtp.php';
    Inform8Context::getClassRegistry()->registerClass('MailSettings', 'config/lib/Inform8/mail/MailSettings.php');
    Inform8Context::getClassRegistry()->registerClass('DbMailSettings', 'config/lib/Inform8/mail/DbMailSettings.php');
    Inform8Context::getClassRegistry()->registerClass('StaticMailSettings', 'config/lib/Inform8/mail/StaticMailSettings.php');
    Inform8Context::getClassRegistry()->registerClass('SimpleMailer', 'config/lib/Inform8/mail/SimpleMailerClass.php');
    Inform8Context::getClassRegistry()->registerClass('FromName', 'config/lib/Inform8/mail/TemplateMailer.php');
    Inform8Context::getClassRegistry()->registerClass('TemplateMailer', 'config/lib/Inform8/mail/TemplateMailer.php');
    Inform8Context::getClassRegistry()->registerClass('DbTemplate', 'config/lib/Inform8/mail/templates/DbTemplateMailer.php');
    Inform8Context::getClassRegistry()->registerClass('EmailTemplate', 'config/lib/Inform8/mail/templates/Template.php');
    Inform8Context::getClassRegistry()->registerClass('FileTemplate', 'config/lib/Inform8/mail/templates/Template.php');
    
    require_once 'recaptcha/recaptchalib.php';
    
    Inform8Context::getClassRegistry()->registerClass('Level', 'config/lib/Inform8/security/Level.php');
    Inform8Context::getClassRegistry()->registerClass('DbAccessControl', 'config/lib/Inform8/security/DbAccessControl.php');
    Inform8Context::getClassRegistry()->registerClass('TableAccess', 'config/lib/Inform8/security/TableAccess.php');
    Inform8Context::getClassRegistry()->registerClass('PageAccess', 'config/lib/Inform8/security/PageAccess.php');
    
    require_once 'session/SessionClass.php';
    
    Inform8Context::getClassRegistry()->registerClass('SimpleTemplate', 'config/lib/Inform8/template/SimpleTemplate.php');
    Inform8Context::getClassRegistry()->registerClass('Random', 'config/lib/Inform8/util/Random.php');
    
    require_once 'web/RequestClass.php';
    require_once 'web/RequestPreProcessor.php';
    require_once 'web/ResponseClass.php';
    require_once 'web/BlackListCheckerClass.php';
    
    require_once 'loadgen.php';
    require_once 'loadcommon.php';
    
?>