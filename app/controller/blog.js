var Article = require('../models/article');
var Category = require('../models/category');

exports.index = function(req, res){

	Category.fetch(function(err, categorys){
		if(err){
			console.log(err);
		}else{
			console.log(categorys);
			res.render('blog',{
				title: '博客首页',
				category: categorys
			});
		}
	})

}

exports.listById = function(req, res){
	var _categoryId = req.params.categoryId;
	if(_categoryId){	
		Article.find({category: _categoryId})
			   .populate('category', 'name')
			   .exec(function(err , articles){
					if(err){
						console.log(err);
					}
					res.render('articleList', {
						article: articles,
						title: '文章列表'
					});
				});
	}else{
		Article.find({})
			   .populate('category', 'name')
			   .exec(function(err , articles){
					if(err){
						console.log(err);
					}
					res.render('articleList', {
						article: articles,
						title: '文章列表'
					});
				});
	}
}

exports.new = function(req, res){
	Category.fetch(function(err, categories){
		res.render('articleNew', {
			title: '发表文章',
			article: {},
			category: categories
		});
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
	var _id = req.params['id'];
	Article.findById(_id, function(err, article){
		if(err){
			console.log(err);
		}else{
			console.log(article);
			res.render('articleDetail',{
				title: '文章详情',
				article: article
			})


		}
	});
}