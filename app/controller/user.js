var User = require('../models/user');


//用户注册控制
exports.signup = function(req, res){
	var _user = req.body.user;
	var user = new User(_user);
	user.save(function(err, user){
		if(err) console.log(err);
		else console.log(user);
	});
};

//用户登录控制
exports.login = function(req, res){
	var _user = req.body.user;
	// console.log(_user);
	var username = _user.username;
	var password = _user.password;
	// console.log("username="+username);
	User.findOne({username: username}, function(err, user){
		if(!err){
			// console.log(err);
		}
		if(!user){
			return res.redirect('/');
		}

		user.comparePassword(password, function(err, isMatch){
			if(err){
				console.log(err);
			}
			if(isMatch){
				console.log('Success log in');
				req.session.user = user;
				return res.redirect('/');
			}else{
				console.log('Password not matched');
				return res.redirect('/');	
			}
		});


	});
};

//用户登出控制
exports.logout = function(req, res){
	delete req.session.user;
	// delete app.locals.user;
	res.redirect('/');
}

