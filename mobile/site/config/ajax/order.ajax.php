<?php
$lat = Request::getSafeGetOrPost("lat");
$long = Request::getSafeGetOrPost("long");

if(isset($lat) && isset($long) && $lat != null && $long != null) {
  Inform8Context::getLogger()->log(BaseLogger::$DEBUG, 'new geo:' . $lat);
  Inform8Context::getLogger()->log(BaseLogger::$DEBUG, 'new geo:' . $long);
  
  RbOrder::getActiveOrder()->setLatitude($lat);
  RbOrder::getActiveOrder()->setLongitude($long);
}

$stateMap = array();
$stateMap[OrderState::$STATE_CHOOSE_CAFE] = 'SelectCafePostProcessor'; // select cafe - state - POST EXECUTION PROCESSOR. Runs after the final state has been set.
$stateMap[OrderState::$STATE_SELECT_COFFEE_WITH_LAST_ORDER] = 'Last5PostProcessor';
$stateMap[OrderState::$STATE_SELECT_FOOD] = "SelectFoodPostProcessor";
$stateMap[OrderState::$STATE_SELECT_COFFEE] = "SelectCoffeePostProcessor";
$stateMap[OrderState::$STATE_PROCESS_ORDER] = "ConfirmOrderPostProcessor";
$stateMap[OrderState::$STATE_CONFIRM_ORDER] = "UserPostProcessor";
$stateMap[OrderState::$STATE_ORDER_TOP_UP] = "UserPostProcessor";
$stateMap[OrderState::$STATE_PROCESS_ORDER_VIA_CAFE_TOPUP] = "ConfirmOrderPostProcessor";

$st = Request::getSafeGetOrPost("st");
$action = Request::getSafeGetOrPost("act");
RbOrder::getActiveOrder()->setState($st);

$extras = array();
if($stateMap[RbOrder::getActiveOrder()->getState()->get()] != null) {

  // process special handler
  $objName = $stateMap[RbOrder::getActiveOrder()->getState()->get()];
  $handler = new $objName();
  $extras = $handler->process(RbOrder::getActiveOrder());
}

$builder = new OrderJsonBuilder();
$orderArray = $builder->toJson(RbOrder::getActiveOrder());
$extras['order'] = $orderArray;
$extras["errorCodes"] = Response::getInstance()->getErrorCodes();
$extras["feedbackCodes"] = Response::getInstance()->getFeedbackCodes();
echo json_encode($extras); 
?>