import Chart from "../Chart/Chart";

const ExpensesChart = function (props) {
  const chartDataPoint = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];
  let total = 0;
  props.expenses.reduce((acc, expense) => {
    const expenseMonth = expense.date.getMonth();
    total = chartDataPoint[expenseMonth].value += expense.amount;
    return acc + expense.value;
  }, 0);
  return <Chart dataPoints={chartDataPoint} maxValue={total} />;
};

export default ExpensesChart;
