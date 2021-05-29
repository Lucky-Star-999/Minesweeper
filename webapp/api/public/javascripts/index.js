var boardMaking = require('./BoardMaking');


function test() {
    console.log("Export module successfully!");
}



/*function create_board(){
    let m = new boardMaking.BoardMaking(0, 6, 5, 3);
    m.put_all_position_into_board();
    //console.log(m.board_map);
    return m.board_map;
}*/

function create_board(position, bomb_numbers, number_of_squares_a_row, number_of_squares_a_column) {
    // The request may be in string, or other types, which are not integer
    // We should change them into integer before creating the board
    position = parseInt(position);
    bomb_numbers = parseInt(bomb_numbers);
    number_of_squares_a_row = parseInt(number_of_squares_a_row);
    number_of_squares_a_column = parseInt(number_of_squares_a_column);

    // Create the board
    let m = new boardMaking.BoardMaking(position, bomb_numbers, number_of_squares_a_row, number_of_squares_a_column);
    m.put_all_position_into_board();

    return m.board_map;
}


module.exports = {
    test: test,
    create_board: create_board
}