const cards = document.querySelectorAll('.card');

let hasFlipedCard = false;
let firstCard, secondCard;

function hiddenCard(){
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
   }  
}

cards.forEach(card => card.addEventListener('click', hiddenCard));

