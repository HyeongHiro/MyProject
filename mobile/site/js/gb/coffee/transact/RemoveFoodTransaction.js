gb.coffee.transact.RemoveFoodTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  orderIndex: null,
  
  _run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: 22,
        idx: this.orderIndex
      },
      method : 'POST',
      success : this.success,
      failure : this.failure,
      scope: this
    });
  },
  
  _success: function(result, request, jsonresult) {
    this.callback.call();
  }
  
});