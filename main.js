import {words} from './words.js';

const textContentElement = document.getElementById('text-content');
const inputFieldElement = document.getElementById('input-field');

const generateText = () => {
    let textToType = '';
    
    for(let i = 0; i < 50; i++) {
        textToType += (words[Math.floor(Math.random() * 1000)] + ' ');
    }
    textToType = textToType.slice(0, -1);
    
    textToType.split('').forEach(word => {
        const wordSpan = document.createElement('span');
        wordSpan.innerText = word;
        textContentElement.appendChild(wordSpan);
    });

    inputFieldElement.value = null;
    return textToType;
}

inputFieldElement.addEventListener('input', () => {
    const textArray = textContentElement.querySelectorAll('span');
    const inputArray = inputFieldElement.value.split('');

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
})


generateText();