gb.xtra.view.XtraPopupPanel = Ext.extend(Ext.Panel, {
  floating : true,
  centered: true,
  modal: true,
  padding: 10,
  width: 250,
  height: 150,
  cls: 'order_popup',  
  initComponent : function() {
    
    Ext.apply(this, {
      items : [ {html: 'Go Bean Xtra, your loyalty coffees await!'}]
    });
    
    gb.auth.view.WelcomePopupPanel.superclass.initComponent.apply(this, arguments);
  }
});
Ext.reg('GB_XTRA_POPUP_PANEL', gb.xtra.view.XtraPopupPanel);
gb.xtra.view.show = function() {
  var popup = Ext.create({xtype: 'GB_XTRA_POPUP_PANEL'});
  popup.show('pop');  
};