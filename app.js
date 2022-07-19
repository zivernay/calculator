const calculator = {
    nums : document.querySelectorAll("#keypad .num"),
    operators : document.querySelectorAll("#keypad .oparator"),
    screenDisplay : document.querySelector("#display"),
    userIputs: {currentInput: "",arg1 : 0, arg2 : 0},

    add(x, y){
        return x + y
    },
    substract(x, y){
        return x - y
    },
    divide(x, y){
        return (x / y == Infinity)? "0 error" : x / y
    },
    multiply(x, y){
        return x * y
    },
    operate(oparator, x, y){
        return oparator(x, y)
    },
    display(entry){
        this.userIputs.currentInput += entry;
        this.screenDisplay.textContent = this.userIputs.currentInput;
    },
    press(event){
        calculator.display(this.textContent);
    },
    getOperator(){
        const figure = calculator.userIputs.currentInput.match(/\d*\.?\d*/)
        calculator.userIputs.arg1 = Number(figure);
        calculator.userIputs.currentInput = "";
        calculator.userIputs.operator = this.getAttribute("id");
        console.table(this);
        console.table(calculator.userIputs);
    }
};
//events
calculator.nums.forEach((num)=>num.addEventListener("click", calculator.press))

//This in the called method refers to the operator button
calculator.operators.forEach((operator)=>{operator.addEventListener("click", calculator.press);operator.addEventListener("click", calculator.getOperator)});

//seperate screen values and inputs