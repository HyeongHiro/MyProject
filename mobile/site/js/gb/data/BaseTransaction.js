gb.data.BaseTransaction = Ext.extend(Ext.util.Observable, {
  
  run: function() {
    try {
      gb.LoadMask.show();
      if ('_run' in this) {
        this._run();
      }else {
        gb.LoadMask.hide();
        Ext.Msg.alert('Error', 'Your request could not be processed. (100)', Ext.emptyFn);
      }
    }catch (e) {
      gb.LoadMask.hide();
      Ext.Msg.alert('Error', 'Your request could not be processed. (101)', Ext.emptyFn);
    }    
  },
  
  success: function(result, request) {
    try {
      gb.LoadMask.hide();
      if ('_success' in this) {
        this._success(result, request);
      }else {
        Ext.Msg.alert('Error', 'Your request could not be processed. (120)', Ext.emptyFn);
      }
    }catch (e) {
      gb.LoadMask.hide();
      Ext.Msg.alert('Error', 'Your request could not be processed. (121)', Ext.emptyFn);
//      console.log(e);
//      console.log(e.stack);
    } 
  },

  failure: function(result, request) {
    try {
      gb.LoadMask.hide();
      if ('_failure' in this) {
        this._failure(result, request);
      }else {
        Ext.Msg.alert('Error', 'Your request could not be processed.', Ext.emptyFn);
      }
    }catch (e) {
      gb.LoadMask.hide();
      Ext.Msg.alert('Error', 'Your request could not be processed.', Ext.emptyFn);
    }
  },
  
  error: function(msg) {
    Ext.Msg.alert('Error', msg, Ext.emptyFn);
  }

});