/*
 * Stroes the list of milk objects coming from the server ffor the selected cafe.
 * 
 */
gb.coffee.model.MilkStore = new Ext.data.JsonStore({
    model  : 'GB_MILK_MODEL',
    
    updateMilk: function(milks) {
     this.clearData();
     for ( var i = 0; i < milks.length; i++) {
       var milk = Ext.ModelMgr.create(milks[i], 'GB_MILK_MODEL', milks.name);
       this.add(milk);
     }
    },
    
    getWithType: function(type) {
      for (var i = 0; i < this.getCount(); i++) {
        if(this.getAt(i).get('name') == type) {
          return this.getAt(i);
        } 
      }
      return null;
    }
    
});