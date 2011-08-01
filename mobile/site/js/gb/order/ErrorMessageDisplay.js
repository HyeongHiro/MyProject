gb.order.ErrorMessageDisplay = {
    
    messages: {
      100: {msg: 'Cafe Offline.', autopopup: true, route: null},
      101: {msg: 'Please choose a cafe.', autopopup: true, route: null},
      
      200: {msg: 'Please select a coffee', autopopup: true, route: null},
      201: {msg: 'Please select the desired food', autopopup: true, route: null},
      202: {msg: 'Some of your chosen food items are no longer available.', autopopup: true, route: null},
      
      300: {msg: 'Promo voucher expired.', autopopup: true, route: null},
      301: {msg: 'Promo voucher has already been used.', autopopup: true, route: null},
      302: {msg: 'Promo voucher already applied to order.', autopopup: true, route: null},
      303: {msg: 'Promo voucher not found.', autopopup: true, route: null},
      304: {msg: 'That promo code not be used with this order.', autopopup: true, route: null},
      
      400: {msg: 'Some of your chosen food items are no longer available.', autopopup: true, route: null},
      
      500: {msg: 'The chosen cafe is busy at that time. Please shoose a  new time.', autopopup: true, route: null},      
      
      700: {msg: 'Login failed, please check your email and password.', autopopup: true, route: null},
      
      900: {msg: 'Hi, it looks like you already have an account with us.', autopopup: true, route: null},      
      901: {msg: 'That mobile number is already in use by a Go Bean customer.', autopopup: true, route: null},
      
      2000: {msg: 'The cafe is busy at that time.', autopopup: false, route: null},      
      2010: {msg: 'The cafe is all booked out for the next half hour. You might want to try a different cafe!', autopopup: true, route: null}            
    },
    
    displayMessages: function(codes) {
      // build simgle html block and display.
      for ( var i = 0; i < codes.length; i++) {
        this.displayMessage(codes[i]);
      }
    },
    
    displayMessage: function(code) {
      if(code in this.messages){
        if('route' in this.messages[code] && this.messages[code].route != null) {
          Ext.Dispatch(this.messages[code].route);
        }else if('autopopup' in this.messages[code] && this.messages[code].autopopup) {
          Ext.Msg.alert('Error', this.messages[code].msg, Ext.emptyFn);
        }
      }else {
        Ext.Msg.alert('Error', 'An error occured. Code: ' + code, Ext.emptyFn);
      }
    }
    
    
    
    
};