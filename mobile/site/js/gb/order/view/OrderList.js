gb.order.view.OrderList = Ext.extend(Ext.List, { 
    width: 350,
    height: 420,
    cls : 'orderlist',
    itemTpl : gb.order.view.OrderItemTemplate,
    selModel: {
        mode: 'SINGLE',
        allowDeselect: true
    },
    indexBar: false,
    onItemDisclosure: {
        handler: function(record, btn, index)
  		{
  			alert('Disclose more info for ' + record.get('cafe'));
  		}
    },
    store : gb.order.model.OrderStore
});
Ext.reg('GB_ORDERLIST', gb.order.view.OrderList);