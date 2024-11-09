import React from "react";
import { Bar, Pie } from "react-chartjs-2";

function Charts({ chartData, pieChartData, selectedMetric, selectedMetricS }) {
  return (
    <div className="flex justify-between gap-4">
      <div className="w-1/2 h-52">
        <h3 className="text-lg font-semibold mb-2">
          {selectedMetric === "prix"
            ? "Graphique des prix "
            : "Graphique de l'âge "}
          par {selectedMetricS}
        </h3>
        <Bar
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
      <div className="w-1/2 h-52">
        <h3 className="text-lg font-semibold mb-2">
          {selectedMetric === "prix"
            ? "Graphique des prix "
            : "Graphique de l'âge "}
          par {selectedMetricS}
        </h3>
        <Pie
          data={pieChartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
}

export default Charts;
