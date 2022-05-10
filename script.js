document.addEventListener('DOMContentLoaded', () => {
    // Initialize calculation values and operator
    let a, b, operator;

    // Listen for a click on each button
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // If the button is AC, clear all values
            if (button.id === 'clear') {
                a = 0;
                b = 0;
                operator = null;
                display(a);
            }

            // If button is a digit, display and store its value
            if (button.classList.contains('digit')) {
                value = parseInt(button.textContent);
                display(value);

                // If a already exists, store the value in b; otherwise store the value in a
                if (a) {
                    b = value;
                } else {
                    a = value;
                }
            }

            // If button is an operator, store the operator
            if (button.classList.contains('operator')) {
                operator = button.textContent;
            }

            // If the equal sign is clicked AND we have a and operator and b, perform the operation
            if (button.id ==='equals' && a && b && operator) {
                let solution = operate(a, operator, b);
                display(solution);

                // Update a and clear b for the next calculation
                a = solution;
                b = 0;
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
