var moment = require('moment');
var React = require('react');
var QuickFluxActions = require('../actions/QuickFluxActions');

// Flux product view
var FluxCollectionList = React.createClass({
    getInitialState: function() {
        return {collections: this.props.collections || []};
    },

    getNextUrl: function(data) {
      if (!data) return '';
      return './click?next=' + encodeURIComponent(data.url) + '&id=' + data.id;
    },

    updateCounter: function(data) {
      data.click += 1;
    },

    // Render product View
    render: function() {
        var self = this;
        var link_row_style = {marginBottom: 15};
        return (
          <div className="quick-collection">
            <ul>
            {this.props.collections.map(function(row, i) {
              return (
                <li key={i} style={link_row_style}>
                  <a href={self.getNextUrl(row)}>{(row.meta && row.meta.title) ? row.meta.title : row.url}</a>
                  <em className="url-time" title={row.time}>{moment(row.time).fromNow()}</em>

                </li>
              )
            })}
            </ul>
          </div>
        );
    },

});

module.exports = FluxCollectionList;
