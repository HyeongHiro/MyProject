gb.food.view.FoodSmallDisplayHead = Ext.extend(Ext.Panel, {
  layout: 'hbox',
  cls: 'food_small_display_head',
  complete: false,
  constructor: function (options) 
  {
    this.food = options.food;   
    gb.food.view.FoodSmallDisplayHead.superclass.constructor.call(this, options);
  },
  initComponent : function() 
  {
    Ext.apply(this, {items : [{html : this.food.data.name, cls: 'gbSubHeading'}, {xtype: 'spacer'}, {html : '$' + this.food.data.price, cls: 'gbSubHeading'}]});
    gb.food.view.FoodSmallDisplayHead.superclass.initComponent.apply(this, arguments);
  }
});
Ext.reg('FoodSmallDisplayHead', gb.food.view.FoodSmallDisplayHead);

gb.food.view.FoodSmallDisplayMiddle = Ext.extend(Ext.Panel,
{
  layout: 'hbox',
  cls: 'food_small_display_middle',
  complete: false,
  constructor: function (options) 
  {
    this.food = options.food;   
    gb.food.view.FoodSmallDisplayMiddle.superclass.constructor.call(this, options);
  },
  initComponent : function() 
  {

    Ext.apply(this, {items : [{html : this.getDisplayString()}] });
    gb.food.view.FoodSmallDisplayMiddle.superclass.initComponent.apply(this, arguments);
  },
  getDisplayString: function() {
    var mlength = 120;
    if(this.food.data.description.length < mlength){
      return this.food.data.description;
    }else {
      return this.food.data.description.substring(0, mlength) + '...';
    }
  }
});
Ext.reg('FoodSmallDisplayMiddle', gb.food.view.FoodSmallDisplayMiddle);

gb.food.view.FoodSmallDisplayTail = Ext.extend(Ext.Panel, {
  layout: 'hbox',
  cls: 'food_small_display_tail',
  complete: false,
  constructor: function (options) 
  {
    this.food = options.food;   
    gb.food.view.FoodSmallDisplayHead.superclass.constructor.call(this, options);
  },
  initComponent : function() 
  {
    // TODO buttons need a listener

    
    Ext.apply(this, { items : [ {xtype: 'spacer'},
                 {html : 'Quantity'},{xtype: 'spacer', width: 10},
                 {xtype: 'spinnerfield', minValue:0 } ]});
    
    gb.food.view.FoodSmallDisplayHead.superclass.initComponent.apply(this, arguments);
  }
});
Ext.reg('FoodSmallDisplayTail', gb.food.view.FoodSmallDisplayTail);

gb.food.view.FoodSmallDisplayPanel = Ext.extend(Ext.Panel, {
  layout: 
  {
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  padding: 2,
  margin: 4,
  cls: 'food_small_display',
  
  constructor: function (options) {
    this.food = options.food;
    gb.food.view.FoodSmallDisplayPanel.superclass.constructor.call(this, options);
  },  
  
  initComponent : function() {
    Ext.apply(this, {
      items : [  
               {xtype : 'FoodSmallDisplayHead', food: this.food, id: 'FOOD_HEADING' + this.food.data.id},
               {xtype : 'FoodSmallDisplayMiddle', food: this.food, id: 'FOOD_DETAILS' + this.food.data.id},
               {xtype: 'GB_QUANTITY_PANEL', min: 0, id: 'SELECT_QUANTITY_PANEL' + this.food.data.id}
               ]
    });
    gb.food.view.FoodSmallDisplayPanel.superclass.initComponent.apply(this, arguments);
  },
  getOrderQuantity: function() {
    return this.getComponent('SELECT_QUANTITY_PANEL' + this.food.data.id).getSelectedQuantity();
  }
});
Ext.reg('FoodSmallDisplay', gb.food.view.FoodSmallDisplayPanel);