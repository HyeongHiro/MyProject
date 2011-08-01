/**
 */
Ext.regController("GB_CNTR_CONFIRMED_ORDER", {
  
  launch: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_CONFIRMED_PANEL', id: 'CONFIRMED_ORDER_SCREEN'}, Ext.getBody());
  },

  launchTopup: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_CONFIRMED_TOPUP_PANEL', id: 'CONFIRMED_ORDER_SCREEN'}, Ext.getBody());
  }
});