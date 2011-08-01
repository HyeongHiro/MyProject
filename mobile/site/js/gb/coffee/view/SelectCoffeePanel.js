gb.coffee.view.SelectCoffeePanel = Ext.extend(Ext.Panel,  {
  cls: 'base_select_panel',
  layout: 'vbox',
  initComponent : function() {
    Ext.apply(this, {
      items : [
               {id: 'CARAOUSEL_HEADING', html: 'Select Coffee Type', cls: 'gbHeading', padding: 4},
               {xtype: 'GB_SELECT_COFFEE_TYPE_PANEL', id: 'SELECT_COFFEE_TYPE_PANEL', listeners: {
                 coffeeSwitch : this.updateCoffeeType,
                 scope: this
               }},
               {id: 'COFFEETYPE_HEADING', html: 'Flat White', cls: 'gbSubHeading', padding: 4}
              ]
    });   
    gb.coffee.view.SelectCoffeePanel.superclass.initComponent.apply(this, arguments);   
  },
  updateCoffeeType: function(selectedType) {
    this.getComponent('COFFEETYPE_HEADING').update(selectedType.type);
    this.fireEvent('coffeeSwitch', selectedType);
  },
  getSelectedCoffee: function() {
    return this.getComponent('SELECT_COFFEE_TYPE_PANEL').getSelectedCoffee();
  }
});
Ext.reg('GB_SELECTCOFFEEPANEL', gb.coffee.view.SelectCoffeePanel);