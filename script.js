const intro = document.querySelector(".intro");
const introCharacs = document.getElementById("introCharacs");
const button = document.getElementById("button");
const cardSection = document.querySelector(".cardSection");

const losePopup = document.getElementById("losePopup");
const overlay = document.getElementById("overlay");

const crow = document.getElementById("crow");
const crowSpeech = document.getElementById("crowSpeech");

const mouseClick = document.getElementById("mouseClick");
const wrongSound = document.getElementById("wrongSound");
const slideSound = document.getElementById("sweepIn");
const die = document.getElementById("die");

let cardLoad = true;
let totalCards = 0;
let cardNum = 0;
let cardA = null;
let cardB = null;
let lockboard = false;

let timeLeft = 60;
const timer = document.getElementById("timer");
let interval; 

let matches = 0;

function startTimer(){
    interval = setInterval(()=>{
        timeLeft--;

        timer.textContent = "Time: "+ timeLeft + " sec";

        if(timeLeft <=0){
            clearInterval(interval);

           overlay.classList.add("show");
           
           losePopup.classList.add("show");

        }
    }, 1000);
}
    const gameDeck =
            [
                {
                    "id": "tanjiro",
                    "name": "Tanjiro",
                    "image": "images/tanjiro.jpg"
                },
                {
                    "id": "muichiro",
                    "name": "Muichiro",
                    "image": "images/muichiro.jpg"
                },
                {
                    "id": "obanai",
                    "name": "Obanai",
                    "image": "images/obanai.jpg"
                },
                {
                    "id": "tengen",
                    "name": "Tengen",
                    "image": "images/tengen.jpg"
                },
                {
                    "id": "sanemi",
                    "name": "Sanemi",
                    "image": "images/sanemi.jpg"
                },
                {
                    "id": "gyomei",
                    "name": "Gyomei",
                    "image": "images/gyomei.jpg"
                },
            ];
    
    const deck = gameDeck.flatMap(item=> [item, item]);


    function shuffle(array){
                for(let i= array.length - 1; i> 0; i--){
                    const j = Math.floor(Math.random()* (i+1));

                    let temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }

                totalCards = array.length;
                console.log("array length: "+ totalCards);
                return array;
    }

    shuffle(deck);
    console.log("deck shuffled: " + deck);

setTimeout(() => {
    slideSound.play();
    introCharacs.classList.add("show");
}, 300);

setTimeout(() => {
    intro.classList.add("showIntro");
}, 1000);

button.addEventListener("click", ()=>{
    mouseClick.play();

    intro.classList.remove("showIntro");
    introCharacs.classList.remove("show");

setTimeout(() => {
    cardSection.classList.add("showCard");
    timer.style.opacity = "1";
}, 1000);

deck.forEach((item, index)=> {
        console.log("creating: " + index +  item.id);
        const card = document.createElement("div");
        card.className = "card flip";

        const front = document.createElement("div");
        front.className = "front";
        const img = document.createElement("img");
        img.src = item.image;
        front.appendChild(img);
        card.appendChild(front);

        const back = document.createElement("div");
        back.className = "back";
        card.appendChild(back);


        cardSection.appendChild(card);
        card.classList.add("move");

            console.log("cardNum"+ cardNum);
            console.log("cardLoad: "+ cardLoad);

       
        card.addEventListener("click", ()=>{
            mouseClick.currentTime = 0;
            mouseClick.play();

            if (cardLoad) return;
            if(lockboard) return;

            card.classList.add("flip");
            card.id = item.id;


            if(cardA === null){
                cardA = card;
                console.log("cardA: "+ cardA.id);
                return;
            }
            cardB = card;
            console.log("cardB: "+ cardB.id);

            if(cardA.id === cardB.id){
                console.log("Match found");

                matches++;

                cardA.classList.add("matched");
                cardB.classList.add("matched");
               
                if(matches === gameDeck.length){

                    setTimeout(() => {
                        timer.textContent = 0;
                    clearInterval(interval);

                    overlay.classList.add("show");
                    winPopup.classList.add("show");
                    }, 1000);

                }
                
                cardA = null;
                cardB = null;
            }
            else{
                console.log("no match");

                lockboard = true;
                console.log("board locked");

               setTimeout(() => {
                cardA.classList.add("shake");
                cardB.classList.add("shake");

                wrongSound.currentTime = 0;
                wrongSound.play();


                crow.pause();
                   crow.currentTime = 0;
                   crow.play();

                   crowSpeech.textContent =
                       crowLines[Math.floor(Math.random() * crowLines.length)];

                   crowSpeech.classList.add("show");

                   setTimeout(() => {
                       crowSpeech.classList.remove("show");
                   }, 1000);

                   
                die.currentTime = 0;
                die.play();

               }, 800);

                setTimeout(() => {

                    cardA.classList.remove("shake");
                    cardB.classList.remove("shake");

                    cardA.classList.remove("flip");
                    cardB.classList.remove("flip");

                    cardA = null;
                    cardB = null;
                    lockboard= false;

                }, 2000);
            }
        })
    });

    const allCards = document.querySelectorAll(".card");

    setTimeout(() => {

            allCards.forEach(card=>{
                card.classList.remove("flip");
                cardLoad = false;
            })
            startTimer();
        }, 3000);

})

const crowLines = [

        "STUPID!",
        "IDIOT!",
        "LOSER!",
        "FOOL!",
        "PATHETIC!",
        "USE YOUR EYES!",
        "HASHIRA? REALLY?",
        "EMBARRASSING!",
        "CAW! CAW!",
        "TRY AGAIN!",
        "YOU CALL THAT MEMORY?",
        "EVEN ZENITSU COULD DO BETTER!",
        "ARE YOU EVEN TRYING?",
        "THINK, HUMAN!",
        "MY GRANDMA REMEMBERS BETTER!",
        "WHAT WAS THAT?!",
        "I'VE SEEN SLIMES SMARTER!",
        "UNBELIEVABLE!",
        "DISGRACEFUL!",
        "YOU MISSED AGAIN!"
    ];