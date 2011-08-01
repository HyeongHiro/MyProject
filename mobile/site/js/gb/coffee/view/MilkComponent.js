gb.coffee.view.MilkComponent = Ext.extend(Ext.Panel, {
  layout: 'vbox',
  width: 80,
  initComponent : function() {
    Ext.apply(this, {
      cls: 'coffee_milk_component ' + this.milk.cssClass,
      items: [
              {id: this.milk.type + '_MILK_IMAGE', cls: 'image', width: 70, height: 70},
              {html: this.milk.name, id: this.milk.type + '_MILK_TITLE', cls: 'title'}
             ]
    });
    gb.coffee.view.MilkComponent.superclass.initComponent.apply(this, arguments);   
  },
  setSelected: function(sel) {
    if(sel) {
      this.getComponent(this.milk.type + '_MILK_IMAGE').addCls('selected');
    }else {
      this.getComponent(this.milk.type + '_MILK_IMAGE').removeCls('selected');
    }
    this.selected = sel;
  },
  getMilk: function() {
    return this.milk.type;
  }
});
Ext.reg('GB_MILKCOMPONENT', gb.coffee.view.MilkComponent);