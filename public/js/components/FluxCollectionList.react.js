var moment = require('moment');
var React = require('react');
var QuickFluxActions = require('../actions/QuickFluxActions');
var Tracker = require('../utils/Tracker');

// Flux product view
var FluxCollectionList = React.createClass({
    getInitialState: function() {
        return {collections: this.props.collections || []};
    },

    getNextUrl: function(data) {
      return Tracker.getTrackerLink(data);
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
            <table className="table">
              <tbody>
              {this.props.collections.map(function(row, i) {
                return (
                  <tr>
                  <td key={i} style={link_row_style}>
                    <a href={self.getNextUrl(row)}>{(row.meta && row.meta.title) ? row.meta.title : row.url}</a>
                  </td>
                  <td>
                    <em className="url-time" title={row.time}>{moment(row.time).fromNow()}</em>
                  </td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </div>
        );
    },

});

module.exports = FluxCollectionList;
