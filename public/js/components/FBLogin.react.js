var React = require('react');
var QuickFluxActions = require('../actions/QuickFluxActions');
var UserStore = require('../stores/UserStore');

window.lock = window.lock || new Auth0Lock(AUTH0_KEY, AUTH0_DOMAIN);

// Flux product view
var FBLogin = React.createClass({
    getInitialState: function() {
        return {
            message: "",
            user: UserStore.getUser(),
            isLogin: false,
        };
    },

    showLock: function(e) {
        if (this.state.isLogin) return;

        e.preventDefault();
        // We receive lock from the parent component in this case
        // If you instantiate it in this component, just do this.lock.show()
        window.lock.show();
      },

    componentDidMount: function() {
        if (this.state.user && this.state.user.name) this.setState({isLogin: true});
        UserStore.removeChangeListener(this._onChangeUser);
    },

    // Remove change listers from stores
    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChangeUser);
    },

    _onChangeUser: function() {
        this.setState({user: UserStore.getUser()});
        if (this.state.user && this.state.user.name) this.setState({isLogin: true});
    },

    onLogout: function(response) {
        this.setState({
            message: ""
        });
    },

    handleClickLogin: function(e) {
    	this.showLock(e);
    },

    render: function() {
    	var text = "Login";
    	if (this.state.isLogin) text = this.state.user.name;
        
        return (
			<a className="nav-link" href="#/me" 
				title="User data will save in your browser." 
				onClick={this.handleClickLogin}>{text}</a>
        )
    }
});

module.exports = FBLogin;
