// stores first operand in a calculation - this is empty if an operator has not yet been selected
let firstOperand = "";
// stores currently displayed value in calculator which acts as second operand if an operand and operator were just entered
let currentValue = "0";
// stores operator while user is entering second operand for calculation
let currentOperator = "";
// boolean flag to determine if the equals button was last operand clicked
let equalsOperatorLast = false;

// adds two numbers
const add = function(a, b) {
	return a + b;
};

// subtracts two numbers
const subtract = function(a, b) {
	return a - b;
};

// multiplies two numbers
const multiply = function(a, b) {
  return a * b;
};

// divides two numbers
const divide = function(a, b) {
	return a / b;
};

// performs a calculation based on the input operator string and two numbers
const operate = function(operator, a, b){
    switch(operator){
        case "+": 
            return add(a,b).toString();
        case "-":
            return subtract(a,b).toString();
        case "x": 
            return multiply(a,b).toString();
        case "/":
            return divide(a, b).toString();
        default:
            console.log("Invalid operator");
    }
}

// add click events to number keys
function createNumericButtonEventListeners(){
    // get number keys on calculator keypad
    const numericButtons = document.querySelectorAll(".numeric-button");
    const numericButtonsArray = Array.from(numericButtons); 

    // add event listener to handle click of number key
    for (const button of numericButtonsArray){
        button.addEventListener("click", (event)=>{

            // call buttonClickHandler which handles all calculator logic
            buttonClickHandler(event);

            // call display function to refresh display after logic is performed
            display();
        });
    }
}

// add click events to operator keys
function createOperatorButtonEventListeners(){
    const operatorButtons = document.querySelectorAll(".operator-button");
    const operatorButtonsArray = Array.from(operatorButtons);

    for (const button of operatorButtonsArray){
        button.addEventListener("click", (event)=>{

            // call buttonClickHandler which handles all calculator logic
            buttonClickHandler(event);

            // call display function to refresh display after logic is performed
            display();
        });
    }
}

// add click events to miscallenous keys

function createMiscButtonEventListeners(){

    // add eventListener to clear button
    document.querySelector("#clear").addEventListener("click", () => {
        clearAction();
        // call display function to refresh display after logic is performed
        display();    
    });

    // add eventListener to delete button
    document.querySelector("#delete").addEventListener("click", () => {
        deleteAction();
        // call display function to refresh display after logic is performed
        display();  
    });

    // add eventListener to equals button
    document.querySelector(".equals-button").addEventListener("click", () =>{
        equalsAction();
        // call display function to refresh display after logic is performed
        display();   
    });

    // add eventListener to decimal button
    document.querySelector(".dot-button").addEventListener("click", () => {
        dotAction();
        // call display function to refresh display after logic is performed
        display();   
    });
}

// handles all calculator logic
function buttonClickHandler(event){
    // store name of button clicked
    let entry = event.currentTarget.name;

    // entry is an operator
    if (entry === "/" || entry === "+" || entry === "-" || entry === "x"){
        // if an operator has not already been entered
        if (currentOperator === ""){
            // update current operator & 
            // store current value as the first operand for the pending calculation
            currentOperator = entry;
            equalsOperatorLast = false;
            firstOperand = currentValue;
            currentValue = "";
        }
        // an operator was previously entered
        else {
            // there are two operands to operate on
            if (currentValue != "" && firstOperand != ""){
                // two operands found, perform calculation using stored operator
                // store result as first operand and update operator to newly-entered operator
                result = operate(currentOperator, Number(firstOperand), Number(currentValue));
                display();
                firstOperand = result;
                currentValue = "";
                currentOperator = entry;
                equalsOperatorLast = false;
            } // if there are not two operands to operate on,
             // then user is simply changing operators in between entering operands
            else{
                currentOperator = entry;
            }
        }
    }
    // entry is a number
    else{
        // if an equals operator was entered previously, then
        // this entry should simply become the current value on the screen
        if (equalsOperatorLast){
            currentValue = entry;
            equalsOperatorLast = false;
        }
        else {
            currentValue += entry;
        }
    }
}

function display(){
    // get calculator upper display (for displaying first operand and operator during calculation) 
    // and lower display (for displaying the current value)
    const upperDisplay = document.querySelector(".upper-display");
    const lowerDisplay = document.querySelector(".lower-display");
    
    // check if previous value is non-empty 
    if (firstOperand != ""){
        // if previous value is not empty, then display previous value & currently entered operator
        upperDisplay.innerText = Math.round(Number(firstOperand * 1000000))/1000000 + currentOperator;
    } else {
        // if not performing an operation, then set upper display to blank
        upperDisplay.innerText = "";
    }
    // display currently entered or calculated value on lower display
    lowerDisplay.innerText = Math.round(Number(currentValue * 1000000))/1000000;

}
// clear all global variables to default
function clearAction(){
    firstOperand = "";
    currentValue = "0";
    currentOperator = "";
    equalsOperatorLast = false;
}

// deletes one character from current entry
function deleteAction(){
    // current value is 0 or empty, do nothing
    if (currentValue === "0" || ""){
        return;
    } else {
        // delete last character from current entry
        currentValue = currentValue.slice(0, -1);
    }
}

// handles action when equal operator entered
function equalsAction(){
    // if nothing to operator on, then equals button does nothing
    if (currentOperator === "" || firstOperand === "" || currentValue === ""){
        return;
    } else {
        // perform calculation
        let result = operate(currentOperator, Number(firstOperand), Number(currentValue));
        // clear operator
        currentOperator = "";
        // set equals operator last flag
        equalsOperatorLast = true;
        
        currentValue = result;
        firstOperand = "";
    }

}

// handles press of decimal buttom
function dotAction(){
    // current entry already includes decimal, return
    if (currentValue.includes(".")){
        return;
    } // current entry does not already include decimal, add decimal to end
    else {
        currentValue += ".";
    }
}

function main(){
    // create all event listeners
    createNumericButtonEventListeners();
    createOperatorButtonEventListeners();
    createMiscButtonEventListeners();
}


// call main method to run program
main();