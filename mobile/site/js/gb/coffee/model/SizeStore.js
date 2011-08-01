gb.coffee.model.SizeStore = new Ext.data.JsonStore({
    model  : 'GB_SIZE_MODEL',
    data: [
        {name: 'Small', size: 'Small', cssClass: 'coffee_size_small',isSelected:false},
        {name: 'Regular', size: 'Regular', cssClass: 'coffee_size_regular',isSelected:false},
        {name: 'Large', size: 'Large', cssClass: 'coffee_size_large',isSelected:false},
        {name: 'Short', size: 'Short', cssClass: 'coffee_size_small',isSelected:false},
        {name: 'Long', size: 'Long', cssClass: 'coffee_size_regular',isSelected:false}
    ]
});