import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";
import { useState } from "react";

const NewExpense = function (props) {
  const [isEditing, setIsEditing] = useState(false);

  function saveExpenseDataHandler(enteredExpenseData) {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    setIsEditing(false);
  }
  function isEditingHandler() {
    setIsEditing(true);
  }
  function hideFormHandler() {
    setIsEditing(false);
  }

  return (
    <div className="new-expense">
      {!isEditing ? (
        <button onClick={isEditingHandler}>Add new Expense</button>
      ) : (
        ""
      )}
      {isEditing ? (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={hideFormHandler}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default NewExpense;
