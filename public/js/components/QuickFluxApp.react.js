var React = require('react');

var CollectionStore = require('../stores/CollectionStore');
var UserStore = require('../stores/UserStore');
var FluxCollectionList = require('./FluxCollectionList.react');
var QuickForm = require('./QuickForm.react');

// Method to retrieve state from Stores
function getCollectionState() {
    return {
        collections: CollectionStore.getCollections(),
    };
}

// Define main Controller View
var QuickFluxApp = React.createClass({

    // Get initial state 
    getInitialState: function() {
        return getCollectionState();
    },

    // Add change listeners 
    componentDidMount: function() {
    	document.title = 'Quick';
        CollectionStore.addChangeListener(this._onChangeCollection);
        UserStore.addChangeListener(this._onLogin);
    },

    // Remove change listers from stores
    componentWillUnmount: function() {
        CollectionStore.removeChangeListener(this._onChangeCollection);
        UserStore.removeChangeListener(this._onLogin);
    },

    // Method to setState based upon Collection changes
    _onChangeCollection: function() {
        this.setState({collections: CollectionStore.getCollections()});
    },

    _onLogin: function() {
        console.log("  _____ onLogin");
    },

    // Render our child components, passing state via props
    render: function() {
        return ( 
			<div className="quick-app">
				<QuickForm />
				<FluxCollectionList 
					collections={this.state.collections} />

				{this.props.children}
			</div>
        );
    }
});

module.exports = QuickFluxApp;
