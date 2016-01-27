var moment = require('moment');
var React = require('react');
var QuickFluxActions = require('../actions/QuickFluxActions');

// Flux product view
var FluxCollectionList = React.createClass({
    getInitialState: function() {
        return {collections: this.props.collections || []};
    },

    // Render product View
    render: function() {
      console.log('Render with ', this.props.collections);
        return (
          <div className="quick-collection">
            <ul>
            {this.props.collections.map(function(row, i) {
              return (
                <li key={i}>
                  <a href={row.url}>{row.url}</a>
                  <em className="url-time" title={row.time}>{moment(row.time).fromNow()}</em></li>
              )
            })}
            </ul>
          </div>
        );
    },

});

module.exports = FluxCollectionList;
