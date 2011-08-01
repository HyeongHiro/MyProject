gb.coffee.view.SelectStrengthPanel = Ext.extend(gb.coffee.view.BaseSelectPanel, {
  cls: 'strength_select_panel base_select_panel',
  strengths: {},
  initComponent : function() {
    var tempItems = new Array();
    
    for ( var i = 0; i < gb.coffee.model.StrengthStore.getCount(); i++) {
      tempItems.push({xtype:'spacer'});
      tempItems.push(this.createStrengthItem(gb.coffee.model.StrengthStore.getAt(i)));
    }
    tempItems.push({xtype:'spacer'});
    
    Ext.apply(this, {items: tempItems});
    gb.coffee.view.SelectStrengthPanel.superclass.initComponent.apply(this, arguments);   
  },
  createStrengthItem: function(record) {
    var strengthComp = new gb.coffee.view.StrengthComponent(
        {
          strength: record
    });
    strengthComp.addListener('afterrender', function() {
      strengthComp.el.on('tap', function() {
        if(!strengthComp.isDisabled()) {
          this.selectStrength(strengthComp.strength);
        }
      }, this);
    }, this);  
    this.strengths[record.data.type] = strengthComp;
    
    if(strengthComp.strength.data.name=='Single shot')
    { 
    	this.selectStrength(strengthComp.strength); 
    }
    return strengthComp;
  },
  selectStrength: function(record) {
    if(this.selected != null) {
      this.selected.setSelected(false);
    }
    if(record !== null) {
      this.selected = this.strengths[record.data.type];
      this.selected.setSelected(true);      
    }else {
      this.selected = null;
    }
  },
  getSelectedStrength: function() {
    if (this.selected === undefined || this.selected === null) {
      return null;
    }
    return this.selected.strength;
  }
});
Ext.reg('GB_SELECTSTRENGTHPANEL', gb.coffee.view.SelectStrengthPanel);