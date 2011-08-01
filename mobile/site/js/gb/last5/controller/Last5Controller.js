/**
 */
Ext.regController("GB_CNTR_LAST5", {
  
  launch: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_LAST5SCREEN', id: 'LAST5_SCREEN'}, Ext.getBody());
  },

  selectLast5Order: function(options) {
    var id = options.orderId;
    var trn = new gb.last5.transact.SelectOrderTransaction({id: id});
    trn.run();
  }

});