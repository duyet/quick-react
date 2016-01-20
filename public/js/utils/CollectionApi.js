var QuickFluxActions = require('../actions/QuickFluxActions');

module.exports = {
    getUrlData: function() {
        var data = JSON.parse(localStorage.getItem('collection'));
        QuickFluxActions.receiveUrl(data);
    }
};