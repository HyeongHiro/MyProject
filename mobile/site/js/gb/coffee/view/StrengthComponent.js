gb.coffee.view.StrengthComponent = Ext.extend(Ext.Panel, {
  layout: 'vbox',
  width: 80,
  initComponent : function() {
    Ext.apply(this, {
      cls: 'coffee_strength_component ' + this.strength.data.cssClass,
      items: [
              {id: this.strength.data.type + '_STRENGTH_IMAGE', cls: 'image', width: 70, height: 70},
              {html: this.strength.data.name, id: this.strength.data.type + '_STRENGTH_TITLE', cls: 'title'}
             ]
    });
    gb.coffee.view.StrengthComponent.superclass.initComponent.apply(this, arguments);   
  },
  setSelected: function(sel) {
    if(sel) {
      this.getComponent(this.strength.data.type + '_STRENGTH_IMAGE').addCls('selected');
    }else {
      this.getComponent(this.strength.data.type + '_STRENGTH_IMAGE').removeCls('selected');
    }
    this.selected = sel;
  },
  getStrength: function() {
    return this.strength.data.type;
  }
});
Ext.reg('GB_STRENGTHCOMPONENT', gb.coffee.view.StrengthComponent);