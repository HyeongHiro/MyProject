gb.LoadMask = {

    mask: null,
    
    show: function() {
      if(this.mask === null) {
        this.mask = new Ext.LoadMask(Ext.getBody(), {msg:'<div class="gbHeading maskHeading">Loading... </div><div class="loadingMsg">It will only take a mo!</div>'});
      }
      this.mask.show();
    },

    hide: function() {
      this.mask.hide();
    }

};