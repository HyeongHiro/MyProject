<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */


class BlackListChecker {

  public function isOnBlackList() {
    return IQL::count(IpBlacklistIQL::$_TABLE)
    ->where(NULL, IpBlacklistIQL::$EXPIRES, '>', WebDate::newMysqlDate())
    ->_and(NULL, IpBlacklistIQL::$IP, '=', Request::getIpAddress())
    ->get();
  }

}
?>