var validUrl = require('valid-url');
var React = require('react');
var QuickFluxActions = require('../actions/QuickFluxActions');

// Flux product view
var QuickForm = React.createClass({
	getInitialState: function() {
		return { url: '', meta_data: {}, error: false }
	},

	// Add item to cart via Actions
	addToCollection: function(e) {
		e.preventDefault();
		this.setState({error: ''}); // Reset

		var new_url = this.state.url;
		if (!new_url || new_url.length == 0) {
			this.setState({error: 'URI is empty.'});
			return;
		}

		if (!validUrl.isUri(new_url)) new_url = 'http://' + new_url;
		if (!validUrl.isUri(new_url)) {
			this.setState({error: 'Invalid'});
			return;
		}

		QuickFluxActions.addToCollection(new_url, {});
		this.setState({url: ''}); // Reset
	},

	handleChangeUrl: function(e) {
		this.setState({url: e.target.value})
	},

	  // Render product View
	  render: function() {
		return (
		  <div className="quick-form">
			<form onSubmit={this.addToCollection}>
			  <div className="form-group">
			  	<span className="text-warning">{this.state.error}</span>
				<input className="form-control" name="url" value={this.state.url} onChange={this.handleChangeUrl} />
			  </div>
			  <center>
				<button type="submit" className="btn btn-primary">Add</button>
			  </center>
			</form>
		  </div>
		);
	  }
});

module.exports = QuickForm;