gb.myaccount.view.MyAccountComponent = Ext.extend(Ext.Panel, {
  layout: 'vbox',
  width: 170,
  initComponent : function() {
    Ext.apply(this, {
      cls: 'myaccount_component ' + this.size.data.cssClass,
      items: [
              {id: this.size.data.size + '_SIZE_IMAGE', cls: 'image', width: 230, height: 140}
             ]
    });
    
    gb.myaccount.view.MyAccountComponent.superclass.initComponent.apply(this, arguments);   
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
Ext.reg('GB_TOPUPCOMPONENT', gb.myaccount.view.MyAccountComponent);