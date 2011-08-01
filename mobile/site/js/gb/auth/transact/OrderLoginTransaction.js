/**
 * When login-in as part of the Order Process. Prior to order confirmation. 
 * 
 */
gb.auth.transact.OrderLoginTransaction = Ext.extend(gb.data.BaseOrderTransaction, {

  un : null,
  pw : null,

  _run : function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: gb.order.controller.States.ORDER_PROCESS_LOGIN,
        Username : this.un,
        Password : this.pw,
        login : 1
      },
      method : 'POST',
      success : this.success,
      failure : this.failure,
      scope: this
    });
  },


  _success : function(result, request, jsonresult) {
    
    if('user' in jsonresult) {
      gb.context.CONTEXT.getUser().update(jsonresult.user);
    };
    
    if(gb.context.CONTEXT.getOrder().state != gb.order.controller.States.ORDER_LOGIN && 
        gb.context.CONTEXT.getOrder().state != gb.order.controller.States.ORDER_PROCESS_LOGIN) {
      gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state);
    }
    
  }




});