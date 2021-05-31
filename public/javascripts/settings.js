let displayRowValue = document.getElementById('rowValue');
let displayColValue = document.getElementById('colValue');
let numberOfBombs = document.getElementById('numberOfBombs');

// function to change the slider displays accordingly
function displaySliderValue() {
    displayRowValue.innerHTML = document.getElementById('rowRange').value;
    displayColValue.innerHTML = document.getElementById('colRange').value;
    adjustnumberofBombs();
    numberOfBombs.innerHTML = document.getElementById('bombRange').value;
}

// calculate the max number of bombs for every change of dimensions.
let bombRange = document.getElementById('bombRange');

function adjustnumberofBombs() {
    let rowNum = parseInt(document.getElementById('rowRange').value);
    let colNum = parseInt(document.getElementById('colRange').value);
    bombRange.setAttribute("max", (rowNum * colNum) - 10);

}

// function to allow input player name when ticking Post Score Online
let postScore = document.getElementById('postScoreCheckbox');
let nameInput = document.getElementById('playername-field');


function enableNameInput() {
    //console.log(postScore.checked);
    if (postScore.checked == false) {
        nameInput.disabled = true;
    } else {
        nameInput.disabled = false;
    }
}


function post_board(info_json) {
    fetch('/game_request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            info_json
        }),
    }).then(function () {
        window.location.replace("/game");
    });
}

function set_all_user_information() {
    let is_need_publish_score = false;
    let chosen_name = "Guest";
    if (postScore.checked == false) {

    } else {
        is_need_publish_score = true;
        chosen_name = nameInput.value;
    }


    let chosen_row_length = parseInt(document.getElementById('rowRange').value);
    let chosen_column_length = parseInt(document.getElementById('colRange').value);
    let chosen_bomb_number = parseInt(document.getElementById('bombRange').value);

    /*console.log(is_need_publish_score);
    console.log(chosen_name);
    console.log(chosen_row_length);
    console.log(chosen_column_length);
    console.log(chosen_bomb_number);*/

    App_Operator.player_name = chosen_name;
    App_Operator.is_guest = is_need_publish_score;
    App_Operator.squares_in_a_row = chosen_row_length;
    App_Operator.squares_in_a_column = chosen_column_length;
    App_Operator.number_of_bombs = chosen_bomb_number;

    let temp_board_info = {
        chosen_name: chosen_name,
        is_need_publish_score: is_need_publish_score,
        chosen_row_length: chosen_row_length,
        chosen_column_length: chosen_column_length,
        chosen_bomb_number: chosen_bomb_number
    };

    post_board(temp_board_info);

    //$("#storing_board_info").val(JSON.stringify(temp_board_info));
    //console.log(JSON.stringify(temp_board_info));
}


function finalize() {
    if (nameInput.value === "" && postScore.checked === true) {
        alert("Please enter your name!");
    } else {
        this.set_all_user_information();
        window.location.href = "/game";
    }

    //window.location.href = "/game";
}

function redirectHome() {
    window.location.href = "/";
}

