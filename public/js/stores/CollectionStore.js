var _ = require('underscore');
var uuid = require('node-uuid');
var EventEmitter = require('events').EventEmitter;

var Drive = require('../utils/Drive');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var QuickFluxConstants = require('../constants/QuickFluxConstants');

var UserStore = require('./UserStore');
// Initial
var _collections = Drive.get('_collections');
var _collection = {
	_id: '',
    client_id: '',
    url: '',
    alias: '', // Shorten
	meta: {
		title: ''
	},
	click: 0,
	vote: null,
	user_id: null,
    tags: []
};

// Method to load 
function getCollection(user_id) {
    if (!_collections || !user_id) _collections = [];

    var _results = [];
    for (var i in _collections) {
        if (_collections[i].user_id == user_id) _results.push(_collections[i]);
    }
    
    return _results;
}

function setSelected(index) {
    _selected = _collection.urls[index];
}

// Add url to collection
function addToCollection(user_id, url, meta, cb) {
	var _data = _.extend({}, _collection, {
        client_id: uuid.v1(),
		key: uuid.v1(),
        last_update: new Date(),
		url: url,
		meta: meta,
        user_id: user_id
	});

    _collections.unshift(_data); // push to top
    Drive.set('_collections', _collections);
    SyncData();

    if (cb) cb(_data);
}

function updateUrlData(id, data) {
    for (var i in _collections) {
        if (_collections[i].id == id) _collections[i] = _.extend(_collections[i], data);
    }
    
    Drive.set('_collections', _collections);
}

function SyncData(data) {
    function syncItemSuccess(data, status) {
        console.log('Sync ok.', data);
    }

    function syncItemError(jqXHR, textStatus) {
        console.log('Sync error', jqXHR, textStatus);
    }

    // ==========================
    // Update to server
    if (data) {
        // Method = POST
        var method = 'POST';

        var sync_url = QUICK_API + '/' + 'collections';
        if (data.hasOwnProperty('_id') && data._id.length > 0) {
            sync_url += '/' + data._id;
        }

        $.ajax({
            url: sync_url,
            method: method,
            data: data,
            success: syncItemSuccess,
            error: syncItemError
        });

        return;
    }

    for (var i in _collections) {
        SyncData(_collections[i]);
    }

    // ==========================
    // Fetch from server


    // ===========================
    // Conflict data 
}

// Extend CollectionStore with EventEmitter to add eventing capabilities
var CollectionStore = _.extend({}, EventEmitter.prototype, {
    getCollections: function() {
        var user_id = UserStore.getUserId();
        console.info("User_Id => ", user_id);
        return getCollection(user_id);
    },

    addToCollection: function(user_id, url, meta, cb) {
        return addToCollection(user_id, url, meta, cb);
    },

    updateUrlData: function(id, data) {
        return updateUrlData(id, data);
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
            addToCollection(action.user_id, action.url, action.meta, action.cb);
            break;

        case QuickFluxConstants.UPDATE_URL:
            updateUrlData(action.id, action.data);
            break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    CollectionStore.emitChange();

    return true;

});

module.exports = CollectionStore;
