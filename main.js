import {words} from './words.js';

//Get elements
const textContentElement = document.getElementById('text-content');
const inputFieldElement = document.getElementById('input-field');

const generateText = () => {
    let textToType = '';
    
    //generate random words and add them to textToType
    for(let i = 0; i < 50; i++) {
        textToType += (words[Math.floor(Math.random() * words.length)] + ' ');
    }
    textToType = textToType.slice(0, -1);
    
    //Create html span elements for each character in textToType
    textToType.split('').forEach(word => {
        const wordSpan = document.createElement('span');
        wordSpan.innerText = word;
        textContentElement.appendChild(wordSpan);
    });

    //Clear input value
    inputFieldElement.value = null;
    return textToType;
}

inputFieldElement.addEventListener('input', () => {
    const textArray = textContentElement.querySelectorAll('span');
    const inputArray = inputFieldElement.value.split('');

    //compare each character in textArray to the user's input
    textArray.forEach((characterSpan, index) => {
        const character = inputArray[index];

        //assign a class based on the correctness of the user's input which will change the color of affected characters
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