// initializing all the global variables

var players,currentPlayer,newGame, dice, hold, finalScore, scores, currentScores, images,playerName,gameStatus;

players = document.getElementsByClassName('player-div');
currentPlayer = 1;
newGame = document.getElementById('new-game');
dice = document.getElementById('dice');
hold = document.getElementById('hold');
finalScore = document.getElementById('final-score');
scores = document.getElementsByClassName('player-score');
currentScores = document.getElementsByClassName('current-score');
images = document.getElementsByClassName('dice-img');
playerName = document.getElementById('player-name');
gameStatus = document.getElementsByClassName('game-status');

init() 

// initialization
function init() {

    // remove the overlay is exists
    if(!gameStatus[0].classList.contains('display-none')) {
        gameStatus[0].classList.add('display-none');
    }

    finalScore.value = "";
    for(let i=0; i<scores.length; i++) {
        scores[i].textContent = 0;
        resetScore(i + 1);
    }

    for(let i=0; i<images.length; i++) {
        images[i].style.display = 'none';
    }

    for(let i=0; i<players.length; i++) {
        players[currentPlayer - 1].classList.remove("current");
    }

    currentPlayer = 1;
    players[currentPlayer - 1].classList.add("current");
}

// newGame event listener
newGame.addEventListener('click',init);

// rolling dice event listener
dice.addEventListener('click', function() {

    let previous = 1;

    finalScore.value = finalScore.value == ''? 50:  finalScore.value;
    
    for(let i=0; i<images.length; i++) {
        // get random images
        var score = Math.floor(Math.random()*6) + 1;
        images[i].style.display = 'block';
        images[i].src='img/dice-'+score+'.png';
        if(score == 1) {
            resetScore(currentPlayer)
            switchPlayer(currentPlayer)
        }
        else if(score == 6 && previous == 6) {
            resetPlayer(currentPlayer)
            switchPlayer(currentPlayer)
        }
        else {
            // update the current score of the current player
            currentScores[currentPlayer - 1].textContent = parseInt(currentScores[currentPlayer - 1].textContent,10) + score;
        }
        previous = score;
    }
});

// reset function
function resetScore(player) {
    currentScores[player - 1].textContent = 0;
}

//switch user function 
function switchPlayer(Player) {

    //reset the old player ui
    players[Player - 1].classList.remove('current');

    // toggle the current player
    currentPlayer = Player+1 > players.length? 1 : Player+1;

    // update the current player ui
    players[currentPlayer - 1].classList.add('current');

}

//reset player function
function resetPlayer(Player) {
    scores[Player - 1].textContent = '0';
    resetScore(Player);
}

//declare winner
function declareWinner(Player) {
    gameStatus[0].classList.remove('display-none');
    playerName.textContent = 'Player '+Player;
}


// hold button event listener 
hold.addEventListener('click',function() {
    // update the global score
    scores[currentPlayer - 1].textContent = parseInt(scores[currentPlayer - 1].textContent,10) + parseInt(currentScores[currentPlayer - 1].textContent,10);
    
    // if winner
    if(parseInt(scores[currentPlayer - 1].textContent,10) >= parseInt(finalScore.value,10) ) {
        declareWinner(currentPlayer);
    }
    else {
        // switch user
        switchPlayer(currentPlayer);
    }
     // reset the current score
    resetScore(currentPlayer);

    
});