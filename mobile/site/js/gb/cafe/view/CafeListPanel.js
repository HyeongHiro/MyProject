gb.cafe.view.CafeListPanel = Ext.extend(Ext.Panel, {
    id: 'GB_CAFELIST_PANEL',
	layout: 'card',
  initComponent : function() {	 	 	
      var mapscreen = Ext.create({xtype: 'MAPSCREEN', hidden: true});	
      var cafelist = Ext.create({
        xtype: 'GB_CAFELIST',
        listeners: {
          itemtap: this.selectCafe,
          scope: this
        }
      });          
        
    Ext.apply(this, {      	
      items: [cafelist, mapscreen],
      cls: 'cafe_list_panel'      	  
    });    
    gb.cafe.view.CafeListPanel.superclass.initComponent.apply(this, arguments);   
  },
  
  selectCafe: function(list, subIdx)
  { 
	  var cafe = list.getStore().getAt(subIdx);	  
	  if(cafe.data.Enabled==1){
		  Ext.dispatch({
		      controller: 'GB_CNTR_CAFE',
		      action: 'selectCafe',
		      cafe: cafe
		    });
	  }    
  },   	
  searchFinished: function() {
    
  }
});
Ext.reg('GB_CAFELIST_PANEL', gb.cafe.view.CafeListPanel);