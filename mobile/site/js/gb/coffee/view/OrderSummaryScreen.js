gb.coffee.view.OrderSummaryScreen = Ext.extend(gb.app.view.BaseScreen, {
  /*floating : true,
  centered: true,
  modal: true,*/
  width: 300,
  id: 'temp',
  layout : {
    type : 'vbox',
    align : 'stretch',
    pack : 'start'
  },
  fullscreen : true,
  initComponent : function() {
  
	var buttons = new Ext.Panel({
				height: '450',
              layout : {
                type : 'hbox'
              },
              items : [  
        			  {
        			  	xtype: 'spacer'
						
        			  },                     
                {
                xtype : 'button',
                text : 'Checkout',
                ui : 'green'
              },{ xtype: 'spacer', width:'1000'} ]
			  
            });
	
    Ext.apply(this, {
      items : [ {
        xtype : 'GB_TOPMENU',
        hideStages : true}, {xtype : 'GB_ORDER_SUMMARY'},buttons]
    });

    gb.coffee.view.OrderSummaryScreen.superclass.initComponent.apply(this, arguments);
  }
});

Ext.reg('GB_ORDERSUMMARYSCREEN', gb.coffee.view.OrderSummaryScreen);