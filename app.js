var express = require('express');
var port = process.env.PORT || 3000;
var path = require('path');

var app = express();

app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

app.listen(port);

app.get('/', function(req, res){
	res.render('index', {
		title: '首页',
		
	})
});




console.log('started at '+ port);