var mongoose = require('../../db');
var schema = new mongoose.Schema({
	url: String,
	alias: String, // Shorten
	meta: Object,
	click: Number,
	vote: Number,
	user_id: String,
	tags: Array,
	last_update: Date,
	sync_version: Number,
	sync_time: Date
});

module.exports = mongoose.model('collections', schema);