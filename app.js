/* global $ */

const QUESTIONS  = [
    {
        questionName: "What is a full house?",
        answer1: {
            text: "Owning all the cards.", correct: false
        },
        answer2: {
            text: "Having two pairs.", correct: false
            
        },
        answer3: {
            text: "Having 3 of a kind & a pair.", correct: true
        },
        answer4: {
            text: "5 of a kind.", correct: false
        },
    },
    {
        questionName: "What is a flush?",
        answer1: {
            text: "After you use the bathroom.", correct: false
        },
        answer2: {
            text: "Having 5 of the same suit.", correct: true
            
        },
        answer3: {
            text: "Having 5 in a row.", correct: false
        },
        answer4: {
            text: "1 of each suit.", correct: false
        },
    },
    {
        questionName: "What is a straight?",
        answer1: {
            text: "Walking in a straight line.", correct: false
        },
        answer2: {
            text: "Having 5 of the same suit.", correct: false
            
        },
        answer3: {
            text: "Having 5 in a row.", correct: true
        },
        answer4: {
            text: "2 of each suit.", correct: false
        },
    },
    {
        questionName: "What is a straight flush?",
        answer1: {
            text: "Walking in a straight line to the bathroom.", correct: false
        },
        answer2: {
            text: "Having 5 of the same suit.", correct: false
            
        },
        answer3: {
            text: "Having 5 in a row.", correct: false
        },
        answer4: {
            text: "Having 5 in a row of the same suit.", correct: true
        },
    },
    {
        questionName: "What is a royal flush?",
        answer1: {
            text: "Great bathroom visit.", correct: false
        },
        answer2: {
            text: "Having 5 of the same broadway suit.", correct: true
            
        },
        answer3: {
            text: "Having 5 in a row.", correct: false
        },
        answer4: {
            text: "1 of each suit.", correct: false
        },
    },
    {
        questionName: "What is a set?",
        answer1: {
            text: "A pair.", correct: false
        },
        answer2: {
            text: "Hitting three of a kind with a pocket pair.", correct: true
            
        },
        answer3: {
            text: "Hitting trips with two on the board.", correct: false
        },
        answer4: {
            text: "5 of the same suit.", correct: false
        },
    },
    {
        questionName: "What should you do with KK UTG?",
        answer1: {
            text: "Raise", correct: true
        },
        answer2: {
            text: "Fold", correct: false
            
        },
        answer3: {
            text: "Call", correct: false
        },
        answer4: {
            text: "Cheer", correct: false
        },
    },
    {
        questionName: "What should you raise on the button when first in?",
        answer1: {
            text: "JJ+ only.", correct: false
        },
        answer2: {
            text: "Everything.", correct: true
            
        },
        answer3: {
            text: "Suited connectors only.", correct: false
        },
        answer4: {
            text: "Pocket pairs only.", correct: false
        },
    },
    {
        questionName: "How should you play 55 in MP against a 3bet?",
        answer1: {
            text: "Call", correct: false
        },
        answer2: {
            text: "4bet.", correct: false
            
        },
        answer3: {
            text: "Cry", correct: false
        },
        answer4: {
            text: "Fold", correct: true
        },
    },
    {
        questionName: "How should you play suited connectors in LP against a single open?",
        answer1: {
            text: "Flat to see a flop cheaply.", correct: false
        },
        answer2: {
            text: "Semi-bluff raise to maximize your equity .", correct: true
            
        },
        answer3: {
            text: "Fold.", correct: false
        },
        answer4: {
            text: "Shove all in.", correct: false
        },
    },
];

const appState = {
    globals: { 
        howManyCorrect: 0,
        questionIndex: 0,
    },
    state: {},
};

const changeState = () => {
    appState.state = QUESTIONS[appState.globals.questionIndex];
};

const getCorrectAnswer = () => {
    for (let i in appState.state) {
        if (appState.state[i].correct === true) {
            return appState.state[i].text;
        }
    }
};

const emptyContainer = () => {
    $('.container').empty();
};

const addQuestion = (question) => {
    $('.container').replaceWith(`
        <div class="container">
            <h1 class="question-header">${question.questionName}</h1>
            <form id="myForm">
                <input type="radio" name="question-item" value="${question.answer1.correct}"> ${question.answer1.text}<br>
                <input type="radio" name="question-item" value="${question.answer2.correct}"> ${question.answer2.text}</input><br>
                <input type="radio" name="question-item" value="${question.answer3.correct}"> ${question.answer3.text}<br>
                <input type="radio" name="question-item" value="${question.answer4.correct}"> ${question.answer4.text}<br>
                <button type="submit">Submit</button>
            </form>
            <footer>
                <p class="align-left">Question: ${appState.globals.questionIndex}/10 </p> 
                <p class="align-right">Correct: ${appState.globals.howManyCorrect}/10 </p> 
            </footer>
        </div>
    `);
};

const isSubmitCorrect = (submit, answer) => {
    if (submit === "true") {
        alert("Correct!");
        appState.globals.howManyCorrect++;
    } else {
        alert(`Incorrect. It's actually: ${answer}`);
    }
};

const renderNextQuestion = () => {
    if (appState.globals.questionIndex < 10) {
        emptyContainer();
        changeState();
        appState.globals.questionIndex++;
        addQuestion(appState.state);
    } else {
        renderLastPage();
    }
};

const renderLastPage = () => {
    emptyContainer();
    $('.container').replaceWith(`
        <div class="container">
            <h1 class="finished-header">Congratulations you've finished!</h1>
            <div class="score">
                <p> Your final score is ${appState.globals.howManyCorrect} out of 10. </p>
            </div>
            <button id="start-over">Try again?</button>
        </div>
    `);
};

$('body').on('submit', '#myForm', (event) => {
    event.preventDefault();
    isSubmitCorrect($('input[name=question-item]:checked', '#myForm').val(), getCorrectAnswer());
    renderNextQuestion();
});

$('body').on('click', '#start-over', (event) => {
    appState.state = {};
    emptyContainer();
    $('.container').replaceWith(`
        <div class="container">
            <h1 class="start_header">Welcome to the Quiz App</h1>    
            <p class="start_text">Click below to get started</p>
            <button id="start">Start</button>
        </div>
    `);
});

$('body').on('click', '#start', (event) => {
    emptyContainer();
    changeState();
    appState.globals.questionIndex++;
    addQuestion(appState.state);
});