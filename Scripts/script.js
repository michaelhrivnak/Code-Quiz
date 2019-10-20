
//set local elements/vairables
var contentArea = $("#content");
var timerCount = $("#timerCount");
var responseArea = $("#responseArea");

const numQuestions = questions.length;
const startTime = numQuestions * 15;
const wrongResponse = 15;
var timeLeft = startTime;
//used to randomize the questions
var remainingQuestions = [];

var countdown;

function init(){
    resetGame();
}

function resetGame(){
    contentArea.empty();

    timerCount.text(timeLeft);

    let newP = $("<p>");
    newP.text("Welcome to the code quiz, you have "+startTime+" seconds to answer "+numQuestions+" questions. Your final score is based on your remaining time left. For each incorrect answer you will lose 15 seconds off the timer. Click the button below to get started. Good luck!");   
    contentArea.append(newP);

    let startButton = $("<button>");
    startButton.text("Get Started!");
    startButton.attr("id","getStarted");    
    startButton.on("click",function(){
        remainingQuestions = questions;
        startGame();
        
    });

    contentArea.append(startButton);
}

function startGame(){
    countdown = setInterval(function(){
        timeLeft--;
        updateTimerText();

    },1000);
    loadNextQuestion();
}

function updateTimerText(){
    //timeLeft--;
    timerCount.text(timeLeft);

    if(timeLeft === 0){
        clearInterval(countdown);
        endGame();
    }else if(timeLeft < 6){
        timerCount.addClass("timeLow");
    }
}

function loadNextQuestion(){
    
    if(remainingQuestions.length > 0){
        contentArea.empty();
        
        let currentQuestion = remainingQuestions.splice(Math.floor(Math.random()*remainingQuestions.length),1)[0];        
        
        let questionTitleLabel = $("<p>");
        
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
        
        contentArea.append(questionTitleLabel).append(questionChoicesList);
      
    }else{
        clearInterval(countdown);
        updateTimerText();
        endGame();
    }

}

function checkChoice(response, answer){
    
    if(response === answer){
        responseArea.html("<hr>Correct!");
        
    }else{
        responseArea.html("<hr>Wrong!");
        timeLeft -= wrongResponse;
    }
    fadeResponseArea();
    loadNextQuestion();
}
async function fadeResponseArea(){
    setTimeout(function(){
        responseArea.empty();
    },1000)
}
function endGame(){
   

    let score = timeLeft >= 0?timeLeft:0;
    contentArea.empty();

    let newP = $("<p>");
    newP.html("Game Over!<br>Your final score is: "+ score + "<br>Please enter your name");
    
    contentArea.append(newP);

    let nameInput = $("<input>");
    nameInput.attr("type","text");
    contentArea.append(nameInput);
    
    let submitBtn = $("<button>");
    submitBtn.text("submit")
    .attr("id","submitName")
    .on("click", function(){
        setHighScores(nameInput.val(), score)
    });   
    
    contentArea.append(submitBtn); 
       
}
function setHighScores(name, score){
    let currentScores = JSON.parse(localStorage.getItem("highScores"));
    
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