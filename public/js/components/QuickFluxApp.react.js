var React = require('react');

var CollectionStore = require('../stores/CollectionStore');
var UserStore = require('../stores/UserStore');
var FluxCollectionList = require('./FluxCollectionList.react');
var QuickForm = require('./QuickForm.react');

// Method to retrieve state from Stores
function getCollectionState() {
    return {
        collections: CollectionStore.getCollections(),
        user: UserStore.getUser()
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
        UserStore.addChangeListener(this._onChangeUser);
    },

    // Remove change listers from stores
    componentWillUnmount: function() {
        CollectionStore.removeChangeListener(this._onChangeCollection);
        UserStore.removeChangeListener(this._onChangeUser);
    },

    // Method to setState based upon Collection changes
    _onChangeCollection: function() {
        this.setState({collections: CollectionStore.getCollections()});
    },

    _onChangeUser: function() {
        this.setState({collections: CollectionStore.getCollections()});
        this.setState({user: UserStore.getUser()});
    },

    // Render our child components, passing state via props
    render: function() {
        return ( 
			<div className="quick-app">
				<QuickForm 
                    user={this.user} />
				
                <FluxCollectionList 
					collections={this.state.collections} />

				{this.props.children}
			</div>
        );
    }
});

module.exports = QuickFluxApp;
