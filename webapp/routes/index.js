var express = require('express');
var router = express.Router();


/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/


router.get('/', function(req, res, next) {
  res.render('../views/index');
});

router.get('/settings', function(req, res, next) {
  res.render('../views/settings');
});

router.get('/game', function(req, res, next) {
  res.render('../views/game');
});


module.exports = router;
