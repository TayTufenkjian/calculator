document.addEventListener('DOMContentLoaded', () => {
    // Initialize values and operator
    let a = b = textValue = operator = '';

    // Get the display div
    const displayDiv = document.querySelector('#display');

    // Listen for a click on each button
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // If the button is AC, clear all values and reset font-size
            if (button.id === 'clear') {
                a = b = textValue = operator = '';
                displayDiv.classList.remove('small');
                display('0');
            }

            // If button is a digit, add the digit to the display value
            if (button.classList.contains('digit')) {
                // Make sure the user can only use one decimal point per number
                if (button.textContent === '.' && textValue.includes('.')) {
                    textValue = textValue;
                } else {
                    // Restrict textValue length to 9 chars
                    if (textValue.length < 9) {
                        textValue += button.textContent;
                    }
                }
                // If textValue contains more than 6 chars, reduce the display font-size
                if (textValue.length > 6) {
                    displayDiv.classList.add('small');
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
                        // If the solution contains more than 10 chars, convert to E notation
                        if (solution.toString().length > 10) {
                            solution = convertLargeNumber(solution);
                        }
                        // If the solution contains more than 6 chars, reduce the display font-size
                        if (solution.toString().length > 6) {
                            displayDiv.classList.add('small');
                        }
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

// Convert and truncate a large number for cleaner display
function convertLargeNumber(num) {
    numString = num.toExponential();
    if (numString.length > 10 ) {
        let index = numString.indexOf('e');
        let numPrefix = numString.slice(0, index);
        let numSuffix = numString.slice(index);
        let truncNumPrefix = numPrefix.slice(0, 10 - numSuffix.length);
        numString = truncNumPrefix + numSuffix;
    }
    return numString;
}