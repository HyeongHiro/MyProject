gb.auth.transact.SignupTransaction = Ext.extend(gb.data.BaseOrderTransaction, {

  _run : function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: gb.order.controller.States.PROCESS_SIGNUP,
        fn : this.fname,
        ln : this.lname,
        pw : this.pass,
        email : this.email,
        mobile : this.mobile,
        rbComms: this.rbComms,
        thirdPartyComms: this.thirdPartyComms
      },
      method : 'POST',
      success: this.success,
      failure: this.failure,
      scope: this
    });
  },

  _success : function(result, request, jsonresult) {
      if('user' in jsonresult) {
        gb.context.CONTEXT.getUser().update(jsonresult.user);
      }
      
      if(gb.context.CONTEXT.getOrder().state != gb.order.controller.States.ORDER_SIGNUP && 
          gb.context.CONTEXT.getOrder().state != gb.order.controller.States.PROCESS_SIGNUP) {
        
        gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state);
        
        var popup = Ext.create({xtype: 'GB_SIGNEDUP_POPUP_PANEL'});
        popup.show('pop');  
      }

  }
  
});