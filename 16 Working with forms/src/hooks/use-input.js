import { useState } from "react";

const useInput = (validateValueFn) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateValueFn(enteredValue);
  const hasError = !isValid && isTouched;

  const valueChangeHandler = function (e) {
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = function (e) {
    setIsTouched(true);
  };

  const reset = function () {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    enteredValue,
    isValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
