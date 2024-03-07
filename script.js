'use strict';

const words = {
    nl: {
        combineLargeNumbers: (largeNumber, number) => `${number} en ${largeNumber}`,
        notFound: 'Nummer niet gevonden',
        tooLarge: 'Nummer is te groot',
        0: ['null',],
        1:['', 'een', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen'],
        2:['tien', 'elf', 'twaalf', 'dertien', 'veertien', 'vijftien', 'zestien', 'zeventien', 'achttien', 'negentien'],
        3: ['', 'tien', 'twintig', 'dertig', 'veertig', 'vijftig', 'zestig', 'zeventig', 'tachtig', 'negentig'],
        4: ['', 'honderd', 'duizend', 'miljoen', 'miljard']
    },
    en: {
        combineLargeNumbers: (largeNumber, number, ) => `${largeNumber}${number}`,
        notFound: 'Number not found',
        tooLarge: 'Number is too large',
        0: ['zero',],
        1:['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
        2:['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
        3: ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
        4: ['', 'hundred', 'thousand', 'million', 'billion']
    }
}

/**
 * @param {number} value 
 * @param {string} local 
 * @returns {string}
 * @description This function takes a number and a local as input and returns the number in words.
 * The function supports numbers into the billions.
 * @example numberToWords(10, 'nl') => "tien"
 */
const numberToWords = (value, local) => {
    const valueAsNumber = Number(value);

    if(!words[local]) return 'Language not supported';
    const selectedWords = words[local];

    if(value.length > 13) return selectedWords.tooLarge;
    if(value === '0') return selectedWords[0][0];

    if(valueAsNumber < 10) return selectedWords[1][valueAsNumber];
    if(valueAsNumber < 20) return selectedWords[2][valueAsNumber - 10];
    // below 100
    if(value.length < 3) return value[1] !== '0' ? selectedWords.combineLargeNumbers(selectedWords[3][value[0]], selectedWords[1][value[1]]): selectedWords[3][value[0]];
    // below 1000
    if (value.length < 4) {
        const hundredModifier = selectedWords[4][1];
        const hundred = `${selectedWords[1][value[0]]} ${hundredModifier}`;
        const remainingNumber = value.slice(1);
        return `${hundred} ${numberToWords(remainingNumber, local)}`
    }
    // below million
    if(value.length < 7) {
        const hundred = numberToWords(value.slice(value.length - 3), local)
        const thousandModifier = selectedWords[4][2];
        const thousand = numberToWords(value.slice(0, value.length - 3), local);
        return `${thousand} ${thousandModifier} ${hundred}`
    }
    // below billion
    if(value.length < 10) {
        const thousand = numberToWords(value.slice(value.length - 6), local)
        const millionModifier = selectedWords[4][3];
        const million = numberToWords(value.slice(0, value.length - 6), local);
        return `${million} ${millionModifier} ${thousand}`
    }
    // below trillion
    if(value.length < 13) {
        const million = numberToWords(value.slice(value.length - 9), local)
        const billionModifier = selectedWords[4][4];
        const billion = numberToWords(value.slice(0, value.length - 9), local);
        return `${billion} ${billionModifier} ${million}`
    }

    return 'Number not found'
}


/**
 * @description This function executes the numberToWords function and displays the result on the screen
 * @returns {void}
 */
const onClick = () => {
    const local = document.getElementById('local-select').value || 'nl';
    const number = document.getElementById('number-input').value;
    if(!number) return alert('Please enter a number');

    const splitByComma = number.split('.');
    const words = numberToWords(splitByComma[0], local);
    const wordsAfterComma = splitByComma[1] ? ` comma ${numberToWords(splitByComma[1],local)}` : '';

    document.getElementById('number-to-words-result').innerText = `Result: ${words}${wordsAfterComma}`;
}

/**
 * Using an event listenar to listen for the click event on the button
 * Because of seperation of concers principle 
 */
document.getElementById('number-to-words-button').addEventListener('click',onClick)


