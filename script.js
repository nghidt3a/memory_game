const cardsArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
const gameBoard = document.getElementById("gameBoard");
const timerDisplay = document.getElementById("timer");

let cards = [...cardsArray, ...cardsArray]; // 20 thẻ
let flippedCards = [];
let matchedCount = 0;
let timeLeft = 60;
let timer;
let hasStarted = false; // ✅ biến để kiểm tra đã bắt đầu chưa

// Shuffle cards
cards.sort(() => 0.5 - Math.random());

// Create cards
cards.forEach(letter => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.letter = letter;
  card.innerText = "";
  card.addEventListener("click", handleCardClick);
  gameBoard.appendChild(card);
});

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `⏱️ Thời gian còn lại: ${timeLeft} giây`;

    if (timeLeft === 0) {
      clearInterval(timer);
      timerDisplay.textContent = "⏰ Hết giờ! Bạn đã thua 😢";
      disableAllCards();
    }
  }, 1000);
}

function handleCardClick(e) {
  const card = e.target;

  if (
    card.classList.contains("flipped") ||
    card.classList.contains("matched") ||
    flippedCards.length === 2
  ) return;

  // ✅ Bắt đầu đếm giờ khi lật thẻ đầu tiên
  if (!hasStarted) {
    hasStarted = true;
    startTimer();
  }

  card.classList.add("flipped");
  card.innerText = card.dataset.letter;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.letter === card2.dataset.letter) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCount += 2;

    if (matchedCount === cards.length) {
      clearInterval(timer);
      setTimeout(() => {
        alert("🎉 Chúc mừng! Bạn đã hoàn thành trò chơi.");
        location.reload();
      }, 300);
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1.innerText = "";
    card2.innerText = "";
  }
  flippedCards = [];
}

function disableAllCards() {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach(card => {
    card.removeEventListener("click", handleCardClick);
  });
}
