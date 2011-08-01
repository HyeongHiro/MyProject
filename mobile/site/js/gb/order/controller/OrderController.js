/**
 */
Ext.regController("GB_CNTR_ORDER", {
 
  showPopup: function(options) {
    this.popup = Ext.create({xtype: 'GB_ORDER_POPUP_PANEL'});
    this.popup.show('pop');  
  }, 
  
  hidePopup: function(options) {
    if(this.popup != null) {
      this.popup.hide(); 
    }
  },    

  removeCoffeeInPopUp: function(options) {
    this.hidePopup();
    
    var trn = new gb.coffee.transact.RemoveCoffeeTransaction({orderIndex: options.orderIndex, callback: function() {
      gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state);
      Ext.dispatch({controller: 'GB_CNTR_ORDER', action: 'showPopup', redraw: true});
    }});
    
    trn.run();
  },  
  
  removeFoodInPopUp: function(options) {
    var trn = new gb.coffee.transact.RemoveFoodTransaction({orderIndex: options.orderIndex,  callback: function() {
      gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state);
      Ext.dispatch({controller: 'GB_CNTR_ORDER', action: 'showPopup', redraw: true});
    }});
    trn.run();
  }  
    
});