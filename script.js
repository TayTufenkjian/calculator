document.addEventListener('DOMContentLoaded', () => {
    // Listen for a click on each button
    // Display value when a digit button is clicked
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('digit')) {
                value = button.textContent;
                display(value);
            }
        })
    })
})

function display(value) {
    const display = document.querySelector('#display');
    display.textContent = value;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            console.log('Something went wrong');
            return 'error';
    }
}
