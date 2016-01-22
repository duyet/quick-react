'use strict';

var QuickDrive = window.localStorage || false;
if (!QuickDrive) console.error("Not support window.localStorage");

module.exports = {
	set: function(key, value) {
		return QuickDrive.setItem(key, value);
	},

	get: function(key) {
		return QuickDrive.getItem(key);
	}
};