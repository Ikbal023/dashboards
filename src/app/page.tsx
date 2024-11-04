"use client";
import { useEffect, useState } from "react";
import Filters from "./Filters";
import Charts from "./Charts";
import Summary from "./Summary";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [data, setData] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedPasse, setSelectedPasse] = useState("All");
  const [selectedMetric, setSelectedMetric] = useState("prix");
  const [selectedMetricS, setSelectedMetricS] = useState("saison");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/database.json");
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  const uniqueSeasons = Array.from(new Set(data.map((item) => item.saison)));
  const uniqueLevels = Array.from(new Set(data.map((item) => item.niveau)));
  const uniquePases = Array.from(new Set(data.map((item) => item.passe)));

  const filteredData = data.filter((item) => {
    return (
      (selectedSeason === "All" || item.saison === selectedSeason) &&
      (selectedLevel === "All" || item.niveau === selectedLevel) &&
      (selectedPasse === "All" || item.passe === selectedPasse)
    );
  });

  const totalPrix = filteredData.reduce(
    (acc, item) => acc + (item.prix || 0),
    0
  );

  const groupedData = filteredData.reduce((acc, item) => {
    const metricKey = item[selectedMetricS];
    const metricValue = item[selectedMetric];
    if (!acc[metricKey]) acc[metricKey] = { total: 0, count: 0, [selectedMetricS]: metricKey };
    acc[metricKey].total += typeof metricValue === "number" ? metricValue : 0;
    acc[metricKey].count += 1;
    return acc;
  }, {});
  

  const chartItems = Object.keys(groupedData).map((key) => ({
    [selectedMetricS]: key,
    value:
      selectedMetric === "prix"
        ? groupedData[key].total / 100
        : groupedData[key].total / groupedData[key].count,
  }));
  

  const chartData = {
    labels: chartItems.map((item) => item[selectedMetricS]),
    datasets: [
      {
        label: `${selectedMetric === "prix" ? "Prix" : "Âge"} par ${selectedMetricS}`,
        data: chartItems.map((item) => item.value),
        backgroundColor: ["rgba(255, 99, 132, 0.6)",  
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",  
        "rgba(75, 19, 192, 0.6)"   ],
      },
    ],
  };
  

  const pieChartData = { ...chartData };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white">
      <Filters
        uniqueSeasons={uniqueSeasons}
        uniqueLevels={uniqueLevels}
        uniquePases={uniquePases}
        selectedSeason={selectedSeason}
        setSelectedSeason={setSelectedSeason}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        selectedPasse={selectedPasse}
        setSelectedPasse={setSelectedPasse}
        selectedMetric={selectedMetric}
        setSelectedMetric={setSelectedMetric}
        selectedMetricS={selectedMetricS}
        setSelectedMetricS={setSelectedMetricS}
      />
      <Charts
        chartData={chartData}
        pieChartData={pieChartData}
        selectedMetric={selectedMetric}
        selectedMetricS={selectedMetricS}
      />
      <Summary totalPrix={totalPrix} />
    </div>
  );
}