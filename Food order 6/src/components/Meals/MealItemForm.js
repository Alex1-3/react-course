import { useRef, useState } from "react";
import Input from "../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInpuRef = useRef();
  const submitHandler = function (e) {
    e.preventDefault();
    const enteredAmount = amountInpuRef.current.value;

    if (
      enteredAmount.trim().length === 0 ||
      +enteredAmount < 1 ||
      +enteredAmount > 5
    )
      setAmountIsValid(false);

    props.onAddToCart(+enteredAmount);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInpuRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>Add</button>
      {amountIsValid ? "" : <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
