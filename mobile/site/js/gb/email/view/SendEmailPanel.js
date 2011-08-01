gb.email.view.SendEmailPanel = Ext.extend(Ext.Panel, {
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
Ext.reg('GB_SENDEMAIL_PANEL', gb.email.view.SendEmailPanel);