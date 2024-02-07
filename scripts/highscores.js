const highScoreList = document.querySelector('#highScoreList');
const resetLeaderboardBtn = document.querySelector('#resetLeaderboard');
const MAX_HIGH_SCORES = 18;

resetLeaderboardBtn.addEventListener('click', confirmReset);

function confirmReset() {
    const confirmation = window.confirm("Are you sure you want to reset the leaderboard?");
    if (confirmation) {
        resetLeaderboard();
    }
}

function resetLeaderboard() {
    localStorage.removeItem('highScores');
    const highScores = [];
    highScoreList.innerHTML = '';
}

const deleteRecord = (name) => {
    const confirmation = window.confirm(`Delete the record for ${name}?`);
    if (confirmation) {
        const updatedHighScores = JSON.parse(localStorage.getItem('highScores')) || [];
        const indexToRemove = updatedHighScores.findIndex(score => score.name === name);
        if (indexToRemove !== -1) {
            updatedHighScores.splice(indexToRemove, 1);
            localStorage.setItem('highScores', JSON.stringify(updatedHighScores));
            loadHighScores();
        }
    }
};


const loadHighScores = () => {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    highScores.sort((a, b) => b.score - a.score);

    highScoreList.innerHTML = highScores.map((score, index) => {
        const timestamp = new Date(score.timestamp);
        const date = timestamp.toLocaleDateString();
        const time = timestamp.toLocaleTimeString();

        const position = index + 1;

        return `<li class="high-score">
                    <span>${position}</span>
                    <span>${score.name}</span>
                    <span>${score.score}</span>
                    <span>${score.remarks}</span>
                    <button class="delete-button" onclick="deleteRecord('${score.name}')">&#128465;</button>
                </li>`;
    }).join('');
};

loadHighScores();
