gb.food.transact.AddFoodTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  items: null,
  
  _run: function() {
    // join the items together into two lists, ids and qty
    var ids = new Array();
    var qty = new Array();
    
    for ( var i = 0; i < this.items.length; i++) {
      ids.push(this.items[i].id);
      qty.push(this.items[i].qty);
    }
    
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: gb.order.controller.States.ADD_FOOD,
        ids: ids.join(','),
        qtys: qty.join(',')
      },
      method : 'POST',
      success: this.success,
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