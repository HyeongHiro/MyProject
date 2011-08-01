gb.coffee.view.SugarComponent = Ext.extend(Ext.Panel, {
  layout: 'vbox',
  width: 80,
  initComponent : function() {
    Ext.apply(this, {
      cls: 'coffee_sugar_component ' + this.sugar.data.cssClass,
      items: [
              {id: this.sugar.data.amount + '_SUGAR_IMAGE', cls: 'image', width: 70, height: 70},
              {html: this.sugar.data.name, id: this.sugar.data.amount + '_SUGAR_TITLE', cls: 'title'}
             ]
    });
    
    gb.coffee.view.SugarComponent.superclass.initComponent.apply(this, arguments);   
  },
  setSelected: function(sel) {
    if(sel) {
      this.getComponent(this.sugar.data.amount + '_SUGAR_IMAGE').addCls('selected');
    }else {
      this.getComponent(this.sugar.data.amount + '_SUGAR_IMAGE').removeCls('selected');
    }
    this.selected = sel;
  },
  getSugar: function() {
    return this.sugar.data.amount;
  }
});
Ext.reg('GB_SUGARCOMPONENT', gb.coffee.view.SugarComponent);