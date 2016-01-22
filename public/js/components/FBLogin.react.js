var React = require('react');
var QuickFluxActions = require('../actions/QuickFluxActions');

// Flux product view
var FBLogin = React.createClass({
    getInitialState: function() {
        return {
            message: "",
            users: {},
            isLogin: false
        };
    },

    componentDidMount: function() {
        var self = this;
        this.FB = this.props.fb;
        fbAsyncInit();

        this.FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				self.setState({isLogin: true});
				FB.api('/me', {}, function(response) {
					QuickFluxActions.setUser(response);
					self.setState({users: response});
				});
			}
			else {
				FB.login();
			}
		});
    },

    onLogout: function(response) {
        this.setState({
            message: ""
        });
    },

    handleClickLogin: function() {
    	if (!this.state.isLogin) this.FB.login(function(){}, {scope: 'public_profile,email'});
    },

    render: function() {
    	var text = "Login";
    	if (this.state.users && this.state.users.name) text = this.state.users.name;
        return (
			<a className="nav-link" href="#" 
				title="User data will save in your browser." 
				data-user-id={this.state.users.id} 
				onClick={this.handleClickLogin}>{text}</a>
        )
    }
});

module.exports = FBLogin;
