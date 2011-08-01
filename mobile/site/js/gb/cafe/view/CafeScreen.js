/**
 * Screen showing the list of cafes.
 */
gb.cafe.view.CafeScreen = Ext.extend(gb.app.view.BaseScreen, {
  layout: {
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  fullscreen: true,
  initComponent : function() {
    var heading = {id: 'CHOOSE_CAFE_HEADING', html: 'Choose your cafe', cls: 'gbHeading', padding: 4};
    var searchPanel = Ext.create({xtype: 'GB_CAFESEARCH_PANEL', id: 'CHOOSE_CAFE_SEARCHPANEL', padding: 4});
    var cafeList = Ext.create({
      xtype: 'GB_CAFELIST_PANEL', 
      searching: this.searching
    });
    
    Ext.apply(this, {
      items : [{xtype:'GB_TOPMENU', hideCart: true}, heading, searchPanel, cafeList]
    });
    
    gb.cafe.view.CafeScreen.superclass.initComponent.apply(this, arguments);   
  }
});
Ext.reg('GB_CAFEPANEL', gb.cafe.view.CafeScreen);