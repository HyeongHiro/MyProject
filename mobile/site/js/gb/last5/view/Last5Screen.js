gb.order.view.OrderScreen = Ext.extend(gb.app.view.BaseScreen, {
  layout : {
    type : 'vbox',
    align : 'stretch',
    pack : 'start'
  },
  fullscreen : true,
  initComponent : function() {
    var heading = {
      id : 'LAST_5_HEADING',
      html : 'Repeat previous orders',
      cls : 'gbHeading',
      padding : 4
    };
    var orderList = Ext.create({
      xtype : 'GB_LAST5LIST',
      listeners: {
        itemtap: this.selectOrder,
        scope: this
      }
    });
    Ext.apply(this, {
      items : [ {xtype: 'GB_TOPMENU', hideCart: true,
        backText: 'Start new order', backDispatch: {controller: 'GB_CNTR_CAFE', action: 'launch'}, 
        hideStages: true}, heading, orderList]
    });
    gb.order.view.OrderScreen.superclass.initComponent.apply(this, arguments);
  },
  selectOrder : function(list, subIdx) {

    var order = list.getStore().getAt(subIdx);
    
    if (order.data.cafe.active) {
      Ext.dispatch({
        controller: 'GB_CNTR_LAST5',
        action: 'selectLast5Order',
        orderId: order.data.id
      });      
    }
    
  }
});

Ext.reg('GB_LAST5SCREEN', gb.order.view.OrderScreen);