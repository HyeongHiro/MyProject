gb.loyalty.view.LoyaltyCardTemplate = new Ext.XTemplate
(
    '<div style="float: left;">		<div class="cafelist_cafename">			{Name}		</div>				<div class="cafelist_cafeaddress">			{Street}		</div>		<div class="cafelist_cafeaddress">			{City}		</div>				<div class="cafelist_cafeaddress">			{Country}		</div>		</div>		<div style="float: right;">		<img height="56" src="images/loyalty.png" />			<div class="gbHeading">			{Qty} Coffees		</div>	</div>',
	{compiled: true}
);