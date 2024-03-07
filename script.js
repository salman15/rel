'use strict';

const below10 = ['null', 'een', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen'];
const below20 = ['tien', 'elf', 'twaalf', 'dertien', 'veertien', 'vijftien', 'zestien', 'zeventien', 'achttien', 'negentien'];
const below100 = ['null', 'tien', 'twintig', 'dertig', 'veertig', 'vijftig', 'zestig', 'zeventig', 'tachtig', 'negentig'];
const below1000 = ['null', 'honderd', 'duizend', 'miljoen', 'miljard']


function numberToWords(number) {
    const numberAsString = String(number);
    if(numberAsString.length > 13) return 'Number is too large';
    const minusModifier = number < 0 ? 'min' : '';

    return `${minusModifier}${number}`;
}

document.getElementById('number-to-words-button').addEventListener('click',function() {
    const number = document.getElementById('number-input').value;
    if(!number) return alert('Please enter a number');
    const hasComma = number.includes('.');
    const splitByComma = number.split('.');
    const words = numberToWords(splitByComma[0]);
    const wordsAfterComma = hasComma ? ` comma ${numberToWords(splitByComma[1])}` : '';
    document.getElementById('number-to-words-result').innerText = `Result: ${words}${wordsAfterComma}`;
})