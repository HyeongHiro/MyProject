gb.coffee.view.PopupPanel = Ext.extend(Ext.Panel, {
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
         this.hide();
      },
      scope : this,
      id : 'ORDER_ANOTHERCOFFEE_BUTTON'
    });    

    var orderfoodButton = Ext.create({
      xtype : 'button',
      ui : 'green',
      text : 'Order food',
      handler : function() {
        Ext.dispatch({ controller : 'GB_CNTR_SELECT_FOOD', action : 'select'});
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
      items : [ {html: '<div class="gbHeadng" style="padding-bottom: 8px;"><img src="images/tick2.png">Added to your cart</div>'}, 
                {xtype: 'spacer', height: 12},
                anothercoffeeButton, 
                {xtype: 'spacer', height: 12}, 
                orderfoodButton, 
                {xtype: 'spacer', height: 12}, 
                finishButton]
    });
    gb.coffee.view.PopupPanel.superclass.initComponent.apply(this, arguments);
  }
});
Ext.reg('GB_COFFEE_POPUP_PANEL', gb.coffee.view.PopupPanel);