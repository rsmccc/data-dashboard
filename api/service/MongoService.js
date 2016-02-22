// DataService.js

if (Mongo != undefined) {
	var nstats = nativeStats();
	// db.runCommand({ insert: nstats.retval });

	printjson(nstats);

	// db.int_stats.insert(nstats.retval);
	// printjson(db.int_stats.find({}));
}

/*
else {
	var Mongo = require('mongodb').MongoClient;
	var url = "mongodb://tkeapp:1Inspired!@rsmccloskey.me:27017/data";



}

var connect = function(query) {
	Mongo.connect(url, function (err, db) {
		query(db).then(function(data, err) {
			db.close();
			if (err) throw err;
			return data;
		});
	});
};

var interactions = function(db) {
	var col = db.collection('posts');
	col.group({
		{ 'from.name': 1 },
		reduce: function ( curr, result ) {

					if (curr.likes !== undefined ) {
						result.likes += curr.likes.data.length;
					}
					if (curr.comments !== undefined ) {
						result.comments += curr.comments.data.length;
					}
				},
				initial: { posts : 0, likes : 0, comments : 0}
				});
	})
};
*/
function nativeStats() {
	db = connect("rsmccloskey.me:27017/data", "tkeapp", "1Inspired!");
	return db.runCommand({
		group:
		{
			ns: 'posts',
			key: {"from.name": 1},
			$reduce: function ( curr, result ) {
				result.posts++;
				if (curr.likes !== undefined ) {
					result.likes += curr.likes.data.length;
				}
				if (curr.comments !== undefined ) {
					result.comments += curr.comments.data.length;
				}
			},
			initial: { posts : 0, likes : 0, comments : 0},
			finalize: function(result) {
				result.name = result["from.name"];
				delete result["from.name"];
			}
		}
	});
}


















