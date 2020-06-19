//define lets and consts
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
let round = 90;
let copyround = 90;
let lockboard = false;

function hiddenCard(){
   //prevent double click
   if (lockboard) return;
   if (this === firstCard) return;
   this.lastElementChild.classList.add('hidden');
   
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
      //player wins
      if(points == 18){
         setTimeout(() => {
            initial.classList.remove('hidden');
            table.classList.add('hidden');
         }, 1000)
      }
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
   //player looses 
   if(round == 0){
      setTimeout(() => {
         initial.classList.remove('hidden');
         table.classList.add('hidden');
      }, 1000)
   }
}

//reset the game state
function resetBoard(){
   [hasFlipedCard, lockboard] = [false, false];
   [firstCard, secondCard] = [null, null];
}

//start game function
function playGame(){
   initial.classList.add('hidden');
   table.classList.remove('hidden');
   round = copyround;
   numrounds.textContent = round;
   cards.forEach(card => {
      let randomPosition = Math.floor(Math.random()*36);
      card.style.order = randomPosition;
      card.lastElementChild.classList.remove('hidden');
      card.lastElementChild.classList.remove('hidden');
      points = 0;
   });
};

//easy way mode game
function defFacil(){
   round = 90;
   copyround = 90;
   numrounds.textContent = copyround;
   facil.classList.add('bg-red');
   medio.classList.remove('bg-red');
   dificil.classList.remove('bg-red');
   initial.classList.remove('hidden');
   table.classList.add('hidden');
};

//medium way mode game
function defMedio(){
   round = 70;
   copyround = 70;
   numrounds.textContent = copyround;
   facil.classList.remove('bg-red');
   medio.classList.add('bg-red');
   dificil.classList.remove('bg-red');
   initial.classList.remove('hidden');
   table.classList.add('hidden');
};

//hard way mode game
function defDificil(){
   round = 50;
   copyround = 50;
   numrounds.textContent = copyround;
   facil.classList.remove('bg-red');
   medio.classList.remove('bg-red');
   dificil.classList.add('bg-red');
   initial.classList.remove('hidden');
   table.classList.add('hidden');
};

//add event listners 
cards.forEach(card => card.addEventListener('click', hiddenCard));
facil.addEventListener('click', defFacil);
medio.addEventListener('click', defMedio);
dificil.addEventListener('click', defDificil);
play.addEventListener('click', playGame);