Ext.regApplication({
    name: "gb",
    phoneStartupScreen: '/images/splashscreen.png',
    
    launch: function() {
      gb.context.CONTEXT = new gb.app.AppContext();
      gb.context.NAVIGATION = new gb.app.AppNavigation();
      
      gb.geo.tracker = new gb.geo.GeoTracker();
      gb.geo.tracker.load();
      gb.geo.tracker.update();

      Ext.Router.draw(function(map) {
        map.connect("myaccount",  {controller: 'GB_CNTR_MYACCOUNT', action: 'launch'});
        
        map.connect("cafeLaunch",  {controller: 'GB_CNTR_CAFE', action: 'launch'});
        map.connect("cafereopen",  {controller: 'GB_CNTR_CAFE', action: 'reopen'});
        map.connect("cafeSearch",  {controller: 'GB_CNTR_CAFE', action: 'launchWithOutLocation'});
        map.connect("cafeNear", {controller: 'GB_CNTR_CAFE', action: 'launchWithLocation'});
        
        map.connect("coffeeSelect", {controller: 'GB_CNTR_SELECT_COFFEE', action: 'select'});
        map.connect("foodSelect", {controller: 'GB_CNTR_SELECT_FOOD', action: 'select'});
        
        map.connect("confirm", {controller: 'GB_CNTR_CONFIRM_ORDER', action: 'launch'});

        map.connect("login", {controller: 'GB_CNTR_AUTH', action: 'openLogin'});
        map.connect("signup", {controller: 'GB_CNTR_AUTH', action: 'openSignup'});
        
        map.connect("confirmOrder", {controller: 'GB_CNTR_CONFIRM_ORDER', action: 'launch'});
      });      
      
      this._launchWithoutLocation();
    },    
    
    _launchWithoutLocation: function() {
      Ext.dispatch({
          controller: 'GB_CNTR_LAUNCH',
          action    : 'launch',
          userLocation: null
      });
    }

});

Ext.namespace(
    'gb.app',
    'gb.app.view',
    
    'gb.auth.view', 
    'gb.auth.controller',
    'gb.auth.model',
    'gb.auth.transact',

    'gb.cafe.view', 
    'gb.cafe.controller',
    'gb.cafe.model',
    'gb.cafe.transact',
    
    'gb.coffee.view', 
    'gb.coffee.controller',
    'gb.coffee.model',
    'gb.coffee.transact',
    
    'gb.confirmorder.view',
    'gb.confirmorder.controller',
    'gb.confirmorder.model',
    'gb.confirmorder.transact',    
    
    'gb.confirmed.view',
    'gb.confirmed.controller',
    'gb.confirmed.model',
    'gb.confirmed.transact',

    'gb.context',
    
    'gb.data',
    
  
    'gb.email.view',
    'gb.email.controller',
    'gb.email.model',
    'gb.email.transact',
  
    'gb.food.view',
    'gb.food.controller',
    'gb.food.model',
    'gb.food.transact',
    
    'gb.geo',
    
    'gb.home.view',
    'gb.home.controller',
    'gb.home.model',
    'gb.home.transact',
    
    'gb.last5.controller',
    'gb.last5.model',
    'gb.last5.transact',
    'gb.last5.view',
    
    'gb.launcher.controller',
    'gb.launcher.model',
    'gb.launcher.transact',    
    
    'gb.loyalty.view',
    'gb.loyalty.controller',
    'gb.loyalty.model',
    'gb.loyalty.transact',
    
    'gb.map.view',
    'gb.map.controller',
    'gb.map.model',
    'gb.map.transact',
    
    'gb.myaccount.view',
    'gb.myaccount.controller',
    'gb.myaccount.model',
    'gb.myaccount.transact',
    
    'gb.order.view',
    'gb.order.controller',
    'gb.order.model',
    'gb.order.transact',    
    
    'gb.user.view',
    'gb.user.controller',
    'gb.user.model',
    'gb.user.transact',
  
  'gb.topup.view',
    'gb.topup.controller',
    'gb.topup.model',
    'gb.topup.transact',
  
  'gb.test.view',
    'gb.test.controller',
    'gb.test.model',
    'gb.test.transact',
  
  'gb.top.view',
  'gb.xtra.view',
  
  'gb.messagescreen.view'
);
gb.app.view.BaseScreen = Ext.extend(Ext.Panel, {
  scroll: 'vertical',
  fullscreen: true
});gb.app.AppContext = Ext.extend(Ext.util.Observable, {

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
  
});gb.app.AppNavigation = Ext.extend(Ext.util.Observable, {
  stateMap: null,
  /*
   * Sometimes you may get back an order state that you're not expecting.
   * This method will navigate to the correct screen.
   */
  navigateToOrderScreen: function(orderState) {
    if(this.stateMap == null) {
      this.loadMap();
    }
    if(orderState in this.stateMap) {
//      console.log(this.stateMap[orderState]);
      Ext.dispatch(this.stateMap[orderState]);
    }else {
      //console.log(orderState);
      Ext.Msg.alert('Error', 'Your request could not be processed. (500)', Ext.emptyFn);
    }
  },
  
  loadMap: function() {
    this.stateMap = new Array();
    
    this.stateMap[gb.order.controller.States.SELECT_CAFE] = {controller: 'GB_CNTR_CAFE', action:'launch'};
    this.stateMap[gb.order.controller.States.SET_CAFE] = this.stateMap[gb.order.controller.States.SELECT_CAFE];
    
    this.stateMap[gb.order.controller.States.SELECT_COFFEE] = {controller: 'GB_CNTR_SELECT_COFFEE', action:'select'};
    this.stateMap[gb.order.controller.States.ADD_COFFEE] = this.stateMap[gb.order.controller.States.SELECT_COFFEE];
    this.stateMap[gb.order.controller.States.SELECT_COFFEE_REMOVE_FOOD] = this.stateMap[gb.order.controller.States.SELECT_COFFEE];
    this.stateMap[gb.order.controller.States.SELECT_COFFEE_REMOVE_COFFEE] = this.stateMap[gb.order.controller.States.SELECT_COFFEE];
    
    this.stateMap[gb.order.controller.States.SELECT_COFFEE_WITH_LAST_ORDER] = {controller: 'GB_CNTR_LAST5', action:'launch'};
    
    
    this.stateMap[gb.order.controller.States.SELECT_FOOD] = {controller: 'GB_CNTR_SELECT_FOOD', action:'select'};
    this.stateMap[gb.order.controller.States.ADD_FOOD] = this.stateMap[gb.order.controller.States.SELECT_FOOD];
    this.stateMap[gb.order.controller.States.SELECT_FOOD_REMOVE_FOOD] = this.stateMap[gb.order.controller.States.SELECT_FOOD];
    this.stateMap[gb.order.controller.States.SELECT_FOOD_REMOVE_COFFEE] = this.stateMap[gb.order.controller.States.SELECT_FOOD];
    
    this.stateMap[gb.order.controller.States.ORDER_LOGIN] = {controller: 'GB_CNTR_AUTH', action:'openLogin'};
    this.stateMap[gb.order.controller.States.PROCESS_SIGNUP] = this.stateMap[gb.order.controller.States.ORDER_LOGIN];
    
//    ORDER_FORGOTPW: 32,
//    ORDER_FORGOTPW_PROCESS: 33,

    this.stateMap[gb.order.controller.States.ORDER_SIGNUP] = {controller: 'GB_CNTR_AUTH', action:'openSignup'};
    this.stateMap[gb.order.controller.States.PROCESS_SIGNUP] = this.stateMap[gb.order.controller.States.ORDER_SIGNUP];
    
    this.stateMap[gb.order.controller.States.ORDER_TOP_UP] = {controller: 'GB_CNTR_TOPUP', action:'openTopup'};
    this.stateMap[gb.order.controller.States.ORDER_PROCESS_TOP_UP] = this.stateMap[gb.order.controller.States.ORDER_TOP_UP];
    this.stateMap[gb.order.controller.States.PAYPAL_ERROR] = {controller: 'GB_CNTR_TOPUP', action:'paypalError'};
    
    this.stateMap[gb.order.controller.States.LOAD_ORDER] = this.stateMap[gb.order.controller.States.SELECT_COFFEE_WITH_LAST_ORDER];
    
    this.stateMap[gb.order.controller.States.CONFIRM_ORDER] = {controller: 'GB_CNTR_CONFIRM_ORDER', action:'open'};
    this.stateMap[gb.order.controller.States.CONFIRM_APPLY_PROMO] = this.stateMap[gb.order.controller.States.CONFIRM_ORDER];
    this.stateMap[gb.order.controller.States.CONFIRM_REMOVE_COFFEE] = this.stateMap[gb.order.controller.States.CONFIRM_ORDER];
    this.stateMap[gb.order.controller.States.CONFIRM_REMOVE_FOOD] = this.stateMap[gb.order.controller.States.CONFIRM_ORDER];

    this.stateMap[gb.order.controller.States.PROCESS_ORDER_VIA_CAFE_TOPUP] = {controller: 'GB_CNTR_CONFIRMED_ORDER', action:'launchTopup'};
    this.stateMap[gb.order.controller.States.PROCESS_ORDER] = {controller: 'GB_CNTR_CONFIRMED_ORDER', action:'launch'};
    
  }
  
});gb.data.BaseTransaction = Ext.extend(Ext.util.Observable, {
  
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

});gb.data.BaseOrderTransaction = Ext.extend(Ext.util.Observable, {
  
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

});Ext.regController("GB_CNTR_AUTH", {
  
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
  
});/**
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




});gb.auth.transact.LoginTransaction = Ext.extend(gb.data.BaseTransaction, {

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
  
});function LogoutTransaction(callback) {
	Ext.Ajax.request({
		url : 'logout',
		method : 'POST',
		success : function(result, request) {
			Ext.StoreMgr.removeByKey('user');
			callback(true);
		},
		failure : function(result, request) {
			callback(false);
		}
	});
}gb.auth.transact.SignupTransaction = Ext.extend(gb.data.BaseOrderTransaction, {

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
  
});gb.auth.view.SignUpScreen = Ext.extend(gb.app.view.BaseScreen, {
          id : 'SIGNUPPANEL',
          layout : {
            type : 'vbox',
            align : 'stretch',
            pack : 'start'
          },
          initComponent : function() {

            var heading = {
              cls : 'gbHeading',
              padding : 10,
              html : 'Sign Up'
            };

            var toggle = {
              padding : 10,
              items : [ {
                xtype : 'togglefield',
                label : '<p class="gbSubHeading">Fancy cool stuff from us ?</p>',	
                value: true,
                id: 'RBCOMMS',
                labelWidth : '50%'
              }, {
                xtype : 'togglefield',
                label : '<p class="gbSubHeading">And our buddies</p>',
                id: 'THIRD_PARTY_COMMS',
                labelWidth : '50%'
              } ]
            };

            var buttons = new Ext.Panel({
              layout : {
                type : 'hbox'
              },
              items : [  
        			  {
        			  	xtype: 'spacer'
        			  },                     
                {
                xtype : 'button',
                text : 'Sign Up',
                ui : 'green',
                handler : this.runSignup
              },{ xtype: 'spacer', width:'8'} ]
			  
            });
			
			Ext.regModel('User', {
			fields : [ {
				name : 'first_name',
				type : 'string'
			},{
				name : 'last_name',
				type : 'string'
			},{
				name : 'number',
				type : 'string'
			},{
				name : 'email',
				type : 'string'
			}, {
				name : 'password',
				type : 'password'
			}, {
				name : 'cpassword',
				type : 'password'
			} ],
			validations : [ 
			{
				type : 'format',
				name : 'email',
				matcher : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
				message : "Wrong Email Format"
			}, 
			{
				type : 'presence',
				name : 'first_name',
				message : "Please enter your first name"
			}, 
			{
				type : 'presence',
				name : 'last_name',
				message : "Please enter your Last Name"
			}, 
			{
				type : 'presence',
				name : 'number',
				message : "Please enter your Mobile Number"
			},
			{
				type : 'presence',
				name : 'password',
				message : "Please enter your Password"
			},
			{
				type : 'presence',
				name : 'cpassword',
				message : "Please confirm your Password"
			}
			 
			]
		});	
			
            Ext.apply(this, {
                      items : [ {xtype : 'GB_TOPMENU', hideStages: true, backDispatch: {controller: 'GB_CNTR_AUTH', action: 'openLogin'}},
                                {
                                  url : 'postUser.php',
                                  standardSubmit : false,
                                  items : [
                                      heading,
                                      {
                                        xtype : 'GB_SIGNUP_PANEL'
                                      },
                                      toggle,
                                      {
                                        cls : 'gbSubHeading.black',
                                        padding : 10,
                                        html : 'By clicking "Sign Up", your are agreeing to the Terms and Conditions and Privacy Policy.'
                                      }, buttons, {xtype: 'spacer', height: 12}],
                                      listeners : {
                                        submit : function(form, result) {
                                          c//onsole.log('success', Ext.toArray(arguments));
                                        },
                                        exception : function(form, result) {
                                          //console.log('failure', Ext.toArray(arguments));
                                        }
                                      }
                                }
                                
                      
                       ]
                    });

            gb.auth.view.SignUpScreen.superclass.initComponent.apply(this,arguments);
          },
			  
			  runSignup : function() {
    				// var loginPanel = Ext.getCmp('SIGNUPPANEL');
    				var fname = Ext.getCmp('first_name').getValue();
    				var lname = Ext.getCmp('last_name').getValue();
    				var email = Ext.getCmp('emailfield').getValue();
    				var number = Ext.getCmp('number').getValue();
    				var pass = Ext.getCmp('password').getValue();
    				var cpass = Ext.getCmp('cpassword').getValue();
    				
    				
            var rbComms = Ext.getCmp('RBCOMMS').getValue();
            var thirdPartyComms = Ext.getCmp('THIRD_PARTY_COMMS').getValue();
    				
    				var model = Ext.ModelMgr.create({
    				  'first_name' : fname,
    				  'last_name' : lname,
    				  'email' : email,
    				  'number' : number,
    				  'password' : pass,
    				  'cpassword' : cpass,
    				  'rbComms' : rbComms,
    				  'thirdPartyComms' : thirdPartyComms
    				  
    				}, 'User');
    
    				var errors = model.validate();
    				var message = "";
    				if (errors.isValid()) {
    				  
    				  if (pass != cpass) {
    				    Ext.Msg.alert("Please Fix the following errors.", "Passwords don't match", function() {});
    				  }else {
                Ext.dispatch({controller: 'GB_CNTR_AUTH', action: 'processSignup', 
                  fname: fname, 
                  lname: lname,
                  email: email,
                  mobile: number,
                  pass: pass,
                  rbComms: rbComms,
                  thirdPartyComms: thirdPartyComms
                  });     				    
    				  }
    				  
    				  
    				  
    				} else {
    				  Ext.each(errors.items, function(rec, i) {
    					message += rec.message + "<br>";
    				  });
    				  Ext.Msg.alert("Please Fix the following errors.", message, function() {
    				  });
    				}    
    			  }
        });

Ext.reg('GB_SIGNUPSCREEN', gb.auth.view.SignUpScreen);gb.auth.view.SignUpPanel = Ext.extend(Ext.Panel, 
{
	padding : 10,
	initComponent : function() 
	{
		Ext.apply(this, 
		{
			items: [
			{	
				cls:'gbSubHeading.black',
				border:false,
				html:'Heya! Thanks for a giving us a whirl.<br/><br/> To claim a free coffee from your nearest Go Bean member cafe, Just fill in your details.'
			},{
			xtype: 'GB_SIGNUPITEMS'
			}],			
			cls: 'auth_panel'
		});
    
		gb.auth.view.SignUpPanel.superclass.initComponent.apply(this, arguments);   
	}
});

Ext.reg('GB_SIGNUP_PANEL', gb.auth.view.SignUpPanel);gb.auth.view.SignUpItems = Ext.extend(Ext.form.FieldSet, 
{
	defaults: {
        required: true,
        cls: 'gbSubHeading'
    },
    items: [
	{
		xtype: 'textfield',
		name : 'name',
		id : 'first_name',
		placeHolder: 'First name',
		useClearIcon: true,
		autoCapitalize : false
	},{
		xtype: 'textfield',
		id : 'last_name',
		placeHolder: 'Last name'
	},{
		xtype: 'emailfield',
		id : 'emailfield',
		name : 'email',
		placeHolder: 'Email',
		useClearIcon: true
	},{
		xtype: 'textfield',
		id : 'number',
		name: 'number',
		placeHolder: 'Mobile number - For your free coffee voucher',
		maxValue : 20,
		minValue : 2
	},{
		xtype: 'passwordfield',
		id : 'password',
		name : 'password',
		placeHolder: 'Password',
		useClearIcon: false
	},{
		xtype: 'passwordfield',
		id : 'cpassword',
		placeHolder: 'Confirm password',
		useClearIcon: false
	}]   
});

Ext.reg('GB_SIGNUPITEMS', gb.auth.view.SignUpItems);/**
 * 
 */

gb.cafe.view.LoginScreen = Ext.extend(gb.app.view.BaseScreen, {

	id : 'LOGINPANEL',
	layout: {
	    type: 'vbox',
	    align: 'stretch',
	    pack: 'start'
	  },
	initComponent : function() {
		
		var heading = {html: 'Almost there...', padding: 4, cls: 'gbHeading'};
		var textPartOne = {html: 'Now you just need to login or <a href="#" onclick="Ext.dispatch({controller:\'GB_CNTR_AUTH\', action:\'openSignup\'}); return false;">sign up</a> so we can get things going.', padding: 4};
		
		Ext.regModel('User', {
			fields : [ {
				name : 'email',
				type : 'string'
			}, {
				name : 'password',
				type : 'password'
			} ],
			validations : [ 
			{
				type : 'format',
				name : 'email',
				matcher : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
				message : "Wrong Email Format"
			}, 
			{
				type : 'presence',
				name : 'password',
				message : "Enter Password"
			}
			 
			]
		});		
		
		var formBase = {
				id : 'formBase',
				standardSubmit : false,
				padding: 4,
				items: [
		                {
		                    xtype: 'fieldset',		                   
		                    defaults: {
		                        required: true,
		                        labelAlign: 'left'
		                    },
		                    items: [
		                     {
		                    	 id: 'emailfield',
		                    	 xtype: 'emailfield',
		                    	 name : 'email',
		                    	 placeHolder: 'Email',
		                    	 useClearIcon: true
		                    	  
		                     },
		                     {
		                    	 id:'passwordfield',
		                        xtype: 'passwordfield',
		                        name : 'password',
		                        placeHolder: 'Password',
		                        useClearIcon: false		                      
		                    }
		                     ]
		                }
		            ]				
		};
		
		var textPartTwo = {html: '<div style="padding-top: 12px;">Forgtten your Password? Click <a href="#forgotpw">here</a> to retreive it.</div>', padding: 4};	
		var logingButtonPanel = Ext.create({xtype: 'GB_LOGINBUTTON_PANEL', padding: 4});
		
		Ext.apply(this, {
			items : [{xtype: 'GB_TOPMENU', hideStages: true, backDispatch: {controller: 'GB_CNTR_SELECT_FOOD', action: 'select'}},heading,textPartOne,formBase,textPartTwo,logingButtonPanel]

		});
		gb.cafe.view.LoginScreen.superclass.initComponent.apply(this, arguments);
	}
 
});
Ext.reg('GB_LOGINSCREEN', gb.cafe.view.LoginScreen);/**
 * 
 */
gb.cafe.view.LoginButtonPanel = Ext.extend(Ext.Panel, {
  layout : 'hbox',
  width : '100%',
  initComponent : function() {

    var loginButton = Ext.create({
      xtype : 'button',
      ui : 'green',
      text : 'Login',
      handler : this.runLogin
    });

    Ext.apply(this, {
      cls : 'cafe_search_panel',
      items : [{xtype : 'spacer'}, loginButton, {xtype: 'spacer', width: 4}]
    });
    gb.cafe.view.LoginButtonPanel.superclass.initComponent.apply(this,arguments);
  },

  runLogin : function() {

    var loginPanel = Ext.getCmp('LOGINPANEL');
    var email = Ext.getCmp('emailfield').getValue();
    var pass = Ext.getCmp('passwordfield').getValue();

    var model = Ext.ModelMgr.create({
      'email' : email,
      'password' : pass
    }, 'User');

    var errors = model.validate();
    var message = "";
    if (errors.isValid()) {
      
      Ext.dispatch({controller: 'GB_CNTR_AUTH', action: 'processLogin', un: email, pw: pass});         
      
    } else {
      Ext.each(errors.items, function(rec, i) {
        message += rec.message + "<br>";
      });
      Ext.Msg.alert("Not Validated", message, function() {
      });
    }    
  }
});
Ext.reg('GB_LOGINBUTTON_PANEL', gb.cafe.view.LoginButtonPanel);gb.auth.view.WelcomePopupPanel = Ext.extend(Ext.Panel, {
  floating : true,
  centered: true,
  modal: true,
  cls: 'order_popup',
  padding: 10,
  width: 250,
  initComponent : function() {
    
    Ext.apply(this, {
      items : [ {html: '<div class="gbHeading" style="padding-bottom: 8px;">Cheers</div><div style="padding-bottom: 8px;">Cheers, We\'ll send you your free coffee voucher by SMS</div><br><div class="smallText">This could take up to 20 seconds.</div>'}]
    });
    
    gb.auth.view.WelcomePopupPanel.superclass.initComponent.apply(this, arguments);
  }
});
Ext.reg('GB_SIGNEDUP_POPUP_PANEL', gb.auth.view.WelcomePopupPanel);Ext.regController("GB_CNTR_CAFE", {
  
  launch: function() {
    if(gb.geo.location !== undefined && gb.geo.location != null && gb.geo.location.coords != null) {
      this.launchWithLocation();
    }else {
      this.launchWithOutLocation();
    }
  },

  launchWithLocation: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_CAFEPANEL', id: 'SELECT_CAFE_SCREEN', searching: true}, Ext.getBody());
    
    //load local cafes
    var searchTransaction = new gb.cafe.transact.CafeSearchTransaction();
    searchTransaction.run();
  },

  launchWithOutLocation: function() {
    this.reOpen();
  },

  selectCafe: function(options) {
    var trn = new gb.cafe.transact.SetCafeTransaction({id: options.cafe.data.CafeId});
    trn.run();
  },
  
  
  showMap: function() {
    var cafeListPanel = Ext.getCmp('GB_CAFELIST_PANEL');      
    cafeListPanel.setActiveItem(1, {type: 'slide'});  
  },  
  

  reOpen: function() {
    Ext.getBody().update('');
    // no trnasaction to run, just let the user search
    this.render({xtype: 'GB_CAFEPANEL', id: 'SELECT_CAFE_SCREEN'}, Ext.getBody());
  }
    

});/**
 * 
 */
 
gb.cafe.view.MapScreen = Ext.extend(Ext.Panel, {  
	
	layout: 'card',
  initComponent : function() {
	  this.googlemap = new Ext.Map({		  		  
		  mapOptions: {
			  zoom: 12
		  }
      }); 
	  
	  Ext.apply(this, {
    	fullscreen: true,     
        items     : [this.googlemap]  
	  
	  });       
    gb.cafe.view.MapScreen.superclass.initComponent.apply(this, arguments);
  },  
  
  setLatLng:function (name,address,lat,lng){	   
	  var position= new google.maps.LatLng(lat,lng);
	  this.googlemap.update(position); 
	  
	  var marker = new google.maps.Marker({
      	 map: this.googlemap.map,
      	 position : position
      });	
	  
	  var infowindow = new google.maps.InfoWindow();		 
	  infowindow.setContent(name + '<br>' + address);
	  infowindow.setPosition(position);	
	  infowindow.open(this.googlemap, marker);
  } 
});
Ext.reg('MAPSCREEN', gb.cafe.view.MapScreen);







 Ext.regModel('GB_CAFE_MODEL', {
  idProperty: 'CafeId',
  fields: ['CafeId', 'Enabled', 'Name', 'Distance', 'Address', 'Latitude', 'Longitude']
});gb.cafe.model.CafeStore = new Ext.data.JsonStore({
    model  : 'GB_CAFE_MODEL',
    sorters: [
              {
                  property : 'Distance',
                  direction: 'ASC'
              }
          ]
});gb.cafe.transact.SetCafeTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
    
    id: null,
    
    _run: function() {
      Ext.Ajax.request({
        url : 'ajax.php',
        params : {
          call : 'order',
          st: gb.order.controller.States.SET_CAFE,
          id: this.id
        },
        method : 'POST',
        success : this.success,
        failure : this.failure,
        scope: this
      });
    },

    _success: function(result, request, jsonresult) {
      var result = Ext.decode(result.responseText);
      
      // process cafe coffee list
      gb.coffee.model.CoffeeStore.updateCoffee(jsonresult.coffees);
      gb.coffee.model.MilkStore.updateMilk(jsonresult.milks);
      
      Ext.dispatch({
        controller: 'GB_CNTR_SELECT_COFFEE',
        action    : 'select'
      });
    },

    _failure: function() {
      this.error('Error selecting cafe. Please check your phone signal and try again.')
    }
    
});gb.cafe.transact.CafeSearchTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  _run: function() {

    gb.cafe.model.CafeStore.clearData();
    gb.cafe.model.CafeStore.fireEvent('dataChanged');
    
    if('query' in this && this.query !== undefined) {
      // run a query based search
      Ext.Ajax.request({
        url : 'ajax.php',
        method : 'POST',
        timeout : 40000,
        params: {
          call : 'order',
          st: 5,
          q : this.query
        },
        success: this.success,
        failure: this.failure,
        scope: this
      });      
    }else if(gb.geo.location !== undefined && gb.geo.location != null && gb.geo.location.coords != null) {
    
      var lat = gb.geo.location.coords.latitude;
      var lng = gb.geo.location.coords.longitude;
        
        Ext.Ajax.request({
          url : 'ajax.php',
          method : 'POST',
          timeout : 40000,
          params : 
          {
            call : 'order',
            st: 5,
            lat : lat,
            "long" : lng
          },
          success: this.success,
          failure: this.failure,
          scope: this
        });
    }
  },
  processQueryResults: function(result) {
    if (Ext.util.Format.trim(result.responseText) != '')  {
      var result = Ext.decode(result.responseText);
      if('cafes' in result) {
        for ( var i = 0; i < result.cafes.length; i++) {
          var cafe = Ext.ModelMgr.create(result.cafes[i], 'GB_CAFE_MODEL', result.cafes[i].CafeId);
          gb.cafe.model.CafeStore.add(cafe);
        }
      }
    }
  },
  
  
  _success: function(result, request) {
    this.processQueryResults(result);
  },

  _failure: function(result, request) {
    Ext.Msg.alert('Error', 'Your request could not be processed. Please check your connection and try again.', Ext.emptyFn);
  }  
  
});/**
 * Screen showing the list of cafes.
 */
gb.cafe.view.CafeScreen = Ext.extend(gb.app.view.BaseScreen, {
  layout: {
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  fullscreen: true,
  initComponent : function() {
    var heading = {id: 'CHOOSE_CAFE_HEADING', html: 'Choose your cafe', cls: 'gbHeading', padding: 4};
    var searchPanel = Ext.create({xtype: 'GB_CAFESEARCH_PANEL', id: 'CHOOSE_CAFE_SEARCHPANEL', padding: 4});
    var cafeList = Ext.create({
      xtype: 'GB_CAFELIST_PANEL', 
      searching: this.searching
    });
    
    Ext.apply(this, {
      items : [{xtype:'GB_TOPMENU', hideCart: true}, heading, searchPanel, cafeList]
    });
    
    gb.cafe.view.CafeScreen.superclass.initComponent.apply(this, arguments);   
  }
});
Ext.reg('GB_CAFEPANEL', gb.cafe.view.CafeScreen);gb.cafe.view.CafeListPanel = Ext.extend(Ext.Panel, {
    id: 'GB_CAFELIST_PANEL',
	layout: 'card',
  initComponent : function() {	 	 	
      var mapscreen = Ext.create({xtype: 'MAPSCREEN', hidden: true});	
      var cafelist = Ext.create({
        xtype: 'GB_CAFELIST',
        listeners: {
          itemtap: this.selectCafe,
          scope: this
        }
      });          
        
    Ext.apply(this, {      	
      items: [cafelist, mapscreen],
      cls: 'cafe_list_panel'      	  
    });    
    gb.cafe.view.CafeListPanel.superclass.initComponent.apply(this, arguments);   
  },
  
  selectCafe: function(list, subIdx)
  { 
	  var cafe = list.getStore().getAt(subIdx);	  
	  if(cafe.data.Enabled==1){
		  Ext.dispatch({
		      controller: 'GB_CNTR_CAFE',
		      action: 'selectCafe',
		      cafe: cafe
		    });
	  }    
  },   	
  searchFinished: function() {
    
  }
});
Ext.reg('GB_CAFELIST_PANEL', gb.cafe.view.CafeListPanel);gb.cafe.view.CafeItemTemplate = new Ext.XTemplate(
    '<div style="float: left; padding-right: 10px; padding-left:10px;"><img height="32" src="images/<tpl if="Enabled == 1">roundtick.png</tpl><tpl if="Enabled == 0">roundcross.png</tpl>"></div>' +
    '<div style="float: left;"><div class="cafelist_cafename">{Name}</div><div class="cafelist_cafeaddress">{Address}</div></div><div style="float: right; padding-right: 4px;"><table border="0"><tr><td valign="middle"><img src="images/mappin.png">{Distance}</td></tr></table></div>'
    );gb.cafe.view.CafeList = Ext.extend(Ext.List, {
  cls : 'cafelist',
  id : 'GB_CAFELIST',
  itemTpl : gb.cafe.view.CafeItemTemplate,
  store : gb.cafe.model.CafeStore,  
  onItemDisclosure : function(record){	 
    
    Ext.dispatch({
      controller: 'GB_CNTR_CAFE',
      action    : 'showMap'
    });
	  
	  cafeListPanel.items.items[1].setLatLng(record.data.Name,record.data.Address,record.data.Latitude,record.data.Longitude);
	  cafeListPanel.items.items[1].setVisible(true);   
  }
});
Ext.reg('GB_CAFELIST', gb.cafe.view.CafeList);gb.cafe.view.CafeSearchForm = Ext.extend(Ext.form.FormPanel, {
    items: [
        {
            xtype: 'textfield',
            name : 'query'
        }
    ]
});
Ext.reg('GB_CAFESEARCH_FORM', gb.cafe.view.CafeSearchForm);gb.cafe.view.CafeSearchPanel = Ext.extend(Ext.Panel, {
  layout: 'hbox',
  width: '100%',
  initComponent : function() {
    var mapLinkButton = Ext.create({xtype: 'button', width:35 ,ui: 'green', handler: this.openMap, iconMask: true, iconCls: 'mapIcon'});
    var searchField = {id:'txt', xtype: 'textfield',width: 178, name : 'query', placeHolder: '  Type postcode or suburb', cls: 'cafe_search_field', id: 'CAFE_SEARCH_FIELD',
	listeners: {
    	change: {
            element: 'el',
            fn: this.runSearch,
			scope: this
        }
    }
	
	};
    var searchButton = Ext.create({xtype: 'button', ui: 'green', text: 'Search', handler: this.runSearch, scope:this});
    
    Ext.apply(this, {
      cls: 'cafe_search_panel',
      items: [mapLinkButton, {xtype:'spacer',width:14}, searchField, {xtype: 'spacer', width:14}, searchButton]
    });

    gb.cafe.view.CafeSearchPanel.superclass.initComponent.apply(this, arguments);   
  },
  runSearch: function() {
    var query = this.getComponent('CAFE_SEARCH_FIELD').getValue();
    var trn = new gb.cafe.transact.CafeSearchTransaction({query: query});
    trn.run();
  },
  openMap: function() {
    if(gb.geo.location == null) {
      gb.geo.tracker.update();
    }
    
    Ext.dispatch({
      controller: 'GB_CNTR_CAFE',
      action    : 'launchWithLocation'
    });    
  }
});
Ext.reg('GB_CAFESEARCH_PANEL', gb.cafe.view.CafeSearchPanel);/**
 * The only controller in this simple application - this simply sets up the fullscreen viewport panel
 * and renders a detailed overlay whenever a Loan is tapped on.
 */
Ext.regController("GB_CNTR_SELECT_COFFEE", {
  
  select: function() {
    if( gb.coffee.model.CoffeeStore.getCount() <=0 ) {
      this.loadSelectCoffeeScreen();
    }else {
      this.openNow();  
    }
  },
  
  openNow: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_SELECTCOFFEESCREEN', id: 'SELECT_COFFEE'}, Ext.getBody());
  },  
  
  loadSelectCoffeeScreen: function() {
    var trn = new gb.coffee.transact.SelectCoffeeTransaction();
    trn.run();
  },

  /** */
  addCoffee: function(options) {
    if(options.data != null) {
      options.data.callback = function() {
    	var panel = Ext.getCmp('SELECT_COFFEE');
    	panel.setVisibleOrderFinishPanel();
  		var popup = Ext.create({xtype: 'GB_COFFEE_POPUP_PANEL'});
        popup.show('pop');  
      };
      var coffeeTrn = new gb.coffee.transact.AddCoffeeTransaction(options.data);
      coffeeTrn.run();
    }
  },

  orderSummary: function(options) {
    if(options.data != null) {
      options.data.callback = function() {
        var popup = Ext.create({xtype: 'GB_ORDER_SUMMARY'});
        popup.show('pop');        
      };
    }
  }
});Ext.regModel('GB_COFFEE_MODEL', {
    idProperty: 'name',
    fields: ['name', 'sizes']
});gb.coffee.model.CoffeeStore = new Ext.data.JsonStore({
    model  : 'GB_COFFEE_MODEL',
    
    updateCoffee: function(coffees) {
      this.clearData();
      for ( var i = 0; i < coffees.length; i++) {
        var coffee = Ext.ModelMgr.create(coffees[i], 'GB_COFFEE_MODEL', coffees.name);
        this.add(coffee);
      }
    }
    
});Ext.regModel('GB_MILK_MODEL', {
    fields: ['id', 'name']
});/*
 * Stroes the list of milk objects coming from the server ffor the selected cafe.
 * 
 */
gb.coffee.model.MilkStore = new Ext.data.JsonStore({
    model  : 'GB_MILK_MODEL',
    
    updateMilk: function(milks) {
     this.clearData();
     for ( var i = 0; i < milks.length; i++) {
       var milk = Ext.ModelMgr.create(milks[i], 'GB_MILK_MODEL', milks.name);
       this.add(milk);
     }
    },
    
    getWithType: function(type) {
      for (var i = 0; i < this.getCount(); i++) {
        if(this.getAt(i).get('name') == type) {
          return this.getAt(i);
        } 
      }
      return null;
    }
    
});Ext.regModel('GB_SIZE_MODEL', {
    fields: ['name', 'size', 'cssClass','isSelected']
});gb.coffee.model.SizeStore = new Ext.data.JsonStore({
    model  : 'GB_SIZE_MODEL',
    data: [
        {name: 'Small', size: 'Small', cssClass: 'coffee_size_small',isSelected:false},
        {name: 'Regular', size: 'Regular', cssClass: 'coffee_size_regular',isSelected:false},
        {name: 'Large', size: 'Large', cssClass: 'coffee_size_large',isSelected:false},
        {name: 'Short', size: 'Short', cssClass: 'coffee_size_small',isSelected:false},
        {name: 'Long', size: 'Long', cssClass: 'coffee_size_regular',isSelected:false}
    ]
});Ext.regModel('GB_STRENGTH_MODEL', {
    fields: ['name', 'type', 'cssClass']
});gb.coffee.model.StrengthStore = new Ext.data.JsonStore({
    model  : 'GB_STRENGTH_MODEL',
    data: [
        {name: 'Half Shot',   type: 'Weak', cssClass: 'coffee_strength_weak'},
        {name: 'Single shot', type: 'Regular', cssClass: 'coffee_strength_regular'},
        {name: 'Double shot', type: 'Strong', cssClass: 'coffee_strength_strong'}
    ]
});Ext.regModel('GB_SUGAR_MODEL', {
    fields: ['name', 'amount', 'cssClass']
});gb.coffee.model.SugarStore = new Ext.data.JsonStore({
    model  : 'GB_SUGAR_MODEL',
    data: [
        {name: 'None', amount: '0', cssClass: 'coffee_sugar_none'},
        {name: 'Half', amount: 'Half', cssClass: 'coffee_sugar_half'},
        {name: 'One', amount: '1', cssClass: 'coffee_sugar_one'},
        {name: 'Two', amount: '2', cssClass: 'coffee_sugar_two'}
    ]
});// see server OrderJson Encoding spec:
// order/common/tech/server/OrderJsonEncoding.docx

Ext.regModel('GB_ORDERSUMMARY_MODEL', {
    fields: ['firstName', 'balance', 'cafe_name', 'coffeeOrders', 'foodOrders', 'total', 'description']
});


gb.coffee.model.OrderSummaryStore = new Ext.data.JsonStore(
{
    model  : 'GB_ORDERSUMMARY_MODEL',
	sorters: 'Cafe',
     data: 
    [
	
	{
	drinks:["aaa","ddd","ff","yyy"],
	"state":null,"id":"2","total":14.5,
      "cafe":{"name":"Coffee Yes","id":"1","address":"Abbotsford", "enabled": 1},
      "coffeeOrders":[
          {"total":3.5,"idx":"rboi1","cafeCoffeeId":"1","orderReferencedId":null,"type":"Latte","size":"Small","strength":"Regular","extras":null,"sugar":"0","quantity":1,"subtotal":3.5},
          {"total":3.5,"idx":"rboi2","cafeCoffeeId":"1","orderReferencedId":null,"type":"Latte", "size":"Small","strength":"Regular","extras":null,"sugar":"0","quantity":1,"subtotal":3.5},
          {"total":3.5,"idx":"rboi3","cafeCoffeeId":"1","orderReferencedId":null,"type":"Latte","size":"Small","strength":"Regular","extras":null,"sugar":"0","quantity":1,"subtotal":3.5},
          {"total":4,"idx":"rboi4","cafeCoffeeId":"2","orderReferencedId":null,"type":"Latte","size":"Regular","strength":"Regular","extras":null,"sugar":"0","quantity":1,"subtotal":4}],
          "foodOrders":[]}]
});gb.coffee.transact.AddCoffeeTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  coffeeSizeId: null,
  milkId: null,
  strength: null,
  sugar: null,
  extras: null,
  qty: null,
  
  _run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: gb.order.controller.States.ADD_COFFEE,
        size: this.coffeeSizeId,
        milk: this.milkId,
        strength: this.strength,
        sugar: this.sugar,
        extras: this.extras,
        qty: this.qty
      },
      method : 'POST',
      success : this.success,
      failure : this.failure,
      scope: this
    });
  },

  _success: function(result, request, jsonresult) {
    this.callback.call(jsonresult);
  },
  
  _failure: function() {
    Ext.Msg.alert('Error', 'An error occured.', Ext.emptyFn);
  }

});gb.coffee.transact.RemoveCoffeeTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  orderIndex: null,
  
  _run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: 23,
        idx: this.orderIndex
      },
      method : 'POST',
      success : this.success,
      failure : this.failure,
      scope: this
    });
  },
  
  _success: function(result, request, jsonresult) {
    this.callback.call();
  }
  
});gb.coffee.transact.RemoveFoodTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  orderIndex: null,
  
  _run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: 22,
        idx: this.orderIndex
      },
      method : 'POST',
      success : this.success,
      failure : this.failure,
      scope: this
    });
  },
  
  _success: function(result, request, jsonresult) {
    this.callback.call();
  }
  
});gb.coffee.transact.SelectCoffeeTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  orderIndex: null,
  
  _run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: gb.order.controller.States.SELECT_COFFEE,
        idx: this.orderIndex
      },
      method : 'POST',
      success : this.success,
      failure : this.failure,
      scope: this
    });
  },
  
  _success: function(result, request, jsonresult) {
    gb.coffee.model.CoffeeStore.updateCoffee(jsonresult.coffees);
    gb.coffee.model.MilkStore.updateMilk(jsonresult.milks);
    Ext.dispatch({
      controller: 'GB_CNTR_SELECT_COFFEE',
      action    : 'openNow'
    });
  },
  
  _failure: function() {
  }

  
});gb.home.view.SelectCoffeeScreen = Ext.extend(gb.app.view.BaseScreen, {
  layout: 
  {
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  maxHeight: 300,
  initComponent : function() {
    Ext.apply(this, {
      items : [
               {xtype: 'GB_TOPMENU', backDispatch: {controller: 'GB_CNTR_CAFE', action: 'launch'}}, 
               {xtype: 'GB_SELECTCOFFEEPANEL', id: 'SELECT_COFFEE_TYPE_PANEL',listeners:{coffeeSwitch:this.updateCoffeeSelection,scope:this}},
               {xtype: 'GB_SELECTSIZEPANEL', id: 'SELECT_SIZE_PANEL', height: 100},
               {xtype: 'GB_SELECTMILKPANEL', id: 'SELECT_MILK_PANEL', height: 100},
               {xtype: 'GB_SELECTSTRENGTHPANEL', id: 'SELECT_STRENGTH_PANEL', height: 100 },
               {xtype: 'GB_SELECTSUGARPANEL', id: 'SELECT_SUGAR_PANEL', height: 100},
               {xtype: 'GB_SREQUEST_PANEL', id: 'SELECT_SREQUEST_PANEL'},
               {xtype: 'GB_COFFEE_QUANTITY_PANEL', min:1, id: 'SELECT_QUANTITY_PANEL',listeners:{addToOrder:this.addToOrder,scope:this}},
               {xtype: 'GB_ORDERFINISHBUTTON_PANEL', id: 'SELECT_ORDERFINISH_PANEL'},
               {xtype: 'spacer', height: 10}
              ]
    });
    
    this.addListener('afterrender', function() {
      var sizeObjects = gb.coffee.model.CoffeeStore.getAt(0).get('sizes');
      var sizeArray = new Array();
      for ( var i = 0; i < sizeObjects.length; i++) {
        sizeArray.push(sizeObjects[i].size);
      }
      this.getComponent('SELECT_SIZE_PANEL').enableSizes(sizeArray);
      }, this);    
    gb.home.view.SelectCoffeeScreen.superclass.initComponent.apply(this, arguments); 
    this.checkOrderFinishPanel();
  },
  
  checkOrderFinishPanel: function()
  {
	  var numberCoffeeOrders = gb.context.CONTEXT.getOrder().coffeeOrders.length;
	  if(numberCoffeeOrders == 0)
	  {
		  var panel = Ext.getCmp('SELECT_ORDERFINISH_PANEL');
		  panel.setVisible(false);
		  this.doLayout();
	  }  
  }, 
  
  setVisibleOrderFinishPanel: function()
  {
	  var panel = Ext.getCmp('SELECT_ORDERFINISH_PANEL');
	  if(panel.isVisible()==false)
	  {
		  panel.setVisible(true);
		  panel.doComponentLayout(); 		  
	  }	  
  }, 
  
  updateCoffeeSelection: function(coffee) {
    var sizeObjects = gb.coffee.model.CoffeeStore.getById(coffee.type).get('sizes');
    var sizeArray = new Array();
    for ( var i = 0; i < sizeObjects.length; i++) {
      sizeArray.push(sizeObjects[i].size);
    }
    this.getComponent('SELECT_SIZE_PANEL').enableSizes(sizeArray);
  },
  addToOrder: function() {
    Ext.dispatch({ controller: 'GB_CNTR_SELECT_COFFEE', action: 'addCoffee',  data: this.getData()});              
  },
  getData: function() {
    var selectedCoffee = this.getSelectedCoffee();
    if(selectedCoffee != null) {
      
      var selectedMilk = this.getSelectedMilk();
      if(selectedMilk != null) {
        
        var selectedStrength = this.getSelectedStrength();
        var selectedSugar =this.getSelectedSugar();
        var selectedExtras =this.getExtras();
        var selectedQty =this.getSelectedQty();
        
        return {
          coffeeSizeId: selectedCoffee.id,
          milkId: selectedMilk.data.id,
          strength: selectedStrength.data.type,
          sugar: selectedSugar.data.amount,
          extras: selectedExtras,
          qty: selectedQty
        };
       
      }else {
        Ext.Msg.alert('Error', 'Please select a milk option.', Ext.emptyFn);
      } 
    }else {
      Ext.Msg.alert('Error', 'Please select your cup size.', Ext.emptyFn);
    }  
    return null;
  },
  getSelectedCoffee: function() {
    var tCoffee = this.getComponent('SELECT_COFFEE_TYPE_PANEL').getSelectedCoffee();
    var coffeeOption = gb.coffee.model.CoffeeStore.getById(tCoffee.type);
    var tsize = this.getComponent('SELECT_SIZE_PANEL').getSelectedSize();
    if(tsize !== null && tsize !== undefined) {
      var selectedSize = null; 
      for ( var i = 0; i < coffeeOption.data.sizes.length; i++) {
        if(coffeeOption.data.sizes[i].size == tsize) {
          return coffeeOption.data.sizes[i];
        }
      }
    }
    return null;
  },
  getSelectedMilk: function() {
    var tMilk = this.getComponent('SELECT_MILK_PANEL').getSelectedMilk();
    if(tMilk != null) {
      return gb.coffee.model.MilkStore.getWithType(tMilk.type);
    }
    return null;
  },
  getSelectedStrength: function() {
    return this.getComponent('SELECT_STRENGTH_PANEL').getSelectedStrength();
  },
  getSelectedSugar: function() {
    return this.getComponent('SELECT_SUGAR_PANEL').getSelectedSugar();
  },
  getExtras: function() {
    return this.getComponent('SELECT_SREQUEST_PANEL').getSpecialRequests();
  },
  getSelectedQty: function() {
    return this.getComponent('SELECT_QUANTITY_PANEL').getSelectedQuantity();
  }
});
Ext.reg('GB_SELECTCOFFEESCREEN', gb.home.view.SelectCoffeeScreen);gb.coffee.view.BaseSelectPanel = Ext.extend(Ext.Panel, {
  layout: 'hbox',
  padding: 10,
  height: 80  
});gb.coffee.view.CoffeeCarousel = Ext.extend(Ext.Carousel,  {
   
  indicator: false,
  constructor: function (options) {
    
    this.coffees = new Array();
    // Should be in the same order as the images below.
    // Should have the same name as those in the database
    this.coffees.push({type: 'Flat White'});
    this.coffees.push({type: 'Latte'});
    this.coffees.push({type: 'Cappuccino' });
    this.coffees.push({type: 'Long Black' });
    this.coffees.push({type: 'Piccolo' });
    this.coffees.push({type: 'Macchiato' });
    this.coffees.push({type: 'Mocha' });
    this.coffees.push({type: 'Espresso' });
    this.coffees.push({type: 'Hot Chocolate' });
    this.coffees.push({type: 'Chai Latte' });    
    
    gb.coffee.view.CoffeeCarousel.superclass.constructor.call(this, options);
  },    
  getSelectedCoffee: function() {
    return this.coffees[this.getActiveIndex()];
  },
	items: [
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: 0 0;"},
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: -215px 0"},
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: -430px 0;"},
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: -645px 0;"},
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: -860px 0;"},
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: -1075px 0;"},
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: -1290px 0;"},
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: -1505px 0;"},
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: -1720px 0;"},
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: -1935px 0;"}
	]

});
Ext.reg('GB_COFFEE_CAROUSEL', gb.coffee.view.CoffeeCarousel);gb.coffee.view.CarouselWithArrow = Ext.extend(Ext.Panel, {
	height: 210,
  layout: 'hbox',
	initComponent : function() 
	{
		Ext.apply(this, 
		{
			items: [{
				id : 'LEFT',
				xtype: 'button',
				width : 40,
				height: 60,
				style : "background: url(images/leftarrow.png);background-repeat:no-repeat;border:0px;",
				handler : function()
				{
					var prev = Ext.getCmp('COFFEE_SELECT_CAROUSEL').layout.getPrev();
					if (prev) 
					{
						Ext.getCmp('COFFEE_SELECT_CAROUSEL').customDrag = true;
						Ext.getCmp('COFFEE_SELECT_CAROUSEL').scrollToCard(prev);
					}
					return Ext.getCmp('COFFEE_SELECT_CAROUSEL');		
    			}
			}, 
			{
				id: 'COFFEE_SELECT_CAROUSEL', 
				xtype: 'GB_COFFEE_CAROUSEL', 
				width : 226, 
				height: 210,
				listeners: {
				  cardswitch : function() { this.fireEvent('coffeeSwitch', Ext.getCmp('COFFEE_SELECT_CAROUSEL').getSelectedCoffee()) },
			    scope: this
				}
			},{
				id : 'RIGHT',
				xtype : 'button',
				width : 40,
				height: 60,
				style : "background: url(images/rightarrow.png);background-repeat:no-repeat;border:0px;",
				handler : function()
				{
					var next = Ext.getCmp('COFFEE_SELECT_CAROUSEL').layout.getNext();
					if (next) {
						Ext.getCmp('COFFEE_SELECT_CAROUSEL').customDrag = true;
						Ext.getCmp('COFFEE_SELECT_CAROUSEL').scrollToCard(next);
					}
					return Ext.getCmp('COFFEE_SELECT_CAROUSEL');
				}
			}],
			cls: 'test_panel'
		});

		gb.coffee.view.CarouselWithArrow.superclass.initComponent.apply(this, arguments);   
	},
	getSelectedCoffee: function() {
	  return this.getComponent('COFFEE_SELECT_CAROUSEL').getSelectedCoffee();
	}
	
});

Ext.reg('GB_SELECT_COFFEE_TYPE_PANEL', gb.coffee.view.CarouselWithArrow);gb.coffee.view.SelectCoffeePanel = Ext.extend(Ext.Panel,  {
  cls: 'base_select_panel',
  layout: 'vbox',
  initComponent : function() {
    Ext.apply(this, {
      items : [
               {id: 'CARAOUSEL_HEADING', html: 'Select Coffee Type', cls: 'gbHeading', padding: 4},
               {xtype: 'GB_SELECT_COFFEE_TYPE_PANEL', id: 'SELECT_COFFEE_TYPE_PANEL', listeners: {
                 coffeeSwitch : this.updateCoffeeType,
                 scope: this
               }},
               {id: 'COFFEETYPE_HEADING', html: 'Flat White', cls: 'gbSubHeading', padding: 4}
              ]
    });   
    gb.coffee.view.SelectCoffeePanel.superclass.initComponent.apply(this, arguments);   
  },
  updateCoffeeType: function(selectedType) {
    this.getComponent('COFFEETYPE_HEADING').update(selectedType.type);
    this.fireEvent('coffeeSwitch', selectedType);
  },
  getSelectedCoffee: function() {
    return this.getComponent('SELECT_COFFEE_TYPE_PANEL').getSelectedCoffee();
  }
});
Ext.reg('GB_SELECTCOFFEEPANEL', gb.coffee.view.SelectCoffeePanel);gb.coffee.view.SelectSizePanel = Ext.extend(gb.coffee.view.BaseSelectPanel, {
  cls: 'coffee_select_panel base_select_panel',
  sizes: {},
  initComponent : function() {
    var tempItems = new Array();
    for ( var i = 0; i < gb.coffee.model.SizeStore.getCount(); i++) 
    {
      tempItems.push({xtype:'spacer'});
      tempItems.push(this.createSizeItem(gb.coffee.model.SizeStore.getAt(i)));      
    }
    tempItems.push({xtype:'spacer'});
    
    this.currentSmallRegLar = 'Regular';
    this.currentShortLong ='Short';
    
    Ext.apply(this, {items: tempItems});
    gb.coffee.view.SelectSizePanel.superclass.initComponent.apply(this, arguments);   
  },
  
  createSizeItem: function(record) {
    var sizeComp = new gb.coffee.view.SizeComponent(
    {
          hidden: true,
          size: record
    });   
    
    sizeComp.addListener('afterrender', function() {
      sizeComp.el.on('tap', function(){
        if(!sizeComp.isDisabled()){  
        	if(sizeComp.size.data.name=='Small'||sizeComp.size.data.name=='Regular'||sizeComp.size.data.name=='Large'){
        		this.currentSmallRegLar = sizeComp.size.data.name;
            this.selectSize(sizeComp.size);        			
        	}else if(sizeComp.size.data.name=='Short'||sizeComp.size.data.name=='Long'){
        		this.currentShortLong = sizeComp.size.data.name;                 
            this.selectSize(sizeComp.size);
        	}
        }
      }, this);         
    }, this);  
    this.sizes[record.data.size] = sizeComp;
    return sizeComp;
  },
  
  selectSize: function(record){
	    if(this.selected != null) {
	      this.selected.setSelected(false);
	    }
	    if(record !== null) {
	      this.selected = this.sizes[record.data.size];
	      this.selected.setSelected(true);      
	    }else {
	      this.selected = null;
	    }
  },
  
  getSelectedSize: function() {
    if (this.selected === undefined || this.selected === null) {
      return null;
    }    
    return this.selected.size.data.size;
  },
 
  enableSizes: function(sizeArray) {	  
    for (x in this.sizes) {
      if(sizeArray.indexOf(this.sizes[x].getSize()) >= 0) { 
        this.sizes[x].setVisible(true);     
      }else {
        this.sizes[x].setVisible(false);
        if(this.selected == this.sizes[x]) {
          this.selectSize(null);  
        }
      }
    }    
    if(this.selected == null) {
      for (x in this.sizes) {
        if(this.sizes[x].isVisible()) {
          this.selectSize(this.sizes[x].size);    
        }
      }
    }
    this.doLayout();
  }
});
Ext.reg('GB_SELECTSIZEPANEL', gb.coffee.view.SelectSizePanel);gb.coffee.view.SizeComponent = Ext.extend(Ext.Panel, {
  layout: 'vbox',
  width: 80,
  initComponent : function() {
    Ext.apply(this, {
      cls: 'coffee_size_component ' + this.size.data.cssClass,
      items: [
              {id: this.size.data.size + '_SIZE_IMAGE', cls: 'image', width: 70, height: 70},
              {html: this.size.data.name, id: this.size.data.size + '_SIZE_TITLE', cls: 'title'}
             ]
    });
    
    gb.coffee.view.SizeComponent.superclass.initComponent.apply(this, arguments);   
  },
  setSelected: function(sel) {
    if(sel) {
      this.getComponent(this.size.data.size + '_SIZE_IMAGE').addCls('selected');
    }else {
      this.getComponent(this.size.data.size + '_SIZE_IMAGE').removeCls('selected');
    }
    this.selected = sel;
  },
  getSize: function() {
    return this.size.data.size;
  }
});
Ext.reg('GB_SIZECOMPONENT', gb.coffee.view.SizeComponent);gb.coffee.view.SelectMilkPanel = Ext.extend(gb.coffee.view.BaseSelectPanel, {
  layout: 'hbox',
  padding: 10,
  cls: 'milk_select_panel base_select_panel',
  milks: {},
  initComponent : function() {
    var tempItems = new Array();
    
    var milks = [
    {name: 'Skim', type: 'Skinny', cssClass: 'coffee_milk_skim'},
    {name: 'Full Cream', type: 'Full Cream', cssClass: 'coffee_milk_fullcream'},
    {name: 'Soy', type: 'Soy', cssClass: 'coffee_milk_soy'}];    
    
    for ( var i = 0; i < milks.length; i++) {
      tempItems.push({xtype:'spacer'});
      tempItems.push(this.createMilkItem(milks[i]));
    }
    tempItems.push({xtype:'spacer'});
    tempItems.push({name: 'None', type: 'None', cssClass: 'coffee_milk_none', hidden: true});
    
    Ext.apply(this, {items: tempItems});
    gb.coffee.view.SelectMilkPanel.superclass.initComponent.apply(this, arguments);   
  },
  createMilkItem: function(record) {
    var milkComp = new gb.coffee.view.MilkComponent(
    {
          milk: record
    });
    milkComp.addListener('afterrender', function() {
      milkComp.el.on('tap', function() {
        if(!milkComp.isDisabled()) {
          this.selectMilk(milkComp.milk);
        }
      }, this);
    }, this);       
    
    this.milks[record.type] = milkComp;
    
    if(milkComp.milk.name=='Full Cream')
    { 
    	this.selectMilk(milkComp.milk); 
    }
        
    return milkComp;
  },
  
  
  selectMilk: function(record) {
    if(this.selected != null) {
      this.selected.setSelected(false);
    }
    if(record !== null) {
      this.selected = this.milks[record.type];
      this.selected.setSelected(true);
    }else {
      this.selected = null;
    }
  },
  getSelectedMilk: function() {
    return this.selected.milk;
  }
});
Ext.reg('GB_SELECTMILKPANEL', gb.coffee.view.SelectMilkPanel);gb.coffee.view.MilkComponent = Ext.extend(Ext.Panel, {
  layout: 'vbox',
  width: 80,
  initComponent : function() {
    Ext.apply(this, {
      cls: 'coffee_milk_component ' + this.milk.cssClass,
      items: [
              {id: this.milk.type + '_MILK_IMAGE', cls: 'image', width: 70, height: 70},
              {html: this.milk.name, id: this.milk.type + '_MILK_TITLE', cls: 'title'}
             ]
    });
    gb.coffee.view.MilkComponent.superclass.initComponent.apply(this, arguments);   
  },
  setSelected: function(sel) {
    if(sel) {
      this.getComponent(this.milk.type + '_MILK_IMAGE').addCls('selected');
    }else {
      this.getComponent(this.milk.type + '_MILK_IMAGE').removeCls('selected');
    }
    this.selected = sel;
  },
  getMilk: function() {
    return this.milk.type;
  }
});
Ext.reg('GB_MILKCOMPONENT', gb.coffee.view.MilkComponent);gb.coffee.view.SelectStrengthPanel = Ext.extend(gb.coffee.view.BaseSelectPanel, {
  cls: 'strength_select_panel base_select_panel',
  strengths: {},
  initComponent : function() {
    var tempItems = new Array();
    
    for ( var i = 0; i < gb.coffee.model.StrengthStore.getCount(); i++) {
      tempItems.push({xtype:'spacer'});
      tempItems.push(this.createStrengthItem(gb.coffee.model.StrengthStore.getAt(i)));
    }
    tempItems.push({xtype:'spacer'});
    
    Ext.apply(this, {items: tempItems});
    gb.coffee.view.SelectStrengthPanel.superclass.initComponent.apply(this, arguments);   
  },
  createStrengthItem: function(record) {
    var strengthComp = new gb.coffee.view.StrengthComponent(
        {
          strength: record
    });
    strengthComp.addListener('afterrender', function() {
      strengthComp.el.on('tap', function() {
        if(!strengthComp.isDisabled()) {
          this.selectStrength(strengthComp.strength);
        }
      }, this);
    }, this);  
    this.strengths[record.data.type] = strengthComp;
    
    if(strengthComp.strength.data.name=='Single shot')
    { 
    	this.selectStrength(strengthComp.strength); 
    }
    return strengthComp;
  },
  selectStrength: function(record) {
    if(this.selected != null) {
      this.selected.setSelected(false);
    }
    if(record !== null) {
      this.selected = this.strengths[record.data.type];
      this.selected.setSelected(true);      
    }else {
      this.selected = null;
    }
  },
  getSelectedStrength: function() {
    if (this.selected === undefined || this.selected === null) {
      return null;
    }
    return this.selected.strength;
  }
});
Ext.reg('GB_SELECTSTRENGTHPANEL', gb.coffee.view.SelectStrengthPanel);gb.coffee.view.StrengthComponent = Ext.extend(Ext.Panel, {
  layout: 'vbox',
  width: 80,
  initComponent : function() {
    Ext.apply(this, {
      cls: 'coffee_strength_component ' + this.strength.data.cssClass,
      items: [
              {id: this.strength.data.type + '_STRENGTH_IMAGE', cls: 'image', width: 70, height: 70},
              {html: this.strength.data.name, id: this.strength.data.type + '_STRENGTH_TITLE', cls: 'title'}
             ]
    });
    gb.coffee.view.StrengthComponent.superclass.initComponent.apply(this, arguments);   
  },
  setSelected: function(sel) {
    if(sel) {
      this.getComponent(this.strength.data.type + '_STRENGTH_IMAGE').addCls('selected');
    }else {
      this.getComponent(this.strength.data.type + '_STRENGTH_IMAGE').removeCls('selected');
    }
    this.selected = sel;
  },
  getStrength: function() {
    return this.strength.data.type;
  }
});
Ext.reg('GB_STRENGTHCOMPONENT', gb.coffee.view.StrengthComponent);gb.coffee.view.SelectSugarPanel = Ext.extend(gb.coffee.view.BaseSelectPanel, {
  layout: 'hbox',
  padding: 10,
  sugars: {},
  cls: 'sugar_select_panel base_select_panel',
  initComponent : function() {
    var tempItems = new Array();
    
    for ( var i = 0; i < gb.coffee.model.SugarStore.getCount(); i++) {
      tempItems.push({xtype:'spacer'});
      tempItems.push(this.createSugarItem(gb.coffee.model.SugarStore.getAt(i)));
    }
    tempItems.push({xtype:'spacer'});
    
    Ext.apply(this, {items: tempItems});
    gb.coffee.view.SelectSugarPanel.superclass.initComponent.apply(this, arguments);   
  },
  createSugarItem: function(record) {
    var sugarComp = new gb.coffee.view.SugarComponent({sugar: record});
    sugarComp.addListener('afterrender', function() {
      sugarComp.el.on('tap', function() {
        if(!sugarComp.isDisabled()) {
          this.selectSugar(sugarComp.sugar);
        }
      }, this);
    }, this);       
    
    this.sugars[record.data.amount] = sugarComp;
    
    if(sugarComp.sugar.data.name=='None')
    { 
    	this.selectSugar(sugarComp.sugar); 
    }
    return sugarComp;
  },
  selectSugar: function(record) {
    if(this.selected != null) {
      this.selected.setSelected(false);
    }
    if(record !== null) {
      this.selected = this.sugars[record.data.amount];
      this.selected.setSelected(true);      
    }else {
      this.selected = null;
    }
  },
  getSelectedSugar: function() {
    return this.selected.sugar;
  }
});
Ext.reg('GB_SELECTSUGARPANEL', gb.coffee.view.SelectSugarPanel);gb.coffee.view.SugarComponent = Ext.extend(Ext.Panel, {
  layout: 'vbox',
  width: 80,
  initComponent : function() {
    Ext.apply(this, {
      cls: 'coffee_sugar_component ' + this.sugar.data.cssClass,
      items: [
              {id: this.sugar.data.amount + '_SUGAR_IMAGE', cls: 'image', width: 70, height: 70},
              {html: this.sugar.data.name, id: this.sugar.data.amount + '_SUGAR_TITLE', cls: 'title'}
             ]
    });
    
    gb.coffee.view.SugarComponent.superclass.initComponent.apply(this, arguments);   
  },
  setSelected: function(sel) {
    if(sel) {
      this.getComponent(this.sugar.data.amount + '_SUGAR_IMAGE').addCls('selected');
    }else {
      this.getComponent(this.sugar.data.amount + '_SUGAR_IMAGE').removeCls('selected');
    }
    this.selected = sel;
  },
  getSugar: function() {
    return this.sugar.data.amount;
  }
});
Ext.reg('GB_SUGARCOMPONENT', gb.coffee.view.SugarComponent);/**
 * 
 */
 
gb.cafe.view.SpecialrequestPanel = Ext.extend(Ext.Panel, {
  layout : 'hbox',
  width : '100%',
  padding: 10,
  cls: 'base_select_panel',
  initComponent : function() {	  
    var textField = {xtype: 'textfield', id:'SPECIAL_REQUESTS', cls: 'special_request', disabled: false, width: 150};	
    Ext.apply(this, {
	      items: [{html:'Special requests '}, {xtype: 'spacer', width: 14}, textField]
    });	
    gb.cafe.view.SpecialrequestPanel.superclass.initComponent.apply(this,arguments);
  },
  getSpecialRequests: function() {
    return this.getComponent('SPECIAL_REQUESTS').getValue();
  }
});
Ext.reg('GB_SREQUEST_PANEL', gb.cafe.view.SpecialrequestPanel);gb.coffee.view.PopupPanel = Ext.extend(Ext.Panel, {
  floating : true,
  centered: true,
  modal: true,
  cls: 'order_popup',
  padding: 10,
  width: 250,
  initComponent : function() {
    
    var anothercoffeeButton = Ext.create({
      xtype : 'button',
      ui : 'green',
      text : 'Order another coffee',
      handler : function() {
         this.hide();
      },
      scope : this,
      id : 'ORDER_ANOTHERCOFFEE_BUTTON'
    });    

    var orderfoodButton = Ext.create({
      xtype : 'button',
      ui : 'green',
      text : 'Order food',
      handler : function() {
        Ext.dispatch({ controller : 'GB_CNTR_SELECT_FOOD', action : 'select'});
      },
      scope : this,
      id : 'ORDERFOOD_BUTTON'
    });
    
    var finishButton = Ext.create({
      xtype : 'button',
      ui : 'green',
      text : 'Finish order',
      handler : function() {
        Ext.dispatch({ controller : 'GB_CNTR_CONFIRM_ORDER', action : 'setConfirmedOrderState' });
      },
      scope : this,
      id : 'FINISH_BUTTON'
    });
    
    Ext.apply(this, {
      items : [ {html: '<div class="gbHeadng" style="padding-bottom: 8px;"><img src="images/tick2.png">Added to your cart</div>'}, 
                {xtype: 'spacer', height: 12},
                anothercoffeeButton, 
                {xtype: 'spacer', height: 12}, 
                orderfoodButton, 
                {xtype: 'spacer', height: 12}, 
                finishButton]
    });
    gb.coffee.view.PopupPanel.superclass.initComponent.apply(this, arguments);
  }
});
Ext.reg('GB_COFFEE_POPUP_PANEL', gb.coffee.view.PopupPanel);/**
 * 
 */
 
gb.cafe.view.QuantityPanel = Ext.extend(Ext.Panel, {
  layout : 'hbox',
  padding: 10,
  initComponent : function() {	 
    this.value = "1";
    var plusButton = Ext.create({xtype: 'button', ui: 'green', text: '+', handler: this.runPlus, scope:this,id: 'PLUS_BUTTON'});
    this.quantityField = Ext.create({xtype:'panel', html: this.value, cls: 'quantity_box'});
    var minusButton = Ext.create({xtype: 'button', ui: 'green', text: '-', handler: this.runMinus, scope:this});
    var addOrderButton = Ext.create({xtype: 'button', ui: 'green', text: 'Add to order', handler: this.runAddOrder, scope:this});
	
	Ext.apply(this, {
	      cls: 'cafe_search_panel',
	      items: [{html:'Quantity '}, {xtype: 'spacer', width: 14}, minusButton, {xtype: 'spacer', width: 8},this.quantityField, {xtype: 'spacer', width: 8}, plusButton,{xtype: 'spacer', width: 8},addOrderButton]
	});	
    gb.cafe.view.QuantityPanel.superclass.initComponent.apply(this,arguments);
  },
  
  runPlus : function()
  {	   
	  intvalue = parseInt(this.value);	  
	  var intv = intvalue + 1;
	  this.value = intv;
	  this.quantityField.update(intv);
  },
  
  runMinus : function()
  { 
    intvalue = parseInt(this.value);      
    if(intvalue > 1)
    {
  	  	var intv = intvalue-1;
  	  	this.quantityField.update(intv);
  	  	this.value = intv;
    }        
  },
  runAddOrder: function(){ 
    this.fireEvent('addToOrder');
  },
  getSelectedQuantity: function() {
   return this.value;
  }
});
Ext.reg('GB_COFFEE_QUANTITY_PANEL', gb.cafe.view.QuantityPanel);gb.coffee.view.OrderSummary = Ext.extend(Ext.Panel, 
{
  layout:   'fit',
  action: 'removeCoffeeInPopUp',  
	initComponent : function() 
	{
	  if(this.tplData == null) {
	    this.tplData = gb.context.CONTEXT.getOrder();  
	  }
	  
	  this.tpl = new Ext.XTemplate
		(
			'<div class="main">' , 
				'<div class="gbHeading" style="padding-bottom: 6px;">Order summary</div>' ,
				
				'<div  class="orderSumamryTableWrapper"><table width="100%" class="orderSumamryTable"><tr><td colspan="2" style="border-bottom:#ccc solid 1px; color:#6A6B6A; padding-bottom: 4px;">{cafe.name}</td></tr>',
				'<tpl for="coffeeOrders">' ,
				  '<tr><td style="border-bottom:#26BC2F dashed 1px; border-right:#ccc solid 1px;"><a href="#" onclick="Ext.dispatch({controller: \'GB_CNTR_ORDER\', action:\'' + this.action + '\', orderIndex: \'{idx}\'})"><img src="images/minussmall.png"></a> {quantity} x {size} {type}</td><td style="border-bottom:#26BC2F dashed 1px; padding-left: 4px;">{total:this.formatCurrency}</td></tr>' ,
        '</tpl>',
        '<tpl for="foodOrders">' ,
          '<tr><td style="border-bottom:#26BC2F dashed 1px; border-right:#ccc solid 1px;"><a href="#" onclick="Ext.dispatch({controller: \'GB_CNTR_ORDER\', action:\'' + this.action + '\', orderIndex: \'{idx}\'})"><img src="images/minussmall.png"></a> {quantity} x {name}</td><td style="padding-left: 4px; border-bottom:#26BC2F dashed 1px;">{total:this.formatCurrency}</td></tr>' ,
        '</tpl>' ,
        '<tr><td style="color:#26BC2F; font-weight: bolder; border-right:#ccc solid 1px;" align="right">Total</td><td style="padding-left: 4px; color:#26BC2F; font-weight: bolder;">{total:this.formatCurrency}</td></tr></table>',
			'</div></div>',
			{
				compiled: true,
				formatCurrency: function(number)
				{
					return Ext.util.Format.Currency(number);
				}
			}
		);
		this.on('afterRender', function() {
		  this.refreshOrder();
		}, this);
  	  	
		gb.coffee.view.OrderSummary.superclass.initComponent.apply(this, arguments);   
	}, 
	refreshOrder: function() {
	  this.tpl.overwrite(this.body, this.tplData);
	}
});

Ext.reg('GB_ORDER_SUMMARY', gb.coffee.view.OrderSummary);gb.coffee.view.OrderSummaryScreen = Ext.extend(gb.app.view.BaseScreen, {
  /*floating : true,
  centered: true,
  modal: true,*/
  width: 300,
  id: 'temp',
  layout : {
    type : 'vbox',
    align : 'stretch',
    pack : 'start'
  },
  fullscreen : true,
  initComponent : function() {
  
	var buttons = new Ext.Panel({
				height: '450',
              layout : {
                type : 'hbox'
              },
              items : [  
        			  {
        			  	xtype: 'spacer'
						
        			  },                     
                {
                xtype : 'button',
                text : 'Checkout',
                ui : 'green'
              },{ xtype: 'spacer', width:'1000'} ]
			  
            });
	
    Ext.apply(this, {
      items : [ {
        xtype : 'GB_TOPMENU',
        hideStages : true}, {xtype : 'GB_ORDER_SUMMARY'},buttons]
    });

    gb.coffee.view.OrderSummaryScreen.superclass.initComponent.apply(this, arguments);
  }
});

Ext.reg('GB_ORDERSUMMARYSCREEN', gb.coffee.view.OrderSummaryScreen);gb.cafe.view.OrderFinishButtonPanel = Ext.extend(Ext.Panel, {
	layout : 'vbox',
	align : 'stretch',

	padding :4,
	initComponent : function() {

		var orderfoodButton = Ext.create({
			xtype : 'button',
			ui : 'green',
			width : 200,
			text : 'Order food',
			handler : function() {
				Ext.dispatch({
					controller : 'GB_CNTR_SELECT_FOOD',
					action : 'select'
				});
			},
			scope : this,
			id : 'ORDERFOOD_BUTTON'
		});

		var finishButton = Ext.create({
			xtype : 'button',
			ui : 'green',
			width : 200,
			text : 'Finish order',
			handler : function() {
				Ext.dispatch({
					controller : 'GB_CNTR_CONFIRM_ORDER',
					action : 'setConfirmedOrderState'
				});
			},
			scope : this,
			id : 'FINISH_BUTTON'
		});

		var orderbuttonPanel = new Ext.Panel({
			layout : 'hbox',
			padding : 6,
			items : [ {
				xtype : 'spacer'
			}, orderfoodButton, {
				xtype : 'spacer',
				width : 4
			} ]
		});

		var finishbuttonPanel = new Ext.Panel({
			layout : 'hbox',
			padding : 6,
			items : [ {
				xtype : 'spacer'
			}, finishButton, {
				xtype : 'spacer',
				width : 4
			} ]
		});

		Ext.apply(this, {

			items : [orderbuttonPanel, finishbuttonPanel, {xtype: 'spacer', height: '8'}]
		});
		gb.cafe.view.OrderFinishButtonPanel.superclass.initComponent.apply(
				this, arguments);
	}
});
Ext.reg('GB_ORDERFINISHBUTTON_PANEL', gb.cafe.view.OrderFinishButtonPanel);Ext.regController("GB_CNTR_SELECT_FOOD", {
  
  /** select from available food */
  select: function() {
    if(gb.food.model.FoodStore.getCount() <= 0 ) {
      this.loadFoodState();
    }else {
      this.openNow();  
    }
  },
  
  openNow: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_FOOD_SCREEN', id: 'SELECT_FOOD'}, Ext.getBody());
  },  
  
  loadFoodState: function() {
    var trn = new gb.food.transact.SelectFoodTransaction();
    trn.run();
  },
  
  addFood: function(options) {
    // if some to order --> send
    if(options.orderItems.length > 0) {
    
      var cb = function() {
        var popup = Ext.create({xtype: 'GB_FOOD_POPUP_PANEL'});
        popup.show('pop');        
      };      
      
      var trn = new gb.food.transact.AddFoodTransaction({items: options.orderItems, callback: cb});
      trn.run();
    }else {
      Ext.Msg.alert('Error', 'No food is selected', Ext.emptyFn);
    }    
    
  }
});Ext.regModel('GB_FOOD_MODEL', {
    fields: ['id', 'name', 'description', 'price']
});gb.food.model.FoodStore = new Ext.data.JsonStore({
    model  : 'GB_FOOD_MODEL',
    
    updateFood: function(foodItems) {
      
      this.clearData();
      for ( var i = 0; i < foodItems.length; i++) {
        var food = Ext.ModelMgr.create(foodItems[i], 'GB_FOOD_MODEL', foodItems.id);
        this.add(food);
      }
    }
    
});gb.food.transact.AddFoodTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  items: null,
  
  _run: function() {
    // join the items together into two lists, ids and qty
    var ids = new Array();
    var qty = new Array();
    
    for ( var i = 0; i < this.items.length; i++) {
      ids.push(this.items[i].id);
      qty.push(this.items[i].qty);
    }
    
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: gb.order.controller.States.ADD_FOOD,
        ids: ids.join(','),
        qtys: qty.join(',')
      },
      method : 'POST',
      success: this.success,
      failure : this.failure,
      scope: this
    });
    
  },
  
  _success: function(result, request, jsonresult) {
    this.callback.call(jsonresult);
  },
  
  _failure: function() {
    Ext.Msg.alert('Error', 'An error occured.', Ext.emptyFn);
  }
  
});gb.food.transact.SelectFoodTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  orderIndex: null,
  
  _run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: gb.order.controller.States.SELECT_FOOD,
        idx: this.orderIndex
      },
      method : 'POST',
      success : this.success,
      failure : this.failure,
      scope: this
    });
  },
  
  _success: function(result, request, jsonresult) {
    
    if('foods' in jsonresult) {
      gb.food.model.FoodStore.updateFood(jsonresult.foods);  
    }else {
      gb.food.model.FoodStore.updateFood(new Array());
    }
    
    Ext.dispatch({
      controller: 'GB_CNTR_SELECT_FOOD',
      action    : 'openNow'
    });
  },
  
  _failure: function() {
  }

  
});gb.food.view.FoodScreen = Ext.extend(gb.app.view.BaseScreen, {
  layout: {
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  initComponent : function() {
    
    var heading = {id: 'CHOOSE_FOOD_HEADING', html: 'Choose your food', cls: 'gbHeading', padding: 4};
    var foodList = Ext.create({xtype: 'GB_FOODDISPLAY', id: 'FOOD_DISPLAY'});
    var addOrderButton = Ext.create({xtype: 'button', ui: 'green', text: 'Add to order', handler: this.addToOrder, scope:this});
    var finishOrderButton = Ext.create({xtype: 'button', ui: 'green', text: 'Finish order', handler: this.finishOrder, scope:this});
    
    var addOrderbuttonPanel = new Ext.Panel({
      layout: 'hbox',
      padding: 10,
      items: [{xtype: 'spacer'}, addOrderButton, {xtype: 'spacer', width: 4}]
    });
    
    var finishOrderbuttonPanel = new Ext.Panel({
        layout: 'hbox',
        padding: 10,
        items: [{xtype: 'spacer'}, finishOrderButton, {xtype: 'spacer', width: 4}]
      });
    
    Ext.apply(this, {
      items : [{xtype: 'GB_TOPMENU', backDispatch:{controller: 'GB_CNTR_SELECT_COFFEE', action: 'select'}}, heading, foodList, addOrderbuttonPanel,finishOrderbuttonPanel]
    });
    
    gb.food.view.FoodScreen.superclass.initComponent.apply(this, arguments);   
  },
  addToOrder: function() {
    Ext.dispatch({ controller: 'GB_CNTR_SELECT_FOOD', action: 'addFood',  orderItems: this.getComponent('FOOD_DISPLAY').getOrderItems()});
  },
  finishOrder: function() {
    Ext.dispatch({ controller: 'GB_CNTR_CONFIRM_ORDER', action: 'launch'});
  }
});
Ext.reg('GB_FOOD_SCREEN', gb.food.view.FoodScreen);gb.food.view.FoodDisplay = Ext.extend(Ext.Panel, {
  layout : {
    type : 'vbox',
    align : 'stretch'
  },
  initComponent : function() {
    // load food items out of store
    this.foodItems = new Array();
    
    for ( var i = 0; i < gb.food.model.FoodStore.getCount(); i++) {
      this.foodItems.push(Ext.create({xtype:'FoodSmallDisplay', food: gb.food.model.FoodStore.getAt(i)}));
    }
    
    // add each item to this panel
    Ext.apply(this, {
      items : this.foodItems
    });
    
    gb.food.view.FoodDisplay.superclass.initComponent.apply(this, arguments);   
  },
  getOrderItems: function() { 
    var orderArray = new Array();
    // returns an array of id/quantity objects
    for ( var i = 0; i < this.foodItems.length; i++) {
      if(this.foodItems[i].getOrderQuantity() > 0) {
        orderArray.push({id: this.foodItems[i].food.data.id, qty: this.foodItems[i].getOrderQuantity()});
      }
    }
    return orderArray;
  }
});
Ext.reg('GB_FOODDISPLAY', gb.food.view.FoodDisplay);gb.food.view.FoodSmallDisplayHead = Ext.extend(Ext.Panel, {
  layout: 'hbox',
  cls: 'food_small_display_head',
  complete: false,
  constructor: function (options) 
  {
    this.food = options.food;   
    gb.food.view.FoodSmallDisplayHead.superclass.constructor.call(this, options);
  },
  initComponent : function() 
  {
    Ext.apply(this, {items : [{html : this.food.data.name, cls: 'gbSubHeading'}, {xtype: 'spacer'}, {html : '$' + this.food.data.price, cls: 'gbSubHeading'}]});
    gb.food.view.FoodSmallDisplayHead.superclass.initComponent.apply(this, arguments);
  }
});
Ext.reg('FoodSmallDisplayHead', gb.food.view.FoodSmallDisplayHead);

gb.food.view.FoodSmallDisplayMiddle = Ext.extend(Ext.Panel,
{
  layout: 'hbox',
  cls: 'food_small_display_middle',
  complete: false,
  constructor: function (options) 
  {
    this.food = options.food;   
    gb.food.view.FoodSmallDisplayMiddle.superclass.constructor.call(this, options);
  },
  initComponent : function() 
  {

    Ext.apply(this, {items : [{html : this.getDisplayString()}] });
    gb.food.view.FoodSmallDisplayMiddle.superclass.initComponent.apply(this, arguments);
  },
  getDisplayString: function() {
    var mlength = 120;
    if(this.food.data.description.length < mlength){
      return this.food.data.description;
    }else {
      return this.food.data.description.substring(0, mlength) + '...';
    }
  }
});
Ext.reg('FoodSmallDisplayMiddle', gb.food.view.FoodSmallDisplayMiddle);

gb.food.view.FoodSmallDisplayTail = Ext.extend(Ext.Panel, {
  layout: 'hbox',
  cls: 'food_small_display_tail',
  complete: false,
  constructor: function (options) 
  {
    this.food = options.food;   
    gb.food.view.FoodSmallDisplayHead.superclass.constructor.call(this, options);
  },
  initComponent : function() 
  {
    // TODO buttons need a listener

    
    Ext.apply(this, { items : [ {xtype: 'spacer'},
                 {html : 'Quantity'},{xtype: 'spacer', width: 10},
                 {xtype: 'spinnerfield', minValue:0 } ]});
    
    gb.food.view.FoodSmallDisplayHead.superclass.initComponent.apply(this, arguments);
  }
});
Ext.reg('FoodSmallDisplayTail', gb.food.view.FoodSmallDisplayTail);

gb.food.view.FoodSmallDisplayPanel = Ext.extend(Ext.Panel, {
  layout: 
  {
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  padding: 2,
  margin: 4,
  cls: 'food_small_display',
  
  constructor: function (options) {
    this.food = options.food;
    gb.food.view.FoodSmallDisplayPanel.superclass.constructor.call(this, options);
  },  
  
  initComponent : function() {
    Ext.apply(this, {
      items : [  
               {xtype : 'FoodSmallDisplayHead', food: this.food, id: 'FOOD_HEADING' + this.food.data.id},
               {xtype : 'FoodSmallDisplayMiddle', food: this.food, id: 'FOOD_DETAILS' + this.food.data.id},
               {xtype: 'GB_QUANTITY_PANEL', min: 0, id: 'SELECT_QUANTITY_PANEL' + this.food.data.id}
               ]
    });
    gb.food.view.FoodSmallDisplayPanel.superclass.initComponent.apply(this, arguments);
  },
  getOrderQuantity: function() {
    return this.getComponent('SELECT_QUANTITY_PANEL' + this.food.data.id).getSelectedQuantity();
  }
});
Ext.reg('FoodSmallDisplay', gb.food.view.FoodSmallDisplayPanel);gb.food.view.PopupPanel = Ext.extend(Ext.Panel, {
  floating : true,
  centered: true,
  modal: true,
  cls: 'order_popup',
  padding: 10,
  width: 250,
  initComponent : function() {
    
    
    var anothercoffeeButton = Ext.create({
      xtype : 'button',
      ui : 'green',
      text : 'Order another coffee',
      handler : function() {
        Ext.dispatch({ controller : 'GB_CNTR_SELECT_COFFEE', action : 'select'});
      },
      scope : this,
      id : 'ORDER_ANOTHERCOFFEE_BUTTON'
    });    

    var orderfoodButton = Ext.create({
      xtype : 'button',
      ui : 'green',
      text : 'Order more food',
      handler : function() {
        this.hide();
        
      },
      scope : this,
      id : 'ORDERFOOD_BUTTON'
    });
    
    var finishButton = Ext.create({
      xtype : 'button',
      ui : 'green',
      text : 'Finish order',
      handler : function() {
        Ext.dispatch({ controller : 'GB_CNTR_CONFIRM_ORDER', action : 'setConfirmedOrderState' });
      },
      scope : this,
      id : 'FINISH_BUTTON'
    });
    
    Ext.apply(this, {
      items : [ {html: '<div class="gbHeading" style="padding-bottom: 8px;"><img src="images/tick2.png">Added to your cart</div>'}, anothercoffeeButton, {xtype: 'spacer', height: 10}, orderfoodButton, {xtype: 'spacer', height: 10}, finishButton]
    });
    gb.food.view.PopupPanel.superclass.initComponent.apply(this, arguments);
  }
});
Ext.reg('GB_FOOD_POPUP_PANEL', gb.food.view.PopupPanel);gb.email.view.SendEmailPanel = Ext.extend(Ext.Panel, {
  layout: 'hbox',
  width: '100%',
  initComponent : function() {
    var sendField = {
		xtype: 'emailfield', 
		width: 300, 
		name : 'email', 
		useClearIcon: true, 
		placeHolder: 'Email', 
		id: 'txt', 
		cls: 'email_send_field',
		listeners: 
		{
			change: 
			{
				element: 'el',
				fn: this.runSend,
				scope: this
			}
		}};
		
		var sendButton = Ext.create({xtype: 'button', ui: 'green', text: 'Send', handler: this.runSend, scope:this});
    
	Ext.regModel('User', 
	{
		fields : 
		{
			name : 'email',
			type : 'string'
		},
		validations :  
		{
			type : 'format',
			name : 'email',
			matcher : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
			message : "Wrong Email Format"
		}
	});
	
    Ext.apply(this, {
      cls: 'email_search_panel',
      items: [{xtype: 'spacer', width: 8}, sendField, {xtype: 'spacer', width: 8}, sendButton]
    });

    gb.email.view.SendEmailPanel.superclass.initComponent.apply(this, arguments);   
  },
  runSend: function() {
  
	Ext.getCmp('temp');
    /*var email = Ext.getCmp('txt').getValue();
	
	var model = Ext.ModelMgr.create(
	{
	  'email' : email,
	}, 'User');

	var errors = model.validate();
	
	var message = "";
	if (errors.isValid()) 
	{
		Ext.dispatch({controller: 'GB_CNTR_AUTH', action: 'processLogin', un: email});    
	}
	else 
	{
		Ext.each(errors.items, function(rec, i) 
		{
			message += rec.message + "<br>";
		});
		Ext.Msg.alert("Not Validated", message, function() {});
	}  */
  }  
});
Ext.reg('GB_SENDEMAIL_PANEL', gb.email.view.SendEmailPanel);gb.email.view.EmailScreen = Ext.extend(gb.app.view.BaseScreen, {
  layout: {
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  fullscreen: true,
  initComponent : function() {
    
    var heading = {id: 'SEND_EMAIL_HEADING', html: 'Share the Love', cls: 'gbHeading', padding: 4};
	var sub_heading = {id: 'SEND_EMAIL_SUB_HEADING', html: 'Type in a friend\'s email address and we\'ll offer them a free coffee.', cls: 'gbSubHeading.black.bold', padding: 4};
    var sendPanel = Ext.create({xtype: 'GB_SENDEMAIL_PANEL', id: 'SENDEMAIL', padding: 4});
    
    Ext.apply(this, {
      items : [{xtype: 'GB_TOPMENU'}, heading, sub_heading, sendPanel]
    });
    
    gb.email.view.EmailScreen.superclass.initComponent.apply(this, arguments);   
  },
  sendEmail: function() 
  {
//    console.log('send email');
  }
});
Ext.reg('GB_EMAILSCREEN', gb.email.view.EmailScreen);gb.geo.GeoTracker = Ext.extend(Ext.util.Observable, {
  geo : null,
  load : function() {
    this.geo = new Ext.util.GeoLocation({
      autoUpdate : false,
      listeners : {

        locationupdate : function(geo) {
          gb.geo.locationKnown = true;
          gb.geo.location = geo;
        },

        locationerror : function(geo, bTimeout, bPermissionDenied,
            bLocationUnavailable, message) {
          gb.geo.locationKnown = false;
        }
      }
    });
  },
  update : function() {
    this.geo.updateLocation();
  }
});
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
  
});gb.launcher.transact.LaunchTransaction = Ext.extend(gb.data.BaseTransaction, {
  
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
  

});gb.LoadMask = {

    mask: null,
    
    show: function() {
      if(this.mask === null) {
        this.mask = new Ext.LoadMask(Ext.getBody(), {msg:'<div class="gbHeading maskHeading">Loading... </div><div class="loadingMsg">It will only take a mo!</div>'});
      }
      this.mask.show();
    },

    hide: function() {
      this.mask.hide();
    }

};gb.loyalty.transact.GetLoyaltyCardsTransaction = Ext.extend(Ext.util.Observable, {
  
  run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'getorder'
      },
      method : 'POST',
      success : function(result, request) {
      },
      failure : function(result, request) {
      }
    });
  }
  
});Ext.regModel('GB_LOYALTY_MODEL', 
{
	fields: ['CafeFoodId', 'Name', 'Street', 'City', 'Country' , 'Qty']
});gb.loyalty.model.LoyaltyStore = new Ext.data.JsonStore(
{
    model  : 'GB_LOYALTY_MODEL',
    data: [
        {
            CafeFoodId: 1, 
			Name: 'Battuta Cafe', 
			Street: '179 Oxford Street,', 
			City: 'Darlinghurst',
			Country: 'NSW 2010',
			Qty: '4'
        },{
            CafeFoodId: 2, 
			Name: 'Bills Darlinghurs', 
			Street: 'Shop 9, 85 Boundary St,', 
			City: 'Darlinghurst',
			Country: 'NSW 2010',
			Qty: '8'
        },{
            CafeFoodId: 3, 
			Name: 'Ecabar', 
			Street: 'Shop 2, 128 Darlinghurst Rd', 
			City: 'Darlinghurst',
			Country: 'NSW 2010',
			Qty: '3'
        }
    ]
});gb.loyalty.view.BaseSelectPanel = Ext.extend(Ext.Panel, 
{
  layout: 'hbox',
  padding: 10,
  height: 80  
});gb.loyalty.view.LoyaltyScreen = Ext.extend(Ext.Panel, 
{
	layout: 
	{
		type: 'vbox',
		align: 'stretch',
		pack: 'start'
	},
	fullscreen: true,
	initComponent : function() 
	{
		var heading = {id: 'LOYALTY_CARDS_HEADING', html: 'Loyalty Cards', cls: 'gbHeading', padding: 4};
		var loyaltyList = Ext.create({xtype: 'GB_LOYALTYLIST_PANEL'});
    
		Ext.apply(this, 
		{
			items : [{xtype: 'GB_TOPMENU', hideStages: true}, heading, loyaltyList]
		});
    
		gb.loyalty.view.LoyaltyScreen.superclass.initComponent.apply(this, arguments);   
	}
});

Ext.reg('GB_LOYALTYSCREEN', gb.loyalty.view.LoyaltyScreen);gb.loyalty.view.LoyaltyListPanel = Ext.extend(Ext.Panel, 
{
	padding : 10,
	layout: 
	{
		type: 'vbox',
		align: 'stretch'
	},
	initComponent : function() 
	{
		Ext.apply(this, 
		{
			items: {xtype: 'GB_LOYALTYLIST'},
			cls: 'loyalty_list_panel'
		});
    
		gb.loyalty.view.LoyaltyListPanel.superclass.initComponent.apply(this, arguments);   
	}
});

Ext.reg('GB_LOYALTYLIST_PANEL', gb.loyalty.view.LoyaltyListPanel);gb.loyalty.view.LoyaltyCardTemplate = new Ext.XTemplate
(
    '<div style="float: left;">		<div class="cafelist_cafename">			{Name}		</div>				<div class="cafelist_cafeaddress">			{Street}		</div>		<div class="cafelist_cafeaddress">			{City}		</div>				<div class="cafelist_cafeaddress">			{Country}		</div>		</div>		<div style="float: right;">		<img height="56" src="images/loyalty.png" />			<div class="gbHeading">			{Qty} Coffees		</div>	</div>',
	{compiled: true}
);gb.loyalty.view.LoyaltyList = Ext.extend(Ext.List, 
{
	width: 350,
    height: 420,
	cls : 'loyaltylist',
	itemTpl : gb.loyalty.view.LoyaltyCardTemplate,
	store : gb.loyalty.model.LoyaltyStore
});

Ext.reg('GB_LOYALTYLIST', gb.loyalty.view.LoyaltyList);Ext.regController("GB_CNTR_TOPUP", {
  
  openTopup: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_TOPUPSCREEN', id: 'TOPUP_SCREEN'}, Ext.getBody());    
  },
  
  paypalError: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_TOPUPSCREEN', id: 'TOPUP_SCREEN'}, Ext.getBody()); 
    Ext.Msg.alert('Paypal Error', 'An error occured connecting to PayPal.', Ext.emptyFn);
  }

});Ext.regModel('GB_TOPUP_MODEL', {
    fields: ['name', 'type', 'cssClass']
});gb.topup.model.TopUpStore = new Ext.data.JsonStore({
    model  : 'GB_TOPUP_MODEL',
    data: [
        {name: 'Paypal', type: 'paypal', cssClass: 'topup_paypal'},
        {name: 'Cafe', type: 'cafe', cssClass: 'topup_credit'}
    ]
});gb.topup.transact.CreateTopupTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
    amt: null,
    loyalty: null,
    
    _run: function() {
      Ext.Ajax.request({
        url : 'ajax.php',
        params : {
          call : 'order',
          st: gb.order.controller.States.PROCESS_ORDER_VIA_CAFE_TOPUP,
          amount: this.amt,
          loyalty: this.loyalty
        },
        method : 'POST',
        success : this.success,
        failure : this.failure,
        scope: this
      });
    },

    _success: function(result, request, jsonresult) {
      gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state);
    }
    
});gb.topup.view.BaseSelectPanel = Ext.extend(Ext.Panel, {
  layout: 'hbox',
  padding: 10,
  height: 140  
});gb.home.view.TopUpScreen = Ext.extend(gb.app.view.BaseScreen, 
{
  amount: 10,
  layout: 
  {
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  initComponent : function() 
  {
    var heading = {id: 'CHOOSE_TOPUP_HEADING', html: 'Top up your credit', cls: 'gbHeading', padding: 4};
  
  var description = {id: 'HEADING_DESCRIPTION', html: 'Whoops! We\'ve got your order, but you don\'t seem to have enough coffee credit in your account.', padding: 4};  
  
  var combo_heading = {id: 'COMBO_HEADING', html : 'Top up amount' , cls: 'gbSubHeading' ,padding: 4};
  
  var combo_sub_heading = {id: 'COMBO_SUB_HEADING', html : 'Please note the minimum amount is $10', padding: 4};
  
  var payment_heading = {id: 'PAYMENT_TYPE_HEADING', html: 'Choose your payment type', cls: 'gbSubHeading', padding: 4};
  
  var amount_field = Ext.create( 
  {
        xtype: 'selectfield',
        id: 'TOP_AMOUNT_FIELD',
        width : 180,
        name: 'amount',
        options: [
          {text: '$10',   value: '10'},
          {text: '$20',   value: '20'},
          {text: '$50',   value: '50'}
        ]
  });
  amount_field.addListener('change', function(a, amount) {
    this.amount = amount;
    if(!gb.context.CONTEXT.getUser().loyaltyFree) {
      if(amount == 10) {
        Ext.getCmp('TOPUP_CHARGE').update('$0.50');
      }else if(amount == 20) {
        Ext.getCmp('TOPUP_CHARGE').update('$0.75');
      }else if(amount == 50) {
        Ext.getCmp('TOPUP_CHARGE').update('$1.00');
      }
    }else {
      Ext.getCmp('TOPUP_CHARGE').update('Free');
    }
  }, this);
  
  var check_box = new Ext.Panel(
  {
   layout: {
    type: 'hbox',
    align: 'stretch',
    pack: 'start'
  },
  items: [
    {
      xtype: 'checkboxfield',
      name: 'GO_BEAN_XTRA_CHECK_BOX',
      id: 'LOYALTY_CHECK_BOX',
      checked: true,
      width: 40,
      style: 'border: none'
    },{
      id: 'CHECK_BOX_HEADING', 
      html : 'Go Bean Xtra</div>', 
      cls: 'gbHeading' ,padding: 4
    }, {xtype: 'spacer'},
    {
      id: 'TOPUP_CHARGE', 
      html : gb.context.CONTEXT.getUser().loyaltyFree ? 'Free' : '$0.50', 
      cls: 'gbHeading' ,padding: 4
    }
  ]
  });
  
    var check_box_sub_heading = {
        id: 'CHECK_BOX_SUB_HEADING', 
        html : 'Get every 11th coffee for free, exclusive deals plus lot more! <a href="#" onclick="gb.xtra.view.show(); return false;">view details</a><hr style="border: 1px solid #ccc;">',
        padding: 4};
    
    var paymentTypePanel = Ext.create({xtype: 'GB_SELECT_TOPUP_PANEL' , id:'SELECT_TOPUP_PANEL'});
    paymentTypePanel.addListener('topupSelected', function(type) {
      if(type == "paypal") {
        gb.LoadMask.show();
        location.href='processpaypal.php?amount=' + this.amount + '&loyalty=' + this.getLoyalty();
      }else if(type == "cafe") {
        var trn = new gb.topup.transact.CreateTopupTransaction({amt:this.amount, loyalty:this.getLoyalty()});
        trn.run();
      }
    }, this);
    
    Ext.apply(this, {
          items : [{xtype: 'GB_TOPMENU', backDispatch: {controller: 'GB_CNTR_CONFIRM_ORDER', action: 'launch'},  hideStages: true}, 
                   heading, 
                   description, 
                   combo_heading, 
                   combo_sub_heading, 
                   amount_field, 
                   check_box, 
                   check_box_sub_heading,  
                   payment_heading, paymentTypePanel]
    });

    gb.home.view.TopUpScreen.superclass.initComponent.apply(this, arguments);   
  },
  getLoyalty: function() {
    return Ext.getCmp('LOYALTY_CHECK_BOX').isChecked();
  }
});

Ext.reg('GB_TOPUPSCREEN', gb.home.view.TopUpScreen);gb.topup.view.SelectTopUpPanel = Ext.extend(gb.topup.view.BaseSelectPanel, {
  cls: 'coffee_select_panel',
  types: {},
  initComponent : function() {
    var tempItems = new Array();
    
    for ( var i = 0; i < gb.topup.model.TopUpStore.getCount(); i++) {
      tempItems.push(this.createSizeItem(gb.topup.model.TopUpStore.getAt(i)));
    }
    
    Ext.apply(this, {items: tempItems});
    gb.topup.view.SelectTopUpPanel.superclass.initComponent.apply(this, arguments);   
  },
  createSizeItem: function(record) {
    var topupComp = new gb.topup.view.TopUpComponent(
        {
          type: record
    });
    topupComp.addListener('afterrender', function() {
      topupComp.el.on('tap', function() {
        if(!topupComp.isDisabled()) {
          this.selectSize(topupComp.type);
        }
      }, this);
    }, this);       
    
    this.types[record.data.type] = topupComp;
    return topupComp;
  },
  selectSize: function(record) {
    if(this.selected != null) {
      this.selected.setSelected(false);
    }
    
    if(record !== null) {
      this.selected = this.types[record.data.type];
      this.selected.setSelected(true);      
    }else {
      this.selected = null;
    }
    
    this.fireEvent('topupSelected', record.data.type);
  },
  getSelectedSize: function() {
    return this.selected.topupSize;
  }
});
Ext.reg('GB_SELECT_TOPUP_PANEL', gb.topup.view.SelectTopUpPanel);gb.topup.view.TopUpComponent = Ext.extend(Ext.Panel, {
  layout: 'vbox',
  width: 170,
  initComponent : function() {
    Ext.apply(this, {
      cls: 'topup_component ' + this.type.data.cssClass,
      items: [
              {id: this.type.data.type + '_SIZE_IMAGE', cls: 'image', width: 230, height: 140}
             ]
    });
    
    gb.topup.view.TopUpComponent.superclass.initComponent.apply(this, arguments);   
  },
  setSelected: function(sel) {
    if(sel) {
      this.getComponent(this.type.data.type + '_SIZE_IMAGE').addCls('selected');
    }else {
      this.getComponent(this.type.data.type + '_SIZE_IMAGE').removeCls('selected');
    }
    this.selected = sel;
  },
  getSize: function() {
    return this.type.data.type;
  }
});
Ext.reg('GB_TOPUPCOMPONENT', gb.topup.view.TopUpComponent);gb.home.view.TopUpConfirm = Ext.extend(Ext.Panel, 
{
  layout: 
  {
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  fullscreen: true,
  initComponent : function() 
  {
    var heading = {id: 'TOPUPCONFIRM_HEADING', html: '<p class="gbHeading">You\'re good to go</p>', padding: 4};
	
	var description = {id: 'TOPUPCONFIRM_DESCRIPTION', html: '<p><b>Thanks, your order\'s confirmed. Just head to your cafe, quote your name, top-up your account and your coffee will be made like a regular order. Hope the queue\'s not too long!</b></p>', padding: 4 , style : 'color : black'};	
	
    Ext.apply(this, 
	{
      items : [{xtype: 'GB_TOPMENU', hideStages: true}, heading, description]
    });

    gb.home.view.TopUpConfirm.superclass.initComponent.apply(this, arguments);   
  }
});

Ext.reg('GB_TOPUPCONFIRM', gb.home.view.TopUpConfirm);/**
 */
Ext.regController("GB_CNTR_MYACCOUNT", {
  
  launch: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_MYACCOUNTSCREEN', id: 'MYACCOUNT_SCREEN'}, Ext.getBody());
  }

});Ext.regModel('GB_MYACCOUNT_MODEL', {
    fields: ['name', 'size', 'cssClass']
});gb.myaccount.model.MyAccountStore = new Ext.data.JsonStore({
    model  : 'GB_MYACCOUNT_MODEL',
    data: [
        {name: 'Paypal', size: 'Paypal', cssClass: 'topup_paypal'},
        {name: 'Credit', size: 'Credit', cssClass: 'topup_credit'}
    ]
});// see server OrderJson Encoding spec:
// order/common/tech/server/OrderJsonEncoding.docx

Ext.regModel('GB_MYACC_MODEL', {
    fields: ['firstName', 'balance', 'cafe_name', 'coffeeOrders', 'foodOrders', 'total', 'description']
});


gb.myaccount.model.OrderStore = new Ext.data.JsonStore(
{
    model  : 'GB_MYACC_MODEL',
	sorters: 'Cafe',
    data: 
    [{
      
	}]
});gb.myaccount.view.BaseSelectPanel = Ext.extend(Ext.Panel, {
  layout: 'hbox',
  padding: 10,
  height: 140  
});gb.myaccount.view.MyAccountComponent = Ext.extend(Ext.Panel, {
  layout: 'vbox',
  width: 170,
  initComponent : function() {
    Ext.apply(this, {
      cls: 'myaccount_component ' + this.size.data.cssClass,
      items: [
              {id: this.size.data.size + '_SIZE_IMAGE', cls: 'image', width: 230, height: 140}
             ]
    });
    
    gb.myaccount.view.MyAccountComponent.superclass.initComponent.apply(this, arguments);   
  },
  setSelected: function(sel) {
    if(sel) {
      this.getComponent(this.size.data.size + '_SIZE_IMAGE').addCls('selected');
    }else {
      this.getComponent(this.size.data.size + '_SIZE_IMAGE').removeCls('selected');
    }
    this.selected = sel;
  },
  getSize: function() {
    return this.size.data.size;
  }
});
Ext.reg('GB_TOPUPCOMPONENT', gb.myaccount.view.MyAccountComponent);gb.myaccount.view.MyAccountTemplate = new Ext.XTemplate
(
	'<div style="float: left; ">' + 
    '<div class="gbHeading">Hello {firstName:this.getCustomerName}</div>' + 
    '<div>Your remaining credit is {balance:this.getBalance}</div>' + 
	'<div class="gbSubHeading"><hr style="border: 1px solid #ccc; width:400px;">Top up your account</div>{topup:this.getTopUpImages}' +
	'<div class="gbSubHeading"><hr style="border: 1px solid #ccc; width:400px;">Most recent orders</div>' +
	'<div class="gbBlackHeading">{cafe_name:this.getCafeName}</div></div><br>' +
	'<div style="float: left; padding-left:30px;">{coffeeItems:this.getCoffeeItemsDescription}</div><div style="float: right;">{total:this.getCoffeeItemsTotal}</div><br><div style="float: left; padding-left:30px;">{foodItems:this.getFoodItemsDescription}</div><div style="float: right;">{total:this.getFoodItemsTotal}</div><br>'
,
{
	compiled: true,
	getCustomerName: function() 
	{
		return gb.context.CONTEXT.getUser().firstName + " " + gb.context.CONTEXT.getUser().lastName;
	},
	getBalance: function() 
	{
        return Ext.util.Format.Currency(gb.context.CONTEXT.getUser().balance);
    },
	getCafeName: function() 
	{
		return gb.context.CONTEXT.getUser().mostRecentOrder.cafe.name;
    },
	getCoffeeItems: function() 
	{
		var items = gb.context.CONTEXT.getUser().mostRecentOrder.coffeeItems;
		return items.length;
    },
	getCoffeeItemsDescription: function() 
	{
		return gb.context.CONTEXT.getUser().mostRecentOrder.coffeeItems.quantity + " x " + gb.context.CONTEXT.getUser().mostRecentOrder.coffeeItems.size + " " + gb.context.CONTEXT.getUser().mostRecentOrder.coffeeItems.strength + " " + gb.context.CONTEXT.getUser().mostRecentOrder.coffeeItems.type;
    },
	getCoffeeItemsTotal: function() 
	{
		return Ext.util.Format.Currency(gb.context.CONTEXT.getUser().mostRecentOrder.coffeeItems.total);
    },
	getFoodItemsDescription: function() 
	{
		return gb.context.CONTEXT.getUser().mostRecentOrder.foodItems.quantity + " x " + gb.context.CONTEXT.getUser().mostRecentOrder.foodItems.size + " " + gb.context.CONTEXT.getUser().mostRecentOrder.foodItems.strength + " " + gb.context.CONTEXT.getUser().mostRecentOrder.foodItems.type;
    },
	getFoodItemsTotal: function() 
	{
		return Ext.util.Format.Currency(gb.context.CONTEXT.getUser().mostRecentOrder.foodItems.total);
    },
	getTopUpImages: function()
	{
		return Ext.getCmp('MY_ACCOUNT_PANEL');
	}
}
);
gb.myaccount.view.MyAccountList = Ext.extend(Ext.List, { 
    width: 350,
    height: 420,
    cls : 'myaccountlist',
    itemTpl : gb.coffee.view.OrderSummaryTemplate,
	  selModel: {
        mode: 'SINGLE',
        allowDeselect: true
    },
    indexBar: false,
    store : gb.myaccount.model.OrderStore
});
Ext.reg('GB_MYACCOUNTLIST', gb.myaccount.view.MyAccountList);gb.myaccount.view.MyAccountListPanel = Ext.extend(Ext.Panel, 
{
  padding : 10,
  layout: 
  {
    type: 'vbox',
    align: 'stretch'
  },
	initComponent : function() 
	{
		var heading = {
              id : 'MYACCOUNTSCREEN_HEADING',
              html : 'Hello ' + this.getCustomerName(),
              cls : 'gbHeading',
              padding : 4
            };

            var description = {
              id : 'HEADING_DESCRIPTION',
              html : 'Your remaining credit is ' + this.getBalance(),
              padding : 4
            };

            var topup_heading = {
              id : 'TOPUP_HEADING',
              html : '<p><hr style="border: 1px solid #ccc;">Top up your account</p>',
              cls : 'gbSubHeading',
              padding : 4,
              hidden: true
            };

            var most_recent_order = {
              id : 'MOST_RECENT_ORDER_HEADING',
              html : '<hr style="border: 1px solid #ccc;">Most recent order',
              cls : 'gbSubHeading',
              padding : 4
            };

            var most_recent_order_sub = {
              id : 'MOST_RECENT_ORDER_SUB_HEADING',
              html : this.getCafeName(),
              cls : 'gbBlackHeading',
              padding : 4
            };

            var most_recent_order_description = {
              id : 'MOST_RECENT_ORDER_DESCRIPTION',
			  width: 400,
              html : '<div style="float: left;">' + this.getCoffeeItemsDescription() + '</div><div style="float: right;">' + this.getCoffeeItemsTotal() + '</div><br><div style="float: left;">' + this.getFoodItemsDescription() + '</div><div style="float: right;">' + this.getFoodItemsTotal() + '</div>',
              padding : 4
            };

		
		Ext.apply(this, 
		{
			items: [
				heading, 
				description, 
				topup_heading,
				{xtype: 'GB_SELECT_TOPUP_PANEL', id:'SELECT_TOPUP_PANEL', hidden: true},
				most_recent_order, 
				most_recent_order_sub,
				most_recent_order_description
			],
			cls: 'myaccount_list_panel'
		});	
		
		this.addListener('afterrender', function() {this.getComponent('SELECT_TOPUP_PANEL').enableSizes(['Paypal', 'Credit']);}, this);
    
		if(this.searching) 
		{
			//Ext.apply(this, {loadingText: 'Loading, Please Wait'});
		}
    
		gb.myaccount.view.MyAccountListPanel.superclass.initComponent.apply(this, arguments);   
	},
	
	getCustomerName: function() 
	{
		return gb.context.CONTEXT.getUser().firstName + " " + gb.context.CONTEXT.getUser().lastName;
	},
	getBalance: function() 
	{
        return Ext.util.Format.Currency(gb.context.CONTEXT.getUser().balance);
    },
	getCafeName: function() 
	{
		return gb.context.CONTEXT.getUser().mostRecentOrder.cafe.name;
    },
	getCoffeeItemsDescription: function() 
	{
		return gb.context.CONTEXT.getUser().mostRecentOrder.coffeeItems.quantity + ' x ' + gb.context.CONTEXT.getUser().mostRecentOrder.coffeeItems.size + ' ' + gb.context.CONTEXT.getUser().mostRecentOrder.coffeeItems.strength + ' ' + gb.context.CONTEXT.getUser().mostRecentOrder.coffeeItems.type;
    },
	getCoffeeItemsTotal: function() 
	{
		return Ext.util.Format.Currency(gb.context.CONTEXT.getUser().mostRecentOrder.coffeeItems.total);
    },
	getFoodItemsDescription: function() 
	{
		return gb.context.CONTEXT.getUser().mostRecentOrder.foodItems.quantity + " x " + gb.context.CONTEXT.getUser().mostRecentOrder.foodItems.size + " " + gb.context.CONTEXT.getUser().mostRecentOrder.foodItems.strength + " " + gb.context.CONTEXT.getUser().mostRecentOrder.foodItems.type;
    },
	getFoodItemsTotal: function() 
	{
		return Ext.util.Format.Currency(gb.context.CONTEXT.getUser().mostRecentOrder.foodItems.total);
    },
	getTopUpImages: function()
	{
		return Ext.getCmp('MY_ACCOUNT_PANEL');
	},
	
	searchFinished: function() 
	{  
	}
});

Ext.reg('GB_MYACCOUNTLIST_PANEL', gb.myaccount.view.MyAccountListPanel);gb.myaccount.view.MyAccountScreen = Ext.extend(gb.app.view.BaseScreen, {
  layout : {
    type : 'vbox',
    align : 'stretch',
    pack : 'start'
  },
  fullscreen : true,
  initComponent : function() {
    Ext.apply(this, {
      items : [ {
        xtype : 'GB_TOPMENU',
        hideStages : true
      }, {
        xtype : 'GB_MYACCOUNTLIST_PANEL'
      } ]
    });

    gb.myaccount.view.MyAccountScreen.superclass.initComponent.apply(this, arguments);
  },
  getCustomerName : function() {
    return gb.context.CONTEXT.getUser().firstName;
  },
  getBalance : function() {
    return Ext.util.Format.Currency(gb.context.CONTEXT.getUser().balance);
  },
  getCafe : function() {
    return gb.context.CONTEXT.getUser().mostRecentOrder.cafe.name;
  }
});

Ext.reg('GB_MYACCOUNTSCREEN', gb.myaccount.view.MyAccountScreen);/**
 */
Ext.regController("GB_CNTR_ORDER", {
 
  showPopup: function(options) {
    this.popup = Ext.create({xtype: 'GB_ORDER_POPUP_PANEL'});
    this.popup.show('pop');  
  }, 
  
  hidePopup: function(options) {
    if(this.popup != null) {
      this.popup.hide(); 
    }
  },    

  removeCoffeeInPopUp: function(options) {
    this.hidePopup();
    
    var trn = new gb.coffee.transact.RemoveCoffeeTransaction({orderIndex: options.orderIndex, callback: function() {
      gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state);
      Ext.dispatch({controller: 'GB_CNTR_ORDER', action: 'showPopup', redraw: true});
    }});
    
    trn.run();
  },  
  
  removeFoodInPopUp: function(options) {
    var trn = new gb.coffee.transact.RemoveFoodTransaction({orderIndex: options.orderIndex,  callback: function() {
      gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state);
      Ext.dispatch({controller: 'GB_CNTR_ORDER', action: 'showPopup', redraw: true});
    }});
    trn.run();
  }  
    
});gb.order.controller.States = {
    
    SELECT_CAFE: 5,
    SET_CAFE: 6,

    SELECT_COFFEE: 10,
    ADD_COFFEE: 11,
    SELECT_COFFEE_REMOVE_FOOD: 12,   // on select coffee page, remove food from order action
    SELECT_COFFEE_REMOVE_COFFEE: 13,  // on select coffee page, remove coffee from order action
 
    SELECT_COFFEE_WITH_LAST_ORDER:  14,

    SELECT_FOOD: 20,
    ADD_FOOD: 21,
    SELECT_FOOD_REMOVE_FOOD: 22,   // on select coffee page, remove food from order action
    SELECT_FOOD_REMOVE_COFFEE: 23,  // on select coffee page, remove coffee from order action    
    
    ORDER_LOGIN: 30,
    ORDER_PROCESS_LOGIN: 31,
    ORDER_FORGOTPW: 32,
    ORDER_FORGOTPW_PROCESS: 33,

    ORDER_SIGNUP: 40,
    PROCESS_SIGNUP: 41,
    
    ORDER_TOP_UP: 50,
    ORDER_PROCESS_TOP_UP: 51,
    
    PAYPAL_ERROR: 55,
    
    LOAD_ORDER: 90,
    
    CONFIRM_ORDER: 100,
    CONFIRM_APPLY_PROMO: 101,
    CONFIRM_REMOVE_COFFEE: 102,
    CONFIRM_REMOVE_FOOD: 103,
    
    PROCESS_ORDER_VIA_CAFE_TOPUP: 190,
    PROCESS_ORDER: 200,
    
    getOrderStage: function(state) {
      if(state <= this.SET_CAFE) {
        return {stage: 1, msg: 'Choose your cafe'};  
      }
      if(state <= this.SELECT_COFFEE_REMOVE_COFFEE) {
        return {stage: 2, msg: 'Choose your coffee'};  
      }
      if(state >= this.SELECT_FOOD && state <= this.SELECT_FOOD_REMOVE_COFFEE) {
        return {stage: 3, msg: 'Choose your food'};  
      }
      if(state >= this.CONFIRM_ORDER && state <= this.CONFIRM_REMOVE_FOOD) {
        return {stage: 4, msg: 'Confirm your order'};  
      }
      return {stage: -1, msg: ''};  
    }
}/** */
gb.order.model.Order = Ext.extend(Ext.util.Observable, {
  
  state: gb.order.controller.States.SELECT_CAFE,
  total: 0,
  cafe: null,
  coffeeOrders: [],
  foodOrders: [],
  proposedPickup: null,
  proposedSlot: null,

  update: function(newOrder) {
    this.state = newOrder.state;
    this.total = newOrder.total;
    this.cafe = newOrder.cafe;
    this.coffeeOrders = newOrder.coffeeOrders;
    this.foodOrders = newOrder.foodOrders;
    
    this.proposedPickup = newOrder.proposedPickupTime;
    this.proposedSlot = newOrder.proposedSlot;
    
    this.fireEvent('updated');
  },
  
  getOrderStage: function() {
    return gb.order.controller.States.getOrderStage(this.state);
  }
  

});// see server OrderJson Encoding spec:
// order/common/tech/server/OrderJsonEncoding.docx

Ext.regModel('GB_ORDER_MODEL', {
    fields: ['id', 'cafe', 'coffeeOrders', 'foodOrders', 'total']
});


gb.order.model.OrderStore = new Ext.data.JsonStore(
{
    model  : 'GB_ORDER_MODEL',
	sorters: 'Cafe',
	getGroupString: function(record)
	{
        return record.get('Cafe')[0];
    },
	    
    data: 
    [{"state":null,"id":"2","total":14.5,
      "cafe":{"name":"Coffee Yes","id":"1","address":"Abbotsford", "enabled": 1},
      "coffeeOrders":[
          {"total":3.5,"idx":"rboi1","cafeCoffeeId":"1","orderReferencedId":null,"type":"Latte","size":"Small","strength":"Regular","extras":null,"sugar":"0","quantity":1,"subtotal":3.5},
          {"total":3.5,"idx":"rboi2","cafeCoffeeId":"1","orderReferencedId":null,"type":"Latte", "size":"Small","strength":"Regular","extras":null,"sugar":"0","quantity":1,"subtotal":3.5},
          {"total":3.5,"idx":"rboi3","cafeCoffeeId":"1","orderReferencedId":null,"type":"Latte","size":"Small","strength":"Regular","extras":null,"sugar":"0","quantity":1,"subtotal":3.5},
          {"total":4,"idx":"rboi4","cafeCoffeeId":"2","orderReferencedId":null,"type":"Latte","size":"Regular","strength":"Regular","extras":null,"sugar":"0","quantity":1,"subtotal":4}],
          "foodOrders":[]}]
});gb.order.transact.GetOrderTransaction = Ext.extend(Ext.util.Observable, {
  
  run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'getorder'
      },
      method : 'POST',
      success : function(result, request) {
      },
      failure : function(result, request) {
      }
    });
  }
  
});gb.order.view.OrderScreen = Ext.extend(Ext.Panel, 
{
  layout: 
  {
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  fullscreen: true,
  initComponent : function() 
  {
    var heading = {id: 'CHOOSE_ORDER_HEADING', html: 'Last Five Orders', cls: 'gbHeading', padding: 4};
		
    var orderList = Ext.create({xtype: 'GB_ORDERLIST_PANEL'});
    
    Ext.apply(this, 
	{
      items : [{xtype: 'GB_TOPMENU', hideStages: true}, heading, orderList]
    });

    gb.order.view.OrderScreen.superclass.initComponent.apply(this, arguments);   
  }
});

Ext.reg('GB_ORDERSCREEN', gb.order.view.OrderScreen);gb.order.view.OrderListPanel = Ext.extend(Ext.Panel, 
{
  padding : 10,
  layout: 
  {
    type: 'vbox',
    align: 'stretch'
  },
  initComponent : function() 
  {
    Ext.apply(this, 
	{
      items: {xtype: 'GB_ORDERLIST'},
      cls: 'order_list_panel'
    });
    
    if(this.searching) 
	{
      Ext.apply(this, {loadingText: 'Loading, Please Wait'});
    }
    
    gb.order.view.OrderListPanel.superclass.initComponent.apply(this, arguments);   
  },
  searchFinished: function() {  
  }
});

Ext.reg('GB_ORDERLIST_PANEL', gb.order.view.OrderListPanel);gb.order.view.OrderItemTemplate = new Ext.XTemplate
(
    '<div style="float: left; padding-right: 10px; padding-left:10px;">' + 
      '<img height="32" src="images/<tpl if="cafe.enabled == 1">roundtick.png</tpl><tpl if="cafe.enabled == 0">roundcross.png</tpl>"></div>' +
    
      '<div style="float: left;">' + 
        '<div class="cafelist_cafename">{cafe.name}</div></div>' + 
        '<br style="clear: both;"><tpl for="coffeeOrders"><div style="float: left; padding-left:53px;">{quantity} x {size} {strength} {type}</div><div style="float: right;">{total:this.formatCurrency}</div><br></tpl><tpl for="foodOrders"><div style="float: left; padding-left:53px;">{qty} x {name}</div><div style="float: right;">${total}</div><br></tpl>'
,

{
  compiled: true,
  formatCurrency: function(number){
     return Ext.util.Format.Currency(number);
  }
}
);
gb.order.view.OrderList = Ext.extend(Ext.List, { 
    width: 350,
    height: 420,
    cls : 'orderlist',
    itemTpl : gb.order.view.OrderItemTemplate,
    selModel: {
        mode: 'SINGLE',
        allowDeselect: true
    },
    indexBar: false,
    onItemDisclosure: {
        handler: function(record, btn, index)
  		{
  			alert('Disclose more info for ' + record.get('cafe'));
  		}
    },
    store : gb.order.model.OrderStore
});
Ext.reg('GB_ORDERLIST', gb.order.view.OrderList);gb.order.view.BaseSelectPanel = Ext.extend(Ext.Panel, {
  layout: 'hbox',
  padding: 10,
  height: 80  
});gb.order.view.SelectOrderPanel = Ext.extend(gb.order.view.BaseSelectPanel, {
  layout: 'vbox',
  padding: 10,
  cls: 'order_select_panel',
  orders: {},
  initComponent : function() {
    var tempItems = new Array();
    
    for ( var i = 0; i < gb.order.model.OrderStore.getCount(); i++) {
      tempItems.push(this.createOrderItem(gb.order.model.OrderStore.getAt(i)));
    }
    
    Ext.apply(this, {items: tempItems});
    gb.order.view.SelectOrderPanel.superclass.initComponent.apply(this, arguments);   
  },
  createOrderItem: function(record) {
    var orderComp = new gb.order.view.OrderComponent(
    {
          order: record
    });
    orderComp.addListener('afterrender', function() {
      orderComp.el.on('tap', function() {
        if(!orderComp.isDisabled()) {
          this.selectOrder(orderComp.order);
        }
      }, this);
    }, this);       
    
    this.orders[record.data.type] = orderComp;
    return orderComp;
  },
  selectOrder: function(record) {
    if(this.selected != null) {
      this.selected.setSelected(false);
    }
    if(record !== null) {
      this.selected = this.orders[record.data.type];
      this.selected.setSelected(true);
    }else {
      this.selected = null;
    }
  },
  getSelectedOrder: function() {
    return this.selected.type;
  }
});
Ext.reg('GB_SELECTORDERPANEL', gb.order.view.SelectOrderPanel);gb.order.view.OrderPopupPanel = Ext.extend(Ext.Panel, {
  floating : true,
  centered: true,
  modal: true,
  cls: 'order_popup',
  padding: 10,
  width: 300,
  initComponent : function() {
    Ext.apply(this, { items: [{xtype: 'GB_ORDER_SUMMARY'}] });
    gb.order.view.OrderPopupPanel.superclass.initComponent.apply(this, arguments);
  },
  refreshOrder: function() {
  }
});
Ext.reg('GB_ORDER_POPUP_PANEL', gb.order.view.OrderPopupPanel);// see server OrderJson Encoding spec:
// order/common/tech/server/OrderJsonEncoding.docx

Ext.regModel('GB_ORDER_MODEL', {
    fields: ['id', 'cafe', 'coffeeOrders', 'foodOrders', 'total']
});


gb.order.ErrorMessageDisplay = {
    
    messages: {
      100: {msg: 'Cafe Offline.', autopopup: true, route: null},
      101: {msg: 'Please choose a cafe.', autopopup: true, route: null},
      
      200: {msg: 'Please select a coffee', autopopup: true, route: null},
      201: {msg: 'Please select the desired food', autopopup: true, route: null},
      202: {msg: 'Some of your chosen food items are no longer available.', autopopup: true, route: null},
      
      300: {msg: 'Promo voucher expired.', autopopup: true, route: null},
      301: {msg: 'Promo voucher has already been used.', autopopup: true, route: null},
      302: {msg: 'Promo voucher already applied to order.', autopopup: true, route: null},
      303: {msg: 'Promo voucher not found.', autopopup: true, route: null},
      304: {msg: 'That promo code not be used with this order.', autopopup: true, route: null},
      
      400: {msg: 'Some of your chosen food items are no longer available.', autopopup: true, route: null},
      
      500: {msg: 'The chosen cafe is busy at that time. Please shoose a  new time.', autopopup: true, route: null},      
      
      700: {msg: 'Login failed, please check your email and password.', autopopup: true, route: null},
      
      900: {msg: 'Hi, it looks like you already have an account with us.', autopopup: true, route: null},      
      901: {msg: 'That mobile number is already in use by a Go Bean customer.', autopopup: true, route: null},
      
      2000: {msg: 'The cafe is busy at that time.', autopopup: false, route: null},      
      2010: {msg: 'The cafe is all booked out for the next half hour. You might want to try a different cafe!', autopopup: true, route: null}            
    },
    
    displayMessages: function(codes) {
      // build simgle html block and display.
      for ( var i = 0; i < codes.length; i++) {
        this.displayMessage(codes[i]);
      }
    },
    
    displayMessage: function(code) {
      if(code in this.messages){
        if('route' in this.messages[code] && this.messages[code].route != null) {
          Ext.Dispatch(this.messages[code].route);
        }else if('autopopup' in this.messages[code] && this.messages[code].autopopup) {
          Ext.Msg.alert('Error', this.messages[code].msg, Ext.emptyFn);
        }
      }else {
        Ext.Msg.alert('Error', 'An error occured. Code: ' + code, Ext.emptyFn);
      }
    }
    
    
    
    
};gb.order.FeebackMessagesConversion = {
    
    getMessage: function(code) {
      return code;
    }
    
};gb.order.transact.GetOrderTransaction = Ext.extend(Ext.util.Observable, {
  
  run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'getorder'
      },
      method : 'POST',
      success : function(result, request) {
      },
      failure : function(result, request) {
      }
    });
  }
  
});/**
 */
Ext.regController("GB_CNTR_CONFIRM_ORDER", {
  
  launch: function() {
    this.setConfirmedOrderState();
  },

  setConfirmedOrderState: function() {
    var trn = new gb.confirmorder.transact.SetConfirmOrderTransaction();
    trn.run();
  },
  
  
  open: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_CONFIRMSCREEN', id: 'CONFIRM_ORDER_SCREEN'}, Ext.getBody());
  },
  
  applyPromo: function(options) {
    var trn = new gb.confirmorder.transact.ApplyPromoTransaction({promoCode: options.promoCode, 
      callback: options.callback, callbackScope: options.callbackScope});
    trn.run();
  },
  
  confirmOrder: function(options) {
    var trn = new gb.confirmorder.transact.ConfirmOrderTransaction({offset: options.offset});
    trn.run();
  },  
  
  displayStacked: function() {http://localhost:8888/js/min.js
    Ext.getBody().update('');
    this.render({xtype: 'GB_STACKED', id: 'STACKED_SCREEN'}, Ext.getBody());
  },
  
  confirmNewTime: function() {
    var trn = new gb.confirmorder.transact.ConfirmOrderTransaction({slot: gb.context.CONTEXT.getOrder().proposedSlot});
    trn.run();
  }    
  
  
});gb.confirmorder.transact.ApplyPromoTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  promoCode: null,
  
  _run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: gb.order.controller.States.CONFIRM_APPLY_PROMO,
        code: this.promoCode
      },
      method : 'POST',
      success : this.success,
      failure : this.failure,
      scope: this
    });
  },
  
  _success: function(result, request, jsonresult) {
    this.callback.call(this.callbackScope, jsonresult);
  }
  
}); gb.confirmorder.transact.ConfirmOrderTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  offset: null,
  slot: null,
  
  _run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: gb.order.controller.States.PROCESS_ORDER,
        delay: this.offset,
        slot: this.slot
      },
      method : 'POST',
      success : this.success,
      failure : this.failure,
      scope: this
    });
  },
  
  _success: function(result, request, jsonresult) {
    
    if('confirmedOrder' in jsonresult) {
      gb.context.CONTEXT.getUser().confirmedOrder = jsonresult.confirmedOrder;  
      if('loyaltyCard' in jsonresult) {
        gb.context.CONTEXT.getUser().confirmedOrder.loyaltyCard = jsonresult.loyaltyCard; 
      }
      gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state);
    }else if('errorCodes' in jsonresult && jsonresult.errorCodes.length > 0 &&
      jsonresult.errorCodes.indexOf(2000) >= 0) { // NEW TIME
      Ext.dispatch({controller: 'GB_CNTR_CONFIRM_ORDER', action: 'displayStacked'});
    } else {
      gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state);  
    }
    
  }
  
}); gb.confirmorder.transact.SetConfirmOrderTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  _run: function() {
    Ext.Ajax.request({
      url : 'ajax.php',
      params : {
        call : 'order',
        st: gb.order.controller.States.CONFIRM_ORDER
      },
      method : 'POST',
      success : this.success,
      failure : this.failure,
      scope: this
    });
  },
  
  _success: function(result, request, jsonresult) {
    if('user' in jsonresult) {
      gb.context.CONTEXT.getUser().update(jsonresult.user);
    };
    gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state);
  }
  
}); gb.confirmorder.view.ConfirmScreen = Ext.extend(gb.app.view.BaseScreen,
{
	layout: 
	{
		type: 'vbox',
		align: 'stretch',
		pack: 'start'
	},
	initComponent : function() 
	{
		
	  var heading = Ext.create({xtype: 'panel', html: 'Confirm your order', cls: 'gbHeading', padding: 10});
	  this.pickup = Ext.create({xtype: 'GB_PICKUP_PANEL'});
	  var voucher = Ext.create({xtype: 'GB_VOUCHER_PANEL'});
	  var confirmAndBalance = Ext.create({xtype: 'GB_BALANCE_PANEL'});
	  this.orderTable = Ext.create({xtype: 'GB_ORDER_SUMMARY', padding: 10});
	  var terms = Ext.create({xtype: 'GB_TERMS_PANEL'});
	  
	  voucher.on('applied', this.voucherApplied, this);
	  
	  var buttonText = this.getButtonText();
	  this.button = Ext.create({xtype: 'button', ui: 'green', text: buttonText, handler: this.confirmOrder, scope: this});
	  var confirm = Ext.create({xtype: 'panel', padding: 20, layout: 'hbox', items:[{xtype: 'spacer'},this.button,{xtype: 'spacer'}]});
	  
	  Ext.apply(this, 
		{
			items : [{xtype : 'GB_TOPMENU', backDispatch: {controller: 'GB_CNTR_SELECT_FOOD', action: 'select'}}, 
			         heading, this.pickup, voucher, confirmAndBalance, this.orderTable, terms, confirm]
		});
    
		gb.confirmorder.view.ConfirmScreen.superclass.initComponent.apply(this, arguments);   
	},
	voucherApplied: function() {
	  this.orderTable.refreshOrder();
	  this.button.update(this.getButtonText());
	},
	getButtonText: function() {
	   if(gb.context.CONTEXT.getUser().balance < gb.context.CONTEXT.getOrder().total) {
	      return "Topup";
	   }
	   return "Confirm";
	},
	confirmOrder: function() {
	  var offset = this.pickup.getOffset();
	  Ext.dispatch({controller: 'GB_CNTR_CONFIRM_ORDER', action:'confirmOrder', offset: offset})
	}
});

Ext.reg('GB_CONFIRMSCREEN', gb.confirmorder.view.ConfirmScreen);gb.confirmorder.view.ConfirmAndBalance = Ext.extend(Ext.Panel, {
  layout : {
    type : 'vbox',
    align : 'stretch',
    pack : 'start'
  },
  padding: 10,
  initComponent : function() {
    var heading = Ext.create({
      xtype : 'panel',
      html : '<div class="gbSubHeading">Please confirm your order</div><div>Your current balance is: <span class="gbSubHeading bold">$' +  gb.context.CONTEXT.getUser().balance + '</span></div>'
    });

    Ext.apply(this, {
      items : [ heading ]
    });

    gb.confirmorder.view.ConfirmAndBalance.superclass.initComponent.apply(this,
        arguments);
  }
});

Ext.reg('GB_BALANCE_PANEL', gb.confirmorder.view.ConfirmAndBalance);gb.confirmorder.view.PickupPanel = Ext.extend(Ext.Panel, {
  layout : {
    type : 'vbox',
    align : 'stretch',
    pack : 'start'
  },
  padding: 10,
  cls: 'base_select_panel',
  initComponent : function() {
    var heading = Ext.create({
      xtype : 'panel',
      html : 'Please select your pick up time'
    });

    this.time = new Ext.form.Select({
      name: 'pickup',
      options : [ 
      {
        text : 'ASAP',
        value : '10'
      }, {
        text : '15 minutes',
        value : '15'
      }, {
        text : '20 minutes',
        value : '20'
      } ]
    });
    
    var timeWrapper = Ext.create({xtype: 'panel', layout: 'hbox', items: [this.time]});
    

    Ext.apply(this, {
      items : [ heading, timeWrapper ]
    });

    gb.confirmorder.view.PickupPanel.superclass.initComponent.apply(this,
        arguments);
  },
  getOffset: function() {
    return this.time.getValue();
  }
});

Ext.reg('GB_PICKUP_PANEL', gb.confirmorder.view.PickupPanel);gb.confirmorder.view.TermsPanel = Ext.extend(Ext.Panel, {
  layout : {
    type : 'vbox',
    align : 'stretch',
    pack : 'start'
  },
  padding: 10,
  initComponent : function() {
    var heading = Ext.create({
      xtype : 'panel',
      html : 'By proceeding I agree to the Terms and Conditions'
    });

    Ext.apply(this, {
      items : [ heading ]
    });

    gb.confirmorder.view.TermsPanel.superclass.initComponent.apply(this,arguments);
  }
});

Ext.reg('GB_TERMS_PANEL', gb.confirmorder.view.TermsPanel);gb.confirmorder.view.VoucherPanel = Ext.extend(Ext.Panel, {
  layout : {
    type : 'vbox',
    align : 'stretch',
    pack : 'start'
  },
  padding: 10,
  cls: 'base_select_panel',
  initComponent : function() {
    
    var heading = Ext.create({
      xtype : 'panel',
      html : 'If you have a voucher number, please enter it here.'
    });
    
    this.voucherField = Ext.create({xtype: 'textfield', id:'ORDER_VOUCHER', cls: 'order_voucher', width: 180});
    var apply = Ext.create({xtype: 'button', ui: 'green', text: 'Apply', scope: this, handler: this.applyVoucher});
    
    var applyPanel = Ext.create({xtype: 'panel', layout: 'hbox', items:[this.voucherField,{xtype: 'spacer', width: 8},apply,{xtype: 'spacer'}]});
    
   var kapowPanel = Ext.create({xtype: 'panel', cls: 'greenText', id: 'KAPOWPANEL',
      html: '<br><b>Kapow! It\'s done. Your free coffee awaits.</b><br>(Weird how the free ones always taste best!)', hidden: true});
    
    Ext.apply(this, {
      items : [ heading, applyPanel, kapowPanel]
    });

    gb.confirmorder.view.VoucherPanel.superclass.initComponent.apply(this, arguments);
  },
  applyVoucher: function() {
    var code = this.voucherField.getValue();
    if (code !== null && code != '') {
      Ext.dispatch({controller: 'GB_CNTR_CONFIRM_ORDER', action:'applyPromo', promoCode: code, 
        callback: this.processVoucherResult, callbackScope: this});
    }else {
      Ext.Msg.alert('Error', 'Please enter a valid voucher code.', Ext.emptyFn);
    }
  },
  processVoucherResult: function(jsonResult) {
    
    if('feedbackCodes' in jsonResult && jsonResult.feedbackCodes.length > 0 ) {
      if(jsonResult.feedbackCodes.indexOf(300) >= 0) {
        this.displayKapow();
        this.fireEvent('applied');
      }
    }
  },
  displayKapow: function() {
    this.getComponent('KAPOWPANEL').setVisible(true);
    this.voucherField.update('');
    this.doComponentLayout();  
    
  }
});
Ext.reg('GB_VOUCHER_PANEL', gb.confirmorder.view.VoucherPanel);gb.confirmorder.view.Stacked = Ext.extend(gb.app.view.BaseScreen, {
  
	initComponent : function() 
	{
		var heading = {
			id: 'STACKED_HEADING', html: '<p class="gbHeading">Stacked</p>', padding: 4
		};
		
		var thtml = '<p>Your cafe is pretty stacked at the mo. ' +
    'Sorry, but the earliest we can get the coffee to you is  ' +
    '<span class="gbSubHeading">';
		
		thtml += gb.context.CONTEXT.getOrder().proposedPickup;
		thtml += '</span> Is this OK?</p><br>';
		
		var description = {
			id: 'STACKED_DESCRIPTION', html: thtml, padding: 4
		};
		
		var buttons = new Ext.Panel({
				layout: {
					type: 'hbox'
				},
				padding: 10,
				items: [
				{
					xtype: 'spacer'
				},{
					xtype : 'button',
					text: 'Change Cafe',
					ui: 'black',
					handler: function() {
					  Ext.dispatch({controller: 'GB_CNTR_CAFE', action:'launch'});
					}
				},{
					html: '&nbsp;&nbsp;'
				},{
					xtype : 'button',
					text: 'OK',
					ui: 'green',
          handler: function() {
            Ext.dispatch({controller: 'GB_CNTR_CONFIRM_ORDER', action:'confirmNewTime'});
          }
				}]
			})
		
		Ext.apply(this, 
		{
			items : [{xtype : 'GB_TOPMENU', backDispatch:  {controller: 'GB_CNTR_CONFIRM_ORDER', action: 'launch'}}, heading, description, 
			{
				xtype: 'spacer'
			}, buttons]
		});
    
		gb.confirmorder.view.Stacked.superclass.initComponent.apply(this, arguments);   
	}
});

Ext.reg('GB_STACKED', gb.confirmorder.view.Stacked);/**
 */
Ext.regController("GB_CNTR_CONFIRMED_ORDER", {
  
  launch: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_CONFIRMED_PANEL', id: 'CONFIRMED_ORDER_SCREEN'}, Ext.getBody());
  },

  launchTopup: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_CONFIRMED_TOPUP_PANEL', id: 'CONFIRMED_ORDER_SCREEN'}, Ext.getBody());
  }
});gb.confirmed.view.OrderConfirmedScreen = Ext.extend(gb.app.view.BaseScreen, 
{
  layout: 
  {
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  initComponent : function() 
  {
    var heading = {
      id: 'THANKYOU_HEADING', html: '<p class="gbHeading">You\'re good to go</p>', padding: 4
    };
    
    var theHtml = '<div>Thanks for your order.</div>';
    theHtml += '<div class="greenText bold">Your coffee will be ready after ' +  gb.context.CONTEXT.getUser().confirmedOrder.approvedPickupTime + '.</div><br>';
    theHtml += '<div>We\'ll also remember your order, so next time will only take a couple of taps to grab your coffee.</div><br>';
    
    
    var loyaltyCard = '<div class="loyaltyCard">';
    loyaltyCard += '<div><div><table class="loyaltytable" width="100%"><tr><td align="center" class="gbHeading">LOYALTY CARD</td></tr><tr>';
    loyaltyCard += '<td align="center">' + gb.context.CONTEXT.getUser().confirmedOrder.cafe.name + '</td></tr><tr><td align="center">' + gb.context.CONTEXT.getUser().confirmedOrder.cafe.address + '</td></tr></table></div>';
    
    
    loyaltyCard += '<div class="img">';
    for ( var i = 1; i <= 10; i++) {
      if (gb.context.CONTEXT.getUser().confirmedOrder.loyaltyCard.stamps >= i) {
        loyaltyCard += '<div class="stamp"><img src="images/beanstamp.png"></div>';
      }else {
        loyaltyCard += '<div class="stamp"><img src="images/emptystamp.png"></div>';
      }
      if(i % 3 == 0) {
        loyaltyCard += '</div><div style="clear: left;"></div><div class="img">';
      }
    }
    
    if(gb.context.CONTEXT.getUser().confirmedOrder.loyaltyCard.loyaltyCoffee) {
      loyaltyCard += '<div class="stamp"><img src="images/free.png"></div><div class="greenText">Your next coffee is on us.</div>';  
    }else {
      loyaltyCard += '<div class="stamp"></div><div class="stamp"></div>';
    }
    loyaltyCard += '<br style="clear: both;" /></div>';
    
    
    var description = {
        id: 'THANKYOU_DESCRIPTION', 
        html: theHtml + loyaltyCard, 
        padding: 4
    };
    Ext.apply(this, 
    {
      items : [{xtype: 'GB_TOPMENU', hideCart: true, backDispatch: {controller: 'GB_CNTR_LAUNCH', action: 'launch'}, backText: 'New Order'}, heading, description]
    });
    
    gb.confirmed.view.OrderConfirmedScreen.superclass.initComponent.apply(this, arguments);   
  }
});

Ext.reg('GB_CONFIRMED_PANEL', gb.confirmed.view.OrderConfirmedScreen);gb.confirmed.view.OrderConfirmedViaCafeTopupScreen = Ext.extend(gb.app.view.BaseScreen, 
{
  layout:{
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  initComponent : function() 
  {
    var heading = {
      id: 'THANKYOU_HEADING', html: '<p class="gbHeading">You\'re good to go</p>', padding: 4
    };
    var description = {
      id: 'THANKYOU_DESCRIPTION', html: '<p>Thanks, your order\'s confirmed. Just head to your cafe, quote your name, top-up your account and your coffee will be made like a regular order. Hope the queue\s not too long!</p>'
      , padding: 4
    };
    Ext.apply(this, {
      items : [{xtype: 'GB_TOPMENU',backDispatch: {controller: 'GB_CNTR_LAUNCH', action: 'launch'}, backText: 'New Order' }, heading, description]
    });
    
    gb.confirmed.view.OrderConfirmedViaCafeTopupScreen.superclass.initComponent.apply(this, arguments);   
  }
});

Ext.reg('GB_CONFIRMED_TOPUP_PANEL', gb.confirmed.view.OrderConfirmedViaCafeTopupScreen);


/**
 */
Ext.regController("GB_CNTR_LAST5", {
  
  launch: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_LAST5SCREEN', id: 'LAST5_SCREEN'}, Ext.getBody());
  },

  selectLast5Order: function(options) {
    var id = options.orderId;
    var trn = new gb.last5.transact.SelectOrderTransaction({id: id});
    trn.run();
  }

});gb.last5.model.Last5Store = new Ext.data.JsonStore({
    model  : 'GB_ORDER_MODEL',
      
    updateLast5: function(last5Orders) {
      this.clearData();
      this.fireEvent('dataChanged');
      for ( var i = 0; i < last5Orders.length; i++) {
        var order = Ext.ModelMgr.create(last5Orders[i], 'GB_ORDER_MODEL', last5Orders[i].id);
        this.add(order);
      }
    } 
    
});gb.last5.transact.SelectOrderTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
    
    id: null,
    
    _run: function() {
      Ext.Ajax.request({
        url : 'ajax.php',
        params : {
          call : 'order',
          st: gb.order.controller.States.LOAD_ORDER,
          orderid: this.id
        },
        method : 'POST',
        success : this.success,
        failure : this.failure,
        scope: this
      });
    },

    _success: function(result, request) {
      gb.context.NAVIGATION.navigateToOrderScreen(gb.context.CONTEXT.getOrder().state, null);
    },
    
    _failure: function() {
      this.error('Error selecting order. Please check your phone signal and try again.')
    }
    
});gb.last5.view.Last5OrderTemplate = new Ext.XTemplate
(
    '<div style="float: left; padding-right: 10px; padding-left:10px;">' + 
      '<img height="32" src="images/<tpl if="cafe.active == 1">roundtick.png</tpl><tpl if="cafe.active == 0">roundcross.png</tpl>"></div>' +
    
      '<div style="float: left;">' + 
        '<div class="cafelist_cafename">{cafe.name}</div></div>' + 
        '<br style="clear: both;"><tpl for="coffeeOrders"><div style="float: left; padding-left:53px;">{quantity} x {size} {strength} {type}</div><div style="float: right;">{total:this.formatCurrency}</div><br></tpl><tpl for="foodOrders"><div style="float: left; padding-left:53px;">{quantity} x {name}</div><div style="float: right;">{total:this.formatCurrency}</div><br></tpl>'
,

{
  compiled: true,
  formatCurrency: function(number){
     return Ext.util.Format.Currency(number);
  }
}
);
gb.last5.view.OrderList = Ext.extend(Ext.List, { 
    cls : 'orderlist',
    itemTpl : gb.last5.view.Last5OrderTemplate,
    selModel: {
        mode: 'SINGLE'
    },
    indexBar: false,
    store : gb.last5.model.Last5Store
});
Ext.reg('GB_LAST5LIST', gb.last5.view.OrderList);gb.order.view.OrderScreen = Ext.extend(gb.app.view.BaseScreen, {
  layout : {
    type : 'vbox',
    align : 'stretch',
    pack : 'start'
  },
  fullscreen : true,
  initComponent : function() {
    var heading = {
      id : 'LAST_5_HEADING',
      html : 'Repeat previous orders',
      cls : 'gbHeading',
      padding : 4
    };
    var orderList = Ext.create({
      xtype : 'GB_LAST5LIST',
      listeners: {
        itemtap: this.selectOrder,
        scope: this
      }
    });
    Ext.apply(this, {
      items : [ {xtype: 'GB_TOPMENU', hideCart: true,
        backText: 'Start new order', backDispatch: {controller: 'GB_CNTR_CAFE', action: 'launch'}, 
        hideStages: true}, heading, orderList]
    });
    gb.order.view.OrderScreen.superclass.initComponent.apply(this, arguments);
  },
  selectOrder : function(list, subIdx) {

    var order = list.getStore().getAt(subIdx);
    
    if (order.data.cafe.active) {
      Ext.dispatch({
        controller: 'GB_CNTR_LAST5',
        action: 'selectLast5Order',
        orderId: order.data.id
      });      
    }
    
  }
});

Ext.reg('GB_LAST5SCREEN', gb.order.view.OrderScreen);gb.top.view.TopMenu = Ext.extend(Ext.Panel, 
{
	hideStages: false,
	backDispatch: null,
	backText: 'Back',
	hideCart: false,
	layout: 
	{
		type: 'vbox',
		align: 'stretch',
		pack: 'start'
	},
	invisibleButton: function(){
		
		var button = Ext.getCmp('backButton');
		button.setVisible(false);
	},
	
	initComponent : function() {
	 	var topPanel = Ext.create({xtype: 'GB_TOP_PANEL', hideStages: this.hideStages});
		var backButton = new Ext.Button(
		{
			text: this.backText,
			ui: 'back',
			handler: function() {				
			  Ext.dispatch(this.backDispatch);
			},
			scope: this,
			hidden: (this.backDispatch==null)
		});
		
		var actionButton = Ext.create({xtype: 'GB_TOP_CARTBUTTON', hidden: this.hideCart}); 
		
		var toolBar = new Ext.Toolbar(
		{
			ui: 'green',
			style: "border-top: 1px solid #704A35;",
            dock: 'top',
            items: [backButton, {xtype: 'spacer'}, actionButton]
		});
		
		Ext.apply(this, 
		{
			items : [topPanel, toolBar]
		});
    
		gb.top.view.TopMenu.superclass.initComponent.apply(this, arguments);   
	}
});

Ext.reg('GB_TOPMENU', gb.top.view.TopMenu);gb.top.view.CartButton = Ext.extend(Ext.Button, {
  ui: 'green',
  iconMask: true, 
  iconCls: 'cart',
  initComponent : function()  {
    gb.context.CONTEXT.getOrder().addListener('updated', function() {
      this.update('&nbsp;' + Ext.util.Format.Currency(gb.context.CONTEXT.getOrder().total));
    }, this);
    
    Ext.apply(this, {
      text: '&nbsp;' + Ext.util.Format.Currency(gb.context.CONTEXT.getOrder().total),
      handler: this.showOrderPopup
    });
    
    gb.top.view.CartButton.superclass.initComponent.call(this, arguments);
  },
  showOrderPopup: function() {
    Ext.dispatch({controller: 'GB_CNTR_ORDER', action: 'showPopup'});
  }
});
Ext.reg('GB_TOP_CARTBUTTON', gb.top.view.CartButton);/**
 * 
 */
gb.top.view.TopPanel = Ext.extend(Ext.Panel, {
  layout : 'hbox',
  hideStages: false,
  initComponent : function() {	 	  
    var titems = new Array();
    var imagePanel = new Ext.Panel({html: '<a href="#" onclick="Ext.dispatch({controller: \'GB_CNTR_CAFE\', action: \'launch\'}); return false;"><img src="images/mlogo.png" height="35px"/></a>'});
    titems.push(imagePanel);
    titems.push({xtype: 'spacer'});
    
  	if(gb.order.controller.States.getOrderStage(gb.context.CONTEXT.getOrder().state).stage > 0 && !this.hideStages) {
  	  var htmlPanel = new Ext.Panel({		
  	    layout: 'vbox', 
  	    padding: 4,
  	    html:'<div style="float:right; color:#704A35;"><b>Step ' + gb.context.CONTEXT.getOrder().getOrderStage().stage +' of 4 </b></div> <br />  <div style="float:right;font-size:8px; color:#3cb03e;"><b>'+ gb.context.CONTEXT.getOrder().getOrderStage().msg + '</b></div>'});
  	  titems.push(htmlPanel);
  	}
  	
  	Ext.apply(this, {
  	      cls: 'cafe_search_panel',
  	      items: titems
  	});	
  	gb.top.view.TopPanel.superclass.initComponent.apply(this,arguments);
  } 
  
});
Ext.reg('GB_TOP_PANEL', gb.top.view.TopPanel);gb.messagescreen.view.Gremlins = Ext.extend(Ext.Panel, 
{
	layout: 
	{
		type: 'vbox',
		align: 'stretch',
		pack: 'start'
	},
	initComponent : function() 
	{
		var heading = {
			id: 'GREMLINS_HEADING', html: '<p class="gbHeading">Gremlins</p>', padding: 4
		};
		
		var description = {
			id: 'GREMLINS_DESCRIPTION', html: '<p><b>Yikes!We\'ve got gremlins. Please bear with us while we sort things out. If thins are\'nt ship shape soon,</b></p> <a href="#" class="gbSubHeading">let us know.</a>', padding: 4
		};
		
		Ext.apply(this, 
		{
			items : [heading, description]
		});
    
		gb.messagescreen.view.Gremlins.superclass.initComponent.apply(this, arguments);   
	}
});

Ext.reg('GB_GREMLINS', gb.messagescreen.view.Gremlins);gb.messagescreen.view.Noluck = Ext.extend(Ext.Panel, 
{
	layout: 
	{
		type: 'vbox',
		align: 'stretch',
		pack: 'start'
	},
	initComponent : function() 
	{
		var heading = {
			id: 'NOLUCK_HEADING', html: '<p class="gbHeading">No luck</p>', padding: 4
		};
		
		var description = {
			id: 'NOLUCK_DESCRIPTION', html: '<p><b>Grrr. Sorry my friend, there aren\'t any Go Bean Cafe\'s near you at the moment. But why not tell your favourite cafe about us and they might sign up.</b></p>', padding: 4
		};
		
		Ext.apply(this, 
		{
			items : [heading, description]
		});
    
		gb.messagescreen.view.Noluck.superclass.initComponent.apply(this, arguments);   
	}
});

Ext.reg('GB_NOLUCK', gb.messagescreen.view.Noluck);/**
 * Active user is stored on the gb application context
 */
gb.user.model.User = Ext.extend(Ext.util.Observable, {

	firstName: null,
	lastName: null,
	balance: null,
	loyaltyActive: null,
	userid: null,
	mostRecentOrder: null, 
	confirmedOrder: null,
  
	update: function(newUser) 
  {
    this.balance = newUser.balance;
    this.firstName = newUser.firstName;
    this.lastName = newUser.lastName;
    this.loyaltyActive = newUser.loyaltyActive;
    this.loyaltyFree = newUser.loyaltyFree;
    this.userid = newUser.userid;
    if('mostRecentOrder' in newUser) {
    	this.mostRecentOrder = newUser.mostRecentOrder;
    }
    if('confirmedOrder' in newUser) {
      this.confirmedOrder = newUser.confirmedOrder;
    }    
    this.fireEvent("updated");
  }

});

Ext.reg('GB_USERMODEL', gb.user.model.User);gb.user.transact.GetUserTransaction = Ext.extend(Ext.util.Observable, {
  
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
  
});// plug European currency renderer into formatter
Ext.util.Format.Currency = function(v)
{
  v = (Math.round((v-0)*100))/100;
  v = (v == Math.floor(v)) ? v + ".00" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
  return ('$' + v);
};/**
 * 
 */
 
gb.cafe.view.QuantityPanel = Ext.extend(Ext.Panel, {
  layout: 'hbox',
  min: 0,
  max: 5,
  initComponent : function() {
    this.value = "0";
    
	  var plusButton = Ext.create({xtype: 'button', ui: 'green', text: '+', handler: this.runPlus, scope: this});
    this.quantityField = Ext.create({xtype:'panel', html: this.value, cls: 'quantity_box'});
    var minusButton = Ext.create({xtype: 'button', ui: 'green', text: '-', handler: this.runMinus, scope:this});
	
  	Ext.apply(this, {
  	      cls: 'cafe_search_panel',
  	      items: [
  	              {xtype: 'spacer'},
  	              {html:'Quantity '}, 
  	              {xtype: 'spacer', width: 14}, 
  	              minusButton,
  	              {xtype: 'spacer', width: 8},
  	              this.quantityField, 
  	              {xtype: 'spacer', width: 8},
  	              plusButton 
  	              ]
  	});	
    gb.cafe.view.QuantityPanel.superclass.initComponent.apply(this,arguments);
  },
  
  runPlus : function()
  {	  
	  intvalue = parseInt(this.value);	  
	  var newVal = intvalue+1;
	  if(newVal <= this.max) {
	    this.value = newVal;
	    this.quantityField.update(this.value);
	  }
  },
  
  runMinus : function()
  { 
      intvalue = parseInt(this.value);      
      if(intvalue > this.min)
      {
    	  	var newVal = intvalue-1;
    	    this.value = newVal;
    	    this.quantityField.update(this.value);
      }        
  },
  getSelectedQuantity: function() {
   return this.value
  }
});
Ext.reg('GB_QUANTITY_PANEL', gb.cafe.view.QuantityPanel);gb.xtra.view.XtraPopupPanel = Ext.extend(Ext.Panel, {
  floating : true,
  centered: true,
  modal: true,
  padding: 10,
  width: 250,
  height: 150,
  cls: 'order_popup',  
  initComponent : function() {
    
    Ext.apply(this, {
      items : [ {html: 'Go Bean Xtra, your loyalty coffees await!'}]
    });
    
    gb.auth.view.WelcomePopupPanel.superclass.initComponent.apply(this, arguments);
  }
});
Ext.reg('GB_XTRA_POPUP_PANEL', gb.xtra.view.XtraPopupPanel);
gb.xtra.view.show = function() {
  var popup = Ext.create({xtype: 'GB_XTRA_POPUP_PANEL'});
  popup.show('pop');  
};