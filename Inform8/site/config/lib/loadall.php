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
  	
    require_once 'auth/UserAuthenticate.php';
    require_once 'auth/Inform8UserAuthenticate.php';
    require_once 'auth/LoginProcessor.php';
    
    Inform8Context::getClassRegistry()->registerClass('WebDate', 'config/lib/date/WebDateClass.php');
    require_once 'form/FormClass.php';
    require_once 'logging/BasicLoggerClass.php';
    
    require_once 'mail/class.phpmailer.php';
    require_once 'mail/class.smtp.php';
    Inform8Context::getClassRegistry()->registerClass('SimpleMailer', 'config/lib/mail/SimpleMailerClass.php');
    Inform8Context::getClassRegistry()->registerClass('FromName', 'config/lib/mail/TemplateMailer.php');
    Inform8Context::getClassRegistry()->registerClass('TemplateMailer', 'config/lib/mail/TemplateMailer.php');
    
    require_once 'page/FilePageLoaderClass.php';
    
    require_once 'recaptcha/recaptchalib.php';
    require_once 'session/SessionClass.php';
    
    Inform8Context::getClassRegistry()->registerClass('SimpleTemplate', 'config/lib/template/SimpleTemplate.php');
    Inform8Context::getClassRegistry()->registerClass('Random', 'config/lib/util/Random.php');
    
    require_once 'web/RequestClass.php';
    require_once 'web/ResponseClass.php';
    require_once 'web/BlackListCheckerClass.php';
    
    require_once 'Inform8/loadall.php';
?>