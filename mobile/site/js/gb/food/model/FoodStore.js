gb.food.model.FoodStore = new Ext.data.JsonStore({
    model  : 'GB_FOOD_MODEL',
    
    updateFood: function(foodItems) {
      
      this.clearData();
      for ( var i = 0; i < foodItems.length; i++) {
        var food = Ext.ModelMgr.create(foodItems[i], 'GB_FOOD_MODEL', foodItems.id);
        this.add(food);
      }
    }
    
});