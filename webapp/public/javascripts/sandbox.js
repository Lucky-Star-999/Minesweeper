
var board = [[0,1,2,2,1,0,0,0,1,1],[0,1,-1,-1,1,0,0,0,1,-1],
[0,1,2,3,2,1,0,0,1,1],[0,0,0,1,-1,2,2,1,1,0],[1,1,1,1,2,-1,3,-1,1,0],
[1,-1,1,0,1,2,-1,2,1,0],[1,2,2,2,1,2,1,1,0,0],[0,1,-1,2,-1,1,0,0,0,0],
[0,1,1,2,1,1,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];



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

