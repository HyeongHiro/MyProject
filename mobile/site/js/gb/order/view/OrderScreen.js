gb.order.view.OrderScreen = Ext.extend(Ext.Panel, 
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
    var heading = {id: 'CHOOSE_ORDER_HEADING', html: 'Last Five Orders', cls: 'gbHeading', padding: 4};
		
    var orderList = Ext.create({xtype: 'GB_ORDERLIST_PANEL'});
    
    Ext.apply(this, 
	{
      items : [{xtype: 'GB_TOPMENU', hideStages: true}, heading, orderList]
    });

    gb.order.view.OrderScreen.superclass.initComponent.apply(this, arguments);   
  }
});

Ext.reg('GB_ORDERSCREEN', gb.order.view.OrderScreen);