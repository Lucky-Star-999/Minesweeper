var Board_Making_obj = (function () {
    var instance;

    function init() {
        //var number = 0;
        return {
            player_name: "Guest",
            squares_in_a_row: 20,
            squares_in_a_column: 12,
            number_of_bombs: 0,
            board: [
                [0, 1, 2, 2, 1, 0, 0, 0, 1, 1],
                [0, 1, -1, -1, 1, 0, 0, 0, 1, -1],
                [0, 1, 2, 3, 2, 1, 0, 0, 1, 1],
                [0, 0, 0, 1, -1, 2, 2, 1, 1, 0],
                [1, 1, 1, 1, 2, -1, 3, -1, 1, 0],
                [1, -1, 1, 0, 1, 2, -1, 2, 1, 0],
                [1, 2, 2, 2, 1, 2, 1, 1, 0, 0],
                [0, 1, -1, 2, -1, 1, 0, 0, 0, 0],
                [0, 1, 1, 2, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],

            create_grid: function () {
                for (let i = 0; i < this.squares_in_a_column; i++) {
                    $("#grid").append('<div id="row-' + i + '" style="display:flex; flex-direction: row; align-items: center; justify-content: center;"></div>');
                }

                for (let i = 0; i < this.squares_in_a_column; i++) {
                    for (let j = 0; j < this.squares_in_a_row; j++) {
                        $("#row-" + i).append('<div class="hoverable" style="width: 2.3vw; height:2.3vw;" id="' +
                            i * this.squares_in_a_row + j + '"></div>');
                    }
                }
            },

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