var highScoreList = $("#highScores");

function loadHighScores(){
    let currentScores = JSON.parse(localStorage.getItem("highScores"));
    if (currentScores !== null || currentScores == ""){
        currentScores.forEach(element => {
            var newLi = $("<li>")
            newLi.text(element.playerName+": "+element.playerScore);
            highScoreList.append(newLi);
        });
    }else{
        highScoreList.empty();
    }
}
function init(){
    loadHighScores();
    $("#clear").on("click", function(){
        localStorage.removeItem("highScores");
        loadHighScores();
    });
}
init();