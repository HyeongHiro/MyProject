gb.loyalty.model.LoyaltyStore = new Ext.data.JsonStore(
{
    model  : 'GB_LOYALTY_MODEL',
    data: [
        {
            CafeFoodId: 1, 
			Name: 'Battuta Cafe', 
			Street: '179 Oxford Street,', 
			City: 'Darlinghurst',
			Country: 'NSW 2010',
			Qty: '4'
        },{
            CafeFoodId: 2, 
			Name: 'Bills Darlinghurs', 
			Street: 'Shop 9, 85 Boundary St,', 
			City: 'Darlinghurst',
			Country: 'NSW 2010',
			Qty: '8'
        },{
            CafeFoodId: 3, 
			Name: 'Ecabar', 
			Street: 'Shop 2, 128 Darlinghurst Rd', 
			City: 'Darlinghurst',
			Country: 'NSW 2010',
			Qty: '3'
        }
    ]
});