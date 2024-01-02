const display = document.getElementById('display'),
      numberButtons = document.querySelectorAll('.number'),
      operatorButtons = document.querySelectorAll('.operator'),
      clearButton = document.getElementById('clear'),
      equalsButton = document.getElementById('equals');
let lastInputIsOperator = false; // Add a variable to track if the last input was an operator

// Event listener for number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        display.value += button.textContent;
        lastInputIsOperator = false; // Reset the variable when a number is clicked
    });
});

// Event listener for operator buttons
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!lastInputIsOperator) { // Check if the last input was not an operator
            display.value += button.textContent;
            lastInputIsOperator = true; // Set the variable to true when an operator is clicked
        }
    });
});

// Event listener for keyboard input
document.addEventListener('keydown', event => {
    const key = event.key;
    if (/[0-9]/.test(key)) {
        display.value += key;
        lastInputIsOperator = false; // Reset the variable when a number key is pressed
    } else if (/[+\-*/]/.test(key)) {
        if (!lastInputIsOperator) { // Check if the last input was not an operator
            display.value += key;
            lastInputIsOperator = true; // Set the variable to true when an operator key is pressed
        }
    } else if (key === 'Enter') {
        event.preventDefault(); // Prevent the default behavior of the Enter key
        evaluateExpression();
    } else if (key === 'Escape') {
        display.value = '';
        lastInputIsOperator = false; // Reset the variable when the Escape key is pressed
    }
});

// Event listener for clear button
clearButton.addEventListener('click', () => {
    display.value = '';
    lastInputIsOperator = false; // Reset the variable when the clear button is clicked
});

// Event listener for equals button
equalsButton.addEventListener('click', evaluateExpression);

// Function to evaluate the expression
function evaluateExpression() {
    try {
        const expression = display.value;
        let result;

        switch (expression) {
            case '':
                result = '';
                break;
            case 'Infinity':
                result = 'Error: Division by zero';
                break;
            default:
                result = eval(expression);
                if (isNaN(result)) {
                    throw new Error('Invalid expression');
                }
                break;
        }

        display.value = result;
        lastInputIsOperator = false; // Reset the variable after evaluating the expression
    } catch (error) {
        display.value = 'Error';
        console.error(error);
    }
}
