import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import SelectButton from "./SelectButton";
import { HistoricalChart } from "../Config";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart } from "chart.js";

import { registerables } from "chart.js";
Chart.register(CategoryScale);
Chart.register(...registerables);

export default function CoinInfo({ coin }) {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    try {
      const response = await fetch(HistoricalChart(coin.id, days, currency));
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const { prices } = await response.json();
      setHistoricalData(prices);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {!historicalData ? (
        <div>Loading.....</div>
      ) : (
        <>
          <div style={{ width: "100%", padding: 20 }}>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: "#eebc1d",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 20,
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            <SelectButton
              selected={days === 1}
              onClick={() => setDays(1)}
              style={{
                padding: 10,
                margin: 10,
                radius: 5,
              }}
            >
              24 Hours
            </SelectButton>
            <SelectButton
              selected={days === 30}
              onClick={() => setDays(30)}
              style={{
                padding: 10,
                margin: 10,
                radius: 5,
              }}
            >
              1 Month
            </SelectButton>
            <SelectButton
              selected={days === 90}
              onClick={() => setDays(90)}
              style={{
                padding: 10,
                margin: 10,
                radius: 5,
              }}
            >
              3 Months
            </SelectButton>
            <SelectButton
              selected={days === 365}
              onClick={() => setDays(365)}
              style={{
                padding: 10,
                margin: 10,
                radius: 5,
              }}
            >
              1 Year
            </SelectButton>
          </div>
        </>
      )}
    </div>
  );
}
