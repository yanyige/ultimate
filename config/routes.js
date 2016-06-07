var User = require('../app/controller/user');
var Index = require('../app/controller/index');
var Blog = require('../app/controller/blog');
var Category = require('../app/controller/category');

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
	app.get('/guest/blog/list/', Blog.listById);
	app.get('/guest/blog/list/:categoryId', Blog.listById); //此处id为类别id
	app.get('/admin/blog/new', User.userLoginRequired, User.userAdminRequired, Blog.new);
	app.get('/guest/blog/:id', Blog.detail);
	app.get('/admin/blog', Blog.index);
	app.post('/blog/new', Blog.save);
	app.post('/category/new', Category.save);
}