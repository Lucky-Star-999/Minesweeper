let displayRowValue = document.getElementById('rowValue');
let displayColValue = document.getElementById('colValue');
let numberOfBombs = document.getElementById('numberOfBombs');

// function to change the slider displays accordingly
function displaySliderValue() {
    displayRowValue.innerHTML = document.getElementById('rowRange').value;
    displayColValue.innerHTML = document.getElementById('colRange').value;
    adjustnumberofBombs();
    numberOfBombs.innerHTML = document.getElementById('bombRange').value;
}

// calculate the max number of bombs for every change of dimensions.
let bombRange = document.getElementById('bombRange');
function adjustnumberofBombs() {
    let rowNum = parseInt(document.getElementById('rowRange').value);
    let colNum = parseInt(document.getElementById('colRange').value);
    bombRange.setAttribute("max", (rowNum * colNum) - 10);
    
}

// function to allow input player name when ticking Post Score Online
let postScore = document.getElementById('postScoreCheckbox');
let nameInput = document.getElementById('playername-field');


function enableNameInput() {
    console.log(postScore.checked);
    if (postScore.checked == false){
        nameInput.disabled = true;
    } else {
        nameInput.disabled = false;
    }
}


function finalize() {
    window.location.href = "/game";
}

function redirectHome() {
    window.location.href = "/";
}

