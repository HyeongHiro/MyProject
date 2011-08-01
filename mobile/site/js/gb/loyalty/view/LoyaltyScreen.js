gb.loyalty.view.LoyaltyScreen = Ext.extend(Ext.Panel, 
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

Ext.reg('GB_LOYALTYSCREEN', gb.loyalty.view.LoyaltyScreen);