import { useState } from 'react'
import './App.css'
import BUTTONS from './buttons';
function calculateExpression(expr) {
  const safe = expr.replace(/x/g, "*");

  if (!/^[0-9+\-*/. ]+$/.test(safe)) return;

  return Function(`"use strict"; return (${safe})`)();
}
function isDivisionByZero(expr) {
  if (!expr.includes("/")) return false;
  const divisor = expr.split("/").pop();
  return Number(divisor) === 0;
}
function App() {
  const buttons = [
    { id: "clear", value: "AC", className: "red" },
    { id: "divide", value: "/", className: "gray" },
    { id: "multiply", value: "x", className: "gray" },
    { id: "seven", value: "7", className: "black" },
    { id: "eight", value: "8", className: "black" },
    { id: "nine", value: "9", className: "black" },
    { id: "subtract", value: "-", className: "gray" },
    { id: "four", value: "4", className: "black" },
    { id: "five", value: "5", className: "black" },
    { id: "six", value: "6", className: "black" },
    { id: "add", value: "+", className: "gray" },
    { id: "one", value: "1", className: "black" },
    { id: "two", value: "2", className: "black" },
    { id: "three", value: "3", className: "black" },
    { id: "zero", value: "0", className: "black-xx" },
    { id: "decimal", value: ".", className: "black" },
    { id: "equals", value: "=", className: "blue" }
  ];
  const OPERATORS = ["+", "-", "/", "x"];
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const DIGIT_LIMIT_MSG = "DIGIT LIMIT MET"

  function showDigitLimit() {
    const prev = display
    setDisplay(DIGIT_LIMIT_MSG)
    setTimeout(() => setDisplay(prev), 1000)
  };
  function add(value) {
    if (display == DIGIT_LIMIT_MSG) {
      return
    }
    if (value == "=") {
      if (expression.includes("=") || isDivisionByZero(expression) || OPERATORS.includes(display) || expression == "") {
        return
      }
      if (OPERATORS.includes(expression.slice(0, 1))) {
        setDisplay("0");
        setExpression("");
        return
      }
      let result = calculateExpression(expression);
      setDisplay(result.toString());
      setExpression(expression + "= " + result.toString());
      return;
    } else if (value == ".") {
      if (display.length >= 22) {
        showDigitLimit()
        return
      }
      if (expression.includes("=")) {
        setDisplay("0.")
        setExpression("0.")
      } else if (expression == "" || OPERATORS.includes(display)) {
        setDisplay("0.")
        setExpression(expression + "0.")
      } else if (display.includes(".")) {
        return
      } else {
        setDisplay(display + value)
        setExpression(expression + value)
      }
    } else if (value == "AC") {
      setDisplay("0")
      setExpression("")
    } else if (OPERATORS.includes(value)) {
      if (expression.includes("=")) {
        setExpression(display + value)
        setDisplay(value)
        return
      }
      setDisplay(value);
      if (OPERATORS.includes(display)) {
        setExpression(prev => prev.slice(0, -1) + value)
        return
      }
      setExpression(expression + value)
    } else if (display == "0") {
      setDisplay(value)
      setExpression(prev => prev.slice(0, -1) + value)
    } else {
      if (expression.includes("=")) {
        setExpression(value)
        setDisplay(value)
        return
      } else if (display.length >= 22) {
        showDigitLimit()
        return
      }
      setExpression(expression + value)
      if (OPERATORS.includes(display)) {

        setDisplay(value)
        return
      }
      setDisplay(display + value)
    }
  }
  return (
    <div>
      <div className='calculator'>
        <div className="formulaScreen">{expression}</div>
        <div className="outputScreen" id="display">{display}</div>
        <div>
          {buttons.map(item => (
            <BUTTONS onclick={() => add(item.value)} id={item.id} value={item.value} className={item.className} key={item.id} />
          ))}
        </div>
      </div>
      <div className="author">
        <>Designed and Coded By </>
        <br />
        <a href="https://github.com/muazha" target="_blank" rel="noreferrer">moaz</a>
      </div>
    </div>
  )
}

export default App
