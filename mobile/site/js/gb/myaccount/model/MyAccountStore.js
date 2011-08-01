gb.myaccount.model.MyAccountStore = new Ext.data.JsonStore({
    model  : 'GB_MYACCOUNT_MODEL',
    data: [
        {name: 'Paypal', size: 'Paypal', cssClass: 'topup_paypal'},
        {name: 'Credit', size: 'Credit', cssClass: 'topup_credit'}
    ]
});