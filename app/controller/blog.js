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
		title: '发表文章'
	});
}