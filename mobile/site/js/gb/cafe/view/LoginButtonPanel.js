/**
 * 
 */
gb.cafe.view.LoginButtonPanel = Ext.extend(Ext.Panel, {
	layout : 'hbox',
	width : '100%',
	constructor : function(options) {
		gb.cafe.view.LoginButtonPanel.superclass.constructor
				.call(this, options);
	},
	initComponent : function() {

		var loginButton = Ext.create({
			xtype : 'button',
			ui : 'green',
			text : 'Search',
			handler : this.runLogin
		});

		Ext.apply(this, {
			cls : 'cafe_search_panel',
			items : [ {
				xtype : 'spacer',
				width : 200
			}, loginButton, {
				xtype : 'spacer',
				width : 8
			} ]
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
		var message ="";
		if (errors.isValid()) {			
			Ext.each(errors.items,function(rec,i){
                message += rec.message+"<br>";
            });
            Ext.Msg.alert("Valid", message, function(){});
		} else {
			Ext.each(errors.items,function(rec,i){
                message += rec.message+"<br>";
            });
            Ext.Msg.alert("Not Validated", message, function(){});
		}
	}
});
Ext.reg('GB_LOGINBUTTON_PANEL', gb.cafe.view.LoginButtonPanel);