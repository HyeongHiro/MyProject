gb.coffee.view.SizeComponent = Ext.extend(Ext.Panel, {
  layout: 'vbox',
  width: 80,
  initComponent : function() {
    Ext.apply(this, {
      cls: 'coffee_size_component ' + this.size.data.cssClass,
      items: [
              {id: this.size.data.size + '_SIZE_IMAGE', cls: 'image', width: 70, height: 70},
              {html: this.size.data.name, id: this.size.data.size + '_SIZE_TITLE', cls: 'title'}
             ]
    });
    
    gb.coffee.view.SizeComponent.superclass.initComponent.apply(this, arguments);   
  },
  setSelected: function(sel) {
    if(sel) {
      this.getComponent(this.size.data.size + '_SIZE_IMAGE').addCls('selected');
    }else {
      this.getComponent(this.size.data.size + '_SIZE_IMAGE').removeCls('selected');
    }
    this.selected = sel;
  },
  getSize: function() {
    return this.size.data.size;
  }
});
Ext.reg('GB_SIZECOMPONENT', gb.coffee.view.SizeComponent);