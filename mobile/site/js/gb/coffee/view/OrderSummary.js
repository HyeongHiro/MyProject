gb.coffee.view.OrderSummary = Ext.extend(Ext.Panel, 
{
  layout:   'fit',
  action: 'removeCoffeeInPopUp',  
	initComponent : function() 
	{
	  if(this.tplData == null) {
	    this.tplData = gb.context.CONTEXT.getOrder();  
	  }
	  
	  this.tpl = new Ext.XTemplate
		(
			'<div class="main">' , 
				'<div class="gbHeading" style="padding-bottom: 6px;">Order summary</div>' ,
				
				'<div  class="orderSumamryTableWrapper"><table width="100%" class="orderSumamryTable"><tr><td colspan="2" style="border-bottom:#ccc solid 1px; color:#6A6B6A; padding-bottom: 4px;">{cafe.name}</td></tr>',
				'<tpl for="coffeeOrders">' ,
				  '<tr><td style="border-bottom:#26BC2F dashed 1px; border-right:#ccc solid 1px;"><a href="#" onclick="Ext.dispatch({controller: \'GB_CNTR_ORDER\', action:\'' + this.action + '\', orderIndex: \'{idx}\'})"><img src="images/minussmall.png"></a> {quantity} x {size} {type}</td><td style="border-bottom:#26BC2F dashed 1px; padding-left: 4px;">{total:this.formatCurrency}</td></tr>' ,
        '</tpl>',
        '<tpl for="foodOrders">' ,
          '<tr><td style="border-bottom:#26BC2F dashed 1px; border-right:#ccc solid 1px;"><a href="#" onclick="Ext.dispatch({controller: \'GB_CNTR_ORDER\', action:\'' + this.action + '\', orderIndex: \'{idx}\'})"><img src="images/minussmall.png"></a> {quantity} x {name}</td><td style="padding-left: 4px; border-bottom:#26BC2F dashed 1px;">{total:this.formatCurrency}</td></tr>' ,
        '</tpl>' ,
        '<tr><td style="color:#26BC2F; font-weight: bolder; border-right:#ccc solid 1px;" align="right">Total</td><td style="padding-left: 4px; color:#26BC2F; font-weight: bolder;">{total:this.formatCurrency}</td></tr></table>',
			'</div></div>',
			{
				compiled: true,
				formatCurrency: function(number)
				{
					return Ext.util.Format.Currency(number);
				}
			}
		);
		this.on('afterRender', function() {
		  this.refreshOrder();
		}, this);
  	  	
		gb.coffee.view.OrderSummary.superclass.initComponent.apply(this, arguments);   
	}, 
	refreshOrder: function() {
	  this.tpl.overwrite(this.body, this.tplData);
	}
});

Ext.reg('GB_ORDER_SUMMARY', gb.coffee.view.OrderSummary);