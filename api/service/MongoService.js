// DataService.js

if (Mongo != undefined) {
	mongoNative();
}


function mongoNative() {
	db = connect("rsmccloskey.me:27017/data", "tkeapp", "1Inspired!");
	// var c = db.members.find();
	// while (c.hasNext()) {
	// 	printjson(c.next());
	// }
	// var names = db.members.distinct("name", {"fbid": {$exists: false}});
	// db.members.update()
	var interact = db.runCommand({
		group:
		{
			ns: 'posts',
			key: { 'from.name': 1 },
			$reduce: function ( curr, result ) {
				result.posts++;
				if (curr.likes !== undefined ) {
					result.likes += curr.likes.data.length;
				}
				if (curr.comments !== undefined ) {
					result.comments += curr.comments.data.length;
				}
			},
			initial: { posts : 0, likes : 0, comments : 0}
		}
	});

	printjson(interact);

	var stats = interact.retval;

	
}















