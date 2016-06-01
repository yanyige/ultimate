var Article = require('../models/article')

exports.index = function(req, res){

	res.render('blog',{
		title: '博客首页',
	});

}

exports.list = function(req, res){
	Article.fetch(function(err, articles){
		if(err){
			console.log(err);
		}
		res.render('articleList', {
			article: articles,
			title: '文章列表'
		});
	});
}

exports.new = function(req, res){
	res.render('articleNew', {
		title: '发表文章',
		article: {}
	});
}

exports.save = function(req, res){
	var _article = req.body.article;

	var article = new Article(_article);
	article.save(function(err, article){
		if(err) {
			console.log(err);
		}
		console.log(article);
	});
	res.redirect('/guest/blog/list');
}

exports.detail = function(req, res){
	var _id = req.params.id;
	_id = _id.slice(1);
	console.log(_id);
	Article.findById(_id, function(err, article){
		if(err){
			console.log(err);
		}else{
			res.render('articleDetail',{
				title: '文章详情',
				article: article
			})
		}
	});
}