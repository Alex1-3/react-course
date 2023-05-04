import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

function Expenses(props) {
  const [year, setYear] = useState("2023");
  const filteredExpenses = props.expenses.filter(
    (expense) => expense.date.getFullYear().toString() === year
  );

  function selectYearHandler(year) {
    setYear(year);
  }
  return (
    <Card className="expenses">
      <ExpensesFilter selected={year} onSelectYear={selectYearHandler} />
      <ExpensesChart expenses={filteredExpenses} />
      <ExpensesList expenses={filteredExpenses} />
    </Card>
  );
}

export default Expenses;
