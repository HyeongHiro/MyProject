gb.food.view.PopupPanel = Ext.extend(Ext.Panel, {
  floating : true,
  centered: true,
  modal: true,
  cls: 'order_popup',
  padding: 10,
  width: 250,
  initComponent : function() {
    
    
    var anothercoffeeButton = Ext.create({
      xtype : 'button',
      ui : 'green',
      text : 'Order another coffee',
      handler : function() {
        Ext.dispatch({ controller : 'GB_CNTR_SELECT_COFFEE', action : 'select'});
      },
      scope : this,
      id : 'ORDER_ANOTHERCOFFEE_BUTTON'
    });    

    var orderfoodButton = Ext.create({
      xtype : 'button',
      ui : 'green',
      text : 'Order more food',
      handler : function() {
        this.hide();
        
      },
      scope : this,
      id : 'ORDERFOOD_BUTTON'
    });
    
    var finishButton = Ext.create({
      xtype : 'button',
      ui : 'green',
      text : 'Finish order',
      handler : function() {
        Ext.dispatch({ controller : 'GB_CNTR_CONFIRM_ORDER', action : 'setConfirmedOrderState' });
      },
      scope : this,
      id : 'FINISH_BUTTON'
    });
    
    Ext.apply(this, {
      items : [ {html: '<div class="gbHeading" style="padding-bottom: 8px;"><img src="images/tick2.png">Added to your cart</div>'}, anothercoffeeButton, {xtype: 'spacer', height: 10}, orderfoodButton, {xtype: 'spacer', height: 10}, finishButton]
    });
    gb.food.view.PopupPanel.superclass.initComponent.apply(this, arguments);
  }
});
Ext.reg('GB_FOOD_POPUP_PANEL', gb.food.view.PopupPanel);