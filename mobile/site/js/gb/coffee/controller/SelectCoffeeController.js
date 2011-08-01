/**
 * The only controller in this simple application - this simply sets up the fullscreen viewport panel
 * and renders a detailed overlay whenever a Loan is tapped on.
 */
Ext.regController("GB_CNTR_SELECT_COFFEE", {
  
  select: function() {
    if( gb.coffee.model.CoffeeStore.getCount() <=0 ) {
      this.loadSelectCoffeeScreen();
    }else {
      this.openNow();  
    }
  },
  
  openNow: function() {
    Ext.getBody().update('');
    this.render({xtype: 'GB_SELECTCOFFEESCREEN', id: 'SELECT_COFFEE'}, Ext.getBody());
  },  
  
  loadSelectCoffeeScreen: function() {
    var trn = new gb.coffee.transact.SelectCoffeeTransaction();
    trn.run();
  },

  /** */
  addCoffee: function(options) {
    if(options.data != null) {
      options.data.callback = function() {
    	var panel = Ext.getCmp('SELECT_COFFEE');
    	panel.setVisibleOrderFinishPanel();
  		var popup = Ext.create({xtype: 'GB_COFFEE_POPUP_PANEL'});
        popup.show('pop');  
      };
      var coffeeTrn = new gb.coffee.transact.AddCoffeeTransaction(options.data);
      coffeeTrn.run();
    }
  },

  orderSummary: function(options) {
    if(options.data != null) {
      options.data.callback = function() {
        var popup = Ext.create({xtype: 'GB_ORDER_SUMMARY'});
        popup.show('pop');        
      };
    }
  }
});