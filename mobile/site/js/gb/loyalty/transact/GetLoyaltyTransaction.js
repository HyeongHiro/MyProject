gb.loyalty.transact.GetLoyaltyTransaction = Ext.extend(gb.data.BaseTransaction, {
  
  _run: function() {
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