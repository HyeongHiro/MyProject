gb.confirmorder.view.ConfirmScreen = Ext.extend(gb.app.view.BaseScreen,
{
	layout: 
	{
		type: 'vbox',
		align: 'stretch',
		pack: 'start'
	},
	initComponent : function() 
	{
		
	  var heading = Ext.create({xtype: 'panel', html: 'Confirm your order', cls: 'gbHeading', padding: 10});
	  this.pickup = Ext.create({xtype: 'GB_PICKUP_PANEL'});
	  var voucher = Ext.create({xtype: 'GB_VOUCHER_PANEL'});
	  var confirmAndBalance = Ext.create({xtype: 'GB_BALANCE_PANEL'});
	  this.orderTable = Ext.create({xtype: 'GB_ORDER_SUMMARY', padding: 10});
	  var terms = Ext.create({xtype: 'GB_TERMS_PANEL'});
	  
	  voucher.on('applied', this.voucherApplied, this);
	  
	  var buttonText = this.getButtonText();
	  this.button = Ext.create({xtype: 'button', ui: 'green', text: buttonText, handler: this.confirmOrder, scope: this});
	  var confirm = Ext.create({xtype: 'panel', padding: 20, layout: 'hbox', items:[{xtype: 'spacer'},this.button,{xtype: 'spacer'}]});
	  
	  Ext.apply(this, 
		{
			items : [{xtype : 'GB_TOPMENU', backDispatch: {controller: 'GB_CNTR_SELECT_FOOD', action: 'select'}}, 
			         heading, this.pickup, voucher, confirmAndBalance, this.orderTable, terms, confirm]
		});
    
		gb.confirmorder.view.ConfirmScreen.superclass.initComponent.apply(this, arguments);   
	},
	voucherApplied: function() {
	  this.orderTable.refreshOrder();
	  this.button.update(this.getButtonText());
	},
	getButtonText: function() {
	   if(gb.context.CONTEXT.getUser().balance < gb.context.CONTEXT.getOrder().total) {
	      return "Topup";
	   }
	   return "Confirm";
	},
	confirmOrder: function() {
	  var offset = this.pickup.getOffset();
	  Ext.dispatch({controller: 'GB_CNTR_CONFIRM_ORDER', action:'confirmOrder', offset: offset})
	}
});

Ext.reg('GB_CONFIRMSCREEN', gb.confirmorder.view.ConfirmScreen);