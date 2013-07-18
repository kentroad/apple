
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();
var port = process.env.PORT || 3000;
var doT = require('express-dot');
// var online = require('./routes/online');

app.set('views', __dirname + '/views');

app.set('view engine', 'dot' );
app.engine('dot', doT.__express );

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  require('./routes/test')(app);
}

doT.setGlobals({
	platform: "Express.js"
});


app.listen(port, function(){
  console.log('Express server listening on port ' + port);	
})

