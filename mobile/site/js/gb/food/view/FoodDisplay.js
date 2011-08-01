gb.food.view.FoodDisplay = Ext.extend(Ext.Panel, {
  layout : {
    type : 'vbox',
    align : 'stretch'
  },
  initComponent : function() {
    // load food items out of store
    this.foodItems = new Array();
    
    for ( var i = 0; i < gb.food.model.FoodStore.getCount(); i++) {
      this.foodItems.push(Ext.create({xtype:'FoodSmallDisplay', food: gb.food.model.FoodStore.getAt(i)}));
    }
    
    // add each item to this panel
    Ext.apply(this, {
      items : this.foodItems
    });
    
    gb.food.view.FoodDisplay.superclass.initComponent.apply(this, arguments);   
  },
  getOrderItems: function() { 
    var orderArray = new Array();
    // returns an array of id/quantity objects
    for ( var i = 0; i < this.foodItems.length; i++) {
      if(this.foodItems[i].getOrderQuantity() > 0) {
        orderArray.push({id: this.foodItems[i].food.data.id, qty: this.foodItems[i].getOrderQuantity()});
      }
    }
    return orderArray;
  }
});
Ext.reg('GB_FOODDISPLAY', gb.food.view.FoodDisplay);