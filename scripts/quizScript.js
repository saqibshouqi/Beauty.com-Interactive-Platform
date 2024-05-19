const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    // Toggle the class to show/hide the menu links
    navLinks.classList.toggle('active');
});

//--------------------------------------------------------------------------------------------------------------------------------


//Question Array
const questions = [
    {
        question: "What is the main purpose of moisturizer?",
        answers: [
            {text: "Cleanse the skin", correct: false},
            {text: "Hydrate the skin", correct: true},
            {text: "Exfoliate the skin", correct: false},
        ]
    },
    {
        question: "Which vitamin is commonly known as the \"Beauty Vitamin\" for its skin benefits?",
        answers: [
            {text: "Vitamin A", correct: false},
            {text: "Vitamin B", correct: false},
            {text: "Vitamin C", correct: true},
        ]
    },
    {
        question: "What type of product is typically used to remove makeup?",
        answers: [
            {text: "Toner", correct: false},
            {text: "Serum", correct: false},
            {text: "Cleanser", correct: true},
        ]
    },
    {
        question: "Which skincare step comes after cleansing?",
        answers: [
            {text: "Exfoliating", correct: false},
            {text: "Toning", correct: true},
            {text: "Moisturizing", correct: false},
        ]
    },
    {
        question: "Which type of makeup brush is typically used for applying foundation?",
        answers: [
            {text: "Foundation brush", correct: true},
            {text: "Angled brush", correct: false},
            {text: "Kabuki brush", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 5;


//Function to start quiz
function startQuiz(){
    currentQuestionIndex = 0;
    score = 5;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Function to show questions
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        //
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

// When click the next button come to reset state
function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// To check whether selected answer is correct
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    const buttons = Array.from(answerButtons.children);
    selectedBtn.classList.add("selected");
    if(isCorrect){
        score = score + 2;
    }else{
        selectedBtn.innerHTML += " ✖";
        score = score - 1;
    }
    // Find the correct answer button and add a tick mark
    const correctBtn = buttons.find(button => button.dataset.correct === "true");
    if (correctBtn) correctBtn.innerHTML += " ✔";

// Disable all buttons
buttons.forEach(button => {
    button.disabled = true;
    if (!button.innerHTML.includes(" ✔") && !button.innerHTML.includes(" ✖")) {
        // Add a cross mark to the wrong answer buttons
        button.innerHTML += " ✖";
    }
});

nextButton.style.display = "block";
}


// Function to store score
function showScore(){
    resetState();
    if(score > 0) {
        questionElement.innerHTML = `You have earned ${score} points, please claim the points in your next purchase 💄✨`;
    }else {
        questionElement.innerHTML = 'Looks like you didn\'t score any points. No worries!.Keep exploring Beauty.com for more chances!💄✨';
    }
    nextButton.innerHTML ="Earn Points";
    nextButton.style.display = "block";
}


// Function to handle next button
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

// Function to show the "Shop Now" button after the quiz
// Function to show the "Shop Now" button after clicking "Earn Points"
function showShopNowButton() {
    const shopNowButton = document.getElementById("shop-now-btn");
    shopNowButton.style.display = "block";
    // Add event listener to the "Shop Now" button
    shopNowButton.addEventListener("click", function() {
        // Replace "shop-url" with your actual shopping page URL
        location.href = "Products.html";
    });
}

// Function that use a prompt box
function rateWebsite() {
    let rating = prompt("Rate the Beauty.com from 1 to 5:");

    // Validate the input
    if (rating === null) {
        return;
    }

    rating = parseInt(rating);

    // Check if the input is a number and within the valid range
    if (isNaN(rating) || rating < 1 || rating > 5) {
        alert("Invalid input. Please enter a number between 1 and 5.");
        rateWebsite(); // Prompt again
        return;
    }

    // Display the rating
    alert("Thank you for rating Beauty.com");
}




// Add event listner
nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        let userPointsElement = document.getElementById("userPointsValue");
        let userPoints = parseInt(userPointsElement.textContent);
        userPoints = score;
        userPointsElement.textContent = userPoints;
        nextButton.style.display = "none";
        showShopNowButton();
        rateWebsite();

        // Store user point to get discount on product page
        localStorage.setItem('userPoints', userPoints);
    }
})

startQuiz();