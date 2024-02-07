const exitButton = document.getElementById('exitButton');

exitButton.addEventListener('click', () => {
    const confirmExit = window.confirm("Are you sure you want to exit? Your score will not be recorded.");

    if (confirmExit) {
        window.location.href = "/index.html";
    }
});

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Which era marked a switch from agricultural practices to industrial practices?',
        choice1: 'Revolutional',
        choice2: 'The Industrial Revolution',
        choice3: 'The Evolution',
        choice4: 'The Revolver',
        answer: 2,
    },
    {
        question: 'Where was Martin Luther King, Jr. born?',
        choice1: 'New York City',
        choice2: 'Toronto, Canada',
        choice3: 'Atlanta, Georgia',
        choice4: 'Los Angeles, California',
        answer: 3,
    },
    {
        question: 'What year was the Vietnam Veterans Memorial dedicated in Washington, D.C.?',
        choice1: '1982',
        choice2: '1990',
        choice3: '1998',
        choice4: '1972',
        answer: 1,
    },
    {
        question: 'Who was the first American to win a Noble Peace Prize?',
        choice1: 'Gem Raniel Llorente',
        choice2: 'Theodore Roosevelt',
        choice3: 'Abraham Lincoln',
        choice4: 'Jay Angelo',
        answer: 2,
    },
    {
        question: 'What year did the North American Free Trade Agreement (NAFTA) go into effect?',
        choice1: '2000',
        choice2: '1987',
        choice3: '1808',
        choice4: '1994',
        answer: 4,
    },
    {
        question: 'When did the construction of the Great Wall of China begin?',
        choice1: '400 BC',
        choice2: '7th century BC',
        choice3: '20th century CE',
        choice4: '19th century',
        answer: 2,
    },
    {
        question: 'What was the code name for the German invasion of the Soviet Union during World War II?',
        choice1: 'Oplan Tokhang',
        choice2: 'Operation Kalaboso',
        choice3: 'Operation Barbarossa',
        choice4: 'Operation Peanut Butter',
        answer: 3,
    },
    {
        question: 'What was the name of the international group formed to maintain world peace after World War I?',
        choice1: 'The League of Nations',
        choice2: 'The League of Villains',
        choice3: 'League of Legends',
        choice4: 'League of War',
        answer: 1,
    },
    {
        question: 'In which country was the Battle of Culloden fought in 1746?',
        choice1: 'Scotland',
        choice2: 'Liliw',
        choice3: 'Ireland',
        choice4: 'France',
        answer: 1,
    },
    {
        question: 'Who is commonly referred to as the person who created the first printing press?',
        choice1: 'Keneth Baynas',
        choice2: 'Tarik Celik',
        choice3: 'Johannes Gutenberg',
        choice4: 'Neil De Guzman',
        answer: 3,
    },
    {
        question: 'Who fought in the Hundred Years’ War?',
        choice1: 'China and United States',
        choice2: 'Britain and France',
        choice3: 'Vietnam',
        choice4: 'Russia',
        answer: 2,
    },
    {
        question: 'Who won the 2008 U.S. Presidential election?',
        choice1: 'Donald Trumpt',
        choice2: 'Joe Biden',
        choice3: 'John Daved Aquino',
        choice4: 'Barack Obama',
        answer: 4,
    },
    {
        question: 'Who is the king of the Olympian gods in Greek mythology?',
        choice1: 'Zeus',
        choice2: 'Lapu-Lapu',
        choice3: 'Aquaman',
        choice4: 'Neptune',
        answer: 1,
    },
    {
        question: 'How many Celtic languages are still spoken today?',
        choice1: '20',
        choice2: '5',
        choice3: '6',
        choice4: '12',
        answer: 3,
    },
    {
        question: 'How old was Queen Elizabeth II when she was crowned the Queen of England??',
        choice1: '22',
        choice2: '27',
        choice3: '23',
        choice4: '25',
        answer: 2,
    },
    {
        question: 'What year was the first iPhone released?',
        choice1: '2000',
        choice2: '2013',
        choice3: '2005',
        choice4: '2007',
        answer: 4,
    },
    {
        question: 'What do the stripes on the American flag represent?',
        choice1: 'The 13 original colonies',
        choice2: 'The 3 Kings',
        choice3: 'The 7 Dwarfs',
        choice4: 'The Big 3',
        answer: 1,
    },
]

const SCORE_POINTS = 1;
const MAX_QUESTIONS = 17;

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

const incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        // Store reviewData in localStorage
        localStorage.setItem('reviewData', JSON.stringify(reviewData));

        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice, index) => {
        choice.innerText = currentQuestion['choice' + (index + 1)];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};

const correctSound = new Audio('/sound/correct.mp3');
const wrongSound = new Audio('/sound/wrong.mp3');
const feedbackElement = document.getElementById('feedback-container');

let reviewData = []; // This array will store user answers and correct answers

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let isCorrect = selectedAnswer == currentQuestion.answer;

        // Store data for review
        reviewData.push({
            question: currentQuestion.question,
            userAnswer: selectedChoice.innerText, // or use selectedAnswer if you prefer the choice number
            correctAnswer: currentQuestion['choice' + currentQuestion.answer],
            isCorrect: isCorrect,
        });

        if (isCorrect) {
            incrementScore(SCORE_POINTS);
            feedbackElement.innerText = 'Correct!';
            correctSound.play(); // Play correct sound
        } else {
            feedbackElement.innerText = 'Wrong!';
            wrongSound.play(); // Play wrong sound
        }

        selectedChoice.parentElement.classList.add(isCorrect ? 'correct' : 'incorrect');

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove('correct', 'incorrect');
            feedbackElement.innerText = '';
            getNewQuestion();
        },);
    });
});

startGame();

localStorage.setItem('reviewData', JSON.stringify(reviewData));
