

//处理首页渲染
exports.index = function(req, res){
	res.render('index', {
		title: '首页',
		
	});
};
