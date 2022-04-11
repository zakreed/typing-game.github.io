import {words} from './words.js';

const textContentElement = document.getElementById('text-content');

const generateText = () => {
    let textToType = '';
    
    for(let i = 0; i < 50; i++) {
        textToType += (words[Math.floor(Math.random() * 1000)] + ' ');
    }
    return textToType;
}

textContentElement.innerText = generateText();
console.log(Math.floor(Math.random() * 1000));