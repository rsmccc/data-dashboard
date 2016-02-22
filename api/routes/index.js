var express = require('express');
var router = express.Router();
var mserv = require('../service/MongoService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/chart', function(req, res, next) {
	res.render('chart', {title: 'D3js Charts'});
});

router.get('/mongo', function(req, res, next) {
	res.send(mserv.conns(mserv.inters));
})

module.exports = router;
