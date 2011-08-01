gb.confirmorder.transact.SetConfirmOrderTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  _run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: gb.order.controller.States.CONFIRM_ORDER
      },
      method : 'POST',
      success : this.success,
      failure : this.failure,
      scope: this
    });
  },
  
  _success: function(result, request, jsonresult) {
    if('user' in jsonresult) {
      gb.context.CONTEXT.getUser().update(jsonresult.user);
    };
    gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state);
  }
  
}); 