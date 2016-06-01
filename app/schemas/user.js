var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
	username: {
		unique: true,
		type: String
	},
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
	},
	role: {
		default: 0,
		type: Number
	},
	//0 normal用户
	//1 认证用户
	//2-10 saved
	//11+ administrator
	emailAddress: String,
	nickName: {
		unique: true,
		type: String
	}
});

UserSchema.pre('save', function(next){
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next();
});

UserSchema.methods = {
	comparePassword: function(_password, cb){
		if(_password == this.password){
			cb(false, true);
		}else{
			cb(false, false);
		}
	}
}

UserSchema.statics = {
	fetch: function(cb) {
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb);
	},
	findById: function(cb) {
		return this
		.findOne({_id: id})
		.exec(cb);
	},
	findByUsername: function(cb) {
		return this
		.findOne({_username: username})
		.exex(cb);
	}
}


module.exports = UserSchema;