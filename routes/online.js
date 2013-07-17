var redis = require('redis');
var db = redis.createClient();

exports.add = function(req, res, next){
  var ua = req.headers['user-agent'];
  console.log(req.ip);
  db.zadd('online', Date.now(), ua, next);
}

exports.find = function(req, res, next){
  var min = 60 * 1000;
  var ago = Date.now() - min;
  db.zrevrangebyscore('online', '+inf', ago, function(err, users){
    if (err) return next(err);
    req.online = users;
    next();
  });
}