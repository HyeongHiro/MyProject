/**
 */
Ext.regController("GB_CNTR_MYACCOUNT", {
  
  launch: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_MYACCOUNTSCREEN', id: 'MYACCOUNT_SCREEN'}, Ext.getBody());
  }

});