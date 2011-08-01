gb.confirmorder.view.Stacked = Ext.extend(gb.app.view.BaseScreen, {
  
	initComponent : function() 
	{
		var heading = {
			id: 'STACKED_HEADING', html: '<p class="gbHeading">Stacked</p>', padding: 4
		};
		
		var thtml = '<p>Your cafe is pretty stacked at the mo. ' +
    'Sorry, but the earliest we can get the coffee to you is  ' +
    '<span class="gbSubHeading">';
		
		thtml += gb.context.CONTEXT.getOrder().proposedPickup;
		thtml += '</span> Is this OK?</p><br>';
		
		var description = {
			id: 'STACKED_DESCRIPTION', html: thtml, padding: 4
		};
		
		var buttons = new Ext.Panel({
				layout: {
					type: 'hbox'
				},
				padding: 10,
				items: [
				{
					xtype: 'spacer'
				},{
					xtype : 'button',
					text: 'Change Cafe',
					ui: 'black',
					handler: function() {
					  Ext.dispatch({controller: 'GB_CNTR_CAFE', action:'launch'});
					}
				},{
					html: '&nbsp;&nbsp;'
				},{
					xtype : 'button',
					text: 'OK',
					ui: 'green',
          handler: function() {
            Ext.dispatch({controller: 'GB_CNTR_CONFIRM_ORDER', action:'confirmNewTime'});
          }
				}]
			})
		
		Ext.apply(this, 
		{
			items : [{xtype : 'GB_TOPMENU', backDispatch:  {controller: 'GB_CNTR_CONFIRM_ORDER', action: 'launch'}}, heading, description, 
			{
				xtype: 'spacer'
			}, buttons]
		});
    
		gb.confirmorder.view.Stacked.superclass.initComponent.apply(this, arguments);   
	}
});

Ext.reg('GB_STACKED', gb.confirmorder.view.Stacked);