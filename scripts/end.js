const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScorebtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 17;
const TOTAL_QUESTIONS = 17; // Update this if the total number of questions changes

const calculateRemarks = (correctAnswers) => {
    const percentage = (correctAnswers / TOTAL_QUESTIONS) * 100;

    if (percentage >= 90) {
        return 'Excellent'; 
    } else if (percentage >= 70) {
        return 'Very Good';
    } else if (percentage >= 50) {
        return 'Fair';
    } else {
        return 'Failed';
    }
};

finalScore.innerText = `${mostRecentScore} - ${calculateRemarks(parseInt(mostRecentScore))}`;

username.addEventListener('input', () => {
    if (username.value.length > 4) {
        username.value = username.value.slice(0, 4);
    }

    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    e.preventDefault();

    const correctAnswers = parseInt(mostRecentScore);

    const remarks = calculateRemarks(correctAnswers);

    const scoreData = {
        score: correctAnswers,
        name: username.value,
        remarks: remarks
    };

    highScores.push(scoreData);

    highScores.sort((a, b) => {
        return b.score - a.score;
    });

    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};


const reviewButton = document.getElementById('reviewBtn');

reviewButton.addEventListener('click', () => {
    const reviewData = JSON.parse(localStorage.getItem('reviewData')) || [];

    if (reviewData.length > 0) {
        // Redirect to the review page
        window.location.href = '/review.html';
    } else {
        alert('You have not taken the quiz yet.');
    }
});