var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var QuickFluxConstants = require('../constants/QuickFluxConstants');
var _ = require('underscore');

// Initial
var _collection = {},
    _selected = null;

// Method to load 
function loadCollectionData(data) {
    _url = data[0];
    _selected = data[0].urls[0];
}

function setSelected(index) {
    _selected = _collection.urls[index];
}

// Add url to collection
function add(url, meta) {
    var url_data = {
        url: url
    };
    // TODO: Fetch URL info

    _collection.urls.push(_.extend({}, url_data, meta));
}

// Extend CollectionStore with EventEmitter to add eventing capabilities
var CollectionStore = _.extend({}, EventEmitter.prototype, {
    getCollection: function() {
        return _collection;
    },

    getSelected: function() {
        return _selected;
    },

    getUrls: function() {
    	return _collection.urls;
    },

    getUrlCount: function() {
    	return _collection.urls.length;
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
            loadCollectionData(action.data);
            break;

        case QuickFluxConstants.SELECT_URL:
            setSelected(action.data);
            break;

        case QuickFluxConstants.COLLECTION_ADD:
            add(action.url, action.meta);
            break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    CollectionStore.emitChange();

    return true;

});

module.exports = CollectionStore;
