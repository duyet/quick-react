var React = require('react');
var QuickFluxActions = require('../actions/QuickFluxActions');

// Flux product view
var FluxCollectionList = React.createClass({
    getInitialState: function() {
        return {collections: this.props.collections || []};
    },

    // Render product View
    render: function() {
        return (
          <div className="flux-collection">
            <ul>
            {this.state.collections.map(function(row, i) {
              return (
                <li key={i}>{row.url}</li>
              )
            })}
            </ul>
          </div>
        );
    },

});

module.exports = FluxCollectionList;
