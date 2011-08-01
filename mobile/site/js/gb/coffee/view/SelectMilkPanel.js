gb.coffee.view.SelectMilkPanel = Ext.extend(gb.coffee.view.BaseSelectPanel, {
  layout: 'hbox',
  padding: 10,
  cls: 'milk_select_panel base_select_panel',
  milks: {},
  initComponent : function() {
    var tempItems = new Array();
    
    var milks = [
    {name: 'Skim', type: 'Skinny', cssClass: 'coffee_milk_skim'},
    {name: 'Full Cream', type: 'Full Cream', cssClass: 'coffee_milk_fullcream'},
    {name: 'Soy', type: 'Soy', cssClass: 'coffee_milk_soy'}];    
    
    for ( var i = 0; i < milks.length; i++) {
      tempItems.push({xtype:'spacer'});
      tempItems.push(this.createMilkItem(milks[i]));
    }
    tempItems.push({xtype:'spacer'});
    tempItems.push({name: 'None', type: 'None', cssClass: 'coffee_milk_none', hidden: true});
    
    Ext.apply(this, {items: tempItems});
    gb.coffee.view.SelectMilkPanel.superclass.initComponent.apply(this, arguments);   
  },
  createMilkItem: function(record) {
    var milkComp = new gb.coffee.view.MilkComponent(
    {
          milk: record
    });
    milkComp.addListener('afterrender', function() {
      milkComp.el.on('tap', function() {
        if(!milkComp.isDisabled()) {
          this.selectMilk(milkComp.milk);
        }
      }, this);
    }, this);       
    
    this.milks[record.type] = milkComp;
    
    if(milkComp.milk.name=='Full Cream')
    { 
    	this.selectMilk(milkComp.milk); 
    }
        
    return milkComp;
  },
  
  
  selectMilk: function(record) {
    if(this.selected != null) {
      this.selected.setSelected(false);
    }
    if(record !== null) {
      this.selected = this.milks[record.type];
      this.selected.setSelected(true);
    }else {
      this.selected = null;
    }
  },
  getSelectedMilk: function() {
    return this.selected.milk;
  }
});
Ext.reg('GB_SELECTMILKPANEL', gb.coffee.view.SelectMilkPanel);