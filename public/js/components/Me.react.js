var React = require('react');
var QuickFluxActions = require('../actions/QuickFluxActions');
var UserStore = require('../stores/UserStore');

window.lock = window.lock || new Auth0Lock(AUTH0_KEY, AUTH0_DOMAIN);

// Flux product view
var Me = React.createClass({
	getInitialState: function() {
        return {
            user: UserStore.getUser(),
            isLogin: false,
        };
    },

    componentDidMount: function() {
        if (this.state.user && this.state.user.name) this.setState({isLogin: true});
    },

    handleLogout: function(e) {
    	this.setState({user: {}, isLogin: false});
    },

	render: function() {
		var boxStyle = { marginTop: 20, color: "#FFF" };
		var headlineStyle = { fontSize: 20, color: "#FFF" };

		console.log(this.state.user)

		if (this.state.isLogin) {
			return (
			  <div className="card card-inverse card-primary text-xs-center" style={boxStyle}>
			  	<div className="card-block">
			  		<blockquote className="card-blockquote">
			  			<center>
			  				<a href={'http://fb.com/' + this.state.user.id}>
			  					<h1 style={headlineStyle}>
			  						{this.state.user.name}
			  					</h1>
			  				</a>
			  			</center>
			  			<hr />
			  			<p>
			  				Email: {this.state.user.email} <br />
			  				Gender: {this.state.user.gender} <br />


			  				<a href="#" onClick={this.handleLogout}>Logout</a>
			  			</p>
			  		</blockquote>
			  	</div>
			  </div>
			);
		} else {
			return (
				<div className="card card-danger text-xs-center" style={boxStyle}>
					<div className="card-block">
						Not login
					</div>
				</div>
			);
		}
	}
});

module.exports = Me;