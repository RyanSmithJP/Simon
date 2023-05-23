//Game variables for timer, score, round and sequence
let secs = 0;
var running = true;
var roundNo = 0;
var sequence = [];
var clickNo = 0;
var startTimer = false;
var lastScore = 00;
var highScore = 00;

//1. on startGame this is called. the light turns from red to green and round begins first sequence
function gameLight() {
    document.getElementById("light").style.backgroundColor = "green";
    round();
}
//calls the timer and light functions
function startGame(x) {
    startTimer = false;
    roundNo = 0;
    sequence = [];
    clickNo = 0;
    running = true;
    console.log("Starting game");
    //dont press start during game
    x.disabled = true;
    updateTime();
    setTimeout(gameLight, 3000);
}
//6. Game flashes 5 times and resets light, etc.
function gameOver(){
    running = false;
    console.log("over");
    var delay = 0;
    //flash 5 times
    for(let i = 0; i < 5; i++){
        setTimeout(function(){
            displayNone(0);
            displayNone(1);
            displayNone(2);
            displayNone(3);
        }, delay);
        delay+=400;
        if(i==4){
            reset();
        }
    }
}
function reset(){
    document.getElementById("startButton").disabled = false;
    lastScore = roundNo-1;
    if(lastScore>highScore){
        highScore = lastScore;
    }
    //7. display scores
    document.getElementById("highScore").innerText = highScore;
    document.getElementById("lastScore").innerText = lastScore;
    document.getElementById("light").style.backgroundColor = "red";
}
//2,3,4. Clicking the right button
function clicked(x){
    //console.log(x.id);
    console.log("Click "+colour);
    secs=0;
    switch(x.getAttribute('id')){
        case "greenGrad":
            console.log("green");
            if(sequence[clickNo]==0){
                console.log("correct");
                clickNo++;
                if(clickNo==roundNo){
                    round();
                }
            }
            //6. wrong = game over
            else{
                gameOver();
            }
            break;
        case "redGrad":
            console.log("red");
            if(sequence[clickNo]==1){
                console.log("correct");
                clickNo++;
                if(clickNo==roundNo){
                    round();
                }
            }
            else{
                gameOver();
            }
            break;
        case "yellowGrad":
            console.log("yellow");
            if(sequence[clickNo]==2){
                console.log("correct");
                clickNo++;
                if(clickNo==roundNo){
                    round();
                }
            }
            else{
                gameOver();
            }
            break;
        case "blueGrad":
            console.log("blue");
            if(sequence[clickNo]==3){
                console.log("correct");
                clickNo++;
                if(clickNo==roundNo){
                    round();
                }
            }
            else{
                gameOver();
            }
            break;
    }
}

function round() {
    console.log("Timer off");
    secs=0;
    startTimer = false;
    roundNo++;
    clickNo=0;
    flashButton();
}
//fix timer after buttons flash
function updateTime(){
    //6.  time game over
    if(secs>=4&&running){
        gameOver();
    }
    if(startTimer&&running){
        secs++;
        console.log("Time"+secs);
        setTimeout(updateTime,1000);
    }
    else{
        secs = 0;
        return;
    }
}
//2. Flash a random button
function flashButton() {
    if(roundNo>1){
        console.log("Round "+roundNo);
        console.log("last color: " + sequence[roundNo-2]);
    }
    //Math.floor rounds down
    colour = Math.floor(Math.random() * 4);
    sequence.push(colour);
    console.log(colour);
    
    var wait = 0;
    //3,4. Duplicate buttons
    for(let i = 0; i <= sequence.length-1; i++){
        // console.log("Press "+ sequence[i]);
        setTimeout(function(){
            if(i < sequence.length-1){
                displayNone(sequence[i]);
            }
            else{
                displayNone(colour);
                console.log("Timer on");
                startTimer = true;
                updateTime();
            }
        },wait);
        //5. Speed up after 5th, 9th and 13th presses
        //for round 14
        if(i>11){
            wait+=350;
        }
        // 10
        else if(i>7){
            wait+=500;
        }
        //increases speed for round 6
        //will take effect at round 5 in prep for round 6
        else if(i>3){
            console.log("increasing speed at round "+roundNo);
            wait+=650;
        }
        else{
            wait+=800;
        }
    }
}

function displayNone(colour, func) {
    //console.log('none')
    switch (colour) {
        case 0:
            document.getElementById("greenGrad").classList.add("flash"); break;
        case 1:
            document.getElementById("redGrad").classList.add("flash"); break;
        case 2:
            document.getElementById("yellowGrad").classList.add("flash"); break;
        case 3:
            document.getElementById("blueGrad").classList.add("flash"); break;
    }

    setTimeout(function(){
        //console.log('display')
        switch (colour) {
            case 0:
                document.getElementById("greenGrad").classList.remove("flash"); break;
            case 1:
                document.getElementById("redGrad").classList.remove("flash"); break;
            case 2:
                document.getElementById("yellowGrad").classList.remove("flash"); break;
            case 3:
                document.getElementById("blueGrad").classList.remove("flash"); break;
        }
    }, 150)
    
}