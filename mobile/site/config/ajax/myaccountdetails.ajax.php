<?php
  $retriever = new MyAccountDetailRetrieve();
  $encoder = new MyAccountDetailResultJSONEncoder();
  echo json_encode($encoder->toJSON($retriever->get()));
?>