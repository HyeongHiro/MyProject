Ext.regController("GB_CNTR_LAUNCH", {
  launch: function() {
    
    // run launch transaction
    var transaction = new gb.launcher.transact.LaunchTransaction({
      callbackscope: this,
      callback: this.processLaunchResult
    });
    transaction.run();
  },
  loadCafeSelection: function() {
    Ext.dispatch({
      controller: 'GB_CNTR_CAFE',
      action    : 'launch'
    });
  },
  processLaunchResult: function(launchResult) {
    if('user' in launchResult && launchResult.user != null) {
      // update current user model
      gb.context.CONTEXT.getUser().update(launchResult.user);
      
      if('currentOrder' in launchResult && launchResult.currentOrder != null) {
        // update current order model
        // redirect to approriate screen 
        gb.context.CONTEXT.getOrder().update(launchResult.currentOrder);
        
        // determine state and dispatch
        gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state, null);
        
      }else if('last5Orders' in launchResult && launchResult.last5Orders != null && launchResult.last5Orders.length > 0) {
        // update last 5 orders model
        gb.last5.model.Last5Store.updateLast5(launchResult.last5Orders);
        //launch the screen
        Ext.dispatch({
          controller: 'GB_CNTR_LAST5',
          action    : 'launch'
        });              
        
      }else {
        this.loadCafeSelection();
      }
    }else if('currentOrder' in launchResult && launchResult.currentOrder != null) {
      
      // update current order model
      // redirect to approriate screen 
      gb.context.CONTEXT.getOrder().update(launchResult.currentOrder);
      
      // determine state and dispatch
      gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state, null);
      
    }else {
      this.loadCafeSelection();
    }
  }
  
});