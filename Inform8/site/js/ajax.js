var i8Ajax = {

    call: function(call, id, action, pcallback) {
				$.ajax({
					type: "POST",
					url: "/ajax.php",
					data: "call=" + call + "&id=" + id + "&action=" + action,
					dataType: 'json', 
					success: function(data){
						pcallback(data);
					}
				});
    },

    submit: function(call, id, action, data, pcallback) {
			var submitData = "call=" + call + "&id=" + id + "&action=" + action;
			
			submitData += i8Ajax.convertToParams(data);
			
			$.ajax({
				type: "POST",
				url: "/ajax.php",
				data: submitData,
				dataType: 'json', 
				success: function(data){
					pcallback(data);
				}
			});
			
    },
		
		convertToParams: function(o) {
			var p = '';
			for (i in o) {
				p += "&" + i + "=" + o[i];
	  	}
			return p;
		},
		
};


var i8Analytics = {

		trackEvent: function(name, event, file) {
			_gaq.push(['_trackEvent', name, event, file]);
		}
			
};