Ext.regController("GB_CNTR_CAFE", {
  
  launch: function() {
    if(gb.geo.location !== undefined && gb.geo.location != null && gb.geo.location.coords != null) {
      this.launchWithLocation();
    }else {
      this.launchWithOutLocation();
    }
  },

  launchWithLocation: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_CAFEPANEL', id: 'SELECT_CAFE_SCREEN', searching: true}, Ext.getBody());
    
    //load local cafes
    var searchTransaction = new gb.cafe.transact.CafeSearchTransaction();
    searchTransaction.run();
  },

  launchWithOutLocation: function() {
    this.reOpen();
  },

  selectCafe: function(options) {
    var trn = new gb.cafe.transact.SetCafeTransaction({id: options.cafe.data.CafeId});
    trn.run();
  },
  
  
  showMap: function() {
    var cafeListPanel = Ext.getCmp('GB_CAFELIST_PANEL');      
    cafeListPanel.setActiveItem(1, {type: 'slide'});  
  },  
  

  reOpen: function() {
    Ext.getBody().update('');
    // no trnasaction to run, just let the user search
    this.render({xtype: 'GB_CAFEPANEL', id: 'SELECT_CAFE_SCREEN'}, Ext.getBody());
  }
    

});