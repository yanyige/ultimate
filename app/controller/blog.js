var Article = require('../models/article')

exports.index = function(req, res){

	Article.fetch(function(err, articles){
		console.log(articles);
		if(err){
			console.log(err);
		}

		res.render('blog',{
			title: '博客首页',
			article: articles
		});
	})

}