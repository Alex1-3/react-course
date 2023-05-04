import "./ExpenseForm.css";
import { useState } from "react";

const ExpenseForm = function (props) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const titleChangeHandler = function (e) {
    setEnteredTitle(e.target.value);
  };
  const amountChangeHandler = function (e) {
    setEnteredAmount(e.target.value);
  };
  const dateChangeHandler = function (e) {
    setEnteredDate(e.target.value);
  };

  const submitHandler = function (e) {
    e.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };

    props.onSaveExpenseData(expenseData);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>date</label>
          <input
            type="date"
            min="2020-01-01"
            max="2023-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="nex-expense__actions">
        <button type="submit">Add Expense</button>
        <button onClick={props.onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
