// Lưu ý: cái class này chỉ mới bỏ vị trí của bomb vô mảng thôi nhen, value = -1. Để có gì tối làm tiếp ^^


// This class is to create the 2d array representing squares and bombs on a board

class BoardMaking {
    constructor(first_click_position, number_of_bombs, number_of_squares_a_row, number_of_squares_a_column) {
        this.board_map = [];        // This 2d array contains all number representing squares and bombs at specific position
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

        this.initialize_space_for_board_map();          // Create space for 2d array

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

}