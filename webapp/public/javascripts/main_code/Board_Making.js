var Board_Making_obj = (function () {
    var instance;

    function init() {
        //var number = 0;
        return {
            //player_name: "Guest",


            create_grid: function () {
                for (let i = 0; i < App_Operator.squares_in_a_column; i++) {
                    $("#grid").append('<div id="row-' + i + '" style="display:flex; flex-direction: row; align-items: center; justify-content: center;"></div>');
                }

                for (let i = 0; i < App_Operator.squares_in_a_column; i++) {
                    for (let j = 0; j < App_Operator.squares_in_a_row; j++) {
                        $("#row-" + i).append('<div class="hoverable" style="width: 2.3vw; height:2.3vw;" id="' +
                            (i * App_Operator.squares_in_a_row + j) + '"></div>');
                    }
                }
            },

            add_class_name: function (json) {
                let board_1d = [App_Operator.squares_in_a_column * App_Operator.squares_in_a_row];

                for (let i = 0; i < App_Operator.squares_in_a_column; i++) {
                    for (let j = 0; j < App_Operator.squares_in_a_row; j++) {
                        board_1d[i * App_Operator.squares_in_a_row + j] = json[i][j];
                    }
                }

                for (let i = 0; i < App_Operator.squares_in_a_column * App_Operator.squares_in_a_row; i++) {
                    if (board_1d[i] === -1) {
                        $("#" + i).addClass("bomb");
                    } else {
                        $("#" + i).addClass("number_" + board_1d[i]);
                    }
                }
                $(".first_click").addClass("hoverable");
                $(".first_click").removeClass("first_click");
            },
            get_board_from_api: function () {

                let url_req = 'https://cors-anywhere.herokuapp.com/https://myapi-minesweeper.herokuapp.com/' +
                    App_Operator.first_click_position + '/' + App_Operator.number_of_bombs + '/' +
                    App_Operator.squares_in_a_row + '/' + App_Operator.squares_in_a_column + '';

                fetch(url_req, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }).then(res => res.json())
                    .then(json => {
                        console.log(json);

                        this.add_class_name(json);
                        App_Operator.board = json;
                        /*$(".first_click").addClass("hoverable");
                        $(".first_click").removeClass("first_click");*/
                        App_Operator.initialize_board_information();
                        App_Operator.update_state();
                        App_Operator.update_state_for_Square_class();
                        App_Operator.expand_all_empty_squares();
                    });
                    
                    

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

var Board_Making = Board_Making_obj.getInstance();