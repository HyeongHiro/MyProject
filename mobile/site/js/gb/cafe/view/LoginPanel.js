/**
 * 
 */

gb.cafe.view.LoginPanel = Ext.extend(Ext.Panel, {

	id : 'LOGINPANEL',
	layout: {
	    type: 'vbox',
	    align: 'stretch',
	    pack: 'start'
	  },
	  
	constructor : function(options) {
		gb.cafe.view.LoginPanel.superclass.constructor.call(this, options);
	},

	initComponent : function() {
		
		var heading = {html: 'Almost there...', padding: 4};
		var textPartOne = {html: 'Now you just need to login or sign up so we can get things going.', padding: 4};
		 
		
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
				items: [
		                {
		                    xtype: 'fieldset',		                   
		                    defaults: {
		                        required: true,
		                        labelAlign: 'left',
		                        labelWidth: '6%'
		                    },
		                    items: [
		                     {
		                    	 id: 'emailfield',
		                    	 xtype: 'emailfield',
		                    	 name : 'email',
		                    	 label: 'Email',	
		                    	 placeHolder: 'you@sencha.com',
		                    	 useClearIcon: true
		                    	  
		                     },
		                     {
		                    	 id:'passwordfield',
		                        xtype: 'passwordfield',
		                        name : 'password',
		                        label: 'Password',
		                        useClearIcon: false		                      
		                    }
		                     ]
		                }
		            ]				
		};
		
		var textPartTwo = {html: 'Forgtten your Password? Click here to retreive it.', padding: 4};	
		
		var logingButtonPanel = Ext.create({xtype: 'GB_LOGINBUTTON_PANEL', padding: 4});
		
		
		Ext.apply(this, {
			fullscreen : true,
			items : [heading,textPartOne,formBase,textPartTwo,logingButtonPanel]

		});
		gb.cafe.view.LoginPanel.superclass.initComponent.apply(this, arguments);
	},
 
});
Ext.reg('LOGINPANEL', gb.cafe.view.LoginPanel);
