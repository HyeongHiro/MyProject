gb.confirmorder.view.TermsPanel = Ext.extend(Ext.Panel, {
  layout : {
    type : 'vbox',
    align : 'stretch',
    pack : 'start'
  },
  padding: 10,
  initComponent : function() {
    var heading = Ext.create({
      xtype : 'panel',
      html : 'By proceeding I agree to the Terms and Conditions'
    });

    Ext.apply(this, {
      items : [ heading ]
    });

    gb.confirmorder.view.TermsPanel.superclass.initComponent.apply(this,arguments);
  }
});

Ext.reg('GB_TERMS_PANEL', gb.confirmorder.view.TermsPanel);