gb.app.AppContext = Ext.extend(Ext.util.Observable, {

  currentUser: null,
  currentOrder: null,
  
  constructor: function (options) {
    this.currentUser = new gb.user.model.User();
    this.currentOrder = new gb.order.model.Order();
    
    gb.app.AppContext.superclass.constructor.call(this, options);
  }, 
  
  /**
   * Only for display
   */
  getUser: function() {
    return this.currentUser;
  },

  /** 
   * Current order as sent from the server.
   */
  getOrder: function() {
    return this.currentOrder;
  }
  
});