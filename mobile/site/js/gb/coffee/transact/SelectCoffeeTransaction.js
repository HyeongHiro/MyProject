gb.coffee.transact.SelectCoffeeTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  orderIndex: null,
  
  _run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: gb.order.controller.States.SELECT_COFFEE,
        idx: this.orderIndex
      },
      method : 'POST',
      success : this.success,
      failure : this.failure,
      scope: this
    });
  },
  
  _success: function(result, request, jsonresult) {
    gb.coffee.model.CoffeeStore.updateCoffee(jsonresult.coffees);
    gb.coffee.model.MilkStore.updateMilk(jsonresult.milks);
    Ext.dispatch({
      controller: 'GB_CNTR_SELECT_COFFEE',
      action    : 'openNow'
    });
  },
  
  _failure: function() {
  }

  
});