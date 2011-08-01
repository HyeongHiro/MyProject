gb.top.view.TopMenu = Ext.extend(Ext.Panel, 
{
	hideStages: false,
	backDispatch: null,
	backText: 'Back',
	hideCart: false,
	layout: 
	{
		type: 'vbox',
		align: 'stretch',
		pack: 'start'
	},
	invisibleButton: function(){
		
		var button = Ext.getCmp('backButton');
		button.setVisible(false);
	},
	
	initComponent : function() {
	 	var topPanel = Ext.create({xtype: 'GB_TOP_PANEL', hideStages: this.hideStages});
		var backButton = new Ext.Button(
		{
			text: this.backText,
			ui: 'back',
			handler: function() {				
			  Ext.dispatch(this.backDispatch);
			},
			scope: this,
			hidden: (this.backDispatch==null)
		});
		
		var actionButton = Ext.create({xtype: 'GB_TOP_CARTBUTTON', hidden: this.hideCart}); 
		
		var toolBar = new Ext.Toolbar(
		{
			ui: 'green',
			style: "border-top: 1px solid #704A35;",
            dock: 'top',
            items: [backButton, {xtype: 'spacer'}, actionButton]
		});
		
		Ext.apply(this, 
		{
			items : [topPanel, toolBar]
		});
    
		gb.top.view.TopMenu.superclass.initComponent.apply(this, arguments);   
	}
});

Ext.reg('GB_TOPMENU', gb.top.view.TopMenu);