const calculator = {
    keys : document.querySelectorAll("#keypad .key"),
    equalKey : document.querySelector("#equal"),
    operatorKeys : document.querySelectorAll("#keypad .operator"),
    clearKey : document.querySelector("#clear"),
    delKey : document.querySelector("#del"),
    screenDisplay : document.querySelector("#display"),
    calcKey : document.querySelector("#equal"),
    neg : document.querySelector("#neg"),
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
    operate(operator, x, y,){
        const ans = calculator[operator](x, y);
        return ans
    },
    setArgs(num){
        const regEx = /-?\d+\.?\d*/g;
        const inputs = this.userInputs.expression.match(regEx);
        for (let i = 0; i < num; i++){
            this.userInputs[`arg${i+1}`] = Number(inputs[i]);
        }
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
    setOperator(operator){
        this.userInputs.operator = operator;
    },
    calculate(){
        calculator.setArgs(2) //sets arg1 and arg2 in userInputs
        const ans = calculator.operate(
            calculator.userInputs.operator,
            calculator.userInputs.arg1,
            calculator.userInputs.arg2,
            );
        return this.roundAns(ans)
    },
    roundAns(ans){
        if (ans.toString().length > 10){
            if (ans > 999999){
                return ans.toExponential(10)
            }else {
                //get digit length so that the the comma can be place specific to making the answer 10 digits
                const len = Math.round(ans).toString().length;
                const decimalPoint = 10 - len;
                 return ans.toFixed(decimalPoint);
            }
        }
        return ans
    },
    negative(){
        calculator.updateExpression("-");
        calculator.showInput();
    },
    press(){
        if (this.classList.contains("num") || this.classList.contains("operator")){
            const entry = this.textContent;
            //clear previous outpts when starting new calculation
            if (calculator.userInputs.expression == ""){
                calculator.showOutput("");
            }
            calculator.updateExpression(entry);
            calculator.showInput();
            }
        },
    pressEquals(){
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
    },
    pressOperator(){
        if (calculator.hasNumber(2)){
            const ans = calculator.calculate();
            calculator.userInputs.expression = ans;
            calculator.screenOutput.output = ans;
            calculator.showOutput();
            // Allow coculator to use previous answer as an argument for the next calculation
        } else if (calculator.userInputs.expression == "" && (typeof calculator.screenOutput.output == "number")){
            calculator.userInputs.expression = calculator.screenOutput.output;
        }
        calculator.setOperator(this.getAttribute("id"));
    },
    pressClear(){
        calculator.userInputs.expression = "";
        calculator.showOutput(0);
        calculator.showInput();
    },
    pressDel(){
        const endIndex = (calculator.userInputs.expression.length > 0)? calculator.userInputs.expression.length - 1 : 0;
        calculator.userInputs.expression = calculator.userInputs.expression.slice(0, endIndex);
        calculator.showInput();
    },
};
//events
calculator.neg.addEventListener("click", calculator.negative);
calculator.equalKey.addEventListener("click", calculator.pressEquals);
calculator.operatorKeys.forEach((key)=>key.addEventListener("click", calculator.pressOperator));
calculator.clearKey.addEventListener("click", calculator.pressClear);
calculator.delKey.addEventListener("click", calculator.pressDel);
calculator.keys.forEach((key)=>key.addEventListener("click", calculator.press));
