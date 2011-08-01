<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */


class ValidationRule {

  public function isValid($value) {
    return true;
  }

  public function getValidationClasses() {
    return array();
  }

}


class RequiredValidationRule {

  public function isValid($value) {
    return $value != NULL && $value != '';
  }

  public function getValidationClasses() {
    return array('required');
  }

  public function validate($value) {
    if ($this->isValid($value)) {
      return;
    }
    return "This field is required.";
  }

}

class EmailValidationRule {

  public function isValid($value) {
    return preg_match(
        "/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i",
    $value) == 1;
  }

  public function getValidationClasses() {
    return array('email');
  }

  public function validate() {
    if ($this->isValid($value)) {
      return;
    }
    return "Please enter a valid email address";
  }

}

class Field {

  protected $name;
  protected $type;

  protected $id;

  protected $classes = array();

  protected $validationRules = array();

  protected $originalValue;
  protected $originalValueSet;

  function __construct($name, $type) {
    $this->name = $name;
    $this->type = $type;
  }

  public function setId($id) {
    $this->id = $id;
    return $this;
  }

  public function addClass($class) {
    $this->classes[] = $class;
    return $this;
  }

  public function addValidationRule($rule) {
    $this->validationRules[] = $rule;
    return $this;
  }

  public function getValidationRuleClasses(){
    $classes = array();
    foreach($this->validationRules as $rule) {
      $classes = array_merge($classes, $rule->getValidationClasses());
    }
    return $classes;
  }

  public function getName() {
    return $this->name;
  }


  public function validate() {
    $value = getSafeGetOrPost($this->name);

    foreach($this->validationRules as $rule) {
      if (!$rule->isValid($value)) {
        return $rule->validate($value);
      }
    }
  }

  public function isValid() {
    return $this->validate() == NULL;
  }

  public function setPostValues() {
    $this->originalValue = getSafePost($this->name);
    $this->originalValueSet = true;
  }

}


class TextField extends Field{

  protected $maxlength;
  protected $minlength;
  protected $size;

  function __construct($name) {
    parent::__construct($name, "text");
  }

  public static function create($name) {
    return new TextField($name);
  }

  public function setSize($size) {
    $this->size = $size;
    return $this;
  }

  public function setMinLength($length) {
    $this->minlength = $length;
    return $this;
  }

  public function setMaxLength($maxlength) {
    $this->maxlength = $maxlength;
    return $this;
  }

  public function toHtml($value=NULL) {
    $html = '<input type="text" ';

    if ($this->id != NULL) {
      $html .= 'id="' . $this->id . '" ';
    }

    if ($this->name != NULL) {
      $html .= 'name="' . $this->name . '" ';
    }

    if ($this->size != NULL) {
      $html .= 'size="' . $this->size . '" ' ;
    }

    if ($this->maxlength != NULL) {
      $html .= 'maxlength="' . $this->maxlength . '" ' ;
    }

    if ($this->minlength != NULL) {
      $html .= 'minlength="' . $this->minlength . '" ' ;
    }

    if ($this->originalValueSet) {
      if ($this->originalValue != NULL) {
        $html .= 'value="' . $this->originalValue . '" ';
      }
    }else if ($value != NULL) {
      $html .= 'value="' . $value . '" ';
    }

    $html .= 'class="' . implode(' ', array_merge($this->classes, $this->getValidationRuleClasses())) . '" ';
    $html .= '  />';


    if ($this->originalValueSet && !$this->isValid($this->originalValue)) {
      $html .= ' <label ';
      $html .= 'for="' . $this->id . '" ';
      $html .= 'generated="true" class="error" style="display: inline;" >';
      $html .= $this->validate();
      $html .= '</label>';
    }

    return $html;
  }

}


class PasswordField extends Field{

  protected $maxlength;
  protected $minlength;
  protected $size;

  protected $equalTo;

  function __construct($name) {
    parent::__construct($name, "password");
  }

  public static function create($name) {
    return new PasswordField($name);
  }

  public function setSize($size) {
    $this->size = $size;
    return $this;
  }

  public function setMinLength($length) {
    $this->minlength = $length;
    return $this;
  }

  public function setMaxLength($maxlength) {
    $this->maxlength = $maxlength;
    return $this;
  }

  public function setPostValues() {
    $this->originalValueSet = true;
  }

  public function setEqualTo($equalTo) {
    $this->equalTo = $equalTo;
    return $this;
  }

  public function toHtml() {
    $html = '<input type="password" ';

    if ($this->id != NULL) {
      $html .= 'id="' . $this->id . '" ';
    }

    if ($this->name != NULL) {
      $html .= 'name="' . $this->name . '" ';
    }

    if ($this->size != NULL) {
      $html .= 'size="' . $this->size . '" ' ;
    }

    if ($this->maxlength != NULL) {
      $html .= 'maxlength="' . $this->maxlength . '" ' ;
    }

    if ($this->minlength != NULL) {
      $html .= 'minlength="' . $this->minlength . '" ' ;
    }

    if ($this->equalTo != NULL) {
      $html .= 'equalTo="' . $this->equalTo . '" ' ;
    }


    /*      if (\$this->originalValue != NULL) {
     \$html .= 'value="' . \$this->originalValue . '" ' ;
     }
     */
    $html .= 'class="' . implode(' ', array_merge($this->classes, $this->getValidationRuleClasses())) . '" ';
    $html .= '  />';


    if ($this->originalValueSet && !$this->isValid($this->originalValue)) {
      $html .= ' <label ';
      $html .= 'for="' . $this->id . '" ';
      $html .= 'generated="true" class="error" style="display: inline;" >';
      $html .= $this->validate();
      $html .= '</label>';
    }

    return $html;
  }

}



class Form {

  private $name;
  private $id;

  private $action;
  private $method;

  private $fields = array();

  private $feedback;


  function __construct($name) {
    $this->name = $name;
  }


  public function setId($id) {
    $this->id = $id;
    return $this;
  }

  public function getName() {
    return $this->name;
  }

  public function setFeedback($feedback) {
    $this->feedback = $feedback;
    return $this;
  }

  public function getFeedback() {
    return $this->feedback;
  }

  public function addField($field) {
    $this->fields[$field->getName()] = $field;
    return $this;
  }


  public function getField($name) {
    return $this->fields[$name];
  }


  public function isValid() {
    return count($this->validate()) == 0;
  }

  public function validate() {
    $validationErrors = array();
    foreach($this->fields as $field) {
      if (!$field->isValid()) {
        $validationErrors[] = $field->validate();
      }
    }
    return $validationErrors;
  }

  public function setPostValues() {
    foreach($this->fields as $field) {
      $field->setPostValues();
    }
  }

}


?>