var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var Drive = require('../utils/Drive');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var QuickFluxConstants = require('../constants/QuickFluxConstants');

// Initial
var _user = {};

function setUser(user) {
    _user  = _.extend({}, _user, user);
    Drive.set('_user', _user);
}

function getUser() {
    _user = Drive.get('_user');
    return _user;
}

function getUserId() {
    if (!_user.hasOwnProperty('id')) return 0;
        return _user.id;
}

// Extend CollectionStore with EventEmitter to add eventing capabilities
var UserStore = _.extend({}, EventEmitter.prototype, {
    getUser: function() {
        return getUser();
    },

    getUserId: function() {
        return getUserId();
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
        case QuickFluxConstants.SET_USER:
            setUser(action.user);
            break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    UserStore.emitChange();

    return true;

});

module.exports = UserStore;
