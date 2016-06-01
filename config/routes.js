var User = require('../app/controller/user');
var Index = require('../app/controller/index');
var Blog = require('../app/controller/blog')

module.exports = function(app){

	//pre处理
	app.use(function(req, res, next){
		var _user = req.session.user;
		console.log('user in session: '+ req.session.user);
		app.locals.user = _user;
		app.locals.moment = require('moment');
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


	//博客登陆路由
	app.get('/blog', Blog.index);
	//博客列表路由
	app.get('/guest/blog/list', Blog.list);
	//博客操作路由
	app.get('/admin/blog/new', User.userLoginRequired, User.userAdminRequired, Blog.new);
	//新建博客
	app.post('/blog/new', Blog.save);
	app.get('/guest/blog/:id', Blog.detail);
}