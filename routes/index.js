var express = require('express');
var router = express.Router();


const fs = require('fs');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/


router.get('/', function (req, res, next) {
    res.render('../views/index');
});

router.get('/settings', function (req, res, next) {
    res.render('../views/settings');
});

router.get('/game', function (req, res, next) {
    let data = readFile();

    res.render('../views/game', {
        number_of_squares_a_row: data.info_json.chosen_row_length,
        number_of_squares_a_column: data.info_json.chosen_column_length,
        number_of_bombs: data.info_json.chosen_bomb_number,
        name: data.info_json.chosen_name,
        is_need_publish_score: data.info_json.is_need_publish_score
    });
});

router.get('/get_leaderboard', function (req, res, next) {
    let data = readFile_2();
    res.json(data);
});

// Main URL here!
router.get('/getBoardBackUp/:position/:bomb_number/:row_length/:column_length', function (req, res, next) {
    res.json(backup_create_board(req.params.position, req.params.bomb_number, req.params.row_length, req.params.column_length));   
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
    return data;
}

function readFile_2() {
    let rawdata = fs.readFileSync('leaderboard.json');
    let data = JSON.parse(rawdata);
    return data;
}



////////////////////////////////////////// Backup part ////////////////////////////////////////
class RelativeSquares {
    constructor(position, number_of_squares_a_row, number_of_squares_a_column) {
        // Convert string to int to make sure the calculation right
        this.position = parseInt(position);
        this.number_of_squares_a_row = parseInt(number_of_squares_a_row);
        this.number_of_squares_a_column = parseInt(number_of_squares_a_column);

        // Calculate x and y-axis of position
        // ------------->   (x-axis)
        // |
        // |
        // v     (y-axis)
        this.x = this.position % this.number_of_squares_a_row; // x-axis of position choosen
        this.y = (this.position - this.x) / this.number_of_squares_a_row; // y-axis of position choosen
    }


    // Convert x, y-axis into 1d position to convenient for return, passing argument
    convert_2d_to_1d_position(x_axis, y_axis) {
        return (y_axis * this.number_of_squares_a_row + x_axis);
    }


    // return surrounding 3x3 squares position
    get_3x3_area_position() {
        let positions = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (this.x + i < 0 || this.x + i >= this.number_of_squares_a_row) {
                    // Skip code
                } else if (this.y + j < 0 || this.y + j >= this.number_of_squares_a_column) {
                    // Skip code
                } else {
                    positions.push(this.convert_2d_to_1d_position(this.x + i, this.y + j));
                }
            }
        }
        return positions;
    }
}

class Bomb {
    constructor(number_of_bombs, number_of_squares_a_row, number_of_squares_a_column) {
        this.number_of_bombs = parseInt(number_of_bombs);
        this.maximum_number_of_squares = parseInt(number_of_squares_a_row) * parseInt(number_of_squares_a_column);
        this.position_of_bombs = []; // Store position of the bombs

        // The array will contain positions must be avoid when add to position_of_bombs
        // Ex: The duplicate bombs, the first click of user, ...
        this.exception = [];
    }

    // Return a random position
    get_random_position() {
        let min = 0;
        let max = this.maximum_number_of_squares;
        return Math.floor(Math.random() * max) + min; // Random from [0 to 80] (if the board is 9x9)
    }

    // Check if the position must not be add into position_of_bombs
    is_position_excluded(position) {
        for (let i = 0; i < this.exception.length; i++) {
            if (position === this.exception[i]) {
                return true;
            }
        }
        return false;
    }

    // Main function to create bombs' position
    create_bombs() {
        for (let i = 0; i < this.number_of_bombs; i++) {
            let temp_position = this.get_random_position();
            while (this.is_position_excluded(temp_position)) {
                temp_position = this.get_random_position();
            }
            this.exception.push(temp_position);
            this.position_of_bombs.push(temp_position);
        }
    }

}

// When user click first at the board, we will create a chance for user to avoid clicking a bomb
class BombExceptFirstClick extends Bomb {
    constructor(first_click_position, number_of_bombs, number_of_squares_a_row, number_of_squares_a_column) {
        super(number_of_bombs, number_of_squares_a_row, number_of_squares_a_column);
        this.number_of_squares_a_row = parseInt(number_of_squares_a_row);
        this.number_of_squares_a_column = parseInt(number_of_squares_a_column);
        this.first_click_position = parseInt(first_click_position);
    }


    // Add 3x3 area (first click position is center) for exception
    add_surrounding_first_click_into_exception() {
        let relative_squares_exception =
            new RelativeSquares(this.first_click_position, this.number_of_squares_a_row, this.number_of_squares_a_column);
        relative_squares_exception = relative_squares_exception.get_3x3_area_position();

        for (let i = 0; i < relative_squares_exception.length; i++) {
            this.exception.push(relative_squares_exception[i]);
        }
    }


    // Override the main function
    // Main function to create bombs' position
    create_bombs() {
        this.add_surrounding_first_click_into_exception(); // Override part

        for (let i = 0; i < this.number_of_bombs; i++) {
            let temp_position = this.get_random_position();
            while (this.is_position_excluded(temp_position)) {
                temp_position = this.get_random_position();
            }
            this.exception.push(temp_position);
            this.position_of_bombs.push(temp_position);
        }
    }
}


// This class is to create the 2d array representing squares and bombs on a board
class BoardMaking {
    constructor(first_click_position, number_of_bombs, number_of_squares_a_row, number_of_squares_a_column) {
        this.board_map = []; // This 2d array contains all number representing squares and bombs at specific position
        this.bomb_positions = [];


        // Make sure the parameter has integer type
        this.number_of_bombs = parseInt(number_of_bombs);
        this.number_of_squares_a_row = parseInt(number_of_squares_a_row);
        this.number_of_squares_a_column = parseInt(number_of_squares_a_column);
        this.first_click_position = parseInt(first_click_position);
    }


    initialize_space_for_board_map() {
        for (let i = 0; i < this.number_of_squares_a_column; i++) {
            this.board_map[i] = [];
        }
    }


    put_bomb_position_into_board() {

        this.initialize_space_for_board_map(); // Create space for 2d array

        let obj = new BombExceptFirstClick(this.first_click_position, this.number_of_bombs,
            this.number_of_squares_a_row, this.number_of_squares_a_column);
        obj.create_bombs();
        this.bomb_positions = obj.position_of_bombs;

        for (let bomb_position = 0; bomb_position < this.bomb_positions.length; bomb_position++) {
            for (let i = 0; i < this.number_of_squares_a_column; i++) {
                for (let j = 0; j < this.number_of_squares_a_row; j++) {
                    if ((i * this.number_of_squares_a_row + j) === this.bomb_positions[bomb_position]) {
                        this.board_map[i][j] = -1;
                    }
                }
            }
        }
    }


    // Main function for creating the board
    put_all_position_into_board() {
        this.put_bomb_position_into_board(); // Create the bombs first

        // We will mark the number for each squares, except the bombs (value = -1)
        for (let i = 0; i < this.number_of_squares_a_column; i++) {
            for (let j = 0; j < this.number_of_squares_a_row; j++) {

                if (this.board_map[i][j] !== -1) { // Skip the position contain bombs
                    let number_of_surrouning_bombs = 0; // Bomb counter
                    let position = i * this.number_of_squares_a_row + j; // Convert 2d position into 1d position

                    // Create object of RelativeSquares, because we need to calculate 3x3 surrounding squares
                    let obj = new RelativeSquares(position, this.number_of_squares_a_row,
                        this.number_of_squares_a_column);
                    let surrounding_positions = obj.get_3x3_area_position();

                    // Now, it's time to count how many bombs surrounding the postion you are choosing
                    for (let k = 0; k < surrounding_positions.length; k++) {
                        for (let bomb_index = 0; bomb_index < this.bomb_positions.length; bomb_index++) {
                            if (surrounding_positions[k] === this.bomb_positions[bomb_index]) {
                                number_of_surrouning_bombs++;
                            }
                        }
                    }

                    // Assign the number for the square, it's the number of bombs
                    this.board_map[i][j] = number_of_surrouning_bombs;
                }
            }
        }
    }

}


function backup_create_board(position, bomb_numbers, number_of_squares_a_row, number_of_squares_a_column) {
    // The request may be in string, or other types, which are not integer
    // We should change them into integer before creating the board
    position = parseInt(position);
    bomb_numbers = parseInt(bomb_numbers);
    number_of_squares_a_row = parseInt(number_of_squares_a_row);
    number_of_squares_a_column = parseInt(number_of_squares_a_column);

    // Create the board
    let m = new BoardMaking(position, bomb_numbers, number_of_squares_a_row, number_of_squares_a_column);
    m.put_all_position_into_board();

    return m.board_map;
}