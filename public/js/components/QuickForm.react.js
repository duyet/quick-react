var React = require('react');
var QuickFluxActions = require('../actions/QuickFluxActions');

// Flux product view
var QuickForm = React.createClass({
	getInitialState: function() {
		return { url: '', meta_data: {} }
	},

	// Add item to cart via Actions
	addToCollection: function(event) {
		var meta = {};
		var new_url = this.props.url;
		QuickFluxActions.addToCollection(url, update);

		
	},

	handleChangeUrl: function(e) {
		this.setState({url: e.target.value})
	},

	  // Render product View
	  render: function() {
		return (
		  <div className="quick-form">
			<form>
			  <div className="form-group">
				<input className="form-control" name="url" value={this.state.url} onChange={this.handleChangeUrl} />
			  </div>
			  <center>
				<button type="submit" className="btn btn-primary" onClick={this.addToCollection}>Add</button>
			  </center>
			</form>
		  </div>
		);
	  }
});

module.exports = QuickForm;