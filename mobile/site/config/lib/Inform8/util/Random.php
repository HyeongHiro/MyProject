<?php
/**
 * Copyright 2011 - Inform8
 * http://www.inform8.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * http://www.apache.org/licenses/LICENSE-2.0
 */


class Random {

  public static function generateConfirmationCode($seed) {

    $daMd5 = md5($seed);
    $idx = (((int)$daMd5) + time()) % 100;

    $randomBits = "as513xald1hoiqweafhwefqrlew223blkcal4dhbkjwhfrhwevi4uvhwefqrlewfwemnfrwoi55blkcakb5xaldhoivfrdmfnlkkhfwehjvfewhcgfdsfdsdsflvuierwnvjvgglwok" .
    "qsxaldhoiqweafhwefqrlewfwemnfrwoi55blkcakbsslfbdfodfuebfwlkkuutdnlsasjowe" .
    "mdfsdofqpwe5xaldhoivi4uqweafhwefqrlewd6svi4ul4df7i9u43wyerlewl4dblkcablkcamnvi4url4dblkcakboc3vi4uvsdbbvblkcassddxvgoyuerdsfveljvdewrlhjkadpmuh";
     
    return substr($randomBits, $idx, 50);
  }

}
?>