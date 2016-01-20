var React = require('react');

var CollectionStore = require('../stores/CollectionStore');
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
        CollectionStore.addChangeListener(this._onChange);
    },

    // Remove change listers from stores
    componentWillUnmount: function() {
        CollectionStore.removeChangeListener(this._onChange);
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
    },

    // Method to setState based upon Collection changes
    _onChange: function() {
        this.setState(getCollectionState());
    }

});

module.exports = QuickFluxApp;
