gb.order.view.SelectOrderPanel = Ext.extend(gb.order.view.BaseSelectPanel, {
  layout: 'vbox',
  padding: 10,
  cls: 'order_select_panel',
  orders: {},
  initComponent : function() {
    var tempItems = new Array();
    
    for ( var i = 0; i < gb.order.model.OrderStore.getCount(); i++) {
      tempItems.push(this.createOrderItem(gb.order.model.OrderStore.getAt(i)));
    }
    
    Ext.apply(this, {items: tempItems});
    gb.order.view.SelectOrderPanel.superclass.initComponent.apply(this, arguments);   
  },
  createOrderItem: function(record) {
    var orderComp = new gb.order.view.OrderComponent(
    {
          order: record
    });
    orderComp.addListener('afterrender', function() {
      orderComp.el.on('tap', function() {
        if(!orderComp.isDisabled()) {
          this.selectOrder(orderComp.order);
        }
      }, this);
    }, this);       
    
    this.orders[record.data.type] = orderComp;
    return orderComp;
  },
  selectOrder: function(record) {
    if(this.selected != null) {
      this.selected.setSelected(false);
    }
    if(record !== null) {
      this.selected = this.orders[record.data.type];
      this.selected.setSelected(true);
    }else {
      this.selected = null;
    }
  },
  getSelectedOrder: function() {
    return this.selected.type;
  }
});
Ext.reg('GB_SELECTORDERPANEL', gb.order.view.SelectOrderPanel);