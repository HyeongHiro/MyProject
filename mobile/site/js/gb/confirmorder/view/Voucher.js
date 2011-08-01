gb.confirmorder.view.VoucherPanel = Ext.extend(Ext.Panel, {
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
      html : 'If you have a voucher number, please enter it here.'
    });
    
    this.voucherField = Ext.create({xtype: 'textfield', id:'ORDER_VOUCHER', cls: 'order_voucher', width: 180});
    var apply = Ext.create({xtype: 'button', ui: 'green', text: 'Apply', scope: this, handler: this.applyVoucher});
    
    var applyPanel = Ext.create({xtype: 'panel', layout: 'hbox', items:[this.voucherField,{xtype: 'spacer', width: 8},apply,{xtype: 'spacer'}]});
    
   var kapowPanel = Ext.create({xtype: 'panel', cls: 'greenText', id: 'KAPOWPANEL',
      html: '<br><b>Kapow! It\'s done. Your free coffee awaits.</b><br>(Weird how the free ones always taste best!)', hidden: true});
    
    Ext.apply(this, {
      items : [ heading, applyPanel, kapowPanel]
    });

    gb.confirmorder.view.VoucherPanel.superclass.initComponent.apply(this, arguments);
  },
  applyVoucher: function() {
    var code = this.voucherField.getValue();
    if (code !== null && code != '') {
      Ext.dispatch({controller: 'GB_CNTR_CONFIRM_ORDER', action:'applyPromo', promoCode: code, 
        callback: this.processVoucherResult, callbackScope: this});
    }else {
      Ext.Msg.alert('Error', 'Please enter a valid voucher code.', Ext.emptyFn);
    }
  },
  processVoucherResult: function(jsonResult) {
    
    if('feedbackCodes' in jsonResult && jsonResult.feedbackCodes.length > 0 ) {
      if(jsonResult.feedbackCodes.indexOf(300) >= 0) {
        this.displayKapow();
        this.fireEvent('applied');
      }
    }
  },
  displayKapow: function() {
    this.getComponent('KAPOWPANEL').setVisible(true);
    this.voucherField.update('');
    this.doComponentLayout();  
    
  }
});
Ext.reg('GB_VOUCHER_PANEL', gb.confirmorder.view.VoucherPanel);