var contentArea = $("#content");
var numQuestions = questions.length;
var timerCount = $("#timerCount");
var startTime = numQuestions * 15;
var timeLeft = startTime;
var remainingQuestions = [];
const wrongResponse = 15;
var responseArea = $("#responseArea");
var countdown;

function init(){
    resetGame();
}

function resetGame(){
    contentArea.empty();
    timerCount.text(timeLeft);
    let newP = $("<p>");
    newP.text("Welcome to the code quiz, you have 75 seconds to answer 5 questions. Your final score is basedo on your remaining time left. For each incorrect answer you will lose 15 seconds off the timer. Click the button below to get started. Good luck!");   
    contentArea.append(newP);
    let startButton = $("<button>");
    startButton.text("Get Started!");
    startButton.attr("id","getStarted");
    
    startButton.on("click",function(){
        remainingQuestions = questions;
        startTimer();
        loadNextQuestion();
    });
    contentArea.append(startButton);
}

function startTimer(){
    countdown = setInterval(function(){
        timeLeft--;
        timerCount.text(timeLeft);
    
        if(timeLeft === 0){
            clearInterval(countdown);
            alert("time's up you lose");
        }

    },1000);
}

function loadNextQuestion(){
    
    if(remainingQuestions.length > 0){
        contentArea.empty();
        
        let currentQuestion = remainingQuestions.splice(Math.floor(Math.random()*remainingQuestions.length),1)[0];        
        
        let questionTitleLabel = $("<label>");
        
        questionTitleLabel.text(currentQuestion.title);
        
        let questionChoicesList = $("<div>");
        questionChoicesList.addClass("btnGroup");

        currentQuestion.choices.forEach(element => {
            
            let questionChoice = $("<button>");
            questionChoice.text(element);
            questionChoice.addClass("responseBtn");
            questionChoice.on("click", function(){checkChoice(element,currentQuestion.answer)});
            questionChoicesList.append(questionChoice);
            
        });
        
        contentArea.append(questionTitleLabel);
        contentArea.append(questionChoicesList);
    }else{
        clearInterval(countdown);
        endGame();
    }

}

function checkChoice(response, answer){
    if(response === answer){
        responseArea.text("Correct!");
    }else{
        responseArea.text("Wrong!");
        timeLeft -= wrongResponse;
    }
    loadNextQuestion();
}

function endGame(){
    
    contentArea.empty();
    let newP = $("</p>");
    newP.text("Game Over, Please enter your Name");
    contentArea.append(newP);
    let nameInput = $("<input>");
    nameInput.attr("type","text");
    contentArea.append(nameInput);
    let submitBtn = $("<button>");
    submitBtn.text("submit");
    submitBtn.attr("id","submitName");
    submitBtn.on("click", function(){setHighScores(nameInput.val(), timeLeft)});
    contentArea.append(submitBtn); 
    //let name = prompt("Game over, please enter your name");
    //let name = SetTimeout(function(){return prompt("Game over, enter your name")},1);
    
       
}
function setHighScores(name, score){
    let currentScores = JSON.parse(localStorage.getItem("highScores"));
    console.log(currentScores);
    if(currentScores === null || currentScores == ""){
        currentScores = [];
    }
    currentScores.push({
        playerName: name,
        playerScore: score
    });
    localStorage.setItem("highScores",JSON.stringify(currentScores));
    open("highScores.html", "_parent"); 
}
init();