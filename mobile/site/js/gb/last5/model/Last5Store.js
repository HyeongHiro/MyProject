gb.last5.model.Last5Store = new Ext.data.JsonStore({
    model  : 'GB_ORDER_MODEL',
      
    updateLast5: function(last5Orders) {
      this.clearData();
      this.fireEvent('dataChanged');
      for ( var i = 0; i < last5Orders.length; i++) {
        var order = Ext.ModelMgr.create(last5Orders[i], 'GB_ORDER_MODEL', last5Orders[i].id);
        this.add(order);
      }
    } 
    
});