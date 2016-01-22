var AppDispatcher = require('../dispatcher/AppDispatcher');
var QuickFluxConstants = require('../constants/QuickFluxConstants');

var QuickFluxActions = {
    // Receive inital product data
    receiveUrl: function(data) {
        AppDispatcher.handleAction({
            actionType: QuickFluxConstants.RECEIVE_DATA,
            data: data
        })
    },

    // Add item to cart
    addToCollection: function(url, meta) {
        AppDispatcher.handleAction({
            actionType: QuickFluxConstants.COLLECTION_ADD,
            url: url,
            meta: meta
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
};

module.exports = QuickFluxActions;
