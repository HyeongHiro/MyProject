gb.messagescreen.view.Noluck = Ext.extend(Ext.Panel, 
{
	layout: 
	{
		type: 'vbox',
		align: 'stretch',
		pack: 'start'
	},
	initComponent : function() 
	{
		var heading = {
			id: 'NOLUCK_HEADING', html: '<p class="gbHeading">No luck</p>', padding: 4
		};
		
		var description = {
			id: 'NOLUCK_DESCRIPTION', html: '<p><b>Grrr. Sorry my friend, there aren\'t any Go Bean Cafe\'s near you at the moment. But why not tell your favourite cafe about us and they might sign up.</b></p>', padding: 4
		};
		
		Ext.apply(this, 
		{
			items : [heading, description]
		});
    
		gb.messagescreen.view.Noluck.superclass.initComponent.apply(this, arguments);   
	}
});

Ext.reg('GB_NOLUCK', gb.messagescreen.view.Noluck);