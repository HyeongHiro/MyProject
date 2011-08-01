gb.order.view.OrderListPanel = Ext.extend(Ext.Panel, 
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
      items: {xtype: 'GB_ORDERLIST'},
      cls: 'order_list_panel'
    });
    
    if(this.searching) 
	{
      Ext.apply(this, {loadingText: 'Loading, Please Wait'});
    }
    
    gb.order.view.OrderListPanel.superclass.initComponent.apply(this, arguments);   
  },
  searchFinished: function() {  
  }
});

Ext.reg('GB_ORDERLIST_PANEL', gb.order.view.OrderListPanel);