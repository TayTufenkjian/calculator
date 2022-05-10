document.addEventListener('DOMContentLoaded', () => {
    // Initialize values and operator
    let a = b = textValue = operator = '';

    // Listen for a click on each button
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // If the button is AC, clear all values
            if (button.id === 'clear') {
                a = b = textValue = operator = '';
                display('0');
            }

            // If button is a digit, add the digit to the display value
            if (button.classList.contains('digit')) {
                // Make sure the user can only use one decimal point per number
                if (button.textContent === '.' && textValue.includes('.')) {
                    textValue = textValue;
                } else {
                    textValue += button.textContent;
                }
                display(textValue);
            }

            // If button is a standard operator
            if (button.classList.contains('operator')) {
                // If a already has a value and the operator is NOT the equal sign
                // OR if the equal sign is clicked and the operator exists and the text value is not empty
                // store the display value in b and perform the operation
                if (a && button.textContent !== '=' || (button.textContent ==='=' && operator && textValue)) {
                    // Make sure textValue exists, in case the user hits an operator immediately after hitting the equal button
                    if (textValue) {
                        b = textValue;
                        let solution = Math.round(operate(Number(a), operator, Number(b)) * 100000000) / 100000000;
                        display(solution);
                        // Update a and reset b for the next calculation
                        a = solution;
                        textValue = b = '';
                    }
                } else {
                    // Otherwise, store the display value in a and reset it
                    a = textValue;
                    textValue = '';
                }   
                // Update the operator
                operator = button.textContent;
            }

            // If button is the toggle sign button
            if (button.id === 'toggle-sign') {
                let currentValue = document.querySelector('#display').textContent;
                let solution = (0 - Number(currentValue));
                a = solution;
                textValue = b = '';
                display(solution);
            }

            // If button is the percent button
            if (button.id === 'percent') {
                let currentValue = document.querySelector('#display').textContent;
                let solution = currentValue / 100;
                a = solution;
                textValue = b = '';
                display(solution);
            }
        })
    })
})

function display(value) {
    const display = document.querySelector('#display');
    display.textContent = value;
}

function operate(a, operator, b) {
    switch(operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case 'x':
            return a * b;
        case '/':
            return a / b;
        default:
            console.log('Something went wrong');
            return 'error';
    }
}
