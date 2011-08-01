gb.confirmorder.transact.ConfirmOrderTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  offset: null,
  slot: null,
  
  _run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: gb.order.controller.States.PROCESS_ORDER,
        delay: this.offset,
        slot: this.slot
      },
      method : 'POST',
      success : this.success,
      failure : this.failure,
      scope: this
    });
  },
  
  _success: function(result, request, jsonresult) {
    
    if('confirmedOrder' in jsonresult) {
      gb.context.CONTEXT.getUser().confirmedOrder = jsonresult.confirmedOrder;  
      if('loyaltyCard' in jsonresult) {
        gb.context.CONTEXT.getUser().confirmedOrder.loyaltyCard = jsonresult.loyaltyCard; 
      }
      gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state);
    }else if('errorCodes' in jsonresult && jsonresult.errorCodes.length > 0 &&
      jsonresult.errorCodes.indexOf(2000) >= 0) { // NEW TIME
      Ext.dispatch({controller: 'GB_CNTR_CONFIRM_ORDER', action: 'displayStacked'});
    } else {
      gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state);  
    }
    
  }
  
}); 