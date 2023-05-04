import "./Chart.css";
import ChartBar from "./ChartBar";

function Chart(props) {
  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          value={dataPoint.value}
          maxValue={props.maxValue}
          label={dataPoint.label}
          key={dataPoint.label}
        />
      ))}
    </div>
  );
}

export default Chart;
