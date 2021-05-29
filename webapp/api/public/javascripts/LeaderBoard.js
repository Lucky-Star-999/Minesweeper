class LeaderBoard {
    constructor(name, score) {
        this.name = name.toString();
        this.score = parseInt(score);

        this.exception = [];
    }
}
var Player = [
    {
        name: player1,
        score: 1,
    },
    {
        name: player2,
        score: 2,
    },
    {
        name: player3,
        score: 3,
    },
    {
        name: player4,
        score: 4,
    },
    {
        name: player5,
        score: 5,
    },
    {
        name: player6,
        score: 6,
    },
    {
        name: player7,
        score: 7,
    },
    {
        name: player8,
        score: 8,
    },
    {
        name: player9,
        score: 9,
    },
    {
        name: player10,
        score: 10,
    }
];
var getScores = function () {
    return $.ajax();
};
var getTopScore = function (query) {
    return $.ajax();
};
var addScore = function (id, score) {
    $.ajax();
};

var addScore = function (score, name) {
    $.ajax({
        data: JSON.stringify({
            "name": name,
            "score": score
        })
    });
};
return {
    getScores: getScores,
    getTopScore: getTopScore,
    updateScore: updateScore,
    postScore: postScore
};