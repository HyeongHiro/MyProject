gb.home.view.TopUpConfirm = Ext.extend(Ext.Panel, 
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
    var heading = {id: 'TOPUPCONFIRM_HEADING', html: '<p class="gbHeading">You\'re good to go</p>', padding: 4};
	
	var description = {id: 'TOPUPCONFIRM_DESCRIPTION', html: '<p><b>Thanks, your order\'s confirmed. Just head to your cafe, quote your name, top-up your account and your coffee will be made like a regular order. Hope the queue\'s not too long!</b></p>', padding: 4 , style : 'color : black'};	
	
    Ext.apply(this, 
	{
      items : [{xtype: 'GB_TOPMENU', hideStages: true}, heading, description]
    });

    gb.home.view.TopUpConfirm.superclass.initComponent.apply(this, arguments);   
  }
});

Ext.reg('GB_TOPUPCONFIRM', gb.home.view.TopUpConfirm);