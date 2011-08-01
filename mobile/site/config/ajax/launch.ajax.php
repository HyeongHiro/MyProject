<?php 
  $trn = new LaunchTransaction();
  $res = $trn->run();
  
  //encode res
  $encoder = new LaunchResultJsonEncoder();
  $json = $encoder->toJson($res);
  
  
  echo json_encode($json);
?>