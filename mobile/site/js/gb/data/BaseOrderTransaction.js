gb.data.BaseOrderTransaction = Ext.extend(Ext.util.Observable, {
  
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
//      console.log(e.stack);
      gb.LoadMask.hide();
      Ext.Msg.alert('Error', 'Your request could not be processed. (101)', Ext.emptyFn);
    }    
  },
  
  loadRequiredOrderScreen: function() {
    gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state);
  },
  
  success: function(result, request) {
    try {
      gb.LoadMask.hide();
      
      // if order in this
      // update current order
      var jsonresult = Ext.decode(result.responseText);
      
      if('order' in jsonresult) {
        gb.context.CONTEXT.getOrder().update(jsonresult.order);
      }
      
      if('user' in jsonresult) {
        gb.context.CONTEXT.getUser().update(jsonresult.user);
      }      
      
      if('errorCodes' in jsonresult && jsonresult.errorCodes.length > 0) {
          gb.order.ErrorMessageDisplay.displayMessages(jsonresult.errorCodes);
      }
      
      if ('_success' in this) {
        this._success(result, request, jsonresult);
      }else {
        Ext.Msg.alert('Error', 'Your request could not be processed. (120)', Ext.emptyFn);
      }
    }catch (e) {
//      console.log(e);
      gb.LoadMask.hide();
      Ext.Msg.alert('Error', 'Your request could not be processed. (121)', Ext.emptyFn);
//      console.log(e.stack);
    } 
  },

  failure: function(result, request) {
    try {
      gb.LoadMask.hide();
      if ('_failure' in this) {
        this._failure(result, request);
      }else {
        Ext.Msg.alert('Error', 'Your request could not be processed. (130)', Ext.emptyFn);
      }
    }catch (e) {
      gb.LoadMask.hide();
      Ext.Msg.alert('Error', 'Your request could not be processed. (131)', Ext.emptyFn);
    }
  },
  
  error: function(msg) {
    Ext.Msg.alert('Error', msg, Ext.emptyFn);
  }

});