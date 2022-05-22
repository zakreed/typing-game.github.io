import {words} from './words.js';

const settingsButtonElement = document.getElementById('icon-settings');
const settingsMenuElement = document.getElementById('settings-menu');
const settingsSaveAndCloseButton = document.getElementById('button-close-settings');
const settingsWordcoundElements = document.getElementsByClassName('wordcount-element');
const settingsThemeElements = document.getElementsByClassName('theme-element');

const parentDivElement = document.getElementById('parent-div');
const mainContentElement = document.getElementById('main-content')
const inputContainerElement = document.getElementById('input-container');
const textContainerElement = document.getElementById('text-container');
const inputFieldElement = document.getElementById('input-field');
const restartButtonElement = document.getElementById('restart');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');

let numberOfWords = 25;
let completed = false;
let testHasStarted = false;
let timerSeconds = 0;
let startTimeDate;
let timer;


const startTimer = () => {
    timerSeconds = 0;
    startTimeDate = new Date();
    timerElement.innerText = '000';
}
const updateTimer = () => {
    let date = new Date();
    timerSeconds = (date - startTimeDate) / 1000;
    timerElement.innerText = `${Math.floor(timerSeconds).toString().padStart(3, '0')}`;
}
const stopTimer = () => clearInterval(timer);

const startTest = () => {
    startTimer();
    timer = setInterval(updateTimer, 1);
}

const generateText = () => {
    let textToType = '';

    textContainerElement.innerText = '';
    
    for(let i = 0; i < numberOfWords; i++) {
        textToType += (words[Math.floor(Math.random() * words.length)] + ' ');
    }
    textToType = textToType.slice(0, -1);
    
    textToType.split('').forEach(word => {
        const wordSpan = document.createElement('span');
        wordSpan.innerText = word;
        textContainerElement.appendChild(wordSpan);
    });

    inputFieldElement.value = null;
    startTimer();
    return textToType;
}

inputFieldElement.addEventListener('input', () => {
    const textArray = textContainerElement.querySelectorAll('span');
    const inputArray = inputFieldElement.value.split('');

    if(inputArray[0] != '' && !completed && !testHasStarted) {
        startTest();
        testHasStarted = true;
    }

    if (!completed) {
        textArray.forEach((characterSpan, index) => {
            const character = inputArray[index];

            if (character == null) {
                characterSpan.className = '';
            }
            else if (character === characterSpan.innerText) {
                characterSpan.classList.add('correct');
            }
            else {
                characterSpan.classList.add('incorrect');
            }

            textArray[index].classList.remove('current');
            if (inputArray.length === index) {
                textArray[index].classList.add('current');
            }
        })
    }

    if (inputArray.length == textArray.length) {
        completed = true;
        stopTimer();
        wpmElement.innerText = `${calculateWPM()}`;
        accuracyElement.innerText = `${calculateAccuracy()}`;
    }
})

const numCorrectChars = () => {
    // function to calculate the number of correctly typed characters
    const wpmTextArray = textContainerElement.querySelectorAll('span');

    let correctCharacters = 0;
    wpmTextArray.forEach(element => {
        if (element.classList.contains('correct')) {
            correctCharacters++;
        }
    });
    return correctCharacters;
}

const calculateWPM = () => {
    const timeTaken = (timerSeconds / 60);
    const wordsPerMinute = numberOfWords / timeTaken;
    return `${Math.round(wordsPerMinute)} wpm`;
}

const calculateAccuracy = () => {
    const numCorrectLetters = numCorrectChars();
    const numLetters = textContainerElement.querySelectorAll('span').length;
    return `Accuracy: ${Math.round((numCorrectLetters / numLetters) * 100)}%`;
};

const restartGame = () => {
    inputFieldElement.value = '';
    wpmElement.innerText = '';
    accuracyElement.innerText = '';
    completed = false;
    testHasStarted = false;
    stopTimer();
    generateText();
}

restartButtonElement.addEventListener('click', () => {
    restartGame();
    inputFieldElement.focus();
});

settingsButtonElement.addEventListener('click', () => {
    settingsMenuElement.style.display = '';
    mainContentElement.style.filter = 'blur(2px)';
    inputFieldElement.blur()
})

settingsSaveAndCloseButton.addEventListener('click', () => {
    settingsMenuElement.style.display = 'none';
    mainContentElement.style.filter = '';
    inputFieldElement.focus();
})

Array.from(settingsWordcoundElements).forEach(wordcountElement => {
    wordcountElement.addEventListener('click', () => {
        Array.from(settingsWordcoundElements).forEach(wordcountElement => wordcountElement.classList.remove('wordcount-selected'));
        wordcountElement.classList.add('wordcount-selected');
        numberOfWords = wordcountElement.innerText;
        restartGame();
    })
})

Array.from(settingsThemeElements).forEach(themeElement => {
    themeElement.addEventListener('click', () => {
        Array.from(settingsThemeElements).forEach(themeElement => themeElement.classList.remove('theme-selected'));
        themeElement.classList.add('theme-selected');
        parentDivElement.className = themeElement.id;
    })
})

inputContainerElement.addEventListener('click', () => inputFieldElement.focus());


// prevent the user from highlighting or pasting text into the input field
inputFieldElement.onpaste = (e) => {
    e.preventDefault();
    return false;
}
inputFieldElement.addEventListener('select', function() {
    this.selectionStart = this.selectionEnd;
  }, false);

generateText();
settingsMenuElement.style.display = 'none';
