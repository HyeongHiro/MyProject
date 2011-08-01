gb.topup.view.SelectTopUpPanel = Ext.extend(gb.topup.view.BaseSelectPanel, {
  cls: 'coffee_select_panel',
  types: {},
  initComponent : function() {
    var tempItems = new Array();
    
    for ( var i = 0; i < gb.topup.model.TopUpStore.getCount(); i++) {
      tempItems.push(this.createSizeItem(gb.topup.model.TopUpStore.getAt(i)));
    }
    
    Ext.apply(this, {items: tempItems});
    gb.topup.view.SelectTopUpPanel.superclass.initComponent.apply(this, arguments);   
  },
  createSizeItem: function(record) {
    var topupComp = new gb.topup.view.TopUpComponent(
        {
          type: record
    });
    topupComp.addListener('afterrender', function() {
      topupComp.el.on('tap', function() {
        if(!topupComp.isDisabled()) {
          this.selectSize(topupComp.type);
        }
      }, this);
    }, this);       
    
    this.types[record.data.type] = topupComp;
    return topupComp;
  },
  selectSize: function(record) {
    if(this.selected != null) {
      this.selected.setSelected(false);
    }
    
    if(record !== null) {
      this.selected = this.types[record.data.type];
      this.selected.setSelected(true);      
    }else {
      this.selected = null;
    }
    
    this.fireEvent('topupSelected', record.data.type);
  },
  getSelectedSize: function() {
    return this.selected.topupSize;
  }
});
Ext.reg('GB_SELECT_TOPUP_PANEL', gb.topup.view.SelectTopUpPanel);