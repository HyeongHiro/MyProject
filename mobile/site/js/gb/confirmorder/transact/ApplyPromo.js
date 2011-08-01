gb.confirmorder.transact.ApplyPromoTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  promoCode: null,
  
  _run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: gb.order.controller.States.CONFIRM_APPLY_PROMO,
        code: this.promoCode
      },
      method : 'POST',
      success : this.success,
      failure : this.failure,
      scope: this
    });
  },
  
  _success: function(result, request, jsonresult) {
    this.callback.call(this.callbackScope, jsonresult);
  }
  
}); 