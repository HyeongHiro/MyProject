/**
 * 
 */
 
gb.cafe.view.MapScreen = Ext.extend(Ext.Panel, {  
	
	layout: 'card',
  initComponent : function() {
	  this.googlemap = new Ext.Map({		  		  
		  mapOptions: {
			  zoom: 12
		  }
      }); 
	  
	  Ext.apply(this, {
    	fullscreen: true,     
        items     : [this.googlemap]  
	  
	  });       
    gb.cafe.view.MapScreen.superclass.initComponent.apply(this, arguments);
  },  
  
  setLatLng:function (name,address,lat,lng){	   
	  var position= new google.maps.LatLng(lat,lng);
	  this.googlemap.update(position); 
	  
	  var marker = new google.maps.Marker({
      	 map: this.googlemap.map,
      	 position : position
      });	
	  
	  var infowindow = new google.maps.InfoWindow();		 
	  infowindow.setContent(name + '<br>' + address);
	  infowindow.setPosition(position);	
	  infowindow.open(this.googlemap, marker);
  } 
});
Ext.reg('MAPSCREEN', gb.cafe.view.MapScreen);







 