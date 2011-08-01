gb.confirmed.view.OrderConfirmedScreen = Ext.extend(gb.app.view.BaseScreen, 
{
  layout: 
  {
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  initComponent : function() 
  {
    var heading = {
      id: 'THANKYOU_HEADING', html: '<p class="gbHeading">You\'re good to go</p>', padding: 4
    };
    
    var theHtml = '<div>Thanks for your order.</div>';
    theHtml += '<div class="greenText bold">Your coffee will be ready after ' +  gb.context.CONTEXT.getUser().confirmedOrder.approvedPickupTime + '.</div><br>';
    theHtml += '<div>We\'ll also remember your order, so next time will only take a couple of taps to grab your coffee.</div><br>';
    
    
    var loyaltyCard = '<div class="loyaltyCard">';
    loyaltyCard += '<div><div><table class="loyaltytable" width="100%"><tr><td align="center" class="gbHeading">LOYALTY CARD</td></tr><tr>';
    loyaltyCard += '<td align="center">' + gb.context.CONTEXT.getUser().confirmedOrder.cafe.name + '</td></tr><tr><td align="center">' + gb.context.CONTEXT.getUser().confirmedOrder.cafe.address + '</td></tr></table></div>';
    
    
    loyaltyCard += '<div class="img">';
    for ( var i = 1; i <= 10; i++) {
      if (gb.context.CONTEXT.getUser().confirmedOrder.loyaltyCard.stamps >= i) {
        loyaltyCard += '<div class="stamp"><img src="images/beanstamp.png"></div>';
      }else {
        loyaltyCard += '<div class="stamp"><img src="images/emptystamp.png"></div>';
      }
      if(i % 3 == 0) {
        loyaltyCard += '</div><div style="clear: left;"></div><div class="img">';
      }
    }
    
    if(gb.context.CONTEXT.getUser().confirmedOrder.loyaltyCard.loyaltyCoffee) {
      loyaltyCard += '<div class="stamp"><img src="images/free.png"></div><div class="greenText">Your next coffee is on us.</div>';  
    }else {
      loyaltyCard += '<div class="stamp"></div><div class="stamp"></div>';
    }
    loyaltyCard += '<br style="clear: both;" /></div>';
    
    
    var description = {
        id: 'THANKYOU_DESCRIPTION', 
        html: theHtml + loyaltyCard, 
        padding: 4
    };
    Ext.apply(this, 
    {
      items : [{xtype: 'GB_TOPMENU', hideCart: true, backDispatch: {controller: 'GB_CNTR_LAUNCH', action: 'launch'}, backText: 'New Order'}, heading, description]
    });
    
    gb.confirmed.view.OrderConfirmedScreen.superclass.initComponent.apply(this, arguments);   
  }
});

Ext.reg('GB_CONFIRMED_PANEL', gb.confirmed.view.OrderConfirmedScreen);