const calculator = {
    nums : document.querySelectorAll("#keypad .num"),
    operators : document.querySelectorAll(".keypad .operator"),
    screenDisplay : document.querySelector("#display"),
    screenOutput: {line1: "", line2: ""},

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
    display(inputs){
        this.screenOutput.line1 += inputs;
        this.screenDisplay.textContent = this.screenOutput.line1;
    },
};
//events
calculator.nums.forEach((num)=>num.addEventListener("click", press))
function press(e){
    calculator.display(this.textContent);
};