<?php

interface DbAccessControl {


  function hasCreateAccessOnTable($table);

  function hasWriteAccessOnTable($table);

  function hasReadAccessOnTable($table);


  function hasCreateAccessOnColumn($col);

  function hasWriteAccessOnColumn($col);

  function hasReadAccessOnColumn($col);

}


?>