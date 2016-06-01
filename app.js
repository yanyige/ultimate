var express = require('express');
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var logger = require('morgan');
var ueditor = require('ueditor');

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
app.use("/libs/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next){
	 // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var imgname = req.ueditor.filename;
        var img_url = '/images/ueditor/';
        //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.ue_up(img_url); 
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
        // 客户端会列出 dir_url 目录下的所有图片
        res.ue_list(dir_url); 
    }
    // 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/libs/ueditor/config.json');
    }
}));

//登陆处理程序
if (app.get('env') === 'development') {
	app.use(logger(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug', true);
	app.set('showStackError', true);
}

require('./config/routes')(app);

app.listen(port);





console.log('started at '+ port);