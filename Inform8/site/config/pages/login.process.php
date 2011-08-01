<?php 
  Session::setPostLoginCommand(Request::getSafeGetOrPost('postcmd'));
?>