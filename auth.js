"use strict";

var crypto = require('crypto');
var pkg = {
	len: 64,
	iterations: 1032,
	codec: 'hex'
}

function hashCode(password, algorithm) {
	algorithm = algorithm || 'sha1';
	return crypto.createHash(algorithm).update(password).digest('hex'); // 'hex', 'binary' or 'base64'
}

function hmacCode(password, algorithm) {
	algorithm = algorithm || 'sha1';
	return crypto.createHmac(algorithm, "Your secret code").update(password).digest('hex'); // 'hex', 'binary' or 'base64'
}

function pbkdf2Code(pwd, salt, fn) {
  if (arguments.length >= 3) {
    crypto.pbkdf2(pwd, salt, pkg.iterations, pkg.len, function(err, hash){
      fn(err, (new Buffer(hash, 'binary')).toString(pkg.codec));
    });
  } else {
    fn = salt;
    crypto.randomBytes(pkg.len, function(err, salt){
      if (err) return fn(err);
      salt = salt.toString(pkg.codec);
      crypto.pbkdf2(pwd, salt, pkg.iterations, pkg.len, function(err, hash){
        if (err) return fn(err);
        fn(null, (new Buffer(hash, 'binary')).toString(pkg.codec), salt);
      });
    });
  }
};

function listSupportedHashAlgorithm() {
	var hashes = crypto.getHashes();
	hashes.forEach(function(algorithm) {
		try {
			var code = hashCode("Your password", algorithm);
			console.log("%s(%d bits): < %s >", algorithm, code.length*4, code);	
		}
		catch (err){}
	});	
}

//console.log(hashCode('Password') === hashCode('Password'));
//listSupportedHashAlgorithm();

pbkdf2Code('Password', 'salt', function(err, hash, salt){
	var mySalt = salt || 'salt';
	console.log(mySalt);
	console.log(hash);
	pbkdf2Code('Password', mySalt, function(err, hash){
		console.log(hash);
	});
});
