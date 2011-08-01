Ext.regController("GB_CNTR_SELECT_FOOD", {
  
  /** select from available food */
  select: function() {
    if(gb.food.model.FoodStore.getCount() <= 0 ) {
      this.loadFoodState();
    }else {
      this.openNow();  
    }
  },
  
  openNow: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_FOOD_SCREEN', id: 'SELECT_FOOD'}, Ext.getBody());
  },  
  
  loadFoodState: function() {
    var trn = new gb.food.transact.SelectFoodTransaction();
    trn.run();
  },
  
  addFood: function(options) {
    // if some to order --> send
    if(options.orderItems.length > 0) {
    
      var cb = function() {
        var popup = Ext.create({xtype: 'GB_FOOD_POPUP_PANEL'});
        popup.show('pop');        
      };      
      
      var trn = new gb.food.transact.AddFoodTransaction({items: options.orderItems, callback: cb});
      trn.run();
    }else {
      Ext.Msg.alert('Error', 'No food is selected', Ext.emptyFn);
    }    
    
  }
});