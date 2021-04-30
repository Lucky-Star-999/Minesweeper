// Import class Bomb to be able to extends
var bomb = require('./Bomb.js');
var relativeSquares = require('./RelativeSquares.js');


// When user click first at the board, we will create a chance for user to avoid clicking a bomb
class BombExceptFirstClick extends bomb.Bomb {
    constructor(first_click_position, number_of_bombs, number_of_squares_a_row, number_of_squares_a_column) {
        super(number_of_bombs, number_of_squares_a_row, number_of_squares_a_column);
        this.number_of_squares_a_row = parseInt(number_of_squares_a_row);
        this.number_of_squares_a_column = parseInt(number_of_squares_a_column);
        this.first_click_position = parseInt(first_click_position);
    }


    // Add 3x3 area (first click position is center) for exception
    add_surrounding_first_click_into_exception() {
        let relative_squares_exception =
            new relativeSquares.RelativeSquares(this.first_click_position, this.number_of_squares_a_row, this.number_of_squares_a_column);
        relative_squares_exception = relative_squares_exception.get_3x3_area_position();
        
            for(let i=0; i<relative_squares_exception.length; i++){
                this.exception.push(relative_squares_exception[i]);
            }

    }


    // Override the main function
    // Main function to create bombs' position
    create_bombs() {
        this.add_surrounding_first_click_into_exception();          // Override part

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


// Export classes
module.exports = {
    BombExceptFirstClick: BombExceptFirstClick
}