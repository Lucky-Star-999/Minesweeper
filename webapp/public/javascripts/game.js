function exit() {
    window.location.href = "/";
}

var info_playername = document.getElementById('final-playername');
var info_boardsize = document.getElementById('final-boardsize');
var info_numberofbombs = document.getElementById('final-numberofbombs');
var final_time_elapsed = document.getElementById('final-time-elapsed');
var does_need_to_publish = document.getElementById('does_need_to_publish');




App_Operator.player_name = info_playername.innerHTML;
App_Operator.squares_in_a_row = parseInt(document.getElementById('row_length').innerHTML);
App_Operator.squares_in_a_column = parseInt(document.getElementById('column_length').innerHTML);
App_Operator.number_of_bombs = parseInt(info_numberofbombs.innerHTML);

if (does_need_to_publish.innerHTML === "true") {
    App_Operator.is_guest = false;
} else {
    App_Operator.is_guest = true;
}

Board_Making.create_grid();


//Test get data from API
Board_Making.get_board_from_api();