// The position calculated as the index of the 1d array converted from 2d array:
// [0, 0, 0, 0, 0
//  0, 0, 1, 0, 0
//  0, 0, 0, 0, 0]
// --- Convert --->  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
// --> The "1" has the postion 7
// In reality, to get position clicked by user, we should get 1 value rather than 2 values (x and y coordinate) to
//      easier to "return" or "pass argument"


// The class is to support when calculating the 3x3 squares area
// Ex:
// [0, 0, 0, 0, 0
//  0, 0, 1, 0, 0
//  0, 0, 0, 0, 0]
//  The surrounding positions of value "1" is 1, 2, 3, 6, 7, 8, 11, 12, 13
//  (The position calculated related to 1d array, converted from 2d array of all squares position on a board)



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
                if (this.x + i < 0 || this.x + i >= this.number_of_squares_a_row){
                    // Skip code
                }else if (this.y + j < 0 || this.y + j >= this.number_of_squares_a_column){
                    // Skip code
                }else{
                    positions.push(this.convert_2d_to_1d_position(this.x + i, this.y + j));
                }
            }
        }

        return positions;
    }
}


// How to use
//  let r = new RelativeSquares(4 ,5, 3);
//  console.log(r.get_3x3_area_position());

// [0, 0, 0, 0, 1
//  0, 0, 0, 0, 0
//  0, 0, 0, 0, 0]
// --> Return 3, 4, 8, 9 respectively (3,0), (4,0), (3,1), (4,1)


// Export classes
module.exports = {
    RelativeSquares: RelativeSquares
}