gb.coffee.model.OrderSummaryStore = new Ext.data.JsonStore(
{
    model  : 'GB_ORDERSUMMARY_MODEL',
	sorters: 'Cafe',
     data: 
    [
	
	{
	drinks:["aaa","ddd","ff","yyy"],
	"state":null,"id":"2","total":14.5,
      "cafe":{"name":"Coffee Yes","id":"1","address":"Abbotsford", "enabled": 1},
      "coffeeOrders":[
          {"total":3.5,"idx":"rboi1","cafeCoffeeId":"1","orderReferencedId":null,"type":"Latte","size":"Small","strength":"Regular","extras":null,"sugar":"0","quantity":1,"subtotal":3.5},
          {"total":3.5,"idx":"rboi2","cafeCoffeeId":"1","orderReferencedId":null,"type":"Latte", "size":"Small","strength":"Regular","extras":null,"sugar":"0","quantity":1,"subtotal":3.5},
          {"total":3.5,"idx":"rboi3","cafeCoffeeId":"1","orderReferencedId":null,"type":"Latte","size":"Small","strength":"Regular","extras":null,"sugar":"0","quantity":1,"subtotal":3.5},
          {"total":4,"idx":"rboi4","cafeCoffeeId":"2","orderReferencedId":null,"type":"Latte","size":"Regular","strength":"Regular","extras":null,"sugar":"0","quantity":1,"subtotal":4}],
          "foodOrders":[]}]
});