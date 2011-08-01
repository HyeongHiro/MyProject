gb.last5.transact.SelectOrderTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
    
    id: null,
    
    _run: function() {
      Ext.Ajax.request({
        url : 'ajax.php',
        params : {
          call : 'order',
          st: gb.order.controller.States.LOAD_ORDER,
          orderid: this.id
        },
        method : 'POST',
        success : this.success,
        failure : this.failure,
        scope: this
      });
    },

    _success: function(result, request) {
      gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state, null);
    },
    
    _failure: function() {
      this.error('Error selecting order. Please check your phone signal and try again.')
    }
    
});