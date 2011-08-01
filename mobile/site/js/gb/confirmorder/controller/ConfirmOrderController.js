/**
 */
Ext.regController("GB_CNTR_CONFIRM_ORDER", {
  
  launch: function() {
    this.setConfirmedOrderState();
  },

  setConfirmedOrderState: function() {
    var trn = new gb.confirmorder.transact.SetConfirmOrderTransaction();
    trn.run();
  },
  
  
  open: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_CONFIRMSCREEN', id: 'CONFIRM_ORDER_SCREEN'}, Ext.getBody());
  },
  
  applyPromo: function(options) {
    var trn = new gb.confirmorder.transact.ApplyPromoTransaction({promoCode: options.promoCode, 
      callback: options.callback, callbackScope: options.callbackScope});
    trn.run();
  },
  
  confirmOrder: function(options) {
    var trn = new gb.confirmorder.transact.ConfirmOrderTransaction({offset: options.offset});
    trn.run();
  },  
  
  displayStacked: function() {http://localhost:8888/js/min.js
    Ext.getBody().update('');
    this.render({xtype: 'GB_STACKED', id: 'STACKED_SCREEN'}, Ext.getBody());
  },
  
  confirmNewTime: function() {
    var trn = new gb.confirmorder.transact.ConfirmOrderTransaction({slot: gb.context.CONTEXT.getOrder().proposedSlot});
    trn.run();
  }    
  
  
});