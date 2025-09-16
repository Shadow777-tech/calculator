const display = document.getElementById("display");

let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let displayValue = "0";

// Update display
function updateDisplay() {
  display.textContent = displayValue;
}

// Input digits
function inputDigit(digit) {
  if (waitingForSecondOperand) {
    displayValue = digit;
    waitingForSecondOperand = false;
  } else {
    displayValue = displayValue === "0" ? digit : displayValue + digit;
  }
}

// Input decimal
function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}

// Handle operator
function handleOperator(nextOperator) {
  const inputValue = parseFloat(displayValue);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = performCalculation(firstOperand, inputValue, operator);
    displayValue = String(result);
    firstOperand = result;
  }

  operator = nextOperator;
  waitingForSecondOperand = true;
}

// Perform calculations
function performCalculation(first, second, op) {
  switch (op) {
    case "+": return first + second;
    case "−": return first - second;
    case "×": return first * second;
    case "÷": return second !== 0 ? first / second : "Error";
    default: return second;
    case "%":return first * (second / 100)
  }
}

// Clear all
function clearAll() {
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  displayValue = "0";
}

// Event listeners
document.querySelectorAll(".number").forEach(btn => {
  btn.addEventListener("click", () => {
    inputDigit(btn.textContent);
    updateDisplay();
  });
});

document.querySelectorAll(".operator").forEach(btn => {
  btn.addEventListener("click", () => {
    handleOperator(btn.textContent);
    updateDisplay();
  });
});

document.querySelector(".decimal").addEventListener("click", () => {
  inputDecimal();
  updateDisplay();
});

document.querySelector(".equal").addEventListener("click", () => {
  if (operator !== null) {
    const result = performCalculation(firstOperand, parseFloat(displayValue), operator);
    displayValue = String(result);
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
  }
});

document.querySelector(".all-clear").addEventListener("click", () => {
  clearAll();
  updateDisplay();
});

// Initialize display
updateDisplay();
