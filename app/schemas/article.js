var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ArticleSchema = new Schema({
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
		type: ObjectId,
		ref: 'Category'
	}
});

ArticleSchema.pre('save', function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
});

// var ObjectId = mongoose.Schema.Types.ObjectId;

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
	},
	findByCategory: function(category, cb){
		return this
		.find({category: category})
		.exec(cb);
	}
}

module.exports = ArticleSchema;