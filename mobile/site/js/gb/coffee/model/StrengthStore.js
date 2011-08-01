gb.coffee.model.StrengthStore = new Ext.data.JsonStore({
    model  : 'GB_STRENGTH_MODEL',
    data: [
        {name: 'Half Shot',   type: 'Weak', cssClass: 'coffee_strength_weak'},
        {name: 'Single shot', type: 'Regular', cssClass: 'coffee_strength_regular'},
        {name: 'Double shot', type: 'Strong', cssClass: 'coffee_strength_strong'}
    ]
});