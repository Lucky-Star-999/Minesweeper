var App_Operator_obj = (function () {
    var instance;

    function init() {
        //var number = 0;
        return {
            player_name: "Guest",
            is_guest: false,
            time_elapse: 0,
            squares_in_a_row: 20,
            squares_in_a_column: 12,
            number_of_bombs: 10,
            first_click_position: 0,
            board: [],
            game_state: "Waiting",              //Waiting is user haven't clicked any square yet

            get_player_name: function(){
                return this.player_name;
            },
            get_board_dimension: function(){
                return this.squares_in_a_row + "x" + this.squares_in_a_column;
            },
            get_number_of_bombs: function(){
                return this.number_of_bombs;
            },
            get_time_elapsed: function(){
                return this.time_elapse;
            },

            //Handle logic
            reveal_square: function(id_str){
                let id = parseInt(id_str);
                $("#" + id).removeClass("hoverable");
                $("#" + id).addClass("active");
            },
            
            show: function(id){
                this.reveal_square(id);
            },         
            is_lose: function(){
                let lose = false;
                for (let i = 0; i < App_Operator.squares_in_a_column * App_Operator.squares_in_a_row; i++) {
                    let id_query = "#" + i;
                    if($(id_query).attr("class").includes("active")){
                        if($(id_query).attr("class").includes("bomb")){
                            lose = true;
                        }
                    }
                }
                return lose;
            }
        };
    }

    return {
        getInstance: function () {
            if (!instance) instance = init();
            return instance;
        }
    }
})();

var App_Operator = App_Operator_obj.getInstance();