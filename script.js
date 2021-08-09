class Calculator {
     constructor(previousOperationTextEl, currentOperationTextEl, operatorEl) {
          this.previousOperationTextEl = previousOperationTextEl;
          this.currentOperationTextEl = currentOperationTextEl;
          this.operatorEl = operatorEl;
          this.clear();
     }
     clear() {
          this.currentOperation = "";
          this.previousOperation = "0";
          this.operation = "";
     }
     delete() {
          this.currentOperation = this.currentOperation.toString().slice(0, -1);
     }
     appendNumber(number) {
          if (number === "." && this.currentOperation.includes(".")) return;
          this.currentOperation =
               this.currentOperation.toString() + number.toString();
     }
     chooseOpertation(operation) {
          if (this.currentOperation === "") return;

          if (this.previousOperation !== "") {
               this.compute();
          }
          this.operation = operation;
          this.previousOperation = this.currentOperation;
          this.currentOperation = "";
     }
     compute() {
          let computation;
          let perv = parseFloat(this.previousOperation);
          let current = parseFloat(this.currentOperation);
          if (isNaN(perv) || isNaN(current)) return;
          switch (this.operation) {
               case "+":
                    computation = perv + current;
                    break;
               case "-":
                    computation = perv - current;
                    break;
               case "*":
                    computation = perv * current;
                    break;
               case "÷":
                    computation = perv / current;
                    break;
               default:
                    return;
          }
          this.currentOperation = computation;
          this.operation = "";
          this.previousOperation = "";
     }
     updateDisplay() {
          this.currentOperationTextEl.innerText = this.currentOperation;
          this.operatorEl.innerText = this.operation;
          this.previousOperationTextEl.innerText = this.previousOperation;
     }
}

let numberBtn = document.querySelectorAll("[data-number]");
let operationBtn = document.querySelectorAll("[data-operators]");
let equalBtn = document.querySelector("[data-equals]");
let deleteBtn = document.querySelector("[data-delete]");
let allClearBtn = document.querySelector("[data-all-clear]");
let previousOperationTextEl = document.querySelector(
     "[data-previous-operation]"
);
let currentOperationTextEl = document.querySelector("[data-current-operation]");
let operatorEl = document.querySelector("[data-operator]");
let calc = new Calculator(
     previousOperationTextEl,
     currentOperationTextEl,
     operatorEl
);

numberBtn.forEach((button) => {
     button.addEventListener("click", () => {
          console.log(button.innerText);
          calc.appendNumber(button.innerText);
          calc.updateDisplay();
     });
});
operationBtn.forEach((button) => {
     button.addEventListener("click", () => {
          calc.chooseOpertation(button.innerText);
          calc.updateDisplay();
     });
});

equalBtn.addEventListener("click", () => {
     calc.compute();
     calc.updateDisplay();
     console.log(equalBtn);
});
allClearBtn.addEventListener("click", () => {
     calc.clear();
     calc.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
     calc.delete();
     calc.updateDisplay();
});
