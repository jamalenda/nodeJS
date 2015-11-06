require('./database');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//database 
var mongoose = require('mongoose');
var ObjectId = require('mongoose').ObjectID;
var Comment = mongoose.model('comments');
var Post = mongoose.model('posts');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//routes
//POST blog
app.post('/create', function(req, res){
	new Post({
		title : req.body.title,
		detail : req.body.detail
	}).save(function(err, title){
		console.log(title);
		 //res.send("You just input : title = " + title + " detail = " + detail);
	    res.redirect('/list');
	})
});

//GET List blog
app.get('/list', function(req, res){
	Post.find({}, {title : 1}, function(err, title){
		console.log(title)
		    res.render('list', {
	     	"list" : title
	     });
	});
});

//GET Detail blog
app.get('/detail/:id' , function(req, res){
	var id = req.params.id;
	console.log(id);
	Post.find({}, function(err, title){
		console.log(title);
		   res.render('detail', {
	     	"detail" : title
	     });		 
	});
	Comment.find(function(err, comments){
		console.log(comments)
		res.render('detail', {
			"detail" : comments
		});
	});
});

//POST Comment
app.post('/comment', function(req, res){
	new Comment({
		comment : req.body.comment,
		idpost : req.body.idpost
	}).save(function(err, comment){
		console.log(comment);
	    res.redirect('/detail/id='+req.params.id);
	})
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
