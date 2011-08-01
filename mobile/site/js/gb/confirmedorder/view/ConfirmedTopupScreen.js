gb.confirmed.view.OrderConfirmedViaCafeTopupScreen = Ext.extend(gb.app.view.BaseScreen, 
{
  layout:{
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  initComponent : function() 
  {
    var heading = {
      id: 'THANKYOU_HEADING', html: '<p class="gbHeading">You\'re good to go</p>', padding: 4
    };
    var description = {
      id: 'THANKYOU_DESCRIPTION', html: '<p>Thanks, your order\'s confirmed. Just head to your cafe, quote your name, top-up your account and your coffee will be made like a regular order. Hope the queue\s not too long!</p>'
      , padding: 4
    };
    Ext.apply(this, {
      items : [{xtype: 'GB_TOPMENU',backDispatch: {controller: 'GB_CNTR_LAUNCH', action: 'launch'}, backText: 'New Order' }, heading, description]
    });
    
    gb.confirmed.view.OrderConfirmedViaCafeTopupScreen.superclass.initComponent.apply(this, arguments);   
  }
});

Ext.reg('GB_CONFIRMED_TOPUP_PANEL', gb.confirmed.view.OrderConfirmedViaCafeTopupScreen);


