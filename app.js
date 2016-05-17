var express = require('express');
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var path = require('path');
var User = require('./app/models/user');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var logger = require('morgan');

mongoose.connect('mongodb://localhost/ultimate')

var app = express();

app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
	secret: 'ultimate',
	store: new mongoStore({
		url: 'mongodb://localhost/ultimate',
		collection: 'sessions'
	})
}));

//登陆处理程序
if (app.get('env') === 'development') {
	app.use(logger(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug', true);
	app.set('showStackError', true);
}

app.listen(port);


//pre处理
app.use(function(req, res, next){
	var _user = req.session.user;
	console.log('user in session: '+ req.session.user);
	if(_user){
		app.locals.user = _user;
	}

	return next();

});

//首页index路由
app.get('/', function(req, res){

	res.render('index', {
		title: '首页',
		
	})
});

//注册页面路由
app.post('/user/signup', function(req, res){
	var _user = req.body.user;
	var user = new User(_user);
	user.save(function(err, user){
		if(err) console.log(err);
		else console.log(user);
	});

});



//页面登陆路由
app.post('/user/login', function(req, res){
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
});

app.get('/logout', function(req, res){
	delete req.session.user;
	delete app.locals.user;
	res.redirect('/');
});


console.log('started at '+ port);