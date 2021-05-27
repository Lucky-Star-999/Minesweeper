var App_Operator_obj = (function () {
    var instance;

    function init() {
        //var number = 0;
        return {
            player_name: "Guest",
            is_guest: false,
            time_elapse: 0,

            get_player_name: function(){
                return this.player_name;
            },
            get_board_dimension: function(){
                return Board_Making.squares_in_a_row + "x" + Board_Making.squares_in_a_column;
            },
            get_number_of_bombs: function(){
                return Board_Making.number_of_bombs;
            },
            get_time_elapsed: function(){
                return this.time_elapse;
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