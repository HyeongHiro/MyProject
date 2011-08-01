Ext.regController("GB_CNTR_TOPUP", {
  
  openTopup: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_TOPUPSCREEN', id: 'TOPUP_SCREEN'}, Ext.getBody());    
  },
  
  paypalError: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_TOPUPSCREEN', id: 'TOPUP_SCREEN'}, Ext.getBody()); 
    Ext.Msg.alert('Paypal Error', 'An error occured connecting to PayPal.', Ext.emptyFn);
  }

});