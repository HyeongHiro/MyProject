gb.cafe.view.CafeSelection = Ext.extend(Ext.Panel, {
  layout: 'vbox',
  initComponent : function() {
    Ext.apply(this, {
      items : [{html: 'Cafe Selection'}]
    });
    gb.cafe.view.CafeSelection.superclass.initComponent.apply(this, arguments);   
  }
});
Ext.reg('GB_CAFESELECTION', gb.cafe.view.CafeSelection);