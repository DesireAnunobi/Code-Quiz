document.addEventListener('DOMContentLoaded', function () {
    var startBtn = document.getElementById('start-btn');
    var quizContainer = document.getElementById('quiz');
    var questionContainer = document.getElementById('question-container');
    var optionsContainer = document.getElementById('options-container');
    var feedbackContainer = document.getElementById('feedback-container');
    var timerContainer = document.getElementById('timer-container');
    var timerSpan = document.getElementById('timer');
    var endScreen = document.getElementById('end-screen');
    var finalScoreSpan = document.getElementById('final-score');
    var initialsInput = document.getElementById('initials');
    var submitScoreBtn = document.getElementById('submit-score');
  
    var currentQuestionIndex = 0;
    var timeLeft = 60;
    var score = 0;
    var timerInterval;

  // Questions section
    var questions = [
      {
        question: 'What is JavaScript?',
        options: ['A programming language', 'A type of coffee', 'A computer brand'],
        correctIndex: 0
      },
      {
        question: 'Which keyword is used to declare a variable in JavaScript?',
        options: ['let', 'variable', 'var', 'int'],
        correctIndex: 2
      },
      {
        question: 'What tag is used to define an item in a unordered list?',
        options: ['<li>', '<u>', '<ol>', '<ul>'],
        correctIndex: 3
      },
      {
        question: 'What does CSS stand for?',
        options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets '],
        correctIndex: 1
      },
      {
        question: 'Inside which HTML element do we put the JavaScript?',
        options: ['<tag>', '<script>', '<a> '],
        correctIndex: 1
      },
      
    ];
  
    function startQuiz() {
      startBtn.style.display = 'none';
      quizContainer.classList.remove('hide');
      showQuestion();
      startTimer();
    }
  
    function showQuestion() {
      var currentQuestion = questions[currentQuestionIndex];
      questionContainer.textContent = currentQuestion.question;
  
      optionsContainer.innerHTML = '';
      for (var i = 0; i < currentQuestion.options.length; i++) {
        var optionBtn = document.createElement('button');
        optionBtn.textContent = currentQuestion.options[i];
        optionBtn.addEventListener('click', checkAnswer);
        optionsContainer.appendChild(optionBtn);
      }
    }
  
    function checkAnswer(event) {
      var selectedOption = event.target;
      var currentQuestion = questions[currentQuestionIndex];
  
      if (currentQuestion.correctIndex === Array.from(optionsContainer.children).indexOf(selectedOption)) {
        feedbackContainer.textContent = 'Correct!';
        score++;
      } else {
        feedbackContainer.textContent = 'Wrong!';
        timeLeft -= 10; // Subtract 10 seconds for incorrect answer
      }
  
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        endQuiz();
      }
    }
  
    function startTimer() {
      timerInterval = setInterval(function () {
        timeLeft--;
        timerSpan.textContent = timeLeft;
  
        if (timeLeft <= 0) {
          endQuiz();
        }
      }, 1000);
    }
  
    function endQuiz() {
      clearInterval(timerInterval);
      quizContainer.classList.add('hide');
      endScreen.classList.remove('hide');
      finalScoreSpan.textContent = score;
    }
  
    submitScoreBtn.addEventListener('click', function () {
      var initials = initialsInput.value.toUpperCase();
      // Save the score and initials to local storage or send them to a server
      // For simplicity, just displaying them in console here
      console.log('Initials:', initials, 'Score:', score);
    });
  
    startBtn.addEventListener('click', startQuiz);
  });
  