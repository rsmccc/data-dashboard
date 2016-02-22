// DataService.js

var shell = false;

if (Mongo != undefined && shell) {
	var nstats = nativeGetInteractions();
	// db.runCommand({ insert: nstats.retval });

	printjson(nstats);

	// db.int_stats.insert(nstats.retval);

	// printjson(db.int_stats.find({}));

	function nativeCountLikesComments() {
		var db = connect("rsmccloskey.me:27017/data", "tkeapp", "1Inspired!");
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

	function nativeGetInteractions() {
		var db = connect("rsmccloskey.me:27017/data", "tkeapp", "1Inspired!");
		return db.runCommand({
			group:
			{
				ns: 'posts',
				key: {"from.name": true},
				$reduce: function ( curr, result ) {
					result.posts++;
					if (curr.likes !== undefined ) {
						result.likes = curr.likes.data;
						for (var i = 0; i < curr.likes.data.length; i++) {
							var lyk = curr.likes.data[i];
							printjson(lyk);
						// result.likes.push(lyk);
					}
				}
				if (curr.comments !== undefined ) {
					result.comments = curr.comments.data;
					for (var j = 0; j < curr.comments.data.length; j++) {
						var comms = curr.comments.data[j];
						printjson(comms);
						// result.comments.push(comms);
					}
				}
			},
			initial: { posts : 0, likes : [], comments : []},
			finalize: function(result) {
				result.name = result["from.name"];
				delete result["from.name"];
			}
		}
	});
	}
}


else {
	var Mongo = require('mongodb').MongoClient;
	var url = "mongodb://tkeapp:1Inspired!@rsmccloskey.me:27017/data";

	connect(interactions, function( err, data) {
		console.log(data);
	});

	var connect = function(query) {
		Mongo.connect(url, function (err, db) {
			query(db).then(function(data, err) {
				db.close();
				if (err) throw err;
				return data;
			});
		});
	};


	var oneWayInteractions = function(db) {
		Mongo.connect(url, function (err, db) {
			var col = db.collection('posts');
			return col.group(
				{key: 'from.name' },
				{reduce: function ( curr, result ) {

					if (curr.likes !== undefined ) {
						result.likes = curr.likes.data;
					}
					if (curr.comments !== undefined ) {
						result.comments = curr.comments.data;
					}
				}},
				{initial: { posts : 0, likes : 0, comments : 0}},
				{finalize: function ( result ) {
					result.name = result["from.name"];
					delete result["from.name"];
				}}
				);	
			db.close();
		});
	}	


}













