gb.coffee.model.SugarStore = new Ext.data.JsonStore({
    model  : 'GB_SUGAR_MODEL',
    data: [
        {name: 'None', amount: '0', cssClass: 'coffee_sugar_none'},
        {name: 'Half', amount: 'Half', cssClass: 'coffee_sugar_half'},
        {name: 'One', amount: '1', cssClass: 'coffee_sugar_one'},
        {name: 'Two', amount: '2', cssClass: 'coffee_sugar_two'}
    ]
});