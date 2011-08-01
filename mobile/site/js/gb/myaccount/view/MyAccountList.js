gb.myaccount.view.MyAccountList = Ext.extend(Ext.List, { 
    width: 350,
    height: 420,
    cls : 'myaccountlist',
    itemTpl : gb.coffee.view.OrderSummaryTemplate,
	  selModel: {
        mode: 'SINGLE',
        allowDeselect: true
    },
    indexBar: false,
    store : gb.myaccount.model.OrderStore
});
Ext.reg('GB_MYACCOUNTLIST', gb.myaccount.view.MyAccountList);