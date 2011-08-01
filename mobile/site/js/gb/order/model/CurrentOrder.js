/** */
gb.order.model.Order = Ext.extend(Ext.util.Observable, {
  
  state: gb.order.controller.States.SELECT_CAFE,
  total: 0,
  cafe: null,
  coffeeOrders: [],
  foodOrders: [],
  proposedPickup: null,
  proposedSlot: null,

  update: function(newOrder) {
    this.state = newOrder.state;
    this.total = newOrder.total;
    this.cafe = newOrder.cafe;
    this.coffeeOrders = newOrder.coffeeOrders;
    this.foodOrders = newOrder.foodOrders;
    
    this.proposedPickup = newOrder.proposedPickupTime;
    this.proposedSlot = newOrder.proposedSlot;
    
    this.fireEvent('updated');
  },
  
  getOrderStage: function() {
    return gb.order.controller.States.getOrderStage(this.state);
  }
  

});