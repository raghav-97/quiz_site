const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const tryAgain = document.querySelector(".tryAgain-btn");
const goHome = document.querySelector(".goHome-btn");

startBtn.onclick = () => {
  popupInfo.classList.add("active");
  main.classList.add("active");
};

exitBtn.onclick = () => {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
};

continueBtn.onclick = () => {
  quizSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");

  showQuestions(0);
  questionCounter(1);
  headerScore();
};

tryAgain.onclick = () => {
  quizBox.classList.add("active");
  resultBox.classList.remove("active");

  questionCount = 0;
  questionNum = 1;
  userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNum);
  headerScore();
};

goHome.onclick = () => {
  quizSection.classList.remove("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");

  questionCount = 0;
  questionNum = 1;
  userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNum);
};

let questionCount = 0;
let questionNum = 1;
let userScore = 0;

const nextBtn = document.querySelector(".next-btn");

nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    showQuestions(questionCount);

    questionNum++;
    questionCounter(questionNum);
    nextBtn.classList.remove("active");
  } else {
    console.log(" Completed");
    showResultBox();
  }
};

const optionList = document.querySelector(".option-list");

// get question from option array
function showQuestions(i) {
  const questionText = document.querySelector(".question-text");
  questionText.textContent = `${questions[i].numb}. ${questions[i].question}`;

  let optionTag = `<div class="option"><span>${questions[i].options[0]}</span></div>
  <div class="option"><span>${questions[i].options[1]}</span></div>
  <div class="option"><span>${questions[i].options[2]}</span></div>
  <div class="option"><span>${questions[i].options[3]}</span></div>`;

  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute(`onclick`, `optSelected(this)`);
  }
}

function optSelected(ans) {
  let userAns = ans.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOpt = optionList.children.length;

  if (userAns == correctAnswer) {
    ans.classList.add("correct");
    userScore += 1;
    headerScore();
  } else {
    ans.classList.add("incorrect");

    for (let i = 0; i < allOpt; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }
  }

  for (let i = 0; i < allOpt; i++) {
    optionList.children[i].classList.add("disabled");
  }

  nextBtn.classList.add("active");
}

function questionCounter(i) {
  const questionTotal = document.querySelector(".question-total");
  questionTotal.textContent = `${i} of ${questions.length} Questions`;
}

function headerScore() {
  const scoreText = document.querySelector(".header-score");
  scoreText.textContent = `${userScore} / ${questions.length}`;
}

function showResultBox() {
  quizBox.classList.remove("active");
  resultBox.classList.add("active");

  const scoreText = document.querySelector(".score-text");
  scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

  const circularProgress = document.querySelector(".circular-progress");
  const progressValue = document.querySelector(".progress-value");
  let progressStartValue = -1;
  let progressEndValue = (userScore / questions.length) * 100;
  let speed = 20;

  let progress = setInterval(() => {
    progressStartValue++;

    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1 )0deg);`;

    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}
