var express = require('express');
var router = express.Router();
var mongo = require('../service/MongoService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/chart', function(req, res, next) {
	res.render('chart', {title: 'D3js Charts'});
});

router.get('/mongo', function(req, res, next) {
	mongo.oneWayInteractions(res.send);
})

module.exports = router;
