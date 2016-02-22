// DataService.js

if (Mongo != undefined) {

	// conn = new Mongo("host:port/collection");
	db = connect("rsmccloskey.me:27017/data", "tkeapp", "1Inspired!");
	// db.auth({})

	//initial config
	print("Collections in database:" + db.getCollectionNames());

	var c = db.members.find();

	print("has fbid: " + db.members.find({"fbid": {$exists: true}}).count());

	var names = db.members.distinct("name", {"fbid": {$exists: false}});

	var noFbId = db.members.find({"fbid": {$exists: false}}, {name: true, _id: false});

}


















