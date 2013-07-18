
module.exports = function(app) {
    app.get('/', index);
}
 

var index = function(req, res){
	res.render('index', { title: 'Apple is my first project', 
												description: 'Every start is funny',
												button: 'PushMe'});
};
/*
var index = function(req, res){
	res.render('index', { title: 'Express', layout: false }, function(err, html){
		res.send(html);
		console.log(html);
	});
};
*/