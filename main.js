import {words} from './words.js';

const textContentElement = document.getElementById('text-content');
const inputFieldElement = document.getElementById('input-field');
const restartButtonElement = document.getElementById('restart');
const timerElement = document.getElementById('timer');

let numberOfWords = 10;
let completed = false;
let timerHasStarted = false;
let time;
let timer;

const resetTimer = () => time = 0;

const updateTimer = () => {
    time++;
    timerElement.innerText = time;
}

const startTimer = () => {
    timerElement.innerText = 0;
}

const generateText = () => {
    let textToType = '';
    
    for(let i = 0; i < numberOfWords; i++) {
        textToType += (words[Math.floor(Math.random() * words.length)] + ' ');
    }
    textToType = textToType.slice(0, -1);
    
    textToType.split('').forEach(word => {
        const wordSpan = document.createElement('span');
        wordSpan.innerText = word;
        textContentElement.appendChild(wordSpan);
    });

    inputFieldElement.value = null;
    startTimer();
    return textToType;
}
generateText();

inputFieldElement.addEventListener('input', () => {
    const textArray = textContentElement.querySelectorAll('span');
    const inputArray = inputFieldElement.value.split('');

    if(inputArray[0] != '' && !completed && !timerHasStarted) {
        resetTimer();
        startTimer();
        timer = setInterval(updateTimer, 1000);
        timerHasStarted = true;
    }

    if (!completed) {
        textArray.forEach((characterSpan, index) => {
            const character = inputArray[index];
            
            if (character == null) {
                characterSpan.classList.remove('correct');
                characterSpan.classList.remove('incorrect');
            }
            else if (character === characterSpan.innerText) {
                characterSpan.classList.add('correct');
                characterSpan.classList.remove('incorrect');
            }
            else {
                characterSpan.classList.add('incorrect');
                characterSpan.classList.remove('correct');
            }
        })
    }

    if (inputArray.length == textArray.length) {
        completed = true;
        clearInterval(timer);
    }
})

restartButtonElement.addEventListener('click', () => {
    inputFieldElement.value = '';
    textContentElement.innerHTML = '';
    completed = false;
    timerHasStarted = false;
    generateText();
    inputFieldElement.focus();
});

textContentElement.addEventListener('click', () => inputFieldElement.focus());

//prevent the user from highlighting or pasting text into the input field
inputFieldElement.onpaste = (e) => {
    e.preventDefault();
    return false;
}
inputFieldElement.addEventListener('select', function() {
    this.selectionStart = this.selectionEnd;
  }, false);