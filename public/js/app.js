window.React = require('react');
window.ReactDOM = require('react-dom');

var AppData = require('./AppData');
var CollectionApi = require('./utils/CollectionApi');
var QuickFluxApp = require('./components/QuickFluxApp.react');

// Load Mock data
AppData.init();

// Load Mock Api call
CollectionApi.getUrlData(); 

// Render FluxApp Controller View
ReactDOM.render(
	<QuickFluxApp />,
	document.getElementById('quick-app')
);