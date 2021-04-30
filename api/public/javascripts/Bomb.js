// maximum_number_of_squares means total of squares on a board
// Ex: The board has the size: 15x10 --> Total: 150 squares --> maximum_number_of_squares = 150
// This is the class for basic creating bombs (just a GENERAL case: not calculate first click position of user)
// The main class for creating bombs in this game is "BombExceptFirstClick", which extends from this class (Bomb)

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


// Export the class such that another file can use classes in this file
module.exports = {
    Bomb: Bomb
}