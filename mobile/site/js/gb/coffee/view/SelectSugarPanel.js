gb.coffee.view.SelectSugarPanel = Ext.extend(gb.coffee.view.BaseSelectPanel, {
  layout: 'hbox',
  padding: 10,
  sugars: {},
  cls: 'sugar_select_panel base_select_panel',
  initComponent : function() {
    var tempItems = new Array();
    
    for ( var i = 0; i < gb.coffee.model.SugarStore.getCount(); i++) {
      tempItems.push({xtype:'spacer'});
      tempItems.push(this.createSugarItem(gb.coffee.model.SugarStore.getAt(i)));
    }
    tempItems.push({xtype:'spacer'});
    
    Ext.apply(this, {items: tempItems});
    gb.coffee.view.SelectSugarPanel.superclass.initComponent.apply(this, arguments);   
  },
  createSugarItem: function(record) {
    var sugarComp = new gb.coffee.view.SugarComponent({sugar: record});
    sugarComp.addListener('afterrender', function() {
      sugarComp.el.on('tap', function() {
        if(!sugarComp.isDisabled()) {
          this.selectSugar(sugarComp.sugar);
        }
      }, this);
    }, this);       
    
    this.sugars[record.data.amount] = sugarComp;
    
    if(sugarComp.sugar.data.name=='None')
    { 
    	this.selectSugar(sugarComp.sugar); 
    }
    return sugarComp;
  },
  selectSugar: function(record) {
    if(this.selected != null) {
      this.selected.setSelected(false);
    }
    if(record !== null) {
      this.selected = this.sugars[record.data.amount];
      this.selected.setSelected(true);      
    }else {
      this.selected = null;
    }
  },
  getSelectedSugar: function() {
    return this.selected.sugar;
  }
});
Ext.reg('GB_SELECTSUGARPANEL', gb.coffee.view.SelectSugarPanel);