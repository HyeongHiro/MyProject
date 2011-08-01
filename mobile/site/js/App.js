Ext.regApplication({
    name: "gb",
    phoneStartupScreen: '/images/splashscreen.png',
    
    launch: function() {
      gb.context.CONTEXT = new gb.app.AppContext();
      gb.context.NAVIGATION = new gb.app.AppNavigation();
      
      gb.geo.tracker = new gb.geo.GeoTracker();
      gb.geo.tracker.load();
      gb.geo.tracker.update();

      Ext.Router.draw(function(map) {
        map.connect("myaccount",  {controller: 'GB_CNTR_MYACCOUNT', action: 'launch'});
        
        map.connect("cafeLaunch",  {controller: 'GB_CNTR_CAFE', action: 'launch'});
        map.connect("cafereopen",  {controller: 'GB_CNTR_CAFE', action: 'reopen'});
        map.connect("cafeSearch",  {controller: 'GB_CNTR_CAFE', action: 'launchWithOutLocation'});
        map.connect("cafeNear", {controller: 'GB_CNTR_CAFE', action: 'launchWithLocation'});
        
        map.connect("coffeeSelect", {controller: 'GB_CNTR_SELECT_COFFEE', action: 'select'});
        map.connect("foodSelect", {controller: 'GB_CNTR_SELECT_FOOD', action: 'select'});
        
        map.connect("confirm", {controller: 'GB_CNTR_CONFIRM_ORDER', action: 'launch'});

        map.connect("login", {controller: 'GB_CNTR_AUTH', action: 'openLogin'});
        map.connect("signup", {controller: 'GB_CNTR_AUTH', action: 'openSignup'});
        
        map.connect("confirmOrder", {controller: 'GB_CNTR_CONFIRM_ORDER', action: 'launch'});
      });      
      
      this._launchWithoutLocation();
    },    
    
    _launchWithoutLocation: function() {
      Ext.dispatch({
          controller: 'GB_CNTR_LAUNCH',
          action    : 'launch',
          userLocation: null
      });
    }

});

Ext.namespace(
    'gb.app',
    'gb.app.view',
    
    'gb.auth.view', 
    'gb.auth.controller',
    'gb.auth.model',
    'gb.auth.transact',

    'gb.cafe.view', 
    'gb.cafe.controller',
    'gb.cafe.model',
    'gb.cafe.transact',
    
    'gb.coffee.view', 
    'gb.coffee.controller',
    'gb.coffee.model',
    'gb.coffee.transact',
    
    'gb.confirmorder.view',
    'gb.confirmorder.controller',
    'gb.confirmorder.model',
    'gb.confirmorder.transact',    
    
    'gb.confirmed.view',
    'gb.confirmed.controller',
    'gb.confirmed.model',
    'gb.confirmed.transact',

    'gb.context',
    
    'gb.data',
    
  
    'gb.email.view',
    'gb.email.controller',
    'gb.email.model',
    'gb.email.transact',
  
    'gb.food.view',
    'gb.food.controller',
    'gb.food.model',
    'gb.food.transact',
    
    'gb.geo',
    
    'gb.home.view',
    'gb.home.controller',
    'gb.home.model',
    'gb.home.transact',
    
    'gb.last5.controller',
    'gb.last5.model',
    'gb.last5.transact',
    'gb.last5.view',
    
    'gb.launcher.controller',
    'gb.launcher.model',
    'gb.launcher.transact',    
    
    'gb.loyalty.view',
    'gb.loyalty.controller',
    'gb.loyalty.model',
    'gb.loyalty.transact',
    
    'gb.map.view',
    'gb.map.controller',
    'gb.map.model',
    'gb.map.transact',
    
    'gb.myaccount.view',
    'gb.myaccount.controller',
    'gb.myaccount.model',
    'gb.myaccount.transact',
    
    'gb.order.view',
    'gb.order.controller',
    'gb.order.model',
    'gb.order.transact',    
    
    'gb.user.view',
    'gb.user.controller',
    'gb.user.model',
    'gb.user.transact',
  
  'gb.topup.view',
    'gb.topup.controller',
    'gb.topup.model',
    'gb.topup.transact',
  
  'gb.test.view',
    'gb.test.controller',
    'gb.test.model',
    'gb.test.transact',
  
  'gb.top.view',
  'gb.xtra.view',
  
  'gb.messagescreen.view'
);
