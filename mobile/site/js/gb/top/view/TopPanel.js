/**
 * 
 */
gb.top.view.TopPanel = Ext.extend(Ext.Panel, {
  layout : 'hbox',
  hideStages: false,
  initComponent : function() {	 	  
    var titems = new Array();
    var imagePanel = new Ext.Panel({html: '<a href="#" onclick="Ext.dispatch({controller: \'GB_CNTR_CAFE\', action: \'launch\'}); return false;"><img src="images/mlogo.png" height="35px"/></a>'});
    titems.push(imagePanel);
    titems.push({xtype: 'spacer'});
    
  	if(gb.order.controller.States.getOrderStage(gb.context.CONTEXT.getOrder().state).stage > 0 && !this.hideStages) {
  	  var htmlPanel = new Ext.Panel({		
  	    layout: 'vbox', 
  	    padding: 4,
  	    html:'<div style="float:right; color:#704A35;"><b>Step ' + gb.context.CONTEXT.getOrder().getOrderStage().stage +' of 4 </b></div> <br />  <div style="float:right;font-size:8px; color:#3cb03e;"><b>'+ gb.context.CONTEXT.getOrder().getOrderStage().msg + '</b></div>'});
  	  titems.push(htmlPanel);
  	}
  	
  	Ext.apply(this, {
  	      cls: 'cafe_search_panel',
  	      items: titems
  	});	
  	gb.top.view.TopPanel.superclass.initComponent.apply(this,arguments);
  } 
  
});
Ext.reg('GB_TOP_PANEL', gb.top.view.TopPanel);