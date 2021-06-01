// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function open_modal() {
  App_Operator.get_leaderboard();
  modal.style.display = "block";
}

function close_modal() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Search-Sort features
function search_by_name() {
  let key = $("#search_field").val();
  App_Operator.export_leaderboard_search_by_name(key);
}

function sort_by_bombs() {
  App_Operator.sort_by_bombs();
}

function sort_by_date() {
  App_Operator.get_leaderboard();
}

function sort_by_time() {
  App_Operator.sort_by_time();
}