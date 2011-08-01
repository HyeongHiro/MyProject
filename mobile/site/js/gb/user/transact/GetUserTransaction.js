gb.user.transact.GetUserTransaction = Ext.extend(Ext.util.Observable, {
  
  run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'getuser'
      },
      method : 'POST',
      success : function(result, request) {
      },
      failure : function(result, request) {
      }
    });
  }
  
});