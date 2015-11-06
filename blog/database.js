var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Post = new Schema({
	title : String,
	detail : String,
});
var Comment = new Schema({
	comment : String,
	idpost : String
});

mongoose.model('posts', Post);
mongoose.model('comments', Comment);

mongoose.connect('mongodb://localhost/blog')