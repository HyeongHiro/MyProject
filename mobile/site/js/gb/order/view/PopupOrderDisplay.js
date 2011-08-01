gb.order.view.OrderPopupPanel = Ext.extend(Ext.Panel, {
  floating : true,
  centered: true,
  modal: true,
  cls: 'order_popup',
  padding: 10,
  width: 300,
  initComponent : function() {
    Ext.apply(this, { items: [{xtype: 'GB_ORDER_SUMMARY'}] });
    gb.order.view.OrderPopupPanel.superclass.initComponent.apply(this, arguments);
  },
  refreshOrder: function() {
  }
});
Ext.reg('GB_ORDER_POPUP_PANEL', gb.order.view.OrderPopupPanel);