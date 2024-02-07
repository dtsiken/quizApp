document.addEventListener('DOMContentLoaded', () => {
    const reviewContent = document.getElementById('review-content');
    const reviewData = JSON.parse(localStorage.getItem('reviewData')) || [];

    console.log(reviewData); // Log the data to the console for debugging

    reviewData.forEach(item => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `
            <p>Question: ${item.question}</p>
            <p>Your Answer: ${item.userAnswer}</p>
            <p>Correct Answer: ${item.correctAnswer}</p>
            <hr>
        `;
        reviewContent.appendChild(questionDiv);
    });
});

function closeReview() {
    window.close();
}
