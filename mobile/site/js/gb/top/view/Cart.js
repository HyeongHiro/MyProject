gb.top.view.CartButton = Ext.extend(Ext.Button, {
  ui: 'green',
  iconMask: true, 
  iconCls: 'cart',
  initComponent : function()  {
    gb.context.CONTEXT.getOrder().addListener('updated', function() {
      this.update('&nbsp;' + Ext.util.Format.Currency(gb.context.CONTEXT.getOrder().total));
    }, this);
    
    Ext.apply(this, {
      text: '&nbsp;' + Ext.util.Format.Currency(gb.context.CONTEXT.getOrder().total),
      handler: this.showOrderPopup
    });
    
    gb.top.view.CartButton.superclass.initComponent.call(this, arguments);
  },
  showOrderPopup: function() {
    Ext.dispatch({controller: 'GB_CNTR_ORDER', action: 'showPopup'});
  }
});
Ext.reg('GB_TOP_CARTBUTTON', gb.top.view.CartButton);