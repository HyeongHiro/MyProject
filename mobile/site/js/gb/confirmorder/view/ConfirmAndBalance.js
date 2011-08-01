gb.confirmorder.view.ConfirmAndBalance = Ext.extend(Ext.Panel, {
  layout : {
    type : 'vbox',
    align : 'stretch',
    pack : 'start'
  },
  padding: 10,
  initComponent : function() {
    var heading = Ext.create({
      xtype : 'panel',
      html : '<div class="gbSubHeading">Please confirm your order</div><div>Your current balance is: <span class="gbSubHeading bold">$' +  gb.context.CONTEXT.getUser().balance + '</span></div>'
    });

    Ext.apply(this, {
      items : [ heading ]
    });

    gb.confirmorder.view.ConfirmAndBalance.superclass.initComponent.apply(this,
        arguments);
  }
});

Ext.reg('GB_BALANCE_PANEL', gb.confirmorder.view.ConfirmAndBalance);