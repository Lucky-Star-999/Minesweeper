// Import classes
var bombExceptFirstClick = require('./BombExceptFirstClick.js');
var relativeSquares = require('./RelativeSquares.js');

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

        let obj = new bombExceptFirstClick.BombExceptFirstClick(this.first_click_position, this.number_of_bombs,
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
                    let obj = new relativeSquares.RelativeSquares(position, this.number_of_squares_a_row,
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



// Export class
module.exports = {
    BoardMaking: BoardMaking
}