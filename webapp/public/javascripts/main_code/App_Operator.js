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
            game_state: "Waiting", //Waiting is user haven't clicked any square yet
            history_states: [],
            more_than_second_click: false,

            get_player_name: function () {
                return this.player_name;
            },
            get_board_dimension: function () {
                return this.squares_in_a_row + "x" + this.squares_in_a_column;
            },
            get_number_of_bombs: function () {
                return this.number_of_bombs;
            },
            get_time_elapsed: function () {
                return this.time_elapse;
            },

            //Handle logic
            reveal_square: function (id_str) {
                let id = parseInt(id_str);
                $("#" + id).removeClass("hoverable");
                $("#" + id).addClass("active");
            },

            show: function (id) {
                this.reveal_square(id);
            },
            is_lose: function () {
                let lose = false;
                for (let i = 0; i < App_Operator.squares_in_a_column * App_Operator.squares_in_a_row; i++) {
                    let id_query = "#" + i;
                    if ($(id_query).attr("class").includes("active")) {
                        if ($(id_query).attr("class").includes("bomb")) {
                            lose = true;
                        }
                    }
                }
                return lose;
            },
            is_win: function(){
                let win = true;
                let number_of_squares_revealed = 0;
                for (let i = 0; i < App_Operator.squares_in_a_column * App_Operator.squares_in_a_row; i++) {
                    let id_query = "#" + i;
                    if ($(id_query).attr("class").includes("active") && !$(id_query).attr("class").includes("bomb")) {
                        number_of_squares_revealed++;
                    }
                }

                if(number_of_squares_revealed >= (this.squares_in_a_row * this.squares_in_a_column - this.number_of_bombs)){
                    App_Operator.game_state = "Win";
                }
            },
            update_state: function () {
                let current_state = [];
                for (let i = 0; i < App_Operator.squares_in_a_column * App_Operator.squares_in_a_row; i++) {
                    let id_query = "#" + i;
                    current_state[i] = $(id_query).attr("class");
                }
                this.history_states.push(current_state);
            },
            undo: function () {
                if (this.history_states.length === 1) {
                    let confirm_box = window.confirm("This will restart the game, because you can not lose at the first click!\n" + 
                    "Do you want to undo?");
                    if(confirm_box){
                        location.reload();
                    }
                } else if (this.history_states.length < 1) {
                    alert("Nothing to undo!");
                } else {
                    this.history_states.pop();
                    let expected_state = this.history_states[this.history_states.length - 1];
                    for (let i = 0; i < App_Operator.squares_in_a_column * App_Operator.squares_in_a_row; i++) {
                        let id_query = "#" + i;
                        $(id_query).removeClass();
                        $(id_query).addClass(expected_state[i]);
                    }
                    this.active_undo_button();
                }
            },
            active_undo_button: function () {
                if (this.game_state === "Lose" || this.game_state === "Win") {
                    $("#undo-button").prop("disabled", true);
                } else {
                    $("#undo-button").prop("disabled", false);
                }
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