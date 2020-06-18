const play = document.querySelector('#jogar');
const table = document.querySelector('.table');
const initial = document.querySelector('.initial');
const cards = document.querySelectorAll('.card');
let facil = document.querySelector('#facil');
let medio = document.querySelector('#medio');
let dificil = document.querySelector('#dificil');
let numrounds = document.querySelector('#num-rounds');
let hasFlipedCard = false;
let firstCard, secondCard;

let points = 0;
let round = 120;
let copyround = 120;

console.log(numrounds);

facil.addEventListener('click', defFacil);
medio.addEventListener('click', defMedio);
dificil.addEventListener('click', defDificil);

let lockboard = false;

function hiddenCard(){
   if (lockboard) return;
   if (this === firstCard) return;
   this.lastElementChild.classList.add('hidden');
   //this.classList.toggle('flip');
   //this.firstElementChild.classList.toggle('flipinv');
   if(!hasFlipedCard){
      //first click
      hasFlipedCard = true;
      firstCard = this;
   } else {
      //second click
      hasFlipedCard = false;
      secondCard = this;
      checkForMatch();
   }  
}

function checkForMatch(){
   //cards match
   if(firstCard.dataset.bicho === secondCard.dataset.bicho){
      points ++;
      round --;
      numrounds.textContent = round;
      firstCard.removeEventListner('click', hiddenCard);
      secondCard.removeEventListner('click', hiddenCard);
      resetBoard();
   //cards dont match
   } else {
      round --;
      numrounds.textContent = round;
      lockboard = true;
      setTimeout(() => {
         firstCard.lastElementChild.classList.remove('hidden');
         secondCard.lastElementChild.classList.remove('hidden');
         resetBoard();
      }, 1500)
   }
}

function resetBoard(){
   [hasFlipedCard, lockboard] = [false, false];
   [firstCard, secondCard] = [null, null];
}

function playGame(){
   initial.classList.add('hidden');
   table.classList.remove('hidden');
   round = copyround;
   numrounds.textContent = round;
   points = 0;
   cards.forEach(card => {
      let randomPosition = Math.floor(Math.random()*36);
      card.style.order = randomPosition;
      card.lastElementChild.classList.remove('hidden');
      card.lastElementChild.classList.remove('hidden');
   })
};

function defFacil(){
   round = 120;
   copyround = 120;
   numrounds.textContent = copyround;
};

function defMedio(){
   round = 90;
   copyround = 90;
   numrounds.textContent = copyround;
};

function defDificil(){
   round = 60;
   copyround = 60;
   numrounds.textContent = copyround;
};

cards.forEach(card => card.addEventListener('click', hiddenCard));
play.addEventListener('click', playGame);

