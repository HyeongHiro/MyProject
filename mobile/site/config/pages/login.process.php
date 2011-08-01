<?php
  Session::getInstance()->setPostLoginCommand(Request::getSafeGetOrPost('postcmd'));
?>