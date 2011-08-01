gb.cafe.view.CafeList = Ext.extend(Ext.List, {
  cls : 'cafelist',
  id : 'GB_CAFELIST',
  itemTpl : gb.cafe.view.CafeItemTemplate,
  store : gb.cafe.model.CafeStore,  
  onItemDisclosure : function(record){	 
    
    Ext.dispatch({
      controller: 'GB_CNTR_CAFE',
      action    : 'showMap'
    });
	  
	  cafeListPanel.items.items[1].setLatLng(record.data.Name,record.data.Address,record.data.Latitude,record.data.Longitude);
	  cafeListPanel.items.items[1].setVisible(true);   
  }
});
Ext.reg('GB_CAFELIST', gb.cafe.view.CafeList);