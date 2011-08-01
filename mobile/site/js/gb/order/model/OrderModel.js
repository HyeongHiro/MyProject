// see server OrderJson Encoding spec:
// order/common/tech/server/OrderJsonEncoding.docx

Ext.regModel('GB_ORDER_MODEL', {
    fields: ['id', 'cafe', 'coffeeOrders', 'foodOrders', 'total']
});


