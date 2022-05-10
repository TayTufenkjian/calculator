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

            // If the equal sign is clicked AND the operator exists, store the current display value and perform the operation
            if (button.id ==='equals' && operator) {
                b = textValue;
                let solution = operate(Number(a), operator, Number(b));
                display(solution);

                // Update a and reset b for the next calculation
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
