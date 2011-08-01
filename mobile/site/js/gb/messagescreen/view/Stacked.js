gb.messagescreen.view.Stacked = Ext.extend(Ext.Panel, 
{
	initComponent : function() 
	{
		var heading = {
			id: 'STACKED_HEADING', html: '<p class="gbHeading">Stacked</p>', padding: 4
		};
		
		var description = {
			id: 'STACKED_DESCRIPTION', html: '<p><b>Your cafe is pretty stacked at the mo. Sorry, but the earliest we can get the coffee to you is <span class="gbSubHeading">9:15 a.m.</span> The current time at cafe is 8:55. Is this OK?</b></p><br>', padding: 4
		};
		
		var buttons = new Ext.Panel({
				layout: {
					type: 'hbox'
				},
				items: [
				{
					xtype: 'spacer'
				},{
					xtype : 'button',
					text: 'Change Order',
					ui: 'black'
				},{
					html: '&nbsp;&nbsp;'
				},{
					xtype : 'button',
					text: 'OK',
					ui: 'green'
				}]
			})
		
		Ext.apply(this, 
		{
			items : [heading, description, 
			{
				xtype: 'spacer'
			}, buttons]
		});
    
		gb.messagescreen.view.Stacked.superclass.initComponent.apply(this, arguments);   
	}
});

Ext.reg('GB_STACKED', gb.messagescreen.view.Stacked);