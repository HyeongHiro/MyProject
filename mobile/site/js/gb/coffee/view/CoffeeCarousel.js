gb.coffee.view.CoffeeCarousel = Ext.extend(Ext.Carousel,  {
   
  indicator: false,
  constructor: function (options) {
    
    this.coffees = new Array();
    // Should be in the same order as the images below.
    // Should have the same name as those in the database
    this.coffees.push({type: 'Flat White'});
    this.coffees.push({type: 'Latte'});
    this.coffees.push({type: 'Cappuccino' });
    this.coffees.push({type: 'Long Black' });
    this.coffees.push({type: 'Piccolo' });
    this.coffees.push({type: 'Macchiato' });
    this.coffees.push({type: 'Mocha' });
    this.coffees.push({type: 'Espresso' });
    this.coffees.push({type: 'Hot Chocolate' });
    this.coffees.push({type: 'Chai Latte' });    
    
    gb.coffee.view.CoffeeCarousel.superclass.constructor.call(this, options);
  },    
  getSelectedCoffee: function() {
    return this.coffees[this.getActiveIndex()];
  },
	items: [
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: 0 0;"},
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: -215px 0"},
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: -430px 0;"},
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: -645px 0;"},
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: -860px 0;"},
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: -1075px 0;"},
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: -1290px 0;"},
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: -1505px 0;"},
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: -1720px 0;"},
		{style : "background-image: url(images/coffee/coffee.png);background-repeat:no-repeat; width: 210; height: 210; background-position: -1935px 0;"}
	]

});
Ext.reg('GB_COFFEE_CAROUSEL', gb.coffee.view.CoffeeCarousel);