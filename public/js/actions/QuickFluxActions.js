var AppDispatcher = require('../dispatcher/AppDispatcher');
var QuickFluxConstants = require('../constants/QuickFluxConstants');
var UserStore = require('../stores/UserStore');

var QuickFluxActions = {
    // Receive inital product data
    receiveUrl: function(data) {
        AppDispatcher.handleAction({
            actionType: QuickFluxConstants.RECEIVE_DATA,
            data: data
        })
    },

    // Add item to cart
    addToCollection: function(url, meta, cb) {
        var user_id = UserStore.getUserId();
        AppDispatcher.handleAction({
            actionType: QuickFluxConstants.COLLECTION_ADD,
            user_id: user_id,
            url: url,
            meta: meta,
            cb: cb
        })
    },

    // Remove item from cart
    updateUrlData: function(id, data) {
        AppDispatcher.handleAction({
            actionType: QuickFluxConstants.UPDATE_URL,
            id: id,
            data: data
        })
    },

    // Remove item from cart
    removeFromCollection: function(url) {
        AppDispatcher.handleAction({
            actionType: QuickFluxConstants.COLLECTION_REMOVE,
            url: url
        })
    },

    // Update cart visibility status
    updateUrlVisible: function(urlVisible) {
        AppDispatcher.handleAction({
            actionType: QuickFluxConstants.URL_VISIBLE,
            urlVisible: urlVisible
        })
    },

    setUser: function(user) {
        AppDispatcher.handleAction({
            actionType: QuickFluxConstants.SET_USER,
            user: user
        })  
    }, 

    getUser: function() {
        AppDispatcher.handleAction({
            actionType: QuickFluxConstants.GET_USER
        })  
    },

    getUserToken: function() {
        AppDispatcher.handleAction({
            actionType: QuickFluxConstants.GET_TOKEN
        })  
    }, 

    setUserToken: function(token) {
        AppDispatcher.handleAction({
            actionType: QuickFluxConstants.SET_TOKEN,
            token: token
        })  
    },

    signOut: function() {
        AppDispatcher.handleAction({
            actionType: QuickFluxConstants.SIGN_OUT
        })  
    }, 
};

module.exports = QuickFluxActions;
