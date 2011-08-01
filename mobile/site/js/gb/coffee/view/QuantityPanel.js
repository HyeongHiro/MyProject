/**
 * 
 */
 
gb.cafe.view.QuantityPanel = Ext.extend(Ext.Panel, {
  layout : 'hbox',
  padding: 10,
  initComponent : function() {	 
    this.value = "1";
    var plusButton = Ext.create({xtype: 'button', ui: 'green', text: '+', handler: this.runPlus, scope:this,id: 'PLUS_BUTTON'});
    this.quantityField = Ext.create({xtype:'panel', html: this.value, cls: 'quantity_box'});
    var minusButton = Ext.create({xtype: 'button', ui: 'green', text: '-', handler: this.runMinus, scope:this});
    var addOrderButton = Ext.create({xtype: 'button', ui: 'green', text: 'Add to order', handler: this.runAddOrder, scope:this});
	
	Ext.apply(this, {
	      cls: 'cafe_search_panel',
	      items: [{html:'Quantity '}, {xtype: 'spacer', width: 14}, minusButton, {xtype: 'spacer', width: 8},this.quantityField, {xtype: 'spacer', width: 8}, plusButton,{xtype: 'spacer', width: 8},addOrderButton]
	});	
    gb.cafe.view.QuantityPanel.superclass.initComponent.apply(this,arguments);
  },
  
  runPlus : function()
  {	   
	  intvalue = parseInt(this.value);	  
	  var intv = intvalue + 1;
	  this.value = intv;
	  this.quantityField.update(intv);
  },
  
  runMinus : function()
  { 
    intvalue = parseInt(this.value);      
    if(intvalue > 1)
    {
  	  	var intv = intvalue-1;
  	  	this.quantityField.update(intv);
  	  	this.value = intv;
    }        
  },
  runAddOrder: function(){ 
    this.fireEvent('addToOrder');
  },
  getSelectedQuantity: function() {
   return this.value;
  }
});
Ext.reg('GB_COFFEE_QUANTITY_PANEL', gb.cafe.view.QuantityPanel);