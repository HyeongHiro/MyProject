gb.auth.view.SignUpScreen = Ext.extend(gb.app.view.BaseScreen, {
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

Ext.reg('GB_SIGNUPSCREEN', gb.auth.view.SignUpScreen);