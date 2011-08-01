gb.coffee.view.CarouselWithArrow = Ext.extend(Ext.Panel, {
	height: 210,
  layout: 'hbox',
	initComponent : function() 
	{
		Ext.apply(this, 
		{
			items: [{
				id : 'LEFT',
				xtype: 'button',
				width : 40,
				height: 60,
				style : "background: url(images/leftarrow.png);background-repeat:no-repeat;border:0px;",
				handler : function()
				{
					var prev = Ext.getCmp('COFFEE_SELECT_CAROUSEL').layout.getPrev();
					if (prev) 
					{
						Ext.getCmp('COFFEE_SELECT_CAROUSEL').customDrag = true;
						Ext.getCmp('COFFEE_SELECT_CAROUSEL').scrollToCard(prev);
					}
					return Ext.getCmp('COFFEE_SELECT_CAROUSEL');		
    			}
			}, 
			{
				id: 'COFFEE_SELECT_CAROUSEL', 
				xtype: 'GB_COFFEE_CAROUSEL', 
				width : 226, 
				height: 210,
				listeners: {
				  cardswitch : function() { this.fireEvent('coffeeSwitch', Ext.getCmp('COFFEE_SELECT_CAROUSEL').getSelectedCoffee()) },
			    scope: this
				}
			},{
				id : 'RIGHT',
				xtype : 'button',
				width : 40,
				height: 60,
				style : "background: url(images/rightarrow.png);background-repeat:no-repeat;border:0px;",
				handler : function()
				{
					var next = Ext.getCmp('COFFEE_SELECT_CAROUSEL').layout.getNext();
					if (next) {
						Ext.getCmp('COFFEE_SELECT_CAROUSEL').customDrag = true;
						Ext.getCmp('COFFEE_SELECT_CAROUSEL').scrollToCard(next);
					}
					return Ext.getCmp('COFFEE_SELECT_CAROUSEL');
				}
			}],
			cls: 'test_panel'
		});

		gb.coffee.view.CarouselWithArrow.superclass.initComponent.apply(this, arguments);   
	},
	getSelectedCoffee: function() {
	  return this.getComponent('COFFEE_SELECT_CAROUSEL').getSelectedCoffee();
	}
	
});

Ext.reg('GB_SELECT_COFFEE_TYPE_PANEL', gb.coffee.view.CarouselWithArrow);