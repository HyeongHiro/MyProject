gb.email.view.EmailScreen = Ext.extend(gb.app.view.BaseScreen, {
  layout: {
    type: 'vbox',
    align: 'stretch',
    pack: 'start'
  },
  fullscreen: true,
  initComponent : function() {
    
    var heading = {id: 'SEND_EMAIL_HEADING', html: 'Share the Love', cls: 'gbHeading', padding: 4};
	var sub_heading = {id: 'SEND_EMAIL_SUB_HEADING', html: 'Type in a friend\'s email address and we\'ll offer them a free coffee.', cls: 'gbSubHeading.black.bold', padding: 4};
    var sendPanel = Ext.create({xtype: 'GB_SENDEMAIL_PANEL', id: 'SENDEMAIL', padding: 4});
    
    Ext.apply(this, {
      items : [{xtype: 'GB_TOPMENU'}, heading, sub_heading, sendPanel]
    });
    
    gb.email.view.EmailScreen.superclass.initComponent.apply(this, arguments);   
  },
  sendEmail: function() 
  {
//    console.log('send email');
  }
});
Ext.reg('GB_EMAILSCREEN', gb.email.view.EmailScreen);