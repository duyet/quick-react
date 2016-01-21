var React = require('react');

// Flux product view
var LoginButton = React.createClass({
    getInitialState: function() {
        return {
            message: ""
        };
    },

    componentDidMount: function() {
        this.FB = this.props.fb;
        // this.FB.Event.subscribe('auth.logout',
        //     this.onLogout.bind(this));
        // this.FB.Event.subscribe('auth.statusChange',
        //     this.onStatusChange.bind(this));
    },

    onStatusChange: function(response) {
        console.log(response);
        var self = this;

        if (response.status === "connected") {
            this.FB.api('/me', function(response) {
                var message = "Welcome " + response.name;
                self.setState({
                    message: message
                });
            })
        }
    },

    onLogout: function(response) {
        this.setState({
            message: ""
        });
    },

    render: function() {
        return (
			<div>
				<div 
					className="fb-login-button" 
					data-max-rows="1" 
					data-show-faces="false" 
					data-auto-logout-link="true">
				</div>
				<div>{this.state.message}</div>
			</div>
        )
    }
});

module.exports = LoginButton;
