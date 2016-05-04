var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
	role: Number,
	emailAdress: String
});

UserSchema.pre('save', function(next){
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.updateAt = Date.now();
	}
	next();
});

UserSchema.statics = {
	fetch: function(cb) {
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb);
	}
	findById: function(cb) {
		return this
		.findOne({_id: id})
		.exec(cb);
	}
}


module.exports = UserSchema;