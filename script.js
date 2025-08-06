const subjects = {
    science: [
      {
        question: "What planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: 1
      },
      {
        question: "What gas do plants absorb from the atmosphere?",
        choices: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
        answer: 2
      },
      {
        question: "What is the chemical symbol for water?",
        choices: ["H2O", "O2", "CO2", "NaCl"],
        answer: 0
      }
    ],
    math: [
      {
        question: "What is 12 x 12?",
        choices: ["124", "144", "134", "154"],
        answer: 1
      },
      {
        question: "What is the square root of 81?",
        choices: ["7", "8", "9", "10"],
        answer: 2
      },
      {
        question: "What is the value of π (pi) up to two decimals?",
        choices: ["3.14", "3.15", "3.13", "3.16"],
        answer: 0
      }
    ],
    computer: [
      {
        question: "What does CPU stand for?",
        choices: [
          "Central Processing Unit",
          "Computer Personal Unit",
          "Central Power Unit",
          "Computer Processing User"
        ],
        answer: 0
      },
      {
        question: "What language is primarily used for web development?",
        choices: ["Python", "C++", "JavaScript", "Java"],
        answer: 2
      },
      {
        question: "What does RAM stand for?",
        choices: [
          "Random Access Memory",
          "Read Access Memory",
          "Run Active Memory",
          "Random Active Module"
        ],
        answer: 0
      }
    ],
    design: [
      {
        question: "Which principle focuses on the balance of visual weight in design?",
        choices: ["Contrast", "Alignment", "Balance", "Proximity"],
        answer: 2
      },
      {
        question: "What color model is used for digital screens?",
        choices: ["CMYK", "RGB", "Pantone", "HSB"],
        answer: 1
      },
      {
        question: "What does UX stand for?",
        choices: ["User Experience", "Universal Xerox", "Unique X-factor", "User Extension"],
        answer: 0
      }
    ],
    history: [
      {
        question: "Who was the first President of the United States?",
        choices: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "Benjamin Franklin"],
        answer: 2
      },
      {
        question: "In which year did World War II end?",
        choices: ["1945", "1939", "1918", "1963"],
        answer: 0
      },
      {
        question: "The Great Wall of China was primarily built to protect against which group?",
        choices: ["Mongols", "Romans", "Vikings", "Ottomans"],
        answer: 0
      }
    ],
    geography: [
      {
        question: "What is the largest continent by land area?",
        choices: ["Africa", "Asia", "Europe", "Antarctica"],
        answer: 1
      },
      {
        question: "Which country has the longest coastline?",
        choices: ["Canada", "Australia", "Russia", "United States"],
        answer: 0
      },
      {
        question: "What is the capital of Japan?",
        choices: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
        answer: 0
      }
    ]
  };
  
  
  let currentSubject = null;
  let currentQuestionIndex = 0;
  let score = 0;
  let userAnswers = [];
  
  const subjectBtns = document.querySelectorAll('.subject-btn');
  const subjectSelection = document.getElementById('subject-selection');
  const quizContainer = document.getElementById('quiz-container');
  const questionText = document.getElementById('question-text');
  const choicesDiv = document.getElementById('choices');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const resultDiv = document.getElementById('result');
  const scoreContainer = document.getElementById('score-container');
  const scoreSpan = document.getElementById('score');
  const totalQuestionsSpan = document.getElementById('total-questions');
  const restartBtn = document.getElementById('restart-btn');
  const progressBar = document.getElementById('progress-bar');
  const questionCount = document.getElementById('question-count');
  
  subjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentSubject = btn.dataset.subject;
      startQuiz();
    });
  });
  
  function startQuiz() {
    subjectSelection.classList.add('d-none');
    quizContainer.classList.remove('d-none');
    scoreContainer.classList.add('d-none');
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = new Array(subjects[currentSubject].length).fill(null);
    updateProgress();
    loadQuestion();
    updateButtons();
    resultDiv.textContent = '';
  }
  
  function loadQuestion() {
    const questionObj = subjects[currentSubject][currentQuestionIndex];
    questionText.textContent = questionObj.question;
    questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${subjects[currentSubject].length}`;
    choicesDiv.innerHTML = '';
  
    questionObj.choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.classList.add('btn', 'btn-outline-primary');
      btn.textContent = choice;
      btn.disabled = false;
      btn.setAttribute('aria-label', choice);
  
      // Add icon placeholder span for feedback
      const iconSpan = document.createElement('span');
      iconSpan.classList.add('ms-auto', 'fs-4');
      btn.appendChild(iconSpan);
  
      // Show feedback if answered
      if (userAnswers[currentQuestionIndex] !== null) {
        btn.disabled = true;
        if (index === questionObj.answer) {
          btn.classList.add('correct');
          iconSpan.innerHTML = '<i class="fas fa-check-circle"></i>';
        }
        if (index === userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex] !== questionObj.answer) {
          btn.classList.add('wrong');
          iconSpan.innerHTML = '<i class="fas fa-times-circle"></i>';
        }
      }
  
      btn.addEventListener('click', () => {
        if (userAnswers[currentQuestionIndex] === null) {
          userAnswers[currentQuestionIndex] = index;
          if (index === questionObj.answer) {
            score++;
            resultDiv.textContent = "Correct! 🎉";
            resultDiv.style.color = "#198754";
          } else {
            resultDiv.textContent = `Wrong! Correct answer: ${questionObj.choices[questionObj.answer]}`;
            resultDiv.style.color = "#dc3545";
          }
          loadQuestion(); // reload to update buttons and feedback
          updateProgress();
        }
      });
  
      choicesDiv.appendChild(btn);
    });
  
    updateButtons();
  }
  
  function updateButtons() {
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.textContent = currentQuestionIndex === subjects[currentSubject].length - 1 ? 'Finish' : 'Next';
  }
  
  function updateProgress() {
    const total = subjects[currentSubject].length;
    const progressPercent = ((currentQuestionIndex + (userAnswers[currentQuestionIndex] !== null ? 1 : 0)) / total) * 100;
    progressBar.style.width = progressPercent + '%';
    progressBar.setAttribute('aria-valuenow', progressPercent);
  }
  
  prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      resultDiv.textContent = '';
      loadQuestion();
      updateProgress();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < subjects[currentSubject].length - 1) {
      currentQuestionIndex++;
      resultDiv.textContent = '';
      loadQuestion();
      updateProgress();
    } else {
      showScore();
    }
  });
  
  restartBtn.addEventListener('click', () => {
    subjectSelection.classList.remove('d-none');
    quizContainer.classList.add('d-none');
    scoreContainer.classList.add('d-none');
    resultDiv.textContent = '';
  });
  
  function showScore() {
    quizContainer.classList.add('d-none');
    scoreContainer.classList.remove('d-none');
    scoreSpan.textContent = `${score} / ${subjects[currentSubject].length}`;
    totalQuestionsSpan.textContent = `Total Questions: ${subjects[currentSubject].length}`;
    const percentage = (score / subjects[currentSubject].length) * 100;
  
    let message = "";
    if (percentage === 100) {
      message = "Perfect score! You're a genius! 🌟";
    } else if (percentage >= 75) {
      message = "Great job! You really know your stuff! 👍";
    } else if (percentage >= 50) {
      message = "Good effort! Keep practicing! 💪";
    } else {
      message = "Don't worry, try again and you'll get better! 😊";
    }
    document.getElementById('final-message').textContent = message;
  }
  