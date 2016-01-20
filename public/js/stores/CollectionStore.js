var _ = require('underscore');
var uuid = require('node-uuid');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var QuickFluxConstants = require('../constants/QuickFluxConstants');

// Initial
var _collections = [];
var _collection = {
	url: '',
	meta: {
		title: ''
	},
	click: 0,
	vote: null,
	user_id: null
};

// Method to load 
function loadCollectionData() {
	return _collections;
}

function setSelected(index) {
    _selected = _collection.urls[index];
}

// Add url to collection
function addToCollection(url, meta) {
	var _data = _.extend(_collection, {
		id: uuid.v1(),
		url: url,
		meta: meta
	});

    // TODO: Fetch URL info

    _collections.push(_data);
}

// Extend CollectionStore with EventEmitter to add eventing capabilities
var CollectionStore = _.extend({}, EventEmitter.prototype, {
    getCollections: function() {
        return _collections;
    },

    getUrlCount: function() {
    	return _collections.length;
    },	

    // Emit Change event
    emitChange: function() {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
    var action = payload.action;
    var text;

    switch (action.actionType) {

        // Respond to RECEIVE_DATA action
        case QuickFluxConstants.RECEIVE_DATA:
            loadCollectionData();
            break;

        case QuickFluxConstants.COLLECTION_ADD:
            addToCollection(action.url, action.meta);
            break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    CollectionStore.emitChange();

    return true;

});

module.exports = CollectionStore;
