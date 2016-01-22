'use strict';

// var QuickDrive = window.localStorage || false;
if (!localStorage) console.error("Not support window.localStorage");

module.exports = {
	set: function(key, value) {
		var _value = JSON.stringify(value);
		return localStorage.setItem(key, _value);
	},

	get: function(key) {
		var data = localStorage.getItem(key);
		return JSON.parse(data);
	}
};