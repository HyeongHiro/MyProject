gb.myaccount.view.MyAccountListPanel = Ext.extend(Ext.Panel, 
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

Ext.reg('GB_MYACCOUNTLIST_PANEL', gb.myaccount.view.MyAccountListPanel);