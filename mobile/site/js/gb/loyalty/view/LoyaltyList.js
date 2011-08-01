gb.loyalty.view.LoyaltyList = Ext.extend(Ext.List, 
{
	width: 350,
    height: 420,
	cls : 'loyaltylist',
	itemTpl : gb.loyalty.view.LoyaltyCardTemplate,
	store : gb.loyalty.model.LoyaltyStore
});

Ext.reg('GB_LOYALTYLIST', gb.loyalty.view.LoyaltyList);