window.React = require('react');
window.ReactDOM = require('react-dom');
window.ReactRouter = require('react-router');

var QuickFluxApp = require('./components/QuickFluxApp.react');
var Login = require('./components/Login.react');
var About = require('./components/About.react');
var Me = require('./components/Me.react');

var Router = ReactRouter.Router;
var browserHistory = ReactRouter.browserHistory	;
var Route = ReactRouter.Route;

ReactDOM.render(
	<Login />, 
	document.getElementById('login-button')
);

// Render 
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/about" component={About} />
    <Route path="/me" component={Me} />
    <Route path="*" component={QuickFluxApp} />
  </Router>
	), document.getElementById('quick-app')
)

var loading = document.getElementById('loading-state');
if (loading) loading.style.display = 'none';