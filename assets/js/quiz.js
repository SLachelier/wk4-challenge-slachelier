let seconds = 60;
let timer;

function countdown() {
    if(seconds < 60) {
        document.getElementById("timer").innerHTML = seconds;
    }
    if(seconds > 0) {
        seconds--;
    } else {
        clearInterval(timer);
        alert("The time is up!");
    }
}

window.onload = function() {
    if(!timer) {
        timer = window.setInterval(function() {
            countdown();
        }, 1000);
    }
}

document.getElementById("timer").innerHTML="1:00";

const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {   //Question 1:
        question: 'Upon encountering empty statements, what does the Javascript Interpreter do?',
        choice1: 'Gives a warning',
        choice2: 'Ignores the statements',
        choice3: 'Throws an error',
        choice4: 'None of the above',
        answer: 1
    },
    {   //Question 2:
        question: 'Which of the following methods can be used to display data using Javascript?',
        choice1: 'console.log()',
        choice2: 'document.write()',
        choice3: 'window.alert()',
        choice4: 'All of the above',
        answer: 4
    },
    {   //Question 3:
        question: 'Which function is used to serialize an object into a JSON string in Javascript?',
        choice1: 'stringify()',
        choice2: 'convert()',
        choice3: 'parse()',
        choice4: 'None of the above',
        answer: 1
    },
    {   //Question 4:
        question: 'How to stop an interval timer in Javascript?',
        choice1: 'clearInterval',
        choice2: 'intervalOver',
        choice3: 'clearTimer',
        choice4: 'None of the above',
        answer: 1
    },
    {   //Question 5:
        question: 'Which of the following are not server-side Javascript objects?',
        choice1: 'Function',
        choice2: 'Date',
        choice3: 'FileUpload',
        choice4: 'All of the above',
        answer: 4
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startQuiz = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    } 

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementscore = num => {
    score += num
    scoreText.innerText = score
}

startQuiz()