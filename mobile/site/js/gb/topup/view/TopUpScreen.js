gb.home.view.TopUpScreen = Ext.extend(gb.app.view.BaseScreen, 
{
  amount: 10,
  layout: 
  {
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  initComponent : function() 
  {
    var heading = {id: 'CHOOSE_TOPUP_HEADING', html: 'Top up your credit', cls: 'gbHeading', padding: 4};
  
  var description = {id: 'HEADING_DESCRIPTION', html: 'Whoops! We\'ve got your order, but you don\'t seem to have enough coffee credit in your account.', padding: 4};  
  
  var combo_heading = {id: 'COMBO_HEADING', html : 'Top up amount' , cls: 'gbSubHeading' ,padding: 4};
  
  var combo_sub_heading = {id: 'COMBO_SUB_HEADING', html : 'Please note the minimum amount is $10', padding: 4};
  
  var payment_heading = {id: 'PAYMENT_TYPE_HEADING', html: 'Choose your payment type', cls: 'gbSubHeading', padding: 4};
  
  var amount_field = Ext.create( 
  {
        xtype: 'selectfield',
        id: 'TOP_AMOUNT_FIELD',
        width : 180,
        name: 'amount',
        options: [
          {text: '$10',   value: '10'},
          {text: '$20',   value: '20'},
          {text: '$50',   value: '50'}
        ]
  });
  amount_field.addListener('change', function(a, amount) {
    this.amount = amount;
    if(!gb.context.CONTEXT.getUser().loyaltyFree) {
      if(amount == 10) {
        Ext.getCmp('TOPUP_CHARGE').update('$0.50');
      }else if(amount == 20) {
        Ext.getCmp('TOPUP_CHARGE').update('$0.75');
      }else if(amount == 50) {
        Ext.getCmp('TOPUP_CHARGE').update('$1.00');
      }
    }else {
      Ext.getCmp('TOPUP_CHARGE').update('Free');
    }
  }, this);
  
  var check_box = new Ext.Panel(
  {
   layout: {
    type: 'hbox',
    align: 'stretch',
    pack: 'start'
  },
  items: [
    {
      xtype: 'checkboxfield',
      name: 'GO_BEAN_XTRA_CHECK_BOX',
      id: 'LOYALTY_CHECK_BOX',
      checked: true,
      width: 40,
      style: 'border: none'
    },{
      id: 'CHECK_BOX_HEADING', 
      html : 'Go Bean Xtra</div>', 
      cls: 'gbHeading' ,padding: 4
    }, {xtype: 'spacer'},
    {
      id: 'TOPUP_CHARGE', 
      html : gb.context.CONTEXT.getUser().loyaltyFree ? 'Free' : '$0.50', 
      cls: 'gbHeading' ,padding: 4
    }
  ]
  });
  
    var check_box_sub_heading = {
        id: 'CHECK_BOX_SUB_HEADING', 
        html : 'Get every 11th coffee for free, exclusive deals plus lot more! <a href="#" onclick="gb.xtra.view.show(); return false;">view details</a><hr style="border: 1px solid #ccc;">',
        padding: 4};
    
    var paymentTypePanel = Ext.create({xtype: 'GB_SELECT_TOPUP_PANEL' , id:'SELECT_TOPUP_PANEL'});
    paymentTypePanel.addListener('topupSelected', function(type) {
      if(type == "paypal") {
        gb.LoadMask.show();
        location.href='processpaypal.php?amount=' + this.amount + '&loyalty=' + this.getLoyalty();
      }else if(type == "cafe") {
        var trn = new gb.topup.transact.CreateTopupTransaction({amt:this.amount, loyalty:this.getLoyalty()});
        trn.run();
      }
    }, this);
    
    Ext.apply(this, {
          items : [{xtype: 'GB_TOPMENU', backDispatch: {controller: 'GB_CNTR_CONFIRM_ORDER', action: 'launch'},  hideStages: true}, 
                   heading, 
                   description, 
                   combo_heading, 
                   combo_sub_heading, 
                   amount_field, 
                   check_box, 
                   check_box_sub_heading,  
                   payment_heading, paymentTypePanel]
    });

    gb.home.view.TopUpScreen.superclass.initComponent.apply(this, arguments);   
  },
  getLoyalty: function() {
    return Ext.getCmp('LOYALTY_CHECK_BOX').isChecked();
  }
});

Ext.reg('GB_TOPUPSCREEN', gb.home.view.TopUpScreen);