gb.coffee.model.CoffeeStore = new Ext.data.JsonStore({
    model  : 'GB_COFFEE_MODEL',
    
    updateCoffee: function(coffees) {
      this.clearData();
      for ( var i = 0; i < coffees.length; i++) {
        var coffee = Ext.ModelMgr.create(coffees[i], 'GB_COFFEE_MODEL', coffees.name);
        this.add(coffee);
      }
    }
    
});