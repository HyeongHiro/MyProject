gb.last5.view.OrderList = Ext.extend(Ext.List, { 
    cls : 'orderlist',
    itemTpl : gb.last5.view.Last5OrderTemplate,
    selModel: {
        mode: 'SINGLE'
    },
    indexBar: false,
    store : gb.last5.model.Last5Store
});
Ext.reg('GB_LAST5LIST', gb.last5.view.OrderList);