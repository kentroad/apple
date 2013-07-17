var express = require('express');
var app = express();

app.use(express.directory('public'))
app.use(express.static('public'))

app.use(express.basicAuth(function(user, pass){
  return 'admin' == user & 'admin' == pass;
}));

app.get('/admin', function(req, res){
  res.end('remoteUser: ' + req.user);
});

app.listen(8080);