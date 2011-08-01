/**
 * 
 */
 
gb.cafe.view.SpecialrequestPanel = Ext.extend(Ext.Panel, {
  layout : 'hbox',
  width : '100%',
  padding: 10,
  cls: 'base_select_panel',
  initComponent : function() {	  
    var textField = {xtype: 'textfield', id:'SPECIAL_REQUESTS', cls: 'special_request', disabled: false, width: 150};	
    Ext.apply(this, {
	      items: [{html:'Special requests '}, {xtype: 'spacer', width: 14}, textField]
    });	
    gb.cafe.view.SpecialrequestPanel.superclass.initComponent.apply(this,arguments);
  },
  getSpecialRequests: function() {
    return this.getComponent('SPECIAL_REQUESTS').getValue();
  }
});
Ext.reg('GB_SREQUEST_PANEL', gb.cafe.view.SpecialrequestPanel);