"use client";
import React, { useEffect } from "react";
// import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from "@/lib/util/Data_chart";
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(ArcElement);

Chart.register(CategoryScale);

const Chart_admin_dash = () => {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#50AF95",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    console.log(chartData);
  });

  return (
    <div className="App">
      <div className="chart-container">
        <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
        <Pie
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Users Gained between 2016-2020",
              },
            },
          }}
        />
        <Line
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Users Gained between 2016-2020",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Chart_admin_dash;
