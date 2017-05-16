/* global $ */
// state
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
    howManyCorrect: 0,
    questionIndex: 0,
    container: null,
    currentQuestion: {},
    isAnsweredState: {
        isAnswered: false,
        givenAnswer: null,
    }
};

//layouts
const questionLayout = (question) => { 
    return (`
        <div class="container">
            <h1 class="question-header">${question.questionName}</h1>
            <form id="myForm">
                <input type="radio" name="question-item" value="${question.answer1.correct}"> ${question.answer1.text}<br>
                <input type="radio" name="question-item" value="${question.answer2.correct}"> ${question.answer2.text}<br>
                <input type="radio" name="question-item" value="${question.answer3.correct}"> ${question.answer3.text}<br>
                <input type="radio" name="question-item" value="${question.answer4.correct}"> ${question.answer4.text}<br>
                <button type="submit">Submit</button>
            </form>
            <footer>
                <p class="align-left">Question: ${appState.questionIndex}/10 </p> 
                <p class="align-right">Correct: ${appState.howManyCorrect}/10 </p> 
            </footer>
        </div>
    `);
};
const startLayout = () => {
    return (`
        <div class="container">
            <h1 class="start_header">Welcome to the Quiz App</h1>    
            <p class="start_text">Click below to get started</p>
            <button id="start">Start</button>
        </div>
    `);
};
const endLayout = () => {
    return (`
        <div class="container">
            <h1 class="finished-header">Congratulations you've finished!</h1>
            <div class="score">
                <p> Your final score is ${appState.howManyCorrect} out of 10. </p>
            </div>
            <button id="start-over">Try again?</button>
        </div>
    `);
};

// rendering

const render = () => {
    if (appState.container === null) { // first load
        changeContainer(startLayout());
    }
        
    if (appState.isAnsweredState.isAnswered === true) {
        isSubmitCorrect($('input[name=question-item]:checked', '#myForm').val(), appState.isAnsweredState.givenAnswer);
        nextQuestion();
        
        if (appState.questionIndex === 10) { // on last question
            appState.isAnsweredState = {
                isAnswered: false,
                givenAnswer: null,
            };
            changeContainer(endLayout());
            $('.container').replaceWith(appState.container); return;
        }
        
        changeContainer(questionLayout(QUESTIONS[appState.questionIndex]));
        render();
    }
    
    $('.container').replaceWith(appState.container);
    
};

// changing state
const changeContainer = (container) => {
    appState.container = container;
};

const changeQuestion = (question) => {
    appState.currentQuestion = question;
};

const isAnswered = (userAnswer) => {
    appState.isAnsweredState.isAnswered = true;
    appState.isAnsweredState.givenAnswer = userAnswer;
};

const increaseScore = () => {
    appState.howManyCorrect++;
};

const nextQuestion = () => {
    appState.questionIndex++;
    appState.isAnsweredState = {
        isAnswered: false,
        givenAnswer: null,
    };
};

// application logic

const isSubmitCorrect = (submit, answer) => {
    if (submit === "true") {
        alert("Correct!");
        increaseScore();
    } else {
        alert(`Incorrect. It's actually: ${answer}`);
    }
};

const getCorrectAnswer = () => {
    for (let i in appState.currentQuestion) {
        if (appState.currentQuestion[i].correct === true) {
            return appState.currentQuestion[i].text;
        }
    }
};

// event handlers

$('body').on('click', '#start', (event) => {
    changeQuestion(QUESTIONS[appState.questionIndex]);
    changeContainer(questionLayout(appState.currentQuestion));
    render();
});

$('body').on('submit', '#myForm', (event) => {
    event.preventDefault();
    isAnswered(getCorrectAnswer());
    render();
});

$('body').on('click', '#start-over', (event) => {
    changeContainer(null);
    changeQuestion({});
    nextQuestion();
    appState.questionIndex = 0, appState.howManyCorrect = 0;
    render();
});

$(document).ready((event) =>{
    render();
});
