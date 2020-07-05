/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

let scores, currentScore, activePlayer, play, finalScore, previous;

let dice1=document.querySelector('.dice1');
let dice2=document.querySelector('.dice2');

init();

document.querySelector('.final').addEventListener('change', (event) => {
    finalScore=event.target.value;
})
document.querySelector('.btn-roll').addEventListener('click', () => {
    if(play) {
        let rand1=Math.floor(Math.random()*6)+1;
        let rand2=Math.floor(Math.random()*6)+1;
        dice1.src=`dice-${rand1}.png`;
        dice2.src=`dice-${rand2}.png`;
        dice1.style.display='block';
        dice2.style.display='block';
        if(rand1 < 2 || rand2 < 2) {
            nextPlayer();
        }
        else {
            currentScore+=rand1;
            currentScore+=rand2;
            document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        }
        if(previous === 6 && rand1 === 6) {
            scores[activePlayer]=0;
            document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
            nextPlayer();
        }
        else {
            previous=rand1;
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', () => {
    if(play) {
        scores[activePlayer]+=currentScore;
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
        if(scores[activePlayer]>=finalScore) {
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            play=false;
            dice1.style.display='none';
            dice2.style.display='none';
        }
        else {
            nextPlayer();
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    currentScore=0;
    previous=-1;
    document.getElementById(`current-${activePlayer}`).textContent = currentScore;
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
    activePlayer=1-activePlayer;
    document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
    dice1.style.display='none';
    dice2.style.display='none';
}

function init() {
    scores=[0, 0];
    currentScore=0;
    activePlayer=0;
    play=true;
    finalScore=100;
    previous=-1;
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

    dice1.style.display='none';
    dice2.style.display='none';
}
