import React, { useState, useEffect } from "react";

const formatNumber = (num) => {
  if (typeof num === "number" && !Number.isFinite(num)) return "Error";
  return String(Math.round(num * 1e10) / 1e10);
};

const Key = ({ label, onClick, type = "digit", className = "" }) => {
  const styles = {
    digit: "bg-white text-blue-900 border border-blue-900/10 hover:bg-blue-50",
    operator: "bg-violet-500 text-white hover:bg-violet-600",
    function: "bg-blue-100 text-blue-900 hover:bg-blue-200",
    danger: "bg-red-500 text-white hover:bg-red-600",
    equals: "bg-emerald-500 text-white hover:bg-emerald-600",
  };

  return (
    <button
      onClick={onClick}
      className={`h-14 rounded-xl font-bold text-xl transition-all duration-150 active:scale-95 active:brightness-95 ${styles[type]} ${className}`}
    >
      {label}
    </button>
  );
};

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [expression, setExpression] = useState("");

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setExpression("");
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(
        displayValue === "0" ? String(digit) : displayValue + digit
      );
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setExpression("");
      setDisplayValue("0.");
      setWaitingForSecondOperand(false);
    } else if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const backspace = () => {
    if (waitingForSecondOperand) return;
    setDisplayValue(
      displayValue.length > 1 ? displayValue.slice(0, -1) : "0"
    );
  };

  const toggleSign = () => {
    setDisplayValue(formatNumber(parseFloat(displayValue) * -1));
  };

  const percent = () => {
    setDisplayValue(formatNumber(parseFloat(displayValue) / 100));
  };

  const sqrt = () => {
    const value = parseFloat(displayValue);
    setDisplayValue(value < 0 ? "Error" : formatNumber(Math.sqrt(value)));
    setWaitingForSecondOperand(true);
  };

  const square = () => {
    const value = parseFloat(displayValue);
    setDisplayValue(formatNumber(value * value));
    setWaitingForSecondOperand(true);
  };

  const inverse = () => {
    const value = parseFloat(displayValue);
    setDisplayValue(value === 0 ? "Error" : formatNumber(1 / value));
    setWaitingForSecondOperand(true);
  };

  const clearDisplay = () => {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setExpression("");
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b === 0 ? Infinity : a / b;
      default:
        return b;
    }
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(formatNumber(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
    setExpression(
      `${formatNumber(firstOperand ?? inputValue)} ${nextOperator}`
    );
  };

  const handleEquals = () => {
    const inputValue = parseFloat(displayValue);

    if (operator && !waitingForSecondOperand) {
      const result = calculate(firstOperand, inputValue, operator);
      setExpression(
        `${formatNumber(firstOperand)} ${operator} ${formatNumber(
          inputValue
        )} =`
      );
      setDisplayValue(formatNumber(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(true);
    }
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key >= "0" && e.key <= "9") {
        inputDigit(parseInt(e.key, 10));
      } else if (e.key === ".") {
        inputDecimal();
      } else if (e.key === "+") {
        performOperation("+");
      } else if (e.key === "-") {
        performOperation("-");
      } else if (e.key === "*") {
        performOperation("*");
      } else if (e.key === "/") {
        e.preventDefault();
        performOperation("/");
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleEquals();
      } else if (e.key === "Backspace") {
        backspace();
      } else if (e.key === "Escape") {
        clearDisplay();
      } else if (e.key === "%") {
        percent();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className="max-w-md w-11/12 mx-auto my-8 bg-white p-6 rounded-3xl shadow-lg">
      <div className="mb-4 bg-blue-900 rounded-2xl p-4 text-right">
        <p className="text-blue-200/70 text-sm min-h-[1.25rem] font-mono truncate">
          {expression}
        </p>
        <p
          className={`font-oswald font-bold text-white tabular-nums truncate ${
            displayValue.length > 9 ? "text-3xl" : "text-4xl"
          }`}
        >
          {displayValue}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Key
          type="danger"
          className="col-span-2"
          label="AC"
          onClick={clearDisplay}
        />
        <Key type="function" label="⌫" onClick={backspace} />
        <Key type="function" label="%" onClick={percent} />

        <Key type="function" label="√" onClick={sqrt} />
        <Key type="function" label="x²" onClick={square} />
        <Key type="function" label="1/x" onClick={inverse} />
        <Key
          type="operator"
          label="÷"
          onClick={() => performOperation("/")}
        />

        {[7, 8, 9].map((number) => (
          <Key key={number} label={number} onClick={() => inputDigit(number)} />
        ))}
        <Key
          type="operator"
          label="×"
          onClick={() => performOperation("*")}
        />

        {[4, 5, 6].map((number) => (
          <Key key={number} label={number} onClick={() => inputDigit(number)} />
        ))}
        <Key
          type="operator"
          label="−"
          onClick={() => performOperation("-")}
        />

        {[1, 2, 3].map((number) => (
          <Key key={number} label={number} onClick={() => inputDigit(number)} />
        ))}
        <Key type="operator" label="+" onClick={() => performOperation("+")} />

        <Key type="function" label="±" onClick={toggleSign} />
        <Key label="0" onClick={() => inputDigit(0)} />
        <Key label="." onClick={inputDecimal} />
        <Key type="equals" label="=" onClick={handleEquals} />
      </div>
    </div>
  );
};

export default Calculator;