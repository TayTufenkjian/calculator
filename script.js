document.addEventListener('DOMContentLoaded', () => {
    // Initialize values and operator
    let a = b = textValue = '';
    let operator;

    // Listen for a click on each button
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // If the button is AC, clear all values
            if (button.id === 'clear') {
                a = b = textValue = '';
                operator = null;
                display('0');
            }

            // If button is a digit, add the digit to the display value
            if (button.classList.contains('digit')) {
                textValue += button.textContent;
                display(textValue);
            }

            // If button is an operator
            if (button.classList.contains('operator')) {
                // If a already has a value and the operator is NOT the equal sign
                // OR if the equal sign is clicked and the operator exists and the text value is not empty
                // store the display value in b and perform the operation
                if (a && button.textContent !== '=' || (button.textContent ==='=' && operator && textValue)) {
                    b = textValue;
                    solution = operate(Number(a), operator, Number(b));
                    display(solution);
                     // Update a and reset b for the next calculation
                    a = solution;
                    textValue = b = '';
                } else {
                    // Otherwise, store the display value in a and reset it
                    a = textValue;
                    textValue = '';
                }   
                // Update the operator
                operator = button.textContent;
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

function operate(a, operator, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            console.log('Something went wrong');
            return 'error';
    }
}
