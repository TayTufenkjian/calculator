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

            // If button is an operator, store the operator and the current display value
            if (button.classList.contains('operator')) {
                operator = button.textContent;
                a = textValue;
                // Reset the display value
                textValue = '';
            }

            // If the operator exists, the text value is not empty, and the equal sign is clicked 
            // store the current display value and perform the operation
            if (operator && textValue && button.id ==='equals' && textValue != '') {
                b = textValue;
                solution = operate(Number(a), operator, Number(b));
                display(solution);

                // For the next calculation, update a, reset b
                textValue = a = solution;
                b = '';
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
