var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('comments');

//GET form
router.get('/', function(req, res){
	Comment.find(function(err, comments){
		console.log(comments)
		res.render(
			'form',
			 {title: 'Form', comments : comments});
	});
});

//POST form

module.exports = router;