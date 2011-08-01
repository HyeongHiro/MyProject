gb.messagescreen.view.Gremlins = Ext.extend(Ext.Panel, 
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
			id: 'GREMLINS_HEADING', html: '<p class="gbHeading">Gremlins</p>', padding: 4
		};
		
		var description = {
			id: 'GREMLINS_DESCRIPTION', html: '<p><b>Yikes!We\'ve got gremlins. Please bear with us while we sort things out. If thins are\'nt ship shape soon,</b></p> <a href="#" class="gbSubHeading">let us know.</a>', padding: 4
		};
		
		Ext.apply(this, 
		{
			items : [heading, description]
		});
    
		gb.messagescreen.view.Gremlins.superclass.initComponent.apply(this, arguments);   
	}
});

Ext.reg('GB_GREMLINS', gb.messagescreen.view.Gremlins);