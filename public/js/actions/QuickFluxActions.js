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

    // Set currently selected product variation
    selectUrl: function(index) {
        AppDispatcher.handleAction({
            actionType: QuickFluxConstants.SELECT_URL,
            data: index
        })
    },

    // Add item to cart
    addToCollection: function(url, update) {
        AppDispatcher.handleAction({
            actionType: QuickFluxConstants.COLLECTION_ADD,
            url: url,
            update: update
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
    }
};

module.exports = QuickFluxActions;
