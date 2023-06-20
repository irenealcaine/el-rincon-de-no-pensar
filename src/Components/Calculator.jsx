import React, { useState } from "react";
import Button from "./Button";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
      setWaitingForSecondOperand(false);
    }
  };

  const clearDisplay = () => {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);

      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    if (operator === "+") {
      return firstOperand + secondOperand;
    } else if (operator === "-") {
      return firstOperand - secondOperand;
    } else if (operator === "*") {
      return firstOperand * secondOperand;
    } else if (operator === "/") {
      return firstOperand / secondOperand;
    }

    return secondOperand;
  };

  const handleEquals = () => {
    const inputValue = parseFloat(displayValue);

    if (operator && !waitingForSecondOperand) {
      const result = calculate(firstOperand, inputValue, operator);

      setDisplayValue(String(result));
      setFirstOperand(result);
      setOperator(null);
      setWaitingForSecondOperand(true);
    }
  };

  const firstRow = [7, 8, 9]
  const secondRow = [4, 5, 6]
  const thirdRow = [1, 2, 3]

  return (
    <div className="max-w-md w-11/12 mx-auto my-8 bg-white p-6 rounded-md shadow-md">
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 text-right text-gray-800 text-lg border border-blue-500 rounded-md"
          value={displayValue}
          readOnly
        />
      </div>
      <div className="grid grid-cols-4 gap-2">

        <Button type={"red"} className={"col-span-3"} value={"AC"} onClickValue={clearDisplay} />

        <Button type={"violet"} className={"text-2xl !px-2"} value={"/"} onClickValue={() => performOperation("/")} />

        {firstRow.map((number, index) => (
          <Button key={index} className={"!px-2"} value={number} onClickValue={() => { inputDigit(number) }} />
        ))}


        <Button type={"violet"} className={"text-2xl !px-2"} value={"x"} onClickValue={() => performOperation("*")} />

        {secondRow.map((number, index) => (
          <Button key={index} className={"!px-2"} value={number} onClickValue={() => { inputDigit(number) }} />
        ))}

        <Button type={"violet"} className={"text-2xl !px-2"} value={"-"} onClickValue={() => performOperation("-")} />

        {thirdRow.map((number, index) => (
          <Button key={index} className={"!px-2"} value={number} onClickValue={() => { inputDigit(number) }} />
        ))}

        <Button type={"violet"} className={"text-2xl !px-2"} value={"+"} onClickValue={() => performOperation("+")} />

        <Button className={"col-span-2"} value={0} onClickValue={() => { inputDigit(0) }} />

        <Button type={"violet"} className={"!px-2"} value={"."} onClickValue={inputDecimal} />

        <Button type={"green"} className={"text-2xl !px-2"} value={"="} onClickValue={handleEquals} />

      </div>
    </div>
  );
};

export default Calculator;
