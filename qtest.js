"use strict";
var nameList = [
	{name:'James', age:22},
	{name:'Benjamin', age:48},
	{name:'Ming', age:52}
];

var mongo = require('mongoskin'); 

var db = mongo.db('localhost:27017/test', {safe:true}); 
var test = db.collection('test');
var noop = function(){};

// test.find({$or:[{age:{$gt:30}},{name:'Jones'}]}).toArray(function (err, items) {
//   console.log(items);
// });

// test.findItems({$or:[{age:{$gt:30}},{name:'Jones'}]}, function (err, items) {
//   console.log(items);
// });

// test.insert(nameList, function(err, result) {
//     console.log(result);
// });

// test.update({name:'Clinton-x'},  {$set: {age: 18}}, {}, function(err, result) {
//    console.log(err+result);
// })

// test.findOne({name:'Clinton-x'}, function (err, item) {
// 	item.age = 17;
// 	test.save(item, {}, noop);
//   console.log(item);
// });

// db.admin.listDatabases(function(err, result){
//   console.log(result);
//   db.close();
// })

// nameList.forEach(function(item, i){
// 	test.insert(item, function(){});
// 	console.log(item);
// });

// test.remove({name:'Kelvin'}, {}, function (err, item) {
// 	if (!err) console.log(item+' deleted');
// });

// test.findItems({name:/^M.+g$/}, function (err, items) {
//   console.log(items);
// });

// Don't use where alone, it cannot take advantage of indexes.
//test.findItems({$where: "this.name == 'Ming'"}, function (err, items) {
test.findItems({name: /^T/, $where: "function() { return (this.age >= 30) }"}, function (err, items) {
  console.log(items);
});
