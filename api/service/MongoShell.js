// MongoShell.js

var nstats = nativeGetInteractions();
	// db.runCommand({ insert: nstats.retval });

	printjson(nstats);

var db = connect("rsmccloskey.me:27017/data", "tkeapp", "1Inspired!");

function nativeCountLikesComments(db) {
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

function nativeGetInteractions(db) {
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
