/**
 * Active user is stored on the gb application context
 */
gb.user.model.User = Ext.extend(Ext.util.Observable, {

	firstName: null,
	lastName: null,
	balance: null,
	loyaltyActive: null,
	userid: null,
	mostRecentOrder: null, 
	confirmedOrder: null,
  
	update: function(newUser) 
  {
    this.balance = newUser.balance;
    this.firstName = newUser.firstName;
    this.lastName = newUser.lastName;
    this.loyaltyActive = newUser.loyaltyActive;
    this.loyaltyFree = newUser.loyaltyFree;
    this.userid = newUser.userid;
    if('mostRecentOrder' in newUser) {
    	this.mostRecentOrder = newUser.mostRecentOrder;
    }
    if('confirmedOrder' in newUser) {
      this.confirmedOrder = newUser.confirmedOrder;
    }    
    this.fireEvent("updated");
  }

});

Ext.reg('GB_USERMODEL', gb.user.model.User);