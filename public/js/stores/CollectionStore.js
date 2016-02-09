var _ = require('underscore');
var moment = require('moment');
var uuid = require('node-uuid');
var EventEmitter = require('events').EventEmitter;

var Drive = require('../utils/Drive');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var QuickFluxConstants = require('../constants/QuickFluxConstants');
var Sync = require('../utils/Sync');
var sync = new Sync();

var UserStore = require('./UserStore');
// Initial
var _collections = Drive.get('_collections');
var _collection = {
    _id: null,
    client_id: null,
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

sync.register('collections', _collections);

// Method to load 
function getCollection(user_id) {
    if (!_collections || !user_id) _collections = [];

    var _results = [];
    for (var i in _collections) {
        if (_collections[i].user_id == user_id) _results.push(_collections[i]);
    }
    
    return _results;
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

function updateUrlData(client_id, data) {
    for (var i in _collections) {
        if (_collections[i].client_id == client_id) _collections[i] = _.extend(_collections[i], data);
    }
    
    Drive.set('_collections', _collections);
}

function SyncData(data) {

    // ==========================
    // Update to server
    if (data) {
        // Method = POST
        var method = 'POST';

        var sync_url = QUICK_API + '/' + 'collections';
        if (data.hasOwnProperty('_id') && data._id != null) {
            sync_url += '/' + data._id;
        }

        // Update sync time version
        data.sync_time = moment();

        $.ajax({
            url: sync_url,
            method: method,
            data: data,
            success: function( server_data, status ) { 
                data = _.extend(data, server_data); 
                console.log('Sync ok.', data);
            },
            error: function(jqXHR, textStatus) {
                console.log('Sync item error', jqXHR, textStatus);
            }
        });

        return;
    }

    for (var i in _collections) {
        SyncData(_collections[i]);
    }

    // Save back
    Drive.set('_collections', _collections);

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

    updateUrlData: function(client_id, data) {
        return updateUrlData(client_id, data);
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
            updateUrlData(action.client_id, action.data);
            break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    CollectionStore.emitChange();

    return true;

});

module.exports = CollectionStore;
