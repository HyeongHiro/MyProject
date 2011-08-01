gb.food.view.FoodScreen = Ext.extend(gb.app.view.BaseScreen, {
  layout: {
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  initComponent : function() {
    
    var heading = {id: 'CHOOSE_FOOD_HEADING', html: 'Choose your food', cls: 'gbHeading', padding: 4};
    var foodList = Ext.create({xtype: 'GB_FOODDISPLAY', id: 'FOOD_DISPLAY'});
    var addOrderButton = Ext.create({xtype: 'button', ui: 'green', text: 'Add to order', handler: this.addToOrder, scope:this});
    var finishOrderButton = Ext.create({xtype: 'button', ui: 'green', text: 'Finish order', handler: this.finishOrder, scope:this});
    
    var addOrderbuttonPanel = new Ext.Panel({
      layout: 'hbox',
      padding: 10,
      items: [{xtype: 'spacer'}, addOrderButton, {xtype: 'spacer', width: 4}]
    });
    
    var finishOrderbuttonPanel = new Ext.Panel({
        layout: 'hbox',
        padding: 10,
        items: [{xtype: 'spacer'}, finishOrderButton, {xtype: 'spacer', width: 4}]
      });
    
    Ext.apply(this, {
      items : [{xtype: 'GB_TOPMENU', backDispatch:{controller: 'GB_CNTR_SELECT_COFFEE', action: 'select'}}, heading, foodList, addOrderbuttonPanel,finishOrderbuttonPanel]
    });
    
    gb.food.view.FoodScreen.superclass.initComponent.apply(this, arguments);   
  },
  addToOrder: function() {
    Ext.dispatch({ controller: 'GB_CNTR_SELECT_FOOD', action: 'addFood',  orderItems: this.getComponent('FOOD_DISPLAY').getOrderItems()});
  },
  finishOrder: function() {
    Ext.dispatch({ controller: 'GB_CNTR_CONFIRM_ORDER', action: 'launch'});
  }
});
Ext.reg('GB_FOOD_SCREEN', gb.food.view.FoodScreen);