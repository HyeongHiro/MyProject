/**
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
Ext.reg('GB_LOGINSCREEN', gb.cafe.view.LoginScreen);