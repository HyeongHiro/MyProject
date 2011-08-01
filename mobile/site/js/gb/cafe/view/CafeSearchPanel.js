gb.cafe.view.CafeSearchPanel = Ext.extend(Ext.Panel, {
  layout: 'hbox',
  width: '100%',
  initComponent : function() {
    var mapLinkButton = Ext.create({xtype: 'button', width:35 ,ui: 'green', handler: this.openMap, iconMask: true, iconCls: 'mapIcon'});
    var searchField = {id:'txt', xtype: 'textfield',width: 178, name : 'query', placeHolder: '  Type postcode or suburb', cls: 'cafe_search_field', id: 'CAFE_SEARCH_FIELD',
	listeners: {
    	change: {
            element: 'el',
            fn: this.runSearch,
			scope: this
        }
    }
	
	};
    var searchButton = Ext.create({xtype: 'button', ui: 'green', text: 'Search', handler: this.runSearch, scope:this});
    
    Ext.apply(this, {
      cls: 'cafe_search_panel',
      items: [mapLinkButton, {xtype:'spacer',width:14}, searchField, {xtype: 'spacer', width:14}, searchButton]
    });

    gb.cafe.view.CafeSearchPanel.superclass.initComponent.apply(this, arguments);   
  },
  runSearch: function() {
    var query = this.getComponent('CAFE_SEARCH_FIELD').getValue();
    var trn = new gb.cafe.transact.CafeSearchTransaction({query: query});
    trn.run();
  },
  openMap: function() {
    if(gb.geo.location == null) {
      gb.geo.tracker.update();
    }
    
    Ext.dispatch({
      controller: 'GB_CNTR_CAFE',
      action    : 'launchWithLocation'
    });    
  }
});
Ext.reg('GB_CAFESEARCH_PANEL', gb.cafe.view.CafeSearchPanel);