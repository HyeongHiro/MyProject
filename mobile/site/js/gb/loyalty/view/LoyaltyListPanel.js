gb.loyalty.view.LoyaltyListPanel = Ext.extend(Ext.Panel, 
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

Ext.reg('GB_LOYALTYLIST_PANEL', gb.loyalty.view.LoyaltyListPanel);