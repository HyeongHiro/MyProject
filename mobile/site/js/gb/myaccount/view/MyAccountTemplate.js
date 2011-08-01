gb.myaccount.view.MyAccountTemplate = new Ext.XTemplate
(
	'<div style="float: left; ">' + 
    '<div class="gbHeading">Hello {firstName:this.getCustomerName}</div>' + 
    '<div>Your remaining credit is {balance:this.getBalance}</div>' + 
	'<div class="gbSubHeading"><hr style="border: 1px solid #ccc; width:400px;">Top up your account</div>{topup:this.getTopUpImages}' +
	'<div class="gbSubHeading"><hr style="border: 1px solid #ccc; width:400px;">Most recent orders</div>' +
	'<div class="gbBlackHeading">{cafe_name:this.getCafeName}</div></div><br>' +
	'<div style="float: left; padding-left:30px;">{coffeeItems:this.getCoffeeItemsDescription}</div><div style="float: right;">{total:this.getCoffeeItemsTotal}</div><br><div style="float: left; padding-left:30px;">{foodItems:this.getFoodItemsDescription}</div><div style="float: right;">{total:this.getFoodItemsTotal}</div><br>'
,
{
	compiled: true,
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
	getCoffeeItems: function() 
	{
		var items = gb.context.CONTEXT.getUser().mostRecentOrder.coffeeItems;
		return items.length;
    },
	getCoffeeItemsDescription: function() 
	{
		return gb.context.CONTEXT.getUser().mostRecentOrder.coffeeItems.quantity + " x " + gb.context.CONTEXT.getUser().mostRecentOrder.coffeeItems.size + " " + gb.context.CONTEXT.getUser().mostRecentOrder.coffeeItems.strength + " " + gb.context.CONTEXT.getUser().mostRecentOrder.coffeeItems.type;
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
	}
}
);
