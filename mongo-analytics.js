// DataService.js


// conn = new Mongo("rsmccloskey.me:27017/data");
db = connect("rsmccloskey.me:27017/data", "tkeapp", "1Inspired!");
// db.auth({})

//initial config
print("Collections in database:" + db.getCollectionNames());

var c = db.members.find();

print("has fbid: " + db.members.find({"fbid": {$exists: true}}).count());

var names = db.members.distinct("name", {"fbid": {$exists: false}});

var noFbId = db.members.find({"fbid": {$exists: false}}, {name: true, _id: false});

noFbId.forEach(printjson);

printjson(names);

var newIds = [];

for (var i = 0; i < names.length; i++) {
	var comp = arr[0].from.name;
	var j = 0;
	while (arr[j].from.name != names[i]) {
		j++;
	}
	if (arr[j].from.name == names[i]) {
		// newIds.push({"name": names[i], "name2": arr[j].from.name, "fbid": arr[j].from.id});
		// db.members.updateOne({name: names[i]}, { $set: { "fbid": arr[j].from.id }});
	}
}

// printjson(newIds);


















