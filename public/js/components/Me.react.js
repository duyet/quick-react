var React = require('react');
var QuickFluxActions = require('../actions/QuickFluxActions');

// Flux product view
var Me = React.createClass({
	getInitialState: function() {
        return {
            user: {},
            isLogin: false
        };
    },

    componentDidMount: function() {
        var self = this;
        this.FB = window.FB;

        if (!this.FB) return;

        fbAsyncInit();

        this.FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				self.setState({isLogin: true});
				FB.api('/me', {fields: 'birthday, email, name, gender'}, function(response) {
					console.log(response)
					QuickFluxActions.setUser(response);
					self.setState({user: response, isLogin: true});
				});

				FB.api('/me/picture', function (response) {
			      if (response && !response.error) {
			        console.log(response)
			      }
			    })
			}
			else {
			}
		});
    },

    handleLogout: function(e) {
    	FB.logout();
    	this.setState({user: {}, isLogin: false});
    },

	render: function() {
		var boxStyle = { marginTop: 20, color: "#FFF" };
		var headlineStyle = { fontSize: 20, color: "#FFF" };

		return (
		  <div className="card card-inverse card-primary text-xs-center" style={boxStyle}>
		  	<div className="card-block">
		  		<blockquote className="card-blockquote">
		  			<center>
		  				<a href={'http://fb.com/' + this.state.user.id}>
		  					<h1 style={headlineStyle}>
		  						{this.state.isLogin ? this.state.user.name : 'Not login'}
		  					</h1>
		  				</a>
		  			</center>
		  			<hr />
		  			<p>
		  				<a href="#" onClick={this.handleLogout}>Logout</a>
		  			</p>
		  		</blockquote>
		  	</div>
		  </div>
		);
	}
});

module.exports = Me;