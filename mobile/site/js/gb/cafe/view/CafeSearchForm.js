gb.cafe.view.CafeSearchForm = Ext.extend(Ext.form.FormPanel, {
    items: [
        {
            xtype: 'textfield',
            name : 'query'
        }
    ]
});
Ext.reg('GB_CAFESEARCH_FORM', gb.cafe.view.CafeSearchForm);