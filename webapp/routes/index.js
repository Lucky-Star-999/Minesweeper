var express = require('express');
var router = express.Router();


const fs = require('fs');

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
  //res.render('../views/game');
  let data = readFile();

  res.render('../views/game', {
    number_of_squares_a_row: data.info_json.chosen_row_length,
    number_of_squares_a_column: data.info_json.chosen_column_length,
    number_of_bombs: data.info_json.chosen_bomb_number,
    name: data.info_json.chosen_name,
    is_need_publish_score: data.info_json.is_need_publish_score
  });

});

router.get('/get_leaderboard', function(req, res, next) {
  //res.render('../views/game');
  let data = readFile_2();

  /*res.render('../views/game', {
    number_of_squares_a_row: data.info_json.chosen_row_length,
    number_of_squares_a_column: data.info_json.chosen_column_length,
    number_of_bombs: data.info_json.chosen_bomb_number,
    name: data.info_json.chosen_name,
    is_need_publish_score: data.info_json.is_need_publish_score
  });*/

  res.json(data);

});

router.post('/game_request', function (req, res, next) {
  //Write file
  let data = JSON.stringify(req.body);
  fs.writeFileSync('temp_data_board.json', data);

  res.end();
});

router.post('/leaderboard', function (req, res, next) {
  // Pull old files
  let old_data = readFile_2();
  let new_data = req.body.info_json;
 
  let full_data = old_data;
  full_data.push(new_data);

  fs.writeFileSync('leaderboard.json', JSON.stringify(full_data));
  res.end();
});

module.exports = router;

//////////////////////////////////////////////////// Function Support //////////////////////////////////////////////
function readFile() {
  let rawdata = fs.readFileSync('temp_data_board.json');

  let data = JSON.parse(rawdata);

  /*let file = "";
  fs.writeFileSync('temp_data_board.json', file);*/
  return data;
}

function readFile_2(){
  let rawdata = fs.readFileSync('leaderboard.json');

  let data = JSON.parse(rawdata);

  return data;
}

