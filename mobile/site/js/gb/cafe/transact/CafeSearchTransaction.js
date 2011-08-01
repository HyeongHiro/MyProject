gb.cafe.transact.CafeSearchTransaction = Ext.extend(gb.data.BaseOrderTransaction, {
  
  _run: function() {

    gb.cafe.model.CafeStore.clearData();
    gb.cafe.model.CafeStore.fireEvent('dataChanged');
    
    if('query' in this && this.query !== undefined) {
      // run a query based search
      Ext.Ajax.request({
        url : 'ajax.php',
        method : 'POST',
        timeout : 40000,
        params: {
          call : 'order',
          st: 5,
          q : this.query
        },
        success: this.success,
        failure: this.failure,
        scope: this
      });      
    }else if(gb.geo.location !== undefined && gb.geo.location != null && gb.geo.location.coords != null) {
    
      var lat = gb.geo.location.coords.latitude;
      var lng = gb.geo.location.coords.longitude;
        
        Ext.Ajax.request({
          url : 'ajax.php',
          method : 'POST',
          timeout : 40000,
          params : 
          {
            call : 'order',
            st: 5,
            lat : lat,
            "long" : lng
          },
          success: this.success,
          failure: this.failure,
          scope: this
        });
    }
  },
  processQueryResults: function(result) {
    if (Ext.util.Format.trim(result.responseText) != '')  {
      var result = Ext.decode(result.responseText);
      if('cafes' in result) {
        for ( var i = 0; i < result.cafes.length; i++) {
          var cafe = Ext.ModelMgr.create(result.cafes[i], 'GB_CAFE_MODEL', result.cafes[i].CafeId);
          gb.cafe.model.CafeStore.add(cafe);
        }
      }
    }
  },
  
  
  _success: function(result, request) {
    this.processQueryResults(result);
  },

  _failure: function(result, request) {
    Ext.Msg.alert('Error', 'Your request could not be processed. Please check your connection and try again.', Ext.emptyFn);
  }  
  
});