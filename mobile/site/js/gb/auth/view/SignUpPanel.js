gb.auth.view.SignUpPanel = Ext.extend(Ext.Panel, 
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

Ext.reg('GB_SIGNUP_PANEL', gb.auth.view.SignUpPanel);