gb.order.transact.GetOrderTransaction = Ext.extend(Ext.util.Observable, {
  
  run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'getorder'
      },
      method : 'POST',
      success : function(result, request) {
      },
      failure : function(result, request) {
      }
    });
  }
  
});