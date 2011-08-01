gb.coffee.transact.AddCoffeeTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  coffeeSizeId: null,
  milkId: null,
  strength: null,
  sugar: null,
  extras: null,
  qty: null,
  
  _run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: gb.order.controller.States.ADD_COFFEE,
        size: this.coffeeSizeId,
        milk: this.milkId,
        strength: this.strength,
        sugar: this.sugar,
        extras: this.extras,
        qty: this.qty
      },
      method : 'POST',
      success : this.success,
      failure : this.failure,
      scope: this
    });
  },

  _success: function(result, request, jsonresult) {
    this.callback.call(jsonresult);
  },
  
  _failure: function() {
    Ext.Msg.alert('Error', 'An error occured.', Ext.emptyFn);
  }

});