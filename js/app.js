const cards = document.querySelectorAll('.card');

let hasFlipedCard = false;
let firstCard, secondCard;

let points = 0;
let clicklimit = 0;

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
      firstCard.removeEventListner('click', hiddenCard);
      secondCard.removeEventListner('click', hiddenCard);
      resetBoard();

   //cards dont match
   } else {
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

(function shuffle(){
   cards.forEach(card => {
      let randomPosition = Math.floor(Math.random()*36);
      card.style.order = randomPosition;
   })
})();

cards.forEach(card => card.addEventListener('click', hiddenCard));

