gb.auth.view.SignUpItems = Ext.extend(Ext.form.FieldSet, 
{
	defaults: {
        required: true,
        cls: 'gbSubHeading'
    },
    items: [
	{
		xtype: 'textfield',
		name : 'name',
		id : 'first_name',
		placeHolder: 'First name',
		useClearIcon: true,
		autoCapitalize : false
	},{
		xtype: 'textfield',
		id : 'last_name',
		placeHolder: 'Last name'
	},{
		xtype: 'emailfield',
		id : 'emailfield',
		name : 'email',
		placeHolder: 'Email',
		useClearIcon: true
	},{
		xtype: 'textfield',
		id : 'number',
		name: 'number',
		placeHolder: 'Mobile number - For your free coffee voucher',
		maxValue : 20,
		minValue : 2
	},{
		xtype: 'passwordfield',
		id : 'password',
		name : 'password',
		placeHolder: 'Password',
		useClearIcon: false
	},{
		xtype: 'passwordfield',
		id : 'cpassword',
		placeHolder: 'Confirm password',
		useClearIcon: false
	}]   
});

Ext.reg('GB_SIGNUPITEMS', gb.auth.view.SignUpItems);