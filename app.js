const calculator = {
    nums : document.querySelectorAll("#keypad .num"),
    operators : document.querySelectorAll("#keypad .oparator"),
    screenDisplay : document.querySelector("#display"),
    calcKey : document.querySelector("#equal"),
    userInputs: {currentInput: "",
                expression: "",
                arg1 : 0,
                 arg2 : 0,
                },
    plus(x, y){
        return x + y
    },
    subtract(x, y){
        return x - y
    },
    divide(x, y){
        return (x / y == Infinity)? "0 error" : x / y
    },
    multiply(x, y){
        return x * y
    },
    operate(oparator, x, y){
        const ans = calculator[oparator](x, y);
        this.userInputs.answer = ans;
        this.display(ans)
    },
    display(entry){
        this.screenDisplay.textContent = entry;
    },
    press(event){
        const entry = this.textContent;
        calculator.userInputs.currentInput += entry;
        calculator.userInputs.expression += entry
        calculator.display(calculator.userInputs.expression);
    },
    getOperator(){
        const figure = calculator.userInputs.currentInput.match(/\d*\.?\d*/)
        calculator.userInputs.arg1 = Number(figure);
        calculator.userInputs.currentInput = "";
        calculator.userInputs.operator = this.getAttribute("id");
    },
    calculate(){
        const figure = calculator.userInputs.currentInput.match(/\d*\.?\d*/)
        calculator.userInputs.arg2 = Number(figure);
        calculator.userInputs.currentInput = "";
        calculator.userInputs.previousExpressin = calculator.userInputs.expression;
        calculator.userInputs.expression = "";
        calculator.operate(calculator.userInputs.operator, calculator.userInputs.arg1, calculator.userInputs.arg2);
    },
};
//events
calculator.nums.forEach((num)=>num.addEventListener("click", calculator.press))
//This in the called method refers to the operator button
calculator.operators.forEach((operator)=>{operator.addEventListener("click", calculator.press);operator.addEventListener("click", calculator.getOperator)});
calculator.calcKey.addEventListener("click", calculator.calculate)
