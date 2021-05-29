

class AppOperator{
    constructor(){

    }

    reveal_square(id_str){
        let id = parseInt(id_str);
        $("#" + id).removeClass("hoverable");
        $("#" + id).addClass("active");
    }
}

