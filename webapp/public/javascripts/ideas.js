// Any ideas should be written in this file

// The function help to show a square, or 3x3 squares by left click or right click is available in sandbox.html
// Therefore, we do not need to create such functions

/*
    var board = [[0,1,2,2,1,0,0,0,1,1],[0,1,-1,-1,1,0,0,0,1,-1],
    [0,1,2,3,2,1,0,0,1,1],[0,0,0,1,-1,2,2,1,1,0],[1,1,1,1,2,-1,3,-1,1,0],
    [1,-1,1,0,1,2,-1,2,1,0],[1,2,2,2,1,2,1,1,0,0],[0,1,-1,2,-1,1,0,0,0,0],
    [0,1,1,2,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];

    This is the sample board placed in sandbox.js. You can see the array if it can help you to imagine where the bombs are placed
        , or whatever.
*/

//////////////////////////////////////// All sample functions here /////////////////////////////////////////////////////////

// Open a square when user click on this square, left click
function reveal_a_square(){

}

// Expand 3x3 squares when user use middle click on the square, the square clicked will be centered of 3x3 expansion
function reveal_3x3_squares(){

}


// Check if the game is win or lose, or playing ...
// Default is playing..., neither win nor lose
function is_won(){

}

function is_lose(){

}

// Check if the position contains a bomb, you can place this function in "is_lose()"
function is_this_a_bomb(){

}





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// *********************************************** Main area here ********************************************
// This main area like a main Class in java, just place any function here, and it will run
// It likes
// public static void main(String[] args){
//          <You are here! (Main area)>            
// }


let position_arr = [1,2,3,11,12,13,21,22,23];

// Bất cứ khi nào muốn show 1 ô nào đó ra màn hình, chỉ cần gọi hàm show();

show(12);            //Ô vuôn vị trí thứ 12 sẽ được show ra màn hình
show(24);            //Ô vuôn vị trí thứ 24 sẽ được show ra màn hình
show(36);            //Ô vuôn vị trí thứ 36 sẽ được show ra màn hình

// Hoặc là, nếu muốn chèn array thì làm bằng cách này

for(let i=0; i<position_arr.length; i++){
    show(position_arr[i]);
}

// Đủ ròi :))))