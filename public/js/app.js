window.React = require('react');
window.ReactDOM = require('react-dom');
window.ReactRouter = require('react-router');

var QuickFluxApp = require('./components/QuickFluxApp.react');
var FBLogin = require('./components/FBLogin.react');
var About = require('./components/About.react');
var Me = require('./components/Me.react');

var Router = ReactRouter.Router;
var browserHistory = ReactRouter.browserHistory	;
var Route = ReactRouter.Route;

ReactDOM.render(
	<FBLogin fb={FB} />, 
	document.getElementById('login-button')
);

// Render 
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={QuickFluxApp} />
    <Route path="/about" component={About} />
    <Route path="/me" component={Me} />
  </Router>
	), document.getElementById('quick-app')
)

var loading = document.getElementById('loading-state');
if (loading) loading.style.display = 'none';