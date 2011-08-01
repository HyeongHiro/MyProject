/**
 * 
 */
 
gb.cafe.view.QuantityPanel = Ext.extend(Ext.Panel, {
  layout: 'hbox',
  min: 0,
  max: 5,
  initComponent : function() {
    this.value = "0";
    
	  var plusButton = Ext.create({xtype: 'button', ui: 'green', text: '+', handler: this.runPlus, scope: this});
    this.quantityField = Ext.create({xtype:'panel', html: this.value, cls: 'quantity_box'});
    var minusButton = Ext.create({xtype: 'button', ui: 'green', text: '-', handler: this.runMinus, scope:this});
	
  	Ext.apply(this, {
  	      cls: 'cafe_search_panel',
  	      items: [
  	              {xtype: 'spacer'},
  	              {html:'Quantity '}, 
  	              {xtype: 'spacer', width: 14}, 
  	              minusButton,
  	              {xtype: 'spacer', width: 8},
  	              this.quantityField, 
  	              {xtype: 'spacer', width: 8},
  	              plusButton 
  	              ]
  	});	
    gb.cafe.view.QuantityPanel.superclass.initComponent.apply(this,arguments);
  },
  
  runPlus : function()
  {	  
	  intvalue = parseInt(this.value);	  
	  var newVal = intvalue+1;
	  if(newVal <= this.max) {
	    this.value = newVal;
	    this.quantityField.update(this.value);
	  }
  },
  
  runMinus : function()
  { 
      intvalue = parseInt(this.value);      
      if(intvalue > this.min)
      {
    	  	var newVal = intvalue-1;
    	    this.value = newVal;
    	    this.quantityField.update(this.value);
      }        
  },
  getSelectedQuantity: function() {
   return this.value
  }
});
Ext.reg('GB_QUANTITY_PANEL', gb.cafe.view.QuantityPanel);