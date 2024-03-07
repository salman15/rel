function numberToWords(number) {
    return number;
}

document.getElementById('number-to-words-button').addEventListener('click',function() {
    const number = document.getElementById('number-input').value;
    const words = numberToWords(number);
    document.getElementById('number-in-words').innerHTML = words;
})