gb.last5.view.Last5OrderTemplate = new Ext.XTemplate
(
    '<div style="float: left; padding-right: 10px; padding-left:10px;">' + 
      '<img height="32" src="images/<tpl if="cafe.active == 1">roundtick.png</tpl><tpl if="cafe.active == 0">roundcross.png</tpl>"></div>' +
    
      '<div style="float: left;">' + 
        '<div class="cafelist_cafename">{cafe.name}</div></div>' + 
        '<br style="clear: both;"><tpl for="coffeeOrders"><div style="float: left; padding-left:53px;">{quantity} x {size} {strength} {type}</div><div style="float: right;">{total:this.formatCurrency}</div><br></tpl><tpl for="foodOrders"><div style="float: left; padding-left:53px;">{quantity} x {name}</div><div style="float: right;">{total:this.formatCurrency}</div><br></tpl>'
,

{
  compiled: true,
  formatCurrency: function(number){
     return Ext.util.Format.Currency(number);
  }
}
);
