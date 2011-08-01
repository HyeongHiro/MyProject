Ext.regController("GB_CNTR_AUTH", {
  
  openLogin: function() {
    Ext.getBody().update('');
    var loginScreen = this.render({xtype: 'GB_LOGINSCREEN', id: 'LOGIN_SCREEN'}, Ext.getBody());
  },

  openSignup: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_SIGNUPSCREEN', id: 'SIGNUP_SCREEN'}, Ext.getBody());    
  },
  
  processSignup: function(options) {
    var signupTrn = new gb.auth.transact.SignupTransaction(options);
    signupTrn.run()
  },  

  processLogin: function(options) {
    var login = new gb.auth.transact.OrderLoginTransaction({un: options.un, pw: options.pw});
    login.run();
  },
  
  logout: function() {
    // run logout transaction
  }
  
});