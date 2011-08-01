gb.confirmorder.view.PickupPanel = Ext.extend(Ext.Panel, {
  layout : {
    type : 'vbox',
    align : 'stretch',
    pack : 'start'
  },
  padding: 10,
  cls: 'base_select_panel',
  initComponent : function() {
    var heading = Ext.create({
      xtype : 'panel',
      html : 'Please select your pick up time'
    });

    this.time = new Ext.form.Select({
      name: 'pickup',
      options : [ 
      {
        text : 'ASAP',
        value : '10'
      }, {
        text : '15 minutes',
        value : '15'
      }, {
        text : '20 minutes',
        value : '20'
      } ]
    });
    
    var timeWrapper = Ext.create({xtype: 'panel', layout: 'hbox', items: [this.time]});
    

    Ext.apply(this, {
      items : [ heading, timeWrapper ]
    });

    gb.confirmorder.view.PickupPanel.superclass.initComponent.apply(this,
        arguments);
  },
  getOffset: function() {
    return this.time.getValue();
  }
});

Ext.reg('GB_PICKUP_PANEL', gb.confirmorder.view.PickupPanel);