
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

var doT = require('express-dot');

var Bliss = new require('bliss');
var bliss = new Bliss();

// all environments
//app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

//app.set('view engine', 'jade');

// app.set('view engine', 'dot' );
// app.engine('dot', doT.__express );

// app.set('view engine', 'jshtml');
// app.engine('jshtml', require('jshtml-express'));

app.set('view engine', 'bliss');
//app.engine('bliss', require('bliss'));
app.engine('.bliss',function(path,options,fn){
    fn(null,bliss.render(path, options));
});


app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// doT.setGlobals({platform: "Express.js"});
// var start = require('./routes/start')(app);
// var smartbid = require('./routes/smartbid')(app);

// for jshtml
// app.get('/', function(req, res) {
//     res.locals({
//         cname : 'Express',
//         message : 'jshtml'
//     });
//     res.render('index');
// });

app.get('/', function(req, res) {
	res.render('index', {title:'Express', message:'Bliss'});
});


var port = process.env.PORT || 3000;
http.createServer(app).listen(port, function(){
  console.log('Express server listening on port ' + port);
});
