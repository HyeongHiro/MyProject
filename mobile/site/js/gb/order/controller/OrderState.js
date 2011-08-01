gb.order.controller.States = {
    
    SELECT_CAFE: 5,
    SET_CAFE: 6,

    SELECT_COFFEE: 10,
    ADD_COFFEE: 11,
    SELECT_COFFEE_REMOVE_FOOD: 12,   // on select coffee page, remove food from order action
    SELECT_COFFEE_REMOVE_COFFEE: 13,  // on select coffee page, remove coffee from order action
 
    SELECT_COFFEE_WITH_LAST_ORDER:  14,

    SELECT_FOOD: 20,
    ADD_FOOD: 21,
    SELECT_FOOD_REMOVE_FOOD: 22,   // on select coffee page, remove food from order action
    SELECT_FOOD_REMOVE_COFFEE: 23,  // on select coffee page, remove coffee from order action    
    
    ORDER_LOGIN: 30,
    ORDER_PROCESS_LOGIN: 31,
    ORDER_FORGOTPW: 32,
    ORDER_FORGOTPW_PROCESS: 33,

    ORDER_SIGNUP: 40,
    PROCESS_SIGNUP: 41,
    
    ORDER_TOP_UP: 50,
    ORDER_PROCESS_TOP_UP: 51,
    
    PAYPAL_ERROR: 55,
    
    LOAD_ORDER: 90,
    
    CONFIRM_ORDER: 100,
    CONFIRM_APPLY_PROMO: 101,
    CONFIRM_REMOVE_COFFEE: 102,
    CONFIRM_REMOVE_FOOD: 103,
    
    PROCESS_ORDER_VIA_CAFE_TOPUP: 190,
    PROCESS_ORDER: 200,
    
    getOrderStage: function(state) {
      if(state <= this.SET_CAFE) {
        return {stage: 1, msg: 'Choose your cafe'};  
      }
      if(state <= this.SELECT_COFFEE_REMOVE_COFFEE) {
        return {stage: 2, msg: 'Choose your coffee'};  
      }
      if(state >= this.SELECT_FOOD && state <= this.SELECT_FOOD_REMOVE_COFFEE) {
        return {stage: 3, msg: 'Choose your food'};  
      }
      if(state >= this.CONFIRM_ORDER && state <= this.CONFIRM_REMOVE_FOOD) {
        return {stage: 4, msg: 'Confirm your order'};  
      }
      return {stage: -1, msg: ''};  
    }
}