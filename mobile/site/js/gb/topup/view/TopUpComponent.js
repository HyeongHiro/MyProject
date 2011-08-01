gb.topup.view.TopUpComponent = Ext.extend(Ext.Panel, {
  layout: 'vbox',
  width: 170,
  initComponent : function() {
    Ext.apply(this, {
      cls: 'topup_component ' + this.type.data.cssClass,
      items: [
              {id: this.type.data.type + '_SIZE_IMAGE', cls: 'image', width: 230, height: 140}
             ]
    });
    
    gb.topup.view.TopUpComponent.superclass.initComponent.apply(this, arguments);   
  },
  setSelected: function(sel) {
    if(sel) {
      this.getComponent(this.type.data.type + '_SIZE_IMAGE').addCls('selected');
    }else {
      this.getComponent(this.type.data.type + '_SIZE_IMAGE').removeCls('selected');
    }
    this.selected = sel;
  },
  getSize: function() {
    return this.type.data.type;
  }
});
Ext.reg('GB_TOPUPCOMPONENT', gb.topup.view.TopUpComponent);