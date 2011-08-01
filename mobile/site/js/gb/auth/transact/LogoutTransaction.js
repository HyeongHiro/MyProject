function LogoutTransaction(callback) {
	Ext.Ajax.request({
		url : 'logout',
		method : 'POST',
		success : function(result, request) {
			Ext.StoreMgr.removeByKey('user');
			callback(true);
		},
		failure : function(result, request) {
			callback(false);
		}
	});
}