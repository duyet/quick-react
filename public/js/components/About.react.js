var React = require('react');

// Flux product view
var About = React.createClass({
	  render: function() {
	  	var aboutStyle = { marginTop: 20, color: "#FFF" };
		return (
		  <div className="card card-inverse card-primary text-xs-center" style={aboutStyle}>
		  	<div className="card-block">
		  		<blockquote className="card-blockquote">
		  			Quick by jsLab - quick save - quick access.
		  		</blockquote>
		  	</div>
		  </div>
		);
	  }
});

module.exports = About;