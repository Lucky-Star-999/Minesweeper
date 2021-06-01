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
            full_leaderboard: [],
            board_information: [],

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
            get_today: function () {
                let today = new Date();
                return today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
            },

            //Handle logic
            reveal_square: function (id_str) {
                try {
                    let id = parseInt(id_str);
                    $("#" + id).removeClass("hoverable");
                    $("#" + id).addClass("active");

                    if ($("#" + id).attr("class").includes("number_0")) {
                        //this.expand_all_empty_squares();
                    }
                } catch (err) {

                }

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
            is_win: function () {
                let win = true;
                let number_of_squares_revealed = 0;
                for (let i = 0; i < App_Operator.squares_in_a_column * App_Operator.squares_in_a_row; i++) {
                    let id_query = "#" + i;
                    if ($(id_query).attr("class").includes("active") && !$(id_query).attr("class").includes("bomb")) {
                        number_of_squares_revealed++;
                    }
                }

                if (number_of_squares_revealed >= (this.squares_in_a_row * this.squares_in_a_column - this.number_of_bombs)) {
                    App_Operator.game_state = "Win";
                }
            },
            update_state: function () {
                let current_state = [];
                for (let i = 0; i < App_Operator.squares_in_a_column * App_Operator.squares_in_a_row; i++) {
                    let id_query = "#" + i;
                    current_state[i] = $(id_query).attr("class");
                }

                // If all the elements do not change, the state should not be updated
                let fake_change = true;
                if (this.history_states.length === 0) {
                    fake_change = false;
                    this.history_states.push(current_state);
                } else {
                    let old_state = this.history_states[this.history_states.length - 1];
                    for (let i = 0; i < current_state.length; i++) {
                        if (current_state[i] !== old_state[i]) {
                            fake_change = false;
                            break;
                        }
                    }
                    if (fake_change) {

                    } else {
                        this.history_states.push(current_state);
                    }
                }

            },
            update_state_for_Square_class: function () {
                // Update state for Square
                for (let i = 0; i < this.squares_in_a_column; i++) {
                    for (let j = 0; j < this.squares_in_a_row; j++) {
                        let id_query = "#" + this.convert_2d_to_1d(j, i);
                        // Check if the square is opened
                        if ($(id_query).attr("class").includes("active")) {
                            this.board_information[i][j].is_opened = true;
                        } else {
                            this.board_information[i][j].is_opened = false;
                        }

                        // Check if the square is flagged
                        if ($(id_query).attr("class").includes("flag_on")) {
                            this.board_information[i][j].is_flagged = true;
                        } else {
                            this.board_information[i][j].is_flagged = false;
                        }
                    }
                }
            },
            undo: function () {
                if (this.history_states.length === 1) {
                    let confirm_box = window.confirm("This will restart the game, because you can not lose at the first click!\n" +
                        "Do you want to undo?");
                    if (confirm_box) {
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
            },
            get_time_elapsed: function () {
                let time_elapse_str = $("#final-time-elapsed").text();
                let minute = parseInt(time_elapse_str.charAt(0) + time_elapse_str.charAt(1));
                let second = parseInt(time_elapse_str.charAt(3) + time_elapse_str.charAt(4));
                return (minute * 60 + second);
            },
            export_score: function () {
                let score_data = {
                    player_name: this.player_name,
                    time_elapse: this.time_elapse,
                    board_dimension: this.get_board_dimension(),
                    game_state: this.game_state,
                    number_of_bombs: this.number_of_bombs,
                    date: this.get_today(),
                    time_elapse: this.get_time_elapsed()
                }
                return score_data;
            },
            upload_to_leaderboard: function () {
                let info_json = this.export_score();
                fetch('/leaderboard', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        info_json
                    }),
                }).then(function () {

                });
            },
            export_leaderboard: function (json) {

                $("#leaderboard_table").empty();
                let elements = '<tr><th>Player name</th><th>Board dimension</th>' +
                    '<th>Number of bombs</th><th>Date played</th><th>Time Elapsed (Seconds)</th><th>Result</th></tr>';

                $("#leaderboard_table").append(elements);

                for (let i = 0; i < json.length; i++) {
                    let row_element = '<tr>';
                    row_element += '<td>' + json[i].player_name + '</td>';
                    row_element += '<td>' + json[i].board_dimension + '</td>';
                    row_element += '<td>' + json[i].number_of_bombs + '</td>';
                    row_element += '<td>' + json[i].date + '</td>';
                    row_element += '<td>' + json[i].time_elapse + '</td>';
                    row_element += '<td>' + json[i].game_state + '</td>';
                    row_element += '/<tr>';
                    $("#leaderboard_table").append(row_element);
                }

            },
            get_leaderboard: function () {
                fetch('/get_leaderboard', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }).then(res => res.json())
                    .then(json => {
                        this.full_leaderboard = json;
                        this.export_leaderboard(json);
                    });
            },
            export_leaderboard_search_by_name: function (key) {
                $("#leaderboard_table").empty();
                let elements = '<tr><th>Player name</th><th>Board dimension</th>' +
                    '<th>Number of bombs</th><th>Date played</th><th>Time Elapsed (Seconds)</th><th>Result</th></tr>';

                $("#leaderboard_table").append(elements);

                for (let i = 0; i < this.full_leaderboard.length; i++) {
                    if (this.full_leaderboard[i].player_name.includes(key)) {
                        let row_element = '<tr>';
                        row_element += '<td>' + this.full_leaderboard[i].player_name + '</td>';
                        row_element += '<td>' + this.full_leaderboard[i].board_dimension + '</td>';
                        row_element += '<td>' + this.full_leaderboard[i].number_of_bombs + '</td>';
                        row_element += '<td>' + this.full_leaderboard[i].date + '</td>';
                        row_element += '<td>' + this.full_leaderboard[i].time_elapse + '</td>';
                        row_element += '<td>' + this.full_leaderboard[i].game_state + '</td>';
                        row_element += '/<tr>';
                        $("#leaderboard_table").append(row_element);
                    }

                }
            },
            sort_by_bombs: function () {
                let temp_leaderboard = this.full_leaderboard;
                // Insertion sort
                let n = temp_leaderboard.length;
                for (let i = 1; i < n; i++) {
                    // Choosing the first element in our unsorted subarray
                    let current = temp_leaderboard[i];
                    // The last element of our sorted subarray
                    let j = i - 1;
                    while ((j > -1) && (current.number_of_bombs < temp_leaderboard[j].number_of_bombs)) {
                        temp_leaderboard[j + 1] = temp_leaderboard[j];
                        j--;
                    }
                    temp_leaderboard[j + 1] = current;
                }

                // Export
                $("#leaderboard_table").empty();
                let elements = '<tr><th>Player name</th><th>Board dimension</th>' +
                    '<th>Number of bombs</th><th>Date played</th><th>Time Elapsed (Seconds)</th><th>Result</th></tr>';

                $("#leaderboard_table").append(elements);

                for (let i = 0; i < temp_leaderboard.length; i++) {
                    let row_element = '<tr>';
                    row_element += '<td>' + temp_leaderboard[i].player_name + '</td>';
                    row_element += '<td>' + temp_leaderboard[i].board_dimension + '</td>';
                    row_element += '<td>' + temp_leaderboard[i].number_of_bombs + '</td>';
                    row_element += '<td>' + temp_leaderboard[i].date + '</td>';
                    row_element += '<td>' + temp_leaderboard[i].time_elapse + '</td>';
                    row_element += '<td>' + temp_leaderboard[i].game_state + '</td>';
                    row_element += '/<tr>';
                    $("#leaderboard_table").append(row_element);


                }
            },
            sort_by_time: function () {
                let temp_leaderboard = this.full_leaderboard;
                // Insertion sort
                let n = temp_leaderboard.length;
                for (let i = 1; i < n; i++) {
                    // Choosing the first element in our unsorted subarray
                    let current = temp_leaderboard[i];
                    // The last element of our sorted subarray
                    let j = i - 1;
                    while ((j > -1) && (current.time_elapse < temp_leaderboard[j].time_elapse)) {
                        temp_leaderboard[j + 1] = temp_leaderboard[j];
                        j--;
                    }
                    temp_leaderboard[j + 1] = current;
                }

                // Export
                $("#leaderboard_table").empty();
                let elements = '<tr><th>Player name</th><th>Board dimension</th>' +
                    '<th>Number of bombs</th><th>Date played</th><th>Time Elapsed (Seconds)</th><th>Result</th></tr>';

                $("#leaderboard_table").append(elements);

                for (let i = 0; i < temp_leaderboard.length; i++) {
                    let row_element = '<tr>';
                    row_element += '<td>' + temp_leaderboard[i].player_name + '</td>';
                    row_element += '<td>' + temp_leaderboard[i].board_dimension + '</td>';
                    row_element += '<td>' + temp_leaderboard[i].number_of_bombs + '</td>';
                    row_element += '<td>' + temp_leaderboard[i].date + '</td>';
                    row_element += '<td>' + temp_leaderboard[i].time_elapse + '</td>';
                    row_element += '<td>' + temp_leaderboard[i].game_state + '</td>';
                    row_element += '/<tr>';
                    $("#leaderboard_table").append(row_element);


                }
            },
            initialize_board_information: function () {
                // Initialize 2d board
                let temp_2d_arr = [];
                for (let i = 0; i < this.squares_in_a_column; i++) {
                    temp_2d_arr[i] = [];
                }
                for (let i = 0; i < this.squares_in_a_column; i++) {
                    for (let j = 0; j < this.squares_in_a_row; j++) {
                        temp_2d_arr[i][j] = new Square(this.board[i][j]);
                    }
                }
                this.board_information = temp_2d_arr;

            },

            convert_2d_to_1d: function (x_point, y_point) {
                return (x_point + (y_point * this.squares_in_a_row));
            },
            convert_1d_to_2d_x_axis: function (position_1d) {
                position_1d = parseInt(position_1d);
                return (position_1d % this.squares_in_a_row);
            },
            convert_1d_to_2d_y_axis: function (position_1d) {
                position_1d = parseInt(position_1d);
                return ((position_1d - (position_1d % this.squares_in_a_row)) / this.squares_in_a_row);
            },

            handle_middle_click: function (position_clicked) {
                let x_clicked = this.convert_1d_to_2d_x_axis(position_clicked);
                let y_clicked = this.convert_1d_to_2d_y_axis(position_clicked);
                let info = this.board_information[y_clicked][x_clicked];
                if (info.is_opened)
                {
                    let row_length = this.squares_in_a_row;
                    let column_length = this.squares_in_a_column;
                    
                    let flags = 0;
                    for (let i = -1; i < 2; i++)
                        for (let j = -1 ; j < 2; j++)
                            if (i != 0 || j != 0)
                            {
                                let new_x = x_clicked + i;
                                let new_y = y_clicked + j;
                                if (new_x < 0 || new_x >= row_length || new_y < 0 || new_y >= column_length)
                                        continue;
                                        
                                let new_pos = this.board_information[new_y][new_x];
                                if (new_pos.is_flagged)
                                    flags++;
                            }
                    
                    if (info.property_number == flags) 
                    {
                        for (let i = -1; i < 2; i++)
                            for (let j = -1 ; j < 2; j++)
                                if (!(i == 0 && j == 0))
                                {
                                    let new_x = x_clicked + i;
                                    let new_y = y_clicked + j;
                                    if (new_x < 0 || new_x >= row_length || new_y < 0 || new_y >= column_length)
                                        continue;

                                    let new_pos = this.board_information[new_y][new_x];
                                    if (new_pos.is_flagged == false)
                                        this.show(this.convert_2d_to_1d(new_x,new_y));
                                }
                    }
                }
            },
            expand_all_empty_squares: function (position_clicked) {
                
                let queue = new Queue();
                let row_length = this.squares_in_a_row;
                let column_length = this.squares_in_a_column;
                let visited = [];

                // alert("expand_all_empty_square" + this.get_property_value(position_clicked));
                if (this.get_property_value(position_clicked) == 0 && !this.is_item_opened(position_clicked))
                    queue.enqueue(position_clicked);

                while (!queue.isEmpty()){
                    let item = queue.dequeue();
                    this.show(item);
                    visited.push(item);
                    if (this.get_property_value(item) == 0)
                    {
                        let x = this.convert_1d_to_2d_x_axis(item);
                        let y = this.convert_1d_to_2d_y_axis(item);
                        for (let i = -1; i < 2; i++)
                            for (let j = -1; j < 2; j++)
                                if (i !=0 || j != 0)
                                {
                                    let new_x = x + i;
                                    let new_y = y + j;
                                    if (new_x < 0 || new_x >= row_length || new_y < 0 || new_y >= column_length)
                                        continue;
                                    
                                    
                                    let new_item = this.convert_2d_to_1d(new_x, new_y);
                                    if (!this.is_item_opened(new_item) && visited.indexOf(new_item)==-1)
                                        queue.enqueue(new_item);
                                }
                    }        
                 }

            },

            is_item_opened: function (position) {
                let x = this.convert_1d_to_2d_x_axis(position);
                let y = this.convert_1d_to_2d_y_axis(position);
                return this.board_information[y][x].is_opened;
            },

            get_property_value: function(position) {
                let x = this.convert_1d_to_2d_x_axis(position);
                let y = this.convert_1d_to_2d_y_axis(position);
                console.log("x = " + x + " y = " + y);
                return this.board_information[y][x].property_number;
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
