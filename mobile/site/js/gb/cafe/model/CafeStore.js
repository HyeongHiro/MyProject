gb.cafe.model.CafeStore = new Ext.data.JsonStore({
    model  : 'GB_CAFE_MODEL',
    sorters: [
              {
                  property : 'Distance',
                  direction: 'ASC'
              }
          ]
});