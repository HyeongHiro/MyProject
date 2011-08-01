gb.auth.transact.LoginTransaction = Ext.extend(gb.data.BaseTransaction, {

  un : null,
  pw : null,

  _run : function() {
    Ext.Ajax.request({
      url : 'authenticate.php',
      params : {
        Username : this.un,
        Password : this.pw,
        login : 1
      },
      method : 'POST',
      success: this.success,
      failure: this.failure,
      scope: this
    });
  },

  _success : function(result, request) {
    if (Ext.decode(result.responseText).result) {
      //callback(Ext.decode(result.responseText).user);
    } else {
      //callback(null);
    }
  },
  
  _failure : function(result, request) {
//    callback(null);
  }
  
});