var _ = require('underscore');
var uuid = require('node-uuid');
var EventEmitter = require('events').EventEmitter;

var Drive = require('../utils/Drive');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var QuickFluxConstants = require('../constants/QuickFluxConstants');

// Initial
var _collections = Drive.get('_collections');
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
function getCollection() {
    if (!_collections) _collections = [];

    return _collections;
}

function setSelected(index) {
    _selected = _collection.urls[index];
}

// Add url to collection
function addToCollection(url, meta) {
	var _data = _.extend({}, _collection, {
		id: uuid.v1(),
        time: new Date(),
		url: url,
		meta: meta
	});

    _collections.unshift(_data); // push to top
    Drive.set('_collections', _collections);
}

// Extend CollectionStore with EventEmitter to add eventing capabilities
var CollectionStore = _.extend({}, EventEmitter.prototype, {
    getCollections: function() {
        return getCollection();
    },

    addToCollection: function(url, meta) {
        return addToCollection(url, meta);
    },

    getUrlCount: function() {
    	return getCollection().length || 0;
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

    switch (action.actionType) {
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
