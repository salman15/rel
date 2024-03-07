'use strict';

const words = {
    nl: {
        0: ['null',],
        1:['', 'een', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen'],
        2:['tien', 'elf', 'twaalf', 'dertien', 'veertien', 'vijftien', 'zestien', 'zeventien', 'achttien', 'negentien'],
        3: ['', 'honderd', 'duizend', 'miljoen', 'miljard']
    },
    en: {
        0: ['zero',],
        1:['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
        2:['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
        3: ['', 'hundred', 'thousand', 'million', 'billion']
    }
}

const below10 = ['', 'een', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen'];
const below20 = ['tien', 'elf', 'twaalf', 'dertien', 'veertien', 'vijftien', 'zestien', 'zeventien', 'achttien', 'negentien'];
const below100 = ['', 'tien', 'twintig', 'dertig', 'veertig', 'vijftig', 'zestig', 'zeventig', 'tachtig', 'negentig'];
const below1000 = ['', 'honderd', 'duizend', 'miljoen', 'miljard']

const ten = 10
const twenty = 20
const hundred = 100;
const thousand = 1000;
const million = 1000000;
const billion = 1000000000;
const trillion = 1000000000000;

function numberToWords(value) {
    const number = Number(value);
    if(value.length > 13) return 'Number is too large';
    if(number === 0) return below10[0];

    const minusModifier = number < 0 ? 'min ' : '';
    const absoluteNumber = Math.abs(number);
    if(absoluteNumber < ten) return `${minusModifier}${below10[absoluteNumber]}`;
    if(absoluteNumber < twenty) return `${minusModifier}${below20[absoluteNumber - 10]}`;
    if(absoluteNumber < hundred) {

        const numberAsString = String(absoluteNumber)
        const singleDigit = Number(numberAsString[1])
        const singleDigitWord = singleDigit ? `${below10[singleDigit]} en ` : '';
        const doubleDigit = Number(numberAsString[0]);
        const doubleDigitWord = below100[doubleDigit];

        return `${minusModifier}${singleDigitWord}${doubleDigitWord}`;
    }
    if(absoluteNumber < thousand) {
        const numberAsString = String(absoluteNumber);
        const hundredsModifier = numberAsString[0] !== '1' ? numberToWords(numberAsString[0]): ''
        const remainingNumber = numberAsString.slice(1);
        const afterHundredModifier = numberToWords(remainingNumber);

        return `${minusModifier}${hundredsModifier}${below1000[1]} ${afterHundredModifier.length > 0 ? `en ${afterHundredModifier}` : ''}`;
    }

    if(absoluteNumber < million) {
        const numberAsString = String(absoluteNumber);
        const thousandsModifier = numberToWords(numberAsString.slice(0, numberAsString.length - 3));
        const remainingNumber = numberAsString.slice(-3);
        const afterThousandModifier = numberToWords(remainingNumber);

        return `${minusModifier}${thousandsModifier}${below1000[2]} ${afterThousandModifier.length > 0 ? `en ${afterThousandModifier}` : ''}`;
    }

    if(absoluteNumber < billion) {
        const numberAsString = String(absoluteNumber);
        const millionsModifier = numberToWords(numberAsString.slice(0, numberAsString.length - 6));
        const remainingNumber = numberAsString.slice(-6);
        const afterMillionModifier = numberToWords(remainingNumber);

        return `${minusModifier}${millionsModifier}${below1000[3]} ${afterMillionModifier.length > 0 ? `en ${afterMillionModifier}` : ''}`;
    }
    if(absoluteNumber < trillion) {
        const numberAsString = String(absoluteNumber);
        const billionsModifier = numberToWords(numberAsString.slice(0, numberAsString.length - 9));
        const remainingNumber = numberAsString.slice(-9);
        const afterBillionModifier = numberToWords(remainingNumber);

        return `${minusModifier}${billionsModifier}${below1000[4]} ${afterBillionModifier.length > 0 ? `en ${afterBillionModifier}` : ''}`;
    }

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