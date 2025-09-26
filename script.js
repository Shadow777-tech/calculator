const display = document.getElementById("display");
let expression = "";

// Update display
function updateDisplay() {
  display.textContent = expression || "0";
}

// Handle digits
function inputDigit(digit) {
  expression += digit;
  updateDisplay();
}

// Handle decimals
function inputDecimal() {
  const lastNumber = expression.split(/[\+\−\×\÷\(\)]/).pop();
  if (!lastNumber.includes(".")) {
    expression += ".";
    updateDisplay();
  }
}

// Handle operators
function handleOperator(op) {
  if (/[\+\−\×\÷]$/.test(expression)) {
    expression = expression.slice(0, -1) + op;
  } else {
    expression += op;
  }
  updateDisplay();
}

// Handle functions
function handleFunction(func) {
  switch (func) {
    case "sin": expression += "Math.sin("; break;
    case "cos": expression += "Math.cos("; break;
    case "tan": expression += "Math.tan("; break;
    case "log": expression += "Math.log10("; break;
    case "ln": expression += "Math.log("; break;
    case "√": expression += "Math.sqrt("; break;
    case "x²": expression += "**2"; break;
    case "1/x": expression = "1/(" + expression + ")"; break;
    case "π": expression += "Math.PI"; break;
    case "e": expression += "Math.E"; break;
  }
  updateDisplay();
}

// Perform calculation
function performCalculation() {
  try {
    let result = expression
      .replace(/÷/g, "/")
      .replace(/×/g, "*")
      .replace(/−/g, "-")
      .replace(/%/g, "/100");

    expression = String(eval(result));
    updateDisplay();
  } catch {
    expression = "Error";
    updateDisplay();
    expression = "";
  }
}

// Clear all
function clearAll() {
  expression = "";
  updateDisplay();
}

// Event listeners
document.querySelectorAll(".number").forEach(btn => {
  btn.addEventListener("click", () => inputDigit(btn.textContent));
});

document.querySelectorAll(".operator").forEach(btn => {
  btn.addEventListener("click", () => handleOperator(btn.textContent));
});

document.querySelectorAll(".function").forEach(btn => {
  btn.addEventListener("click", () => handleFunction(btn.textContent));
});

document.querySelector(".decimal").addEventListener("click", () => {
  inputDecimal();
});

document.querySelector(".equal").addEventListener("click", () => {
  performCalculation();
});

document.querySelector(".all-clear").addEventListener("click", () => {
  clearAll();
});

// Init display
updateDisplay();
