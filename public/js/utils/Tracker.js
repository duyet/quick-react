var moment = require('moment');
module.exports = {
	getTrackerLink: function(data) {
		if (!data) return '';
		return './click?next=' 
			+ encodeURIComponent(data.url) 
			+ '&id=' + data.client_id
			+ '&time=' + moment();
	}
};