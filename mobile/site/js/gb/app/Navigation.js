gb.app.AppNavigation = Ext.extend(Ext.util.Observable, {
  stateMap: null,
  /*
   * Sometimes you may get back an order state that you're not expecting.
   * This method will navigate to the correct screen.
   */
  navigateToOrderScreen: function(orderState) {
    if(this.stateMap == null) {
      this.loadMap();
    }
    if(orderState in this.stateMap) {
//      console.log(this.stateMap[orderState]);
      Ext.dispatch(this.stateMap[orderState]);
    }else {
      //console.log(orderState);
      Ext.Msg.alert('Error', 'Your request could not be processed. (500)', Ext.emptyFn);
    }
  },
  
  loadMap: function() {
    this.stateMap = new Array();
    
    this.stateMap[gb.order.controller.States.SELECT_CAFE] = {controller: 'GB_CNTR_CAFE', action:'launch'};
    this.stateMap[gb.order.controller.States.SET_CAFE] = this.stateMap[gb.order.controller.States.SELECT_CAFE];
    
    this.stateMap[gb.order.controller.States.SELECT_COFFEE] = {controller: 'GB_CNTR_SELECT_COFFEE', action:'select'};
    this.stateMap[gb.order.controller.States.ADD_COFFEE] = this.stateMap[gb.order.controller.States.SELECT_COFFEE];
    this.stateMap[gb.order.controller.States.SELECT_COFFEE_REMOVE_FOOD] = this.stateMap[gb.order.controller.States.SELECT_COFFEE];
    this.stateMap[gb.order.controller.States.SELECT_COFFEE_REMOVE_COFFEE] = this.stateMap[gb.order.controller.States.SELECT_COFFEE];
    
    this.stateMap[gb.order.controller.States.SELECT_COFFEE_WITH_LAST_ORDER] = {controller: 'GB_CNTR_LAST5', action:'launch'};
    
    
    this.stateMap[gb.order.controller.States.SELECT_FOOD] = {controller: 'GB_CNTR_SELECT_FOOD', action:'select'};
    this.stateMap[gb.order.controller.States.ADD_FOOD] = this.stateMap[gb.order.controller.States.SELECT_FOOD];
    this.stateMap[gb.order.controller.States.SELECT_FOOD_REMOVE_FOOD] = this.stateMap[gb.order.controller.States.SELECT_FOOD];
    this.stateMap[gb.order.controller.States.SELECT_FOOD_REMOVE_COFFEE] = this.stateMap[gb.order.controller.States.SELECT_FOOD];
    
    this.stateMap[gb.order.controller.States.ORDER_LOGIN] = {controller: 'GB_CNTR_AUTH', action:'openLogin'};
    this.stateMap[gb.order.controller.States.PROCESS_SIGNUP] = this.stateMap[gb.order.controller.States.ORDER_LOGIN];
    
//    ORDER_FORGOTPW: 32,
//    ORDER_FORGOTPW_PROCESS: 33,

    this.stateMap[gb.order.controller.States.ORDER_SIGNUP] = {controller: 'GB_CNTR_AUTH', action:'openSignup'};
    this.stateMap[gb.order.controller.States.PROCESS_SIGNUP] = this.stateMap[gb.order.controller.States.ORDER_SIGNUP];
    
    this.stateMap[gb.order.controller.States.ORDER_TOP_UP] = {controller: 'GB_CNTR_TOPUP', action:'openTopup'};
    this.stateMap[gb.order.controller.States.ORDER_PROCESS_TOP_UP] = this.stateMap[gb.order.controller.States.ORDER_TOP_UP];
    this.stateMap[gb.order.controller.States.PAYPAL_ERROR] = {controller: 'GB_CNTR_TOPUP', action:'paypalError'};
    
    this.stateMap[gb.order.controller.States.LOAD_ORDER] = this.stateMap[gb.order.controller.States.SELECT_COFFEE_WITH_LAST_ORDER];
    
    this.stateMap[gb.order.controller.States.CONFIRM_ORDER] = {controller: 'GB_CNTR_CONFIRM_ORDER', action:'open'};
    this.stateMap[gb.order.controller.States.CONFIRM_APPLY_PROMO] = this.stateMap[gb.order.controller.States.CONFIRM_ORDER];
    this.stateMap[gb.order.controller.States.CONFIRM_REMOVE_COFFEE] = this.stateMap[gb.order.controller.States.CONFIRM_ORDER];
    this.stateMap[gb.order.controller.States.CONFIRM_REMOVE_FOOD] = this.stateMap[gb.order.controller.States.CONFIRM_ORDER];

    this.stateMap[gb.order.controller.States.PROCESS_ORDER_VIA_CAFE_TOPUP] = {controller: 'GB_CNTR_CONFIRMED_ORDER', action:'launchTopup'};
    this.stateMap[gb.order.controller.States.PROCESS_ORDER] = {controller: 'GB_CNTR_CONFIRMED_ORDER', action:'launch'};
    
  }
  
});