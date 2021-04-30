var express = require('express');
var router = express.Router();


// Custom module here! It is used to import some file javascript, to run your function
var my_function = require('../public/javascripts/index');



/* GET home page. */
router.get('/', function (req, res, next) {

  // It just a default test, if the url has not any parameters
  res.json(my_function.create_board(0, 6, 5, 3));
  //res.render('index', { title: 'Express' });

});


// Main URL here!
router.get('/:position/:bomb_number/:row_length/:column_length', function (req, res, next) {
  res.json(my_function.create_board(req.params.position, req.params.bomb_number, req.params.row_length, req.params.column_length));
});



module.exports = router;


