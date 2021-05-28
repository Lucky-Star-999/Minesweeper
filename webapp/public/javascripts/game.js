function exit() {
    window.location.href = "/";
}

var info_playername = document.getElementById('final-playername');
var info_boardsize = document.getElementById('final-boardsize');
var info_numberofbombs = document.getElementById('final-numberofbombs');
var final_time_elapsed = document.getElementById('final-time-elapsed');



info_playername.innerHTML = App_Operator.get_player_name();
info_boardsize.innerHTML = App_Operator.get_board_dimension();
info_numberofbombs.innerHTML = App_Operator.get_number_of_bombs();
final_time_elapsed.innerHTML = App_Operator.get_time_elapsed();


Board_Making.create_grid();


//Test get data from API
Board_Making.get_board_from_api();
