gb.launcher.transact.LaunchTransaction = Ext.extend(gb.data.BaseTransaction, {
  
  callback: null,
  callbackscope: null,
  
  _run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'launch'
      },
      method: 'POST',
      success: this.success,
      failure : this.failure,
      scope: this
    });
  },
  
  _success: function(result, request) {
    var launchRes = Ext.decode(result.responseText);
    this.callback.call(this.callbackscope, launchRes);
  },

  _failure: function(result, request) {
    this.callback.call(this.callbackscope, null);
  }
  

});