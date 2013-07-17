
module.exports = function(app) {
    app.get('/', index);
}
 

var index = function(req, res){
	res.render('index', { title: 'Express', layout: false });
};
/*
var index = function(req, res){
	res.render('index', { title: 'Express', layout: false }, function(err, html){
		res.send(html);
		console.log(html);
	});
};
*/