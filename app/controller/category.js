var Category = require('../models/category');

exports.save = function(req, res){
	var _category = req.body.category;
	if(_category.name){
		var category = new Category(_category);
		category.save(function(err, category){
			if(err) console.log(err);
			else{
				res.redirect('/blog');
			}
		});
	}
}