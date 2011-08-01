gb.cafe.view.OrderFinishButtonPanel = Ext.extend(Ext.Panel, {
	layout : 'vbox',
	align : 'stretch',

	padding :4,
	initComponent : function() {

		var orderfoodButton = Ext.create({
			xtype : 'button',
			ui : 'green',
			width : 200,
			text : 'Order food',
			handler : function() {
				Ext.dispatch({
					controller : 'GB_CNTR_SELECT_FOOD',
					action : 'select'
				});
			},
			scope : this,
			id : 'ORDERFOOD_BUTTON'
		});

		var finishButton = Ext.create({
			xtype : 'button',
			ui : 'green',
			width : 200,
			text : 'Finish order',
			handler : function() {
				Ext.dispatch({
					controller : 'GB_CNTR_CONFIRM_ORDER',
					action : 'setConfirmedOrderState'
				});
			},
			scope : this,
			id : 'FINISH_BUTTON'
		});

		var orderbuttonPanel = new Ext.Panel({
			layout : 'hbox',
			padding : 6,
			items : [ {
				xtype : 'spacer'
			}, orderfoodButton, {
				xtype : 'spacer',
				width : 4
			} ]
		});

		var finishbuttonPanel = new Ext.Panel({
			layout : 'hbox',
			padding : 6,
			items : [ {
				xtype : 'spacer'
			}, finishButton, {
				xtype : 'spacer',
				width : 4
			} ]
		});

		Ext.apply(this, {

			items : [orderbuttonPanel, finishbuttonPanel, {xtype: 'spacer', height: '8'}]
		});
		gb.cafe.view.OrderFinishButtonPanel.superclass.initComponent.apply(
				this, arguments);
	}
});
Ext.reg('GB_ORDERFINISHBUTTON_PANEL', gb.cafe.view.OrderFinishButtonPanel);