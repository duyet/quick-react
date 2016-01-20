var React = require('react');
var QuickFluxActions = require('../actions/QuickFluxActions');

// Flux product view
var FluxCollection = React.createClass({

  // Add item to cart via Actions
  addToCollection: function(event) {
  	var meta = {};
  	var new_url = this.props.url;
    QuickFluxActions.addToCollection(url, update);
  },

  // Render product View
  render: function() {
    return (
      <div className="flux-collection">
        Something...
      </div>
    );
  },

});

module.exports = FluxCollection;