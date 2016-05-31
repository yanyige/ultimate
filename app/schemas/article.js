var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
	title: {
		type: String,
		unique: true
	},
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	},
	author: {
		type: String
	},
	content: {
		type: String		
	},
	clicktimes: {
		type: Number,
		default: 0
	},
	onTop: {
		type: Boolean,
		default: false
	},
	onFocus: {
		type: Boolean,
		default: false
	},
	category: {
		type: String,
	}
});

ArticleSchema.pre('save', function(req, res, next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
});

ArticleSchema.statics = {
	fetch: function(cb){
		return this
		.find({})
		.sort('meta.createAt')
		.exec(cb);
	},
	findById: function(id, cb){
		return this
		.findOne({_id: id})
		.exec(cb);
	}
}

module.exports = ArticleSchema;