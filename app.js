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
    setArgs(num){
        const regEx = /\d+\.?\d*/g;
        const inputs = this.userInputs.expression.match(regEx);
        for (let i = 0; i < num; i++){
            this.userInputs[`arg${i+1}`] = Number(inputs[i]);
        }
        //this.userInputs.arg1 = Number(inputs[0]);
        //this.userInputs.arg2 = Number(inputs[1]);
    },
    hasNumber(num){
        const regEx = /\d+\.?\d*/g;
        const inputs = this.userInputs.expression.match(regEx);
        if (inputs && inputs.length == num){
            return true
        }
        return false
    },
    showInput(input = this.userInputs.expression){
        this.screenDisplay.children[0].textContent = input;
    },
    showOutput(input = this.screenOutput.output){
        this.screenDisplay.children[1].textContent = input;
    },
    updateExpression(entry){
        this.userInputs.expression += entry;
    },
    setOperator(oparator){
        this.userInputs.operator = oparator;
    },
    calculate(){
        calculator.setArgs(2) //sets arg1 and arg2 in userInputs
        const ans = calculator.operate(
            calculator.userInputs.operator,
            calculator.userInputs.arg1,
            calculator.userInputs.arg2,
            );
        return ans
    },

    press(){
        if (this.classList.contains("oparator")){
            if (calculator.hasNumber(2)){
                const ans = calculator.calculate();
                calculator.userInputs.expression = ans;
            } else if (calculator.userInputs.expression == "" && (typeof calculator.screenOutput.output == "number")){
                calculator.userInputs.expression = calculator.screenOutput.output;
            }
            calculator.setOperator(this.getAttribute("id"));
        } else if(this.classList.contains("equal")){
            if (calculator.hasNumber(2)){
                const ans = calculator.calculate();
                calculator.screenOutput.output = ans;
                calculator.showOutput();
                calculator.userInputs.expression = "";
                return
            } else if (calculator.hasNumber(1)){
                calculator.setArgs(1);
                calculator.screenOutput.output = calculator.userInputs.arg1;
                calculator.showOutput();
                calculator.userInputs.expression = "";
                return
            }
        }
        const entry = this.textContent;
        if (calculator.userInputs.expression == "" && entry != "="){
            calculator.showOutput("");
        }
        (entry != "=")? calculator.updateExpression(entry): console.log("empty inputs");
        calculator.showInput();
    },
};
//events
calculator.keys.forEach((key)=>key.addEventListener("click", calculator.press));
