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
//Board_Making.get_board_from_api();




/******************************************** Time counter ********************************************************/
function time_counter() {
    if (App_Operator.game_state === "Playing") {
        let time = new Date();
        let start_time = time.getTime();
        let start_minute = time.getMinutes();
        let start_second = time.getSeconds();

        let interval_time_id = setInterval(myFunction, 1000);

        function myFunction() {
            let now = new Date();
            if (App_Operator.game_state !== "Playing") {
                clearInterval(interval_time_id);
                alert("You lose!");
            }
            let output_time = convert_seconds_to_minute_second(parseInt((now.getTime() - time.getTime()) / 1000));
            document.getElementById("final-time-elapsed").innerHTML = output_time;

        }
    }
}

function convert_seconds_to_minute_second(second_elapsed) {
    let second = second_elapsed % 60;
    let minute = parseInt(second_elapsed / 60);
    let output_time = "";
    if (minute < 10) {
        output_time = output_time + "0" + minute + ":";
    } else {
        output_time = output_time + minute + ":";
    }

    if (second < 10) {
        output_time = output_time + "0" + second;
    } else {
        output_time = output_time + second;
    }

    return output_time;
}