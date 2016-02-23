// MongoService.js

var Mongo = require('mongodb').MongoClient;
var url = "mongodb://tkeapp:1Inspired!@rsmccloskey.me:27017/data";


module.exports = {
	oneWayInteractions: function(callback) {
		Mongo.connect(url, function (err, db) {
			var col = db.collection('posts');
			col.group(
				['from.name'],
				{},
				{ posts : 0, likes : [], comments : []},
				function ( curr, result ) {
					if (curr.likes !== undefined ) {
						result.likes = curr.likes.data;
					}
					if (curr.comments !== undefined ) {
						result.comments = curr.comments.data;
					}
				},
				function ( result ) {
					result.name = result["from.name"];
					delete result["from.name"];
				},
				function ( err, results ) {
					if (err) throw err;
					callback( results );
				});

			db.close();
		});
	}	
}













