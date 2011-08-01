gb.food.transact.SelectFoodTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  orderIndex: null,
  
  _run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: gb.order.controller.States.SELECT_FOOD,
        idx: this.orderIndex
      },
      method : 'POST',
      success : this.success,
      failure : this.failure,
      scope: this
    });
  },
  
  _success: function(result, request, jsonresult) {
    
    if('foods' in jsonresult) {
      gb.food.model.FoodStore.updateFood(jsonresult.foods);  
    }else {
      gb.food.model.FoodStore.updateFood(new Array());
    }
    
    Ext.dispatch({
      controller: 'GB_CNTR_SELECT_FOOD',
      action    : 'openNow'
    });
  },
  
  _failure: function() {
  }

  
});