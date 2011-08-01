gb.cafe.transact.SetCafeTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
    
    id: null,
    
    _run: function() {
      Ext.Ajax.request({
        url : 'ajax.php',
        params : {
          call : 'order',
          st: gb.order.controller.States.SET_CAFE,
          id: this.id
        },
        method : 'POST',
        success : this.success,
        failure : this.failure,
        scope: this
      });
    },

    _success: function(result, request, jsonresult) {
      var result = Ext.decode(result.responseText);
      
      // process cafe coffee list
      gb.coffee.model.CoffeeStore.updateCoffee(jsonresult.coffees);
      gb.coffee.model.MilkStore.updateMilk(jsonresult.milks);
      
      Ext.dispatch({
        controller: 'GB_CNTR_SELECT_COFFEE',
        action    : 'select'
      });
    },

    _failure: function() {
      this.error('Error selecting cafe. Please check your phone signal and try again.')
    }
    
});