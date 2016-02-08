var http = require('http');
var path = require('path');

var koa = require('koa');
var middlewares = require('koa-middlewares');
var route = require('koa-route');
var router = require('koa-router');


var config = require('./config');

var staticCache = require('koa-static-cache');
var serve = require('koa-static-folder');
var generateApi = require('koa-mongo-rest');

var app = module.exports = koa();
var viewpath = path.join(__dirname, 'views');
var assetspath = path.join(__dirname, 'public');

app.use(middlewares.compress());
app.use(middlewares.favicon());
app.use(middlewares.rt());
app.use(middlewares.logger());
app.use(middlewares.bodyParser());

app.use(serve('./public'));
app.use(staticCache(assetspath, {
	maxAge: 365 * 24 * 60 * 60
}));

// Api
generateApi(app, route, require('./app/api/collection'), '/api/v1');

app.use(route.get('/', require('./app/controllers/home')));
app.use(route.get('/click', require('./app/controllers/click')));
app.use(route.get('/fetch', require('./app/controllers/fetch')));

app = module.exports = http.createServer(app.callback());

if (!module.parent) {
	app.listen(config.port);
	console.info("Listen on http://localhost:%s", config.port);
}
