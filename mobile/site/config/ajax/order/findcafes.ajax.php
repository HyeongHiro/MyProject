<?php 
  $finder = new CafeFinder();
  
  $builder = new FindCafeJsonBuilder($lat, $long);
  echo $builder->toJson($finder->findFromMobileRequest($lat, $long));
?>