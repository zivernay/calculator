const calculator = {
    keys : document.querySelectorAll("#keypad .key"),
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
    setArgs(){
        const regEx = /\d+\.?\d*/g;
        const inputs = this.userInputs.expression.match(regEx);
        this.userInputs.arg1 = Number(inputs[0]);
        this.userInputs.arg2 = Number(inputs[1]);
    },
    hasTwoNumbers(){
        const regEx = /\d+\.?\d*/g;
        const inputs = this.userInputs.expression.match(regEx);
        if (inputs.length > 1){
            return true
        }
        return false
    },
    showInput(){
        this.screenDisplay.children[0].textContent = this.userInputs.expression;
    },
    showOutput(){
        this.screenDisplay.children[1].textContent = this.screenOutput.output;
    },
    updateExpression(entry){
        this.userInputs.expression += entry;
    },
    setOperator(oparator){
        this.userInputs.operator = oparator;
    },
    calculate(){
        calculator.setArgs() //sets arg1 and arg2 in userInputs
        const ans = calculator.operate(
            calculator.userInputs.operator,
            calculator.userInputs.arg1,
            calculator.userInputs.arg2,
            );
        return ans
    },
    press(){
        if (this.classList.contains("oparator")){
            if (calculator.hasTwoNumbers()){
                const ans = calculator.calculate();
                calculator.userInputs.expression = ans;
            }
            calculator.setOperator(this.getAttribute("id"));
        } else if(this.classList.contains("equal")){
            if (calculator.hasTwoNumbers()){
                const ans = calculator.calculate();
                calculator.screenOutput.output = ans;
                calculator.showOutput();
                calculator.userInputs.expression = "";
                return
            }
        }
        const entry = this.textContent;
        calculator.updateExpression(entry)
        calculator.showInput();
    },
};
//events
calculator.keys.forEach((key)=>key.addEventListener("click", calculator.press));
