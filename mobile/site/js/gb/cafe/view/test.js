/**
 * 
 */

Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {

        var form;
        
        Ext.apply(Ext.data.validations,{
            passwordMessage: 'Password Entered is wrong',
            password: function(config, value) {
                if(value == "test"){
                    return true;
                } else {
                    return false;
                }
            }
        });
        
        Ext.regModel('User', {
            fields: [
                {name: 'name',     type: 'string'},
                {name: 'password', type: 'password'},
                {name: 'email',    type: 'string'}
            ],
            validations: [
                {type: 'presence', name: 'name',message:"Enter Name"},
                {type: 'presence', name: 'password', message : "Enter Password"},
                {type: 'format',   name: 'email', matcher: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message:"Wrong Email Format"},
                {type : 'password', name:'password'}
            ]
        });
        
        var formBase = {
            scroll: 'vertical',
            url   : 'postUser.php',
            standardSubmit : false,
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Personal Info',
                    instructions: 'Please enter the information above.',
                    defaults: {
                        required: true,
                        labelAlign: 'left',
                        labelWidth: '40%'
                    },
                    items: [
                    {
                        xtype: 'textfield',
                        name : 'name',
                        label: 'Name',
                        useClearIcon: true,
                        autoCapitalize : false
                    }, {
                        xtype: 'passwordfield',
                        name : 'password',
                        label: 'Password',
                        useClearIcon: false
                    }, {
                        xtype: 'emailfield',
                        name : 'email',
                        label: 'Email',
                        placeHolder: 'you@sencha.com',
                        useClearIcon: true
                    }]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            text: 'Load Model',
                            ui: 'round',
                            handler: function() {
                                formBase.user = Ext.ModelMgr.create({
                                    'name'    : 'Akura',
                                    'password': 'secret',
                                    'email'   : 'saru@sencha.com'
                                }, 'User');
				            form.loadModel(formBase.user);
                            }
                        },
                        {xtype: 'spacer'},
                        {
                            text: 'Reset',
                            handler: function() {
                                form.reset();
                            }
                        },
                        {
                            text: 'Save',
                            ui: 'confirm',
                            handler: function() {
                                var model = Ext.ModelMgr.create(form.getValues(),'User');
                                
                                var errors = model.validate(),message = "";
                                if(errors.isValid()){
                                    
                                    if(formBase.user){
                                    form.updateRecord(formBase.user, true);
                                    }
                                    form.submit({
                                        waitMsg : {message:'Submitting', cls : 'demos-loading'}
                                    });
                                    
                                } else {
                                    Ext.each(errors.items,function(rec,i){
                                        message += rec.message+"<br>";
                                    });
                                    Ext.Msg.alert("Validate", message, function(){});
                                    return false;
                                }
                            }
                        }
                    ]
                }
            ]
        };
        
        if (Ext.is.Phone) {
            formBase.fullscreen = true;
        } else {
            Ext.apply(formBase, {
                autoRender: true,
                floating: true,
                modal: true,
                centered: true,
                hideOnMaskTap: false,
                height: 385,
                width: 480
            });
        }
        
        form = new Ext.form.FormPanel(formBase);
        form.show();
    }
});