// Any ideas should be written in this file


// Open a square when user click on this square, left click
function reveal_a_square(){

}

// Expand 3x3 squares when user use middle click on the square, the square clicked will be centered of 3x3 expansion
function reveal_3x3_squares(){

}





// ******************************** Main function here ********************************************

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