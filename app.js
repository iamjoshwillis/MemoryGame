const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let clickedCards = 0;
let clickBlock = false;

const colorPool = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(colorPool);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
  console.log("you just clicked", e.target);

  if (clickBlock) return;
  if (e.target.classList.contains("flipped")) return;

  let flippedCard = e.target;
  flippedCard.style.backgroundColor = flippedCard.classList[0];

  if (!card1 || !card2) {
    flippedCard.classList.add("flipped");
    card1 = card1 || flippedCard;
    card2 = flippedCard === card1 ? null : flippedCard;

  }

  if (card1 && card2) {
    clickBlock = true;
    let crd1 = card1.className;
    let crd2 = card2.className;

    if (crd1 === crd2) {
      clickedCards += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      clickBlock = false;
    } else {
        setTimeout(function() {
          card1.style.backgroundColor = "";
          card2.style.backgroundColor = "";
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          card1 = null;
          card2 = null;
          clickBlock = false;
          }, 1000 );
        }
      }
      if (clickedCards === colorPool.length) alert("CONGRATULATIONS!");
  }

// when the DOM loads
createDivsForColors(shuffledColors);
