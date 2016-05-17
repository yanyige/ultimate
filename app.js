var express = require('express');
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var path = require('path');
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

require('./config/routes')(app);

app.listen(port);





console.log('started at '+ port);