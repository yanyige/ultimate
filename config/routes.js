var User = require('../app/controller/user');
var Index = require('../app/controller/index');

module.exports = function(app){

	//pre处理
	app.use(function(req, res, next){
		var _user = req.session.user;
		console.log('user in session: '+ req.session.user);
		app.locals.user = _user;

		next();

	});

	//首页index路由
	app.get('/', Index.index);

	//注册页面路由
	app.post('/user/signup', User.signup);

	//页面登陆路由
	app.post('/user/login', User.login);

	//页面登出路由
	app.get('/logout', User.logout);
}