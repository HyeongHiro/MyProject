gb.geo.GeoTracker = Ext.extend(Ext.util.Observable, {
  geo : null,
  load : function() {
    this.geo = new Ext.util.GeoLocation({
      autoUpdate : false,
      listeners : {

        locationupdate : function(geo) {
          gb.geo.locationKnown = true;
          gb.geo.location = geo;
        },

        locationerror : function(geo, bTimeout, bPermissionDenied,
            bLocationUnavailable, message) {
          gb.geo.locationKnown = false;
        }
      }
    });
  },
  update : function() {
    this.geo.updateLocation();
  }
});
