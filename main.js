import {words} from './words.js';

const wordsToTypeElement = document.getElementById('textToType');

const generateText = () => {
    let textToType = '';
    
    for(let i = 0; i < 50; i++) {
        textToType += (words[Math.floor(Math.random() * 1000)] + ' ');
    }
    return textToType;
}

wordsToTypeElement.innerText = generateText();
console.log(Math.floor(Math.random() * 1000));