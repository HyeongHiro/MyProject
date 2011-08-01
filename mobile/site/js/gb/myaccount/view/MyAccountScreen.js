gb.myaccount.view.MyAccountScreen = Ext.extend(gb.app.view.BaseScreen, {
  layout : {
    type : 'vbox',
    align : 'stretch',
    pack : 'start'
  },
  fullscreen : true,
  initComponent : function() {
    Ext.apply(this, {
      items : [ {
        xtype : 'GB_TOPMENU',
        hideStages : true
      }, {
        xtype : 'GB_MYACCOUNTLIST_PANEL'
      } ]
    });

    gb.myaccount.view.MyAccountScreen.superclass.initComponent.apply(this, arguments);
  },
  getCustomerName : function() {
    return gb.context.CONTEXT.getUser().firstName;
  },
  getBalance : function() {
    return Ext.util.Format.Currency(gb.context.CONTEXT.getUser().balance);
  },
  getCafe : function() {
    return gb.context.CONTEXT.getUser().mostRecentOrder.cafe.name;
  }
});

Ext.reg('GB_MYACCOUNTSCREEN', gb.myaccount.view.MyAccountScreen);