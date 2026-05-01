let display = document.querySelector("#displayValue");
function Value(value){
    if (display.innerHTML.length > 25) { //Limit input is 25 digit
        display.innerHTML = display.innerHTML.slice(0, 25);
    }
    if (display.innerHTML === "ERROR" || display.innerHTML === "0" && value !== ".") { // after catch = ERROR then remove ERROR  || first input = next input = none except .
        display.innerHTML = "";
    }
    autoScaleFontSize()
    switch (value){
        case "remove": //backspace
            display.innerHTML = display.innerHTML.slice(0, -2);
            break;
        case "CE": //remove previus value
            display.innerHTML = display.innerHTML.replace(/(\d+\.?\d*)$/, ""); // .replace value by help chat gpt
            break;
        case "C": // clear all input
            display.innerHTML = "";
            break;
        case ".":  // allow 1 decimal point
            let parts = display.innerHTML.split(/[+\-x÷]/); //.split value by help chat gpt
            let lastNumber = parts[parts.length - 1];
            if (lastNumber === "") { //auto add 0 when input "."
                display.innerHTML += "0";
            }
            if (lastNumber.includes(".")) {
                return;
            }
        default:
            display.innerHTML += value;
            break;
    }
}
function autoScaleFontSize(){ //Display value font size adjust
    if (display.innerHTML.length > 20) {
        display.style.fontSize = "13px";
    } else if (display.innerHTML.length > 15){
        display.style.fontSize = "15px";
        
    } else if (display.innerHTML.length >10) {
        display.style.fontSize = "20px";
    } else {
        display.style.fontSize = "30px";
    }
}
function calculate(){
    let expression = display.innerHTML.replace(/x/g, "*").replace(/÷/g, "/"); // .replace value by chat gpt
    try { 
        display.innerHTML = eval(expression);
        if(display.innerHTML === "undefined"){ //catch when "=" is press only
            display.innerHTML = 0;
        }
    } catch {
        display.innerHTML = "ERROR";
    }
}