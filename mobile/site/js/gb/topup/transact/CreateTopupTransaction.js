gb.topup.transact.CreateTopupTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
    amt: null,
    loyalty: null,
    
    _run: function() {
      Ext.Ajax.request({
        url : 'ajax.php',
        params : {
          call : 'order',
          st: gb.order.controller.States.PROCESS_ORDER_VIA_CAFE_TOPUP,
          amount: this.amt,
          loyalty: this.loyalty
        },
        method : 'POST',
        success : this.success,
        failure : this.failure,
        scope: this
      });
    },

    _success: function(result, request, jsonresult) {
      gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state);
    }
    
});