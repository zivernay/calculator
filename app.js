const calculator = {
    nums : document.querySelectorAll("#keypad .num"),
    operators : document.querySelectorAll("#keypad .oparator"),
    screenDisplay : document.querySelector("#display"),
    calcKey : document.querySelector("#equal"),
    userInputs: {
            expression: "",
            arg1 : null,
             arg2 : null,
            },
    screenOutput : {
        output : "",
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
    operate(oparator, x, y,){
        const ans = calculator[oparator](x, y);
        return ans
    },
    getArgs(){
        const regEx = /\d+\.?\d*/g;
        const inputs = this.userInputs.expression.match(regEx);
        this.userInputs.arg1 = Number(inputs[0]);
        this.userInputs.arg2 = Number(inputs[1]);
    },
    hasTwoArgs(){
        const regEx = /\d+\.?\d*/g;
        const inputs = this.userInputs.expression.match(regEx);
        if (inputs.length > 1){
            return true
        }
        return false
    },
    display(){
        calculator.screenDisplay.innerHTML = `
            <span>${calculator.userInputs.expression}</span>
            <span>${calculator.screenOutput.output}</span>
        `;
    },
    press(){
        const entry = this.textContent;
        calculator.userInputs.expression += entry;
        calculator.display();
    },
    getOperator(){
        if (calculator.hasTwoArgs()){
            calculator.calculate();
        }
        calculator.userInputs.operator = this.getAttribute("id");
        
    },
    calculate(){
        calculator.getArgs() //sets arg1 and arg2 in userInputs
        const ans = calculator.operate(
            calculator.userInputs.operator,
            calculator.userInputs.arg1,
            calculator.userInputs.arg2,
            );
        this.screenOutput.output = ans;
        this.userInputs.expression = ans;
    },
};
//events
calculator.nums.forEach((num)=>num.addEventListener("click", calculator.press))
//This in the called method refers to the operator button
calculator.operators.forEach((operator)=>{operator.addEventListener("click", calculator.getOperator);operator.addEventListener("click", calculator.press);});
calculator.calcKey.addEventListener("click", calculator.calculate)
calculator.calcKey.addEventListener("click", calculator.display)
