import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import { useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([
    {
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2023, 1, 6),
      id: "ex1",
    },
    {
      title: "Grocery Stores",
      amount: 2.67,
      date: new Date(2023, 1, 4),
      id: "ex2",
    },
    {
      title: "eMag",
      amount: 200,
      date: new Date(2023, 1, 2),
      id: "ex3",
    },
  ]);

  const addExpenseHandler = function (expense) {
    setExpenses((expenses) => {
      return [expense, ...expenses];
    });
  };
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses expenses={expenses} />
    </div>
  );
}

export default App;
