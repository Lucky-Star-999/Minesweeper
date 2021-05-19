
var board = [[0,1,2,2,1,0,0,0,1,1],[0,1,-1,-1,1,0,0,0,1,-1],
[0,1,2,3,2,1,0,0,1,1],[0,0,0,1,-1,2,2,1,1,0],[1,1,1,1,2,-1,3,-1,1,0],
[1,-1,1,0,1,2,-1,2,1,0],[1,2,2,2,1,2,1,1,0,0],[0,1,-1,2,-1,1,0,0,0,0],
[0,1,1,2,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];

// Currently, I don't know what it is, but it can help us get some bonus with Factory pattern
var square_objs = [];

// Don't ask me what this function will do, it just create an array of object for each Square with no intention :))
// It will use FACTORY PATTERN to help us gain bonus
// More detail in Square.js
function create_collection_of_squares(){
    for(let i=0; i<10; i++){
        for(let j=0; j<10; j++){
            let factory_temp = new SquareFactory();
            square_objs.push(factory_temp.get_square(board[i][j]));
        }
    }
}

function add_number_class(){
    var board_1d = [];
    for(let i=0; i<10; i++){
        for(let j=0; j<10; j++){
            board_1d[i*10+j] = board[i][j];
        }
    }

    for(let i=0; i<100; i++){
        if(board_1d[i]===-1){
            $("#" + i).addClass("bomb");
        }else{
            $("#" + i).addClass("number_" + board_1d[i]);
        }
    }
}


function reveal_square(id_str){
    let id = parseInt(id_str);
    $("#" + id).removeClass("hoverable");
    $("#" + id).addClass("active");
}




function show(id){
    let app_ope = new AppOperator();
    app_ope.reveal_square(id);
}

// **************************   Main function *****************************************
add_number_class();
create_collection_of_squares();

for(let i=0; i<100; i++){
    console.log("Id " + i + ": " + square_objs[i].property_number);
}
