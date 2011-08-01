gb.auth.view.WelcomePopupPanel = Ext.extend(Ext.Panel, {
  floating : true,
  centered: true,
  modal: true,
  cls: 'order_popup',
  padding: 10,
  width: 250,
  initComponent : function() {
    
    Ext.apply(this, {
      items : [ {html: '<div class="gbHeading" style="padding-bottom: 8px;">Cheers</div><div style="padding-bottom: 8px;">Cheers, We\'ll send you your free coffee voucher by SMS</div><br><div class="smallText">This could take up to 20 seconds.</div>'}]
    });
    
    gb.auth.view.WelcomePopupPanel.superclass.initComponent.apply(this, arguments);
  }
});
Ext.reg('GB_SIGNEDUP_POPUP_PANEL', gb.auth.view.WelcomePopupPanel);