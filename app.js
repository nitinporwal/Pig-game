/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, currentScore, activePlayer, play;

let dice=document.querySelector('.dice');

init();

document.querySelector('.btn-roll').addEventListener('click', () => {
    if(play) {
        let rand=Math.floor(Math.random()*6)+1;
        dice.src=`dice-${rand}.png`;
        dice.style.display='block';
        if(rand < 2) {
            nextPlayer();
}
        else {
            currentScore+=rand;
            document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', () => {
    if(play) {
        scores[activePlayer]+=currentScore;
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
        if(scores[activePlayer]>=20) {
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            play=false;
            dice.style.display='none';
        }
        else {
            nextPlayer();
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    currentScore=0;
    document.getElementById(`current-${activePlayer}`).textContent = currentScore;
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
    activePlayer=1-activePlayer;
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
    dice.style.display='none';
}

function init() {
    scores=[0, 0];
    currentScore=0;
    activePlayer=0;
    play=true;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.add('active');

    dice.style.display='none';
}
