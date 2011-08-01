gb.coffee.view.SelectSizePanel = Ext.extend(gb.coffee.view.BaseSelectPanel, {
  cls: 'coffee_select_panel base_select_panel',
  sizes: {},
  initComponent : function() {
    var tempItems = new Array();
    for ( var i = 0; i < gb.coffee.model.SizeStore.getCount(); i++) 
    {
      tempItems.push({xtype:'spacer'});
      tempItems.push(this.createSizeItem(gb.coffee.model.SizeStore.getAt(i)));      
    }
    tempItems.push({xtype:'spacer'});
    
    this.currentSmallRegLar = 'Regular';
    this.currentShortLong ='Short';
    
    Ext.apply(this, {items: tempItems});
    gb.coffee.view.SelectSizePanel.superclass.initComponent.apply(this, arguments);   
  },
  
  createSizeItem: function(record) {
    var sizeComp = new gb.coffee.view.SizeComponent(
    {
          hidden: true,
          size: record
    });   
    
    sizeComp.addListener('afterrender', function() {
      sizeComp.el.on('tap', function(){
        if(!sizeComp.isDisabled()){  
        	if(sizeComp.size.data.name=='Small'||sizeComp.size.data.name=='Regular'||sizeComp.size.data.name=='Large'){
        		this.currentSmallRegLar = sizeComp.size.data.name;
            this.selectSize(sizeComp.size);        			
        	}else if(sizeComp.size.data.name=='Short'||sizeComp.size.data.name=='Long'){
        		this.currentShortLong = sizeComp.size.data.name;                 
            this.selectSize(sizeComp.size);
        	}
        }
      }, this);         
    }, this);  
    this.sizes[record.data.size] = sizeComp;
    return sizeComp;
  },
  
  selectSize: function(record){
	    if(this.selected != null) {
	      this.selected.setSelected(false);
	    }
	    if(record !== null) {
	      this.selected = this.sizes[record.data.size];
	      this.selected.setSelected(true);      
	    }else {
	      this.selected = null;
	    }
  },
  
  getSelectedSize: function() {
    if (this.selected === undefined || this.selected === null) {
      return null;
    }    
    return this.selected.size.data.size;
  },
 
  enableSizes: function(sizeArray) {	  
    for (x in this.sizes) {
      if(sizeArray.indexOf(this.sizes[x].getSize()) >= 0) { 
        this.sizes[x].setVisible(true);     
      }else {
        this.sizes[x].setVisible(false);
        if(this.selected == this.sizes[x]) {
          this.selectSize(null);  
        }
      }
    }    
    if(this.selected == null) {
      for (x in this.sizes) {
        if(this.sizes[x].isVisible()) {
          this.selectSize(this.sizes[x].size);    
        }
      }
    }
    this.doLayout();
  }
});
Ext.reg('GB_SELECTSIZEPANEL', gb.coffee.view.SelectSizePanel);