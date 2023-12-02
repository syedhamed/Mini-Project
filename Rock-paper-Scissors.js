let score = JSON.parse(localStorage.getItem('score')) ||{
  Wins:0,
  losses:0,
  Ties : 0
};     

updateScoreElement();

function playGame(playerMove){

const computerMove = pickComputerMove();
    let Result = '';

if(playerMove ==='SCISSORS'){

if(computerMove === 'ROCK'){
Result = 'you loose';
} else if (computerMove === 'PAPER'){
Result = 'you WON!!';
} else if(computerMove === 'SCISSORS'){

Result ='tie';
}

}  else if(playerMove=== 'PAPER'){

if(computerMove === 'ROCK'){
Result = 'you WON!!';
} else if (computerMove === 'PAPER'){
Result = 'tie';
} else if(computerMove === 'SCISSORS'){

Result ='you loose';
}

} else if(playerMove === 'ROCK')
{

if(computerMove === 'ROCK'){
Result = 'tie';
} else if (computerMove === 'PAPER'){
Result = 'you loose';
} else if(computerMove === 'SCISSORS'){

Result ='you WON!!';
}
}

if (Result === 'you WON!!') {
score.Wins +=1;
} else if (Result === 'you loose') {
score.losses += 1;
} else if (Result === 'tie') {
score.Ties += 1;
}
localStorage.setItem('score',JSON.stringify(score));

updateScoreElement();


document.querySelector('.js-result').innerHTML = Result;       
document.querySelector('.js-moves').innerHTML = `You <img src="
images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png"class="move-icon">
Computer`;

// alert(`you picked ${playerMove}..computer picked ${computerMove}.${Result}
//  Wins : ${score.Wins}, Losses: ${score.losses}, Ties : ${score.Ties}`);

}

function updateScoreElement(){

document.querySelector('.js-score').innerHTML = `Wins : ${score.Wins}, Losses: ${score.losses}, Ties : ${score.Ties}`;

}            

function pickComputerMove(){
        const randomNumber= Math.random();
        let computerMove = '';
if(randomNumber >= 0 && randomNumber < 1/3)
{
computerMove = 'ROCK';
}else if(randomNumber >= 1/3 && randomNumber < 2 / 3){
    computerMove = 'PAPER';

}else if(randomNumber >=2/3 && randomNumber < 1){
computerMove = 'SCISSORS';
}

return computerMove;

}
