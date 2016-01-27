var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var Drive = require('../utils/Drive');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var QuickFluxConstants = require('../constants/QuickFluxConstants');

window.lock = window.lock || new Auth0Lock(AUTH0_KEY, AUTH0_DOMAIN);

// Initial
var _user = {};

(function() {
    getUser();

})();

function setUser(user) {
    _user  = _.extend({}, _user, user);
    Drive.set('_user', _user);
}

function getUser() {
    _user = Drive.get('_user');
    getUserInfo();
    setUser(_user);

    return _user;
}

function getUserId() {
    if (!_user || !_user.hasOwnProperty('id')) return 0;
        return _user.id;
}

function setIdToken(token) {
    _user.userToken = token;
    Drive.set('_user', _user);
}

function getIdToken() {
    if (_user && _user.hasOwnProperty('userToken')) return _user.userToken;

    var idToken = '';
    var authHash = window.lock.parseHash(window.location.hash);
    if (authHash) {
        if (authHash.id_token) {
            idToken = authHash.id_token
            setIdToken(authHash.id_token);
        }
        if (authHash.error) {
            console.log("Error signing in", authHash);
            return null;
        }
    }
    return idToken;
}

function getUserInfo() {
    var token = getIdToken();
    if (token) {
        window.lock.getProfile(token, function(err, profile) {
            if (err) {
                console.log("Error loading the Profile", err);
                return;
            }
            _user  = _.extend(_user, profile);
            Drive.set('_user', _user);

        }.bind(this));
    }
}

// Extend CollectionStore with EventEmitter to add eventing capabilities
var UserStore = _.extend({}, EventEmitter.prototype, {
    getUser: function() {
        return getUser();
    },

    getUserId: function() {
        return getUserId();
    },

    getIdToken: function() {
        return getIdToken();
    },

    setIdToken: function(token) {
        return setIdToken(token);
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

        case QuickFluxConstants.GET_USER:
            getUser();
            break;

        case QuickFluxConstants.SET_TOKEN:
            setIdToken(action.token);
            break;

        case QuickFluxConstants.GET_TOKEN:
            getIdToken();
            break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    UserStore.emitChange();

    return true;
});

module.exports = UserStore;
