gb.topup.model.TopUpStore = new Ext.data.JsonStore({
    model  : 'GB_TOPUP_MODEL',
    data: [
        {name: 'Paypal', type: 'paypal', cssClass: 'topup_paypal'},
        {name: 'Cafe', type: 'cafe', cssClass: 'topup_credit'}
    ]
});