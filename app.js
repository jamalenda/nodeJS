
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/hello', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});
app.get('/ex/a', function(req, res){
	res.send('Test from A!');
});
app.get('/ex/b', function(req, res, next){
	console.log('response will be sent by the next function ...');
	next();
}, function(req, res){
	res.send('Hello, from B~');
});

//ARRAY ROUTE

var c0 = function (req, res, next) {
	console.log('c0');
	next();
}
var c1 = function (req, res, next) {
	console.log('c1');
	next();
}
var c2 = function (req, res) {
	res.send('Hello from C~~');
}
app.get('/ex/c', [c0,c1,c2]);

//COMBINATION OF ARRAY & INDIE FUNCTIONS

var d0 = function (req, res, next){
	console.log('d0');
	next();
}

var d1 = function (req, res, next){
	console.log('d1');
	next();
}

app.get('/ex/d', [d0, d1], function(req, res, next){
	console.log('response will be sent by next function ....');
	next();
}, function (req, res){
	res.send('Hello from D~');
});



app.post('/', function (req, res) {
	res.send('POST request to the homepage');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
