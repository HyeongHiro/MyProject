gb.home.view.SelectCoffeeScreen = Ext.extend(gb.app.view.BaseScreen, {
  layout: 
  {
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  maxHeight: 300,
  initComponent : function() {
    Ext.apply(this, {
      items : [
               {xtype: 'GB_TOPMENU', backDispatch: {controller: 'GB_CNTR_CAFE', action: 'launch'}}, 
               {xtype: 'GB_SELECTCOFFEEPANEL', id: 'SELECT_COFFEE_TYPE_PANEL',listeners:{coffeeSwitch:this.updateCoffeeSelection,scope:this}},
               {xtype: 'GB_SELECTSIZEPANEL', id: 'SELECT_SIZE_PANEL', height: 100},
               {xtype: 'GB_SELECTMILKPANEL', id: 'SELECT_MILK_PANEL', height: 100},
               {xtype: 'GB_SELECTSTRENGTHPANEL', id: 'SELECT_STRENGTH_PANEL', height: 100 },
               {xtype: 'GB_SELECTSUGARPANEL', id: 'SELECT_SUGAR_PANEL', height: 100},
               {xtype: 'GB_SREQUEST_PANEL', id: 'SELECT_SREQUEST_PANEL'},
               {xtype: 'GB_COFFEE_QUANTITY_PANEL', min:1, id: 'SELECT_QUANTITY_PANEL',listeners:{addToOrder:this.addToOrder,scope:this}},
               {xtype: 'GB_ORDERFINISHBUTTON_PANEL', id: 'SELECT_ORDERFINISH_PANEL'},
               {xtype: 'spacer', height: 10}
              ]
    });
    
    this.addListener('afterrender', function() {
      var sizeObjects = gb.coffee.model.CoffeeStore.getAt(0).get('sizes');
      var sizeArray = new Array();
      for ( var i = 0; i < sizeObjects.length; i++) {
        sizeArray.push(sizeObjects[i].size);
      }
      this.getComponent('SELECT_SIZE_PANEL').enableSizes(sizeArray);
      }, this);    
    gb.home.view.SelectCoffeeScreen.superclass.initComponent.apply(this, arguments); 
    this.checkOrderFinishPanel();
  },
  
  checkOrderFinishPanel: function()
  {
	  var numberCoffeeOrders = gb.context.CONTEXT.getOrder().coffeeOrders.length;
	  if(numberCoffeeOrders == 0)
	  {
		  var panel = Ext.getCmp('SELECT_ORDERFINISH_PANEL');
		  panel.setVisible(false);
		  this.doLayout();
	  }  
  }, 
  
  setVisibleOrderFinishPanel: function()
  {
	  var panel = Ext.getCmp('SELECT_ORDERFINISH_PANEL');
	  if(panel.isVisible()==false)
	  {
		  panel.setVisible(true);
		  panel.doComponentLayout(); 		  
	  }	  
  }, 
  
  updateCoffeeSelection: function(coffee) {
    var sizeObjects = gb.coffee.model.CoffeeStore.getById(coffee.type).get('sizes');
    var sizeArray = new Array();
    for ( var i = 0; i < sizeObjects.length; i++) {
      sizeArray.push(sizeObjects[i].size);
    }
    this.getComponent('SELECT_SIZE_PANEL').enableSizes(sizeArray);
  },
  addToOrder: function() {
    Ext.dispatch({ controller: 'GB_CNTR_SELECT_COFFEE', action: 'addCoffee',  data: this.getData()});              
  },
  getData: function() {
    var selectedCoffee = this.getSelectedCoffee();
    if(selectedCoffee != null) {
      
      var selectedMilk = this.getSelectedMilk();
      if(selectedMilk != null) {
        
        var selectedStrength = this.getSelectedStrength();
        var selectedSugar =this.getSelectedSugar();
        var selectedExtras =this.getExtras();
        var selectedQty =this.getSelectedQty();
        
        return {
          coffeeSizeId: selectedCoffee.id,
          milkId: selectedMilk.data.id,
          strength: selectedStrength.data.type,
          sugar: selectedSugar.data.amount,
          extras: selectedExtras,
          qty: selectedQty
        };
       
      }else {
        Ext.Msg.alert('Error', 'Please select a milk option.', Ext.emptyFn);
      } 
    }else {
      Ext.Msg.alert('Error', 'Please select your cup size.', Ext.emptyFn);
    }  
    return null;
  },
  getSelectedCoffee: function() {
    var tCoffee = this.getComponent('SELECT_COFFEE_TYPE_PANEL').getSelectedCoffee();
    var coffeeOption = gb.coffee.model.CoffeeStore.getById(tCoffee.type);
    var tsize = this.getComponent('SELECT_SIZE_PANEL').getSelectedSize();
    if(tsize !== null && tsize !== undefined) {
      var selectedSize = null; 
      for ( var i = 0; i < coffeeOption.data.sizes.length; i++) {
        if(coffeeOption.data.sizes[i].size == tsize) {
          return coffeeOption.data.sizes[i];
        }
      }
    }
    return null;
  },
  getSelectedMilk: function() {
    var tMilk = this.getComponent('SELECT_MILK_PANEL').getSelectedMilk();
    if(tMilk != null) {
      return gb.coffee.model.MilkStore.getWithType(tMilk.type);
    }
    return null;
  },
  getSelectedStrength: function() {
    return this.getComponent('SELECT_STRENGTH_PANEL').getSelectedStrength();
  },
  getSelectedSugar: function() {
    return this.getComponent('SELECT_SUGAR_PANEL').getSelectedSugar();
  },
  getExtras: function() {
    return this.getComponent('SELECT_SREQUEST_PANEL').getSpecialRequests();
  },
  getSelectedQty: function() {
    return this.getComponent('SELECT_QUANTITY_PANEL').getSelectedQuantity();
  }
});
Ext.reg('GB_SELECTCOFFEESCREEN', gb.home.view.SelectCoffeeScreen);